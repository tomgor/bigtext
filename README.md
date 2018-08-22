##输入框放大镜组件
输入框放大镜用于web界面对输入框组件进行输入时，提醒用户输入的长度和数据，特别是数据超过输入框长度用户无法查看时，特别有效。
废话不多说，直接上图
![效果图](img/bigtext.jpg)
###用法
#### 1. 引入js
```html
<script src="jquery.js"><!-- 依赖jquery -->
<script src="util.js"><!-- 工具类-->
<script src="big-text.js">
```
####2. 对需要使用的input标记样式
```html
<input type="text" class="bigtext">
```
####3. 进行初始化
```javascript
BigTextInput.initBigTextInput({
        dom:'#container',//需要标记的input容器，用于减少jquery查找范围，默认为document
        el:'.bigtext',//需要初始化功能的input框的jquery选择器
        filter:function(e){//如果el过滤器不能很好的过滤出你需要初始化的input，可以加入filter
            if(e.target.type != 'text'){
                return false;
            }
            return true;
        }
    });
```
####4. 小东西，欢迎指教[QQ邮箱](maiTo:22257170@qq.com)