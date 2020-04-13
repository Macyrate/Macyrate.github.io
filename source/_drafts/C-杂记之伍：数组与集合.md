---
title: 'C#杂记之伍：数组与集合'
tags:
- CSharp
- 笔记
---

数组可以说是在任何语言中都非常基本的数据结构了。这篇笔记以C#中的数组为引，再延伸到C#的几种集合类(Collections)以及一些相关的概念。

# 数组Array

## 概述

数组存储相同种类的元素，其大小固定，且是顺序存储的，即在内存中占据一段连续的地址。

数组作为一种引用类型(其基类是System.Array)，需要用`new`来创建实例。

```CSharp
//初始化时指定大小
double[] balance = new double[10];

//可以直接赋值来初始化
int[] marks = {99, 98, 92, 97, 95};
```

初始化而尚未赋值的数组，编译器会根据其类型隐式地将所有元素设置为默认值。

数组最大的特点还是能够用下标索引来随机访问其中的元素：

```CSharp
double salary = balance[9];
```

由于实现了`IEnumerable`接口，数组可以使用`foreach...in...`的方式进行迭代访问，还可以使用LINQ，这样就无需获取数组长度再用for循环迭代了。关于这个接口及其相关的内容，我在本文稍后的部分记述。

## 索引器Indexer

索引器（Indexer）可以让各种类、结构、接口实现数组的这种能够用下标索引来访问的功能。

索引器就像一个名为`this`的属性，可以用访问器进行定义。

> 访问器是可在属性上定义的两个方法。其中get方法在读属性时执行；set方法隐含一个传入的`value`参数，在写属性时执行。一个常见的用途是用公开属性的访问器来对私有属性进行读/写。另外也可以在set访问器里对传入值进行范围检查等操作。

索引器的一般定义示例：

```CSharp
element-type this[int index]
{
   // get 访问器
   get
   {
      // 返回 index 指定的值
   }

   // set 访问器
   set
   {
      // 设置 index 指定的值
   }
}
```

比较神奇的是，索引器的索引下标并不是只能使用int，还可以用string。同时索引器又像是一个方法，甚至可以重载，这意味着你可以同时定义以int和string作为索引下标的索引器。

## 多维数组

C#的多维数组在定义时，维度之间用逗号隔开。

```CSharp
//三维数组
int[, ,] array3Da = new int[2, 2, 3] { { { 1, 2, 3 }, { 4, 5, 6 } }, 
                                        { { 7, 8, 9 }, { 10, 11, 12 } } };
```

## 交错数组

交错数组是**数组的数组**。当我们说“数组”的时候，说的是一个引用类型。因此交错数组与多维数组的不同之处在于，它本质上是个一维数组，其元素为引用类型，且被初始化为null。

也正因此，交错数组中的元素只需要是规定的数组类型即可，不需要具有一致的长度：

```CSharp
//包含大小不同的三个二维数组元素的一维交错数组：
int[][,] jaggedArray = new int[3][,] 
{
    new int[,] { {1,3}, {5,7} },
    new int[,] { {0,2} },
    new int[,] { {11,22}, {99,88}, {0,9} } 
};

System.Console.Write("{0}", jaggedArray4[0][1, 0]);   //输出：5
```

# 集合Collections

## 概述

集合类是定义在`System.Collection`命名空间里的几种类。比起数组，它们实现了几个接口，能更方便用于存储和检索数据。

为了支持无数种类型，非泛型集合把所有的元素都装箱成`object`类的对象来存储。元素的读写总要涉及到装箱与拆箱，在性能上有一定损失。

因此，在引入对泛型的支持后，更好的选择是使用命名空间`System.Collection.Genreric`里的泛型集合来存储数据。以下是几种非泛型和泛型集合：

| 非泛型集合类        | 泛型集合类                         | 描述                   |
| :------------------ | :--------------------------------- | :--------------------- |
| 动态数组 ArrayList  | 列表 List\<T\>                     | 具有动态大小的数组     |
| 哈希表 Hashtable    | 字典 Dictionary\<Tkey,Tvalue\>     | 由键-值对组成的集合    |
| 排序列表 SortedList | 排序列表 SortedList\<Tkey,Tvalue\> | 和字典相似但有排序功能 |
| 队列 Queue          | 队列 Queue\<T\>                    | 先进先出（FIFO）队列   |
| 堆栈 Stack          | 堆栈Stack\<T\>                     | 后进先出（LIFO）队列   |

