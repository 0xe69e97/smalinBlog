var hprose = require("hprose");

function hello(name) {
    return "Hello " + name + "!";
}
function getName(num){
    if (num == 1) {
        return "丁林"
    } else {
        return "没有人"
    }
}
function signUp(userName, passWord){
    if (userName == 'admin' && passWord == 'admin') {
        return '登录成功！'
    } else {
        return "账号或者密码错误！"
    }
}
var server = hprose.Server.create("http://127.0.0.1:8081/hprose");
server.addFunction(hello);
server.addFunction(getName);
server.addFunction(signUp);
server.start();