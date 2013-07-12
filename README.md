##gPop用法##

<pre>
$(el).gPop({
    zIndex: 9999999,
    middile: true, 
    isLock: true, 
    lockColse: false, 
    lockBgColor: '#000', 
    opacity: 0.5,            
    time: null,         
    isColseBtn: true,   
    colseCallback: function(){}, 
    beforeCallback: function(){}
});
</pre>

+ el为当前需要弹出的容器
+ zIndex为弹出层和遮罩层的层级
+ middile为当前元素是否居中，如果不居中，则为当前元素位置
+ isLock为是否开启锁屏遮罩
+ lockClose为是否支持点击锁屏遮罩关闭
+ lockBgColor为设置锁屏遮罩背景色
+ opacity为设置锁屏遮罩透明度
+ time为定时关闭（单位毫秒）
+ isCloseBtn为是否出现关闭按钮
+ closeCallback为关闭后回调
+ beforeCallback为执行前回调
