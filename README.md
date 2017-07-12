#  **A CHINESE AREA SELECT**

A plugin of Chinese area selector that bases on Jquery.

## HOW TO USE

```Html
<link rel="stylesheet" href="../css/linUI.css">
<script src="../js/jquery.js"></script>
<script src="../js/areaTree.js"></script>
<script src="../js/areaUI.js"></script>
​``````
 <div class="linUI-menu-select" style="margin:0 auto" id="selectId">
            <p class="menu-text" role="text" data-value="">不限区域</p>
            <i class="iconfont icon-spot"></i>
            <div class="menu-body" style="width: 240px;">
                <div class="menu-head">
                    <a class="item" data-type="province" data-value="">不限区域</a>
                </div>
            </div>
 </div>
​``````
<script>
        $(function() {
            var beginSelect = new initSelect('#selectId', {
                clickEvent: function(name, id) {
                    console.log(name);
                    console.log(id);
                }
            });
        });
</script>

```



# CONFIG

```Js
var beginSelect = new initSelect('#selectId', {
                clickEvent: function(name, id) {
                    console.log(name);
                    console.log(id);
                }
            });
```

```'selectId'``` :The first argument is the jquery selector, you should create a wrapper if you want to initialize the plugin.

```html
 <div class="linUI-menu-select" style="margin:0 auto" id="selectId">
            <p class="menu-text" role="text" data-value="">不限区域</p>
            <i class="iconfont icon-spot"></i>
            <div class="menu-body" style="width: 240px;">
                <div class="menu-head">
                    <a class="item" data-type="province" data-value="">不限区域</a>
                </div>
            </div>
 </div>
```



```clickEvent```:When the click event of the selected area is  triggered, this function will be executed.

```js
clickEvent: function(name, id) {
                    console.log(name);
                    console.log(id);
            }
```

The function of callback has two parameter :```name```and ```id``` .

``name`` :The name of area which has been selected.

```id```:The id of the area which has Benn selected.

## RESULT
[result](images/img.png)





