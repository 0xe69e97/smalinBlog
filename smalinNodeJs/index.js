var hprose = require("hprose");
var Functions = require('./funcAll.js');
var server = hprose.Server.create("http://localhost:8081/hprose"); // 本地
server.addFunction(Functions.signUp); // 登录
server.addFunction(Functions.getArticle); // 获取文章
server.addFunction(Functions.addOrEditArticle); // 添加或编辑文章
server.addFunction(Functions.deleteArticle); // 删除文章
server.addFunction(Functions.throughIdGetArticle); // 根据文章ID获取文章
server.addFunction(Functions.getMessages); // 获取留言列表
server.addFunction(Functions.releaseMessage); // 添加留言
server.addFunction(Functions.deleteMessage); // 删除留言
server.start();