而泛型集合中，最常用的是List\<T\>和Dictionary\<Tkey,Tvalue\>，其它的集合基本都建立在其基础上。

## List<T>

```CSharp
//要创建一种类型的列表，依然需要用new：
List<Animal> animalCollection = new List<Animal>();

//增
//Add()方法在末尾动态加入元素
animalCollection.Add(dog);
//Insert()方法在指定索引处插入元素
animalCollection.Insert(0,cat);

//删
//Remove()方法删掉第一个结果

//依然可以用下标索引访问
var firstAnimal = animalCollection[0];
```

### 创建

要创建一种类型的列表，依然需要用new：

```CSharp
List<Animal> animalCollection = new List<Animal>();
```

### 容量

List中有两个int属性：Count和Capacity。

Count代表List中现有的元素数量，而Capacity代表List的容量。当Count达到Capacity的值，再试图加入元素时，Capacity就会自动进行调整。下面是在一个List\<int\>中加入600个元素的结果，其中白色数字代表现有元素数量Count，绿色数字代表List容量Capacity：

![动态调整Capacity](https://i.loli.net/2020/04/13/iIOaP5s24YgMCpX.png)

可以看出，加入第一个元素时，Capacity从0被调整到4。之后每次Count要超过Capacity时，Capacity就会翻倍，以容纳更多元素。这个容量调整算法不是固定的，比如对于Dictionary\<Tkey,Tvalue\>来说，每次调整增加的容量都是质数。虽然不知道为什么要这样设计，但奇怪的知识增加了！

除了让其自动增长之外，还可以直接访问Capacity，手动设置为不小于当前Count的值；也可以调用List的`TrimExcess()`方法，将Capacity直接削至Count的值。不过考虑到开销，如果未使用的容量小于总容量的10%，则不会对容量进行调整。下面是在加入了300个元素后，调用`TrimExcess()`（用黄色字体表示），再加入300个元素的效果：

![TrimExcess](https://i.loli.net/2020/04/13/iOIcSNkACBZKDPa.png)

手动设置Capacity有什么用呢？毕竟就算设置了，由于Capacity的自动调整机制，还是能不受限制地往里添加元素。而且在调整Capacity时，还会有复杂度为O(n)的计算。关于这一点我依然存疑，如果你知道手动设置Capacity的意义，请告诉我！

### 增

- Add() 在末尾动态加入元素
- AddRange() 在末尾添加一个集合中的元素
- Insert() 在指定索引处插入元素
- InsertRange() 在指定索引处插入一个集合的元素

### 删

- Remove() 删除第一个内容匹配的元素
- RemoveAt() 删除指定索引处的元素
- RemoveRange() 删除一定范围内的元素
- RemoveAll() 删除所有条件匹配的元素
- Clear() 直接清空

### 改

依然可以直接用下标索引访问：

```CSharp
animalCollection[0] = cat;
```

其原理是List类用Item()方法作索引器。

但要注意，List的长度是其Count属性的值。对于新建的List，没有任何元素，Count为0，甚至不能用0号索引来访问并赋值。应该先用一些方法让索引对应的位置可用。

```CSharp
List<Animal> animalCollection = new List<Animal>();
animalCollection[0] = cat;    //这是错误的，0号元素还不存在

List<Animal> animalCollection = new List<Animal>(new Animal[10]);
animalCollection[0] = cat;    //这是可以的，创建List时填入了10个null
```

### 查

- Contains() 判断元素是否在List内
- Exists() 确定List内是否包含条件匹配的元素
- Find() 查找并返回第一个条件匹配元素
- FindAll() 查找并以List的形式返回所有条件匹配元素
- IndexOf() 查找第一个内容匹配的元素，返回其索引
- LastIndexOf() 查找倒数第一个内容匹配的元素，返回其索引
- BinarySearch() 用指定的比较器在一定范围内二分查找元素，返回其索引

# Dictionary\<Tkey,Tvalue\>

C#中的字典是泛型的哈希表（HashTable）。


