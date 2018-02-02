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
var server = hprose.Server.create("http://127.0.0.1:8081/hprose");
server.addFunction(hello);
// server.addFunction(getName);
server.start();