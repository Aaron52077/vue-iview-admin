# 引入jQuery 以及其他插件

## jquery

```js
this.dataBase.load('jquery',() => {
	console.log($('#app').attr('class'), '引入jQuery')
});
```
## superslide

[用法](http://www.superslide2.com/demo.html)

```js
this.dataBase.load('superslide',() => {
	console.log($('#app').attr('class'), '引入Superslide')
});
```

## viewer

[用法](http://fengyuanchen.github.io/viewer/)

```js
this.dataBase.load('viewer',() => {
	console.log($('#app').attr('class'), '引入viewer')
});
```