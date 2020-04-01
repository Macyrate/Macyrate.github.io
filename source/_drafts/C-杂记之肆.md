---
title: 'C#杂记之肆：异步'
tags:
- CSharp
- 笔记
---

首先说明，异步是**极为高深**的高级编程技术，这篇文章只是才疏学浅的我阅读文档之后的一些思考与理解，可能有极多描述不准确乃至完全错误之处，还望批评指导。顺便吐槽，C#文档翻译得实在是太烂了，很多地方一看就是机翻的，却没有机翻警告。很多地方百思不得其解的词，切换到英语就发现其实很简单，翻译的用词完全错误，难受啊！

# 何为异步

与异步相对的是“同步”，代表着一句代码的执行结束是其后一句代码的执行开始，整个流程是按照固定的顺序进行的，这是一般程序的逻辑。然而，某些语句可能需要花较长时间才能得到结果——比如网络通信和文件读写——这些语句的执行并不怎么占用CPU，但会阻塞整个线程，后续的语句需要等待这些语句执行完成，造成大量的浪费。特别是如果网络环境很不好、读取的文件好几个G，那可是尤其要命，可能整个程序都会出现肉眼可见的卡顿甚至崩溃。

为了解决这种飞快的CPU与龟爬的IO之间的不平衡，传统的方案是单独开个线程让它去执行耗时的操作，让主线程继续运行与耗时操作的结果无关的代码。但是线程操作很麻烦、开销很高，线程数量也有限，不是能随便使用的，所以依然不是个完美的方法。

异步就是为了解决这个问题而存在的。当代码需要执行一个耗时的操作时，它只发出指令，并不等待结果，然后就去执行其他代码了。一段时间后，当耗时操作返回结果时，再通知CPU进行处理。

# 怎么使用

从C# 5开始，编写异步程序变得比较容易。

C#的异步编程模型主要通过两个关键字来使用：`async`和`await`。

先来一段同步的憨憨代码，这描述了一个“做早餐”的流程：

1. 倒一杯咖啡。
2. 加热平底锅，然后煎两个鸡蛋。
3. 煎三片培根。
4. 烤两片面包。
5. 在烤面包上加黄油和果酱。
6. 倒一杯橙汁。

```CSharp
static void Main(string[] args)
{
    Coffee cup = PourCoffee();          //倒咖啡
    Console.WriteLine("coffee is ready");
    Egg eggs = FryEggs(2);              //煎蛋
    Console.WriteLine("eggs are ready");
    Bacon bacon = FryBacon(3);          //煎培根
    Console.WriteLine("bacon is ready");
    Toast toast = ToastBread(2);        //烤面包
    ApplyButter(toast);                 //涂黄油
    ApplyJam(toast);                    //涂果酱
    Console.WriteLine("toast is ready");
    Juice oj = PourOJ();                //倒橙汁
    Console.WriteLine("oj is ready");

    Console.WriteLine("Breakfast is ready!");
}
```

线性的逻辑很简单，但有大问题。煎蛋、煎培根和烤面包都要花很长时间，其实完全可以在做煎蛋和培根的同时，让面包自己在面包机里烤。不然还没等面包烤完，别的东西早凉透了。甚至煎蛋和煎培根也没必要一前一后——谁还没有两个锅呢？或者找个大点的锅来一起煎也行啊。

来看看一个近乎完美的“做早餐解决方案”是怎样的。下面是C#文档里的示范异步代码，我擅自添加了些方便理解的沙雕注释：

```CSharp
static async Task Main(string[] args)
{
    Coffee cup = PourCoffee();          //倒杯咖啡
    Console.WriteLine("coffee is ready");
    var eggsTask = FryEggsAsync(2);     //得煎俩鸡蛋，开整！
    var baconTask = FryBaconAsync(3);   //得煎仨培根，开整！
    var toastTask = MakeToastWithButterAndJamAsync(2);  //得搞两片涂黄油和果酱的面包，开整！

    var allTasks = new List<Task>{eggsTask, baconTask, toastTask};  //列个任务清单吧
    while (allTasks.Any())  //看来清单里还有任务没搞完
    {
        Task finished = await Task.WhenAny(allTasks);   //下一个完成的任务是啥？
        if (finished == eggsTask)   //噢，是鸡蛋煎好了！
        {
            Console.WriteLine("eggs are ready");
        }
        else if (finished == baconTask)     //噢，是培根煎好了！
        {
            Console.WriteLine("bacon is ready");
        }
        else if (finished == toastTask)     //噢，是面包做完了！
        {
            Console.WriteLine("toast is ready");
        }
        allTasks.Remove(finished);      //行，把完成的任务从清单里划了
    }
    Juice oj = PourOJ();    //最后再来杯橙汁，完事
    Console.WriteLine("oj is ready");
    Console.WriteLine("Breakfast is ready!");

    async Task<Toast> MakeToastWithButterAndJamAsync(int number)
    {
        var toast = await ToastBreadAsync(number);      //先等面包烤好
        ApplyButter(toast);     //涂黄油
        ApplyJam(toast);        //涂果酱
        return toast;
    }
}
```

