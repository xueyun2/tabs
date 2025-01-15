# Tabs移动端选项卡

## HTML基础结构

```html
<!-- 样式引用 -->
<link rel="stylesheet" href="/build/static/js/plugin/tabs/css/tabs.css">
<!-- 基础结构 -->
<!-- 禁用选项添加： -->
<div class="mobile-tabs" id="tabs">
        <div class="tabs-head">
            <ul class="tabs-list">
                <li disabled class="tabs-item active" data-id="111" data-name="选项1">
                    选项1
                </li>
                <li class="tabs-item" data-id="111" data-name="选项2">
                    选项2
                </li>
                <li class="tabs-item" data-id="111" data-name="选项3">
                    选项3
                </li>
                <li class="tabs-item" data-id="111" data-name="选项4">
                    选项4
                </li>
                <li class="tabs-item" data-id="111" data-name="选项5">
                    选项5
                </li>
                <li class="tabs-item" data-id="111" data-name="选项6">
                    选项6
                </li>
                <li class="tabs-item" data-id="111" data-name="选项7">
                    选项7
                </li>
                <li class="tabs-item" data-id="111" data-name="选项8">
                    选项8
                </li>
            </ul>
        </div>
        <div class="tabs-content">
            <div class="tabs-show">内容1</div>
            <div>内容2</div>
            <div>内容3</div>
            <div>内容4</div>
            <div>内容5</div>
            <div>内容6</div>
            <div>内容7</div>
            <div>内容8</div>
        </div>
    </div>
```

## 基础用法

```javaScript
const Tabs = layui.tabs;
new Tabs();
```

## 添加事件监听

返回包含下标，当前元素，父元素，节点上的data数据。

```javascript

    const tabs = new Tabs();
    //添加事件监听
    tabs.on('#tabs', (elem) => {
        console.log(elem);
        console.log('下标：',elem.index);
        console.log('当前元素：',elem.item);
        console.log('当前元素父元素：',elem.parentElement);
        console.log('数据：',elem.data)
        console.log(elem.data.id, elem.data.name);
    });
    //设置指定下标
    tabs.setPositionByIndex('#tabs', 2);

```
