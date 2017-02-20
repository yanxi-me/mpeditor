# 欢迎使用 MPEditor Markdown 编辑阅读器

------

**MPEditor**是专注于微信公众号的编辑阅读器，利用MPEditor可以使用 **Markdown** 语法编写微信公众号文章，编辑完后可以复制到公众号发布平台直接发布，真正的实现即看即所得：

* 更加贴合微信UI标准
* 支持live preview 
* 支持同步滚动
* 支持语法高亮
* 支持emoji表情

> 下面内容 Markdown 语法测试

------

## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 、 *斜体* 、~~delete~~ 某些文字，更棒的是，它还可以

### 1. 基本列表样式

* 偶是个无序列表
  - 我是个二级无序列表
* 真巧啊我也是个无序列表


1. 我是个有序列表啊
2. 嗯，me too~
  * markdown so easy! 妈妈再也不用担心我的**学习**了
3. 哈哈，我是马云爸爸的~~马仔~~

### 2. 制作一份待办事宜

- [ ] 增加顶部工具栏：复制、github
- [ ] 增加QQ音乐markdown语法支持
- [x] 增加emoji语法支持
- [ ] 增加底部公众号关注语法
- [ ] wechat标准UI样式修改
- [x] 修改markdown demo


### 3. 高亮一段代码

```js
// 新语法检测
import $ from 'jQuery'
$(document).on('click', ()=>{
  let that = this
  console.log(that)
})

var aceEditor = new ace.editor('#id')

$(function(){
  $('div').html('I am a div.');
});
```

上面是 `JavaScript`，下面是 `php`：

```php
echo 'hello,world'
```

### 4. 绘制表格
下面是个普通的表格
| 公众号 | id | 备注 |
|-----|-----|------|
| 三水清 | sanshuiqing123   | 作者很帅 |
| 博客 | http://js8.in   | 程序媛鼓励师 |


支持另外一种语法：
公众号        | id/网址       | 备注
------------ | ----------   | ------
三水清 | sanshuiqing123 | 作者很帅 
博客 | http://js8.in   | 程序媛鼓励师 


下面的表格支持左右对齐：
| 项目        | 左对齐   |  居中 |
| --------   | -----:  | :----:  |
| 计算机     | \$1600 |   5     |
| 手机        |   \$12   |   12   |
| 管线        |    \$1    |  234  |


### 5. 链接和图片

* MPEditor：https://github.com/ksky521/mpeditor
* wiki：[点击查看wiki](https://github.com/ksky521/mpeditor/wiki)

下面是个「三水清」的微信公众号二维码，欢迎扫描关注：
![关注三水清](https://raw.githubusercontent.com/ksky521/mpeditor/master/static/qrcode_for_me.jpg)


### 6. 还支持emoji！

* Unicode支持：😈 💗 😄 🐂 👍
* github版本支持：:octocat: :cn: :red_car: :muscle: :smile: :sunglasses:

