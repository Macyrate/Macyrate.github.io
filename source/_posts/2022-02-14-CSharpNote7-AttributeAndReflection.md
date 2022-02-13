---
title: C#杂记之柒：特性与反射
tags:
  - CSharp
  - 笔记
date: 2022-02-14 00:04:50
---


其实19年在实习期间写CFET的时候，就有用到过Attribute这个特性[^1]，但当时并没有研究过它的作用和原理，只是照着文档给的案例使用。最近准备看看Unity中是如何用Lua实现热更新的，发现attribute满天飞，这就不得不理解一下了。

[^1]: C#文档里将attribute译作“特性”，为避免混淆本文全部使用attribute。

简单看了看，attribute似乎和反射息息相关，正好反射这块我也不太了解，这次就将一些相关的概念一并记录吧。

# 特性 Attribute

特性是一种标签，可以用方括号贴在各种元素[^2]之前，给这些元素添加**元数据**。元数据包括编译器指令、注释、描述、方法、类等信息。

[^2]: 能够使用attribute的元素包括程序集（即.exe或者.dll）、类型、方法、属性等。

许多特性都附带一些参数，如在声明`element`的时候，通过带参的attribute附加元数据，按下面的格式使用：

```CSharp
[SomeAttribute(positional_parameters, name_parameter = value, ...)]
element
```

特性实际上是`System.Attribute`的一系列派生类，它们的后缀均为"Attribute"，在打标签的时候这个后缀可以省略掉。

## 预定义的Attribute

微软在.NET库里已经内置了一堆`System.Attribute`的派生类，我们可能只会接触到其中一小部分，这里举几种常用的为例。

### ObsoleteAttribute

`Obsolete`用于指示过时、弃用的元素。这些元素被认为不应该使用，因此在有调用到这种元素的地方，会产生Warning，并且附带参数`message`所包含的提示信息。如果建议使用某种新方案，就可以写在提示信息里。