粗略一看，握草，感觉魔改成异步之后复杂了好多。其实不然，我慢慢来分析。

```CSharp
var eggsTask = FryEggsAsync(2);
var baconTask = FryBaconAsync(3);
var toastTask = MakeToastWithButterAndJamAsync(2);

var allTasks = new List<Task>{eggsTask, baconTask, toastTask};
```

可以注意到，这一段使用的几个方法，其名称都在后面加了个“Async”，这是异步方法的命名规范。调用三个异步方法，就是设置了三个任务（Task）。那谁谁，照这个任务去执行吧！我要接着跑后面的代码了。

那么，怎么定义一个异步方法呢？来看上面示例中的这个方法：

```CSharp
async Task<Toast> MakeToastWithButterAndJamAsync(int number)
{
    var toast = await ToastBreadAsync(number);
    ApplyButter(toast);
    ApplyJam(toast);
    return toast;
}
```

首先，方法定义的前面有`async`修饰符，这直接说明了此方法是异步（**async**hronous）的。

异步方法返回的是`Task<TResult>`类型，代表着这个任务（Task）的结果是`TResult`所代表的类型。比如一个返回类型为`Toast`的同步方法，其异步版本的返回类型就应该是`Task<Toast>`，代表着一个“烤面包（Toast）”的任务（Task）。

**`async`异步方法的存在，要依靠包含`await`运算符的表达式或语句。反过来说，异步方法里必须得有`await`的存在。** 上面的代码里，`Main`方法本身也是被`async`修饰的，就是因为Main方法里也用到了`await`语句。

`async`是用来定义异步方法的，那`await`是干什么的呢？按照字面意思来理解就好，“等待”。异步方法运行到这里就开始等待，直到`await`的操作数所表示的异步操作（一个`Task<TResult>`）执行完毕。**一旦异步操作完成，`await`运算符就从`Task<TResult>`的任务里，获取任务的最终结果，以`TResult`类型返回，然后再继续运行后续代码。** 这说明`await`所等待的任务的结果是后续操作的前置条件。

回过头来看上面这个异步方法，第一句就在`await`，这是因为后面抹黄油和果酱的流程都必须建立在“烤完面包”的前置条件上。

```CSharp
while (allTasks.Any())
{
    Task finished = await Task.WhenAny(allTasks);
    if (finished == eggsTask)
    {
        Console.WriteLine("eggs are ready");
    }
    else if (finished == baconTask)
    {
        Console.WriteLine("bacon is ready");
    }
    else if (finished == toastTask)
    {
        Console.WriteLine("toast is ready");
    }
    allTasks.Remove(finished);
}
```

再来看中间的这一段。`allTasks.Any()`使用`List<T>`的`Any()`方法检查列表里是否还有剩余的元素，即当还有未完成的任务时，令程序一直在此循环，这实际上类似于一个消息循环机制。

`Task.WhenAny(allTasks)`有点儿特殊，它是一个`Task<Task>`，即“结果是任务”的任务——在`allTasks`里的某一个任务完成时，它把这个刚刚完成的任务作为自己的结果。这样，`await`运算符就提取出了那个刚刚完成的任务，将它赋给`finished`，接下来就可以作出相应的反应了。

别忘了在任务处理完之后，把这个完成了的任务从任务列表里删去。

以上就是一种基于任务的异步模式（TAP）：把多个任务一齐启动，记录在任务列表里，然后用循环和`await`来等待所有的任务完成。对于每个任务本身，如果具有一些前置条件，就依然用`await`来等待前置条件的完成。

# 深入理解

至此，虽然我们知道了怎么把同步代码改造成异步的，但其中的原理是什么呢？

异步的关键是定义`async`异步方法和用`await`进行必要的流程控制，而这两个关键字都是围绕`Task<TResult>`展开的。因此要更深入地理解异步，就要了解`Task<TResult>`的结构。

## Task