![对过时元素告警](https://s2.loli.net/2022/02/07/tkSGJRc4mFe1w2y.png)

另外，还有可选的第二个参数`iserror`，如果被设置为`true`，则会产生Error而不是Warning，阻止编译。

<!-- more -->

### ConditionalAttribute

`Conditional`用于进行条件编译，只有参数中所记录的符号有定义时，才编译相关的代码。

不过，这个attribute只适用于`System.Attribute`的派生类（也就是各种attribute），以及返回类型为`void`的方法。毕竟，比起它们来说，如果不编译其它的类，或者那些提供了返回值的方法，程序更有可能会整个垮掉。

```CSharp
#undef DEBUG
//#define TEST_SYMBOL

using System;
using System.Diagnostics;

public class Myclass
{
    //Conditional可以附加多个，满足其中一个条件即可
    [Conditional("DEBUG"), Conditional("TEST_SYMBOL")]
    public static void DebugMessage(string msg)
    {
        Console.WriteLine($"[DEBUG] {DateTime.Now.ToString()} {msg}");
    }
}

class Test
{
    public static void Main()
    {
        //由于取消了DEBUG的定义，也没有定义TEST_SYMBOL，故什么都不会打印
        Myclass.DebugMessage("In function Main now.");
        Console.ReadKey();
    }
}
```

### AttributeUsageAttribute

`AttributeUsage`可以放在我们自定义的attribute类前面，用来规定该如何使用这种attribute。

```CSharp
[AttributeUsage(
   validon,
   AllowMultiple=allowmultiple,
   Inherited=inherited
)]
public class MyTestAttribute : Attribute
{
    //...
}
```

必选参数validon规定该attribute适用于哪些元素。它是枚举器AttributeTargets的值的组合。默认值是AttributeTargets.All。

![各种AttributeTargets](https://s2.loli.net/2022/02/07/rpK4QE1bgGWxzVC.png)

还有两个bool型的可选参数：

`AllowMultiple`: 默认为false，表示这个attribute是否可以像`Conditional`一样，在同一个元素上打多个标签。给元素打标签其实是调用了对应attribute类的构造函数，并将实例加入到目标元素的元数据里去，所以这里就是是否允许多个实例在同一元素的元数据里共存。

`Inherited`: 默认为true这个attribute是否可以被继承。


## 自定义的Attribute

既然attribute是一系列继承自`System.Attribute`的类，我们也可以编写它的派生类，实现自己的attribute。

如何正确地设计一个attribute？

1. 应用[AttributeUsage](#attributeusageattribute)，规定该attribute的用法
2. 声明`System.Attribute`的派生类，并且名称以"Attribute"结尾（命名规范，非强制）
3. 声明构造函数
4. 声明属性

注意，attribute应该被视为一种逻辑状态的容器，因此设计时应该尽量保持简单，不应提供公共方法、事件等等。以下是微软文档中给出的自定义attribute示例，其中包含带两个参数的构造函数，三个字段，三个对应的属性：

```CSharp
[AttributeUsage(AttributeTargets.All)]
public class DeveloperAttribute : Attribute
{
    // Private fields.
    private string name;
    private string level;
    private bool reviewed;

    // This constructor defines two required parameters: name and level.
    public DeveloperAttribute(string name, string level)
    {
        this.name = name;
        this.level = level;
        this.reviewed = false;
    }

    // Define Name property.
    // This is a read-only attribute.
    public virtual string Name
    {
        get {return name;}
    }

    // Define Level property.
    // This is a read-only attribute.
    public virtual string Level
    {
        get {return level;}
    }

    // Define Reviewed property.
    // This is a read/write attribute.
    public virtual bool Reviewed
    {
        get {return reviewed;}
        set {reviewed = value;}
    }
}
```

不难看出，这个attribute用于标记一个元素的作者信息和评审状态。也许你会疑惑，这个attribute的构造函数只有两个关于作者信息的参数，如何指定评审状态Reviewed呢？

其实，被方括号括起来的标签和attribute的构造函数并不完全一样，我们可以将Reviewed作为可选参数传入：

```CSharp
[Developer("Macyrate", "Junior", Reviewed = true)]
public class Hello
{
    public Hello()
    {
        Console.WriteLine("Hello World!");
    }

    public Hello(int just_a_number, string just_a_string)
    {
        Console.WriteLine($"Hello World! And just some info: {just_a_number} {just_a_string}.");
    }
}
```

## 编译器对Attribute的处理

当C#编译器发现有元素应用了一个attribute时，根据其名称是否以"Attribute"结尾，编译器会决定是否把字符串"Attribute"追加到后面，然后在其搜索路径的所有名称空间中搜索符合指定名称的类。

找到对应的类，并确定该类派生自`System.Attribute`后，编译器会根据其`AttributeUsage`，看该attribute的用法是否正确。如果合法，编译器就会开始进一步处理attribute的参数。

编译器会根据传递给attribute的参数，查找对应的构造函数。编译器还会查找attribute类中存在的**public属性/字段**，将它们作为可选参数。如果编译器找到一个这样的构造函数，传入的可选参数也合法，编译器就会把指定的元数据传递给程序集。否则，就生成一个编译错误。

现在，我们知道了如何通过attribute给元素附加元数据。但是仅仅将这些元数据写入是没什么意义的，我们还需要依靠**某种机制**来读出元数据，并且用它们来控制代码逻辑，这样才能实现有意义的功能。

而这种读取元数据的机制，就是**反射**（Reflection）。

# 反射 Reflection

## Type类

Type类表示“对类型的引用”，可以说是反射的核心。它包含了类类型、接口类型、数组类型、值类型、枚举类型、类型参数、泛型类型定义，以及开放或封闭构造的泛型类型。

针对一个类型将Type类实例化时，实际上是生成了某个Type派生类的对象（Type类对所有的类型都有相应的派生类），这个对象包含类型的具体信息。要获取关于某个类型的Type实例，主要有以下几种方法：

1. `typeof()`运算符
2. 所有类型都具备的`GetType()`方法（从Object继承）
3. `Type`类静态方法`GetType()`

![Type类](https://s2.loli.net/2022/02/13/SPMU3j6z8oJWqvx.png)

可以看到，`Type`中除了基本的类型名称、继承自的类、声明所属的namespace等信息，还有大量的bool值，表示这个类型的各种特点，如是否为数组，是否抽象，是否支持泛型等等。

## 读取元数据

首先我们需要了解元数据的组织层级，如下图所示。

![元数据层级[^3]](https://s2.loli.net/2022/02/13/YKkcw3hN6sfaHvn.png)

[^3]: Schult, Wolfgang & Polze, Andreas. (2002). Aspect-Oriented Programming with C # and .NET. 241 - 248. 10.1109/ISORC.2002.1003711. 

从Type往下都很好理解，字段、属性、事件、方法/构造函数、以至于方法的参数，它们都有对应的以Info结尾的类让我们获取元数据。

至于Type上面的Assembly和Module，分别称为程序集和托管模块，它们都具备`GetTypes()`方法，能以`Type`数组的形式获取到自己内部的所有类型。关于程序集和托管模块之间的区别和联系，涉及到C#的编译、链接流程等等，具体可以查看[StackOverflow上的这个问题](https://stackoverflow.com/questions/9271805/net-module-vs-assembly)。这里我们只需要知道，C#最终生成的.exe或者.dll文件就是程序集，其中包含了一块称为`manifest`的清单元数据，描述了程序集的名称、版本号、区域性信息以及所包含的文件等等。

![托管模块和程序集](https://s2.loli.net/2022/02/13/BnUMgNFYp3ljPuR.png)

以`Type`类为中心，我们就可以读取到各种各样的元数据，以此在运行时针对类型本身，或者类型所附加的attribute来进行逻辑控制。

以下是一些`Type`类最为常用的方法，需要注意反射所用的方法基本都有一大堆各种各样的重载，适应各种用途：

1. GetMembers() 返回一个MemberInfo[]，获取所有成员信息
3. GetCustomAttributes<T>() 尝试获取参数T表示的Attribute（如果没有则返回null）
4. 针对每个成员的MemberInfo，可以通过MemberType获取成员的种类
5. 针对MemberType为Method的成员，可以将其用`as`运算符转换为`MethodInfo`（它派生自MemberInfo）
6. 针对每个方法的MethodInfo，可以使用GetParameters()获取参数的类型、名称等信息

![对Type类GetMembers()](https://s2.loli.net/2022/02/13/E6H2RXZ1rVOmuvB.png)

## 示例：读取Attribute中的属性

在前面我们自定义了一个[DevelopAttribute](##自定义的Attribute)。

现在，我们可以通过反射读取到标签中的信息：

![反射读取attribute](https://s2.loli.net/2022/02/13/jFEJ4Al5fuP2Y6b.png)

> 当然，反射不仅仅有读取元数据的功能。其另一方面的魅力是，可以在运行时为那些编译时完全不知道的类型创建实例。
> 
> 另外，通过`dynamic`实现的动态编程也与反射有一定的关系，此处暂时不展开了。