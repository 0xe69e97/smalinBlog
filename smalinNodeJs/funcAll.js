
var mysql = require('mysql');
// 本地
var connection = mysql.createConnection({
    host: 'localhost', // 本地
    user: '',
    password: '',
    database: 'smalin'
});
connection.connect();
function signUp(userName, passWord) {
    let sql = `SELECT * FROM user where userName = '${userName}' and passWord = '${passWord}'`;
    return new Promise( (resolve, reject) => {
        connection.query(sql, function (err, result){
            if (err) {
            } else {
                if (result == '') {
                    let obj = {
                        status: 500
                    }
                    resolve(obj);
                } else {
                    let obj = {
                        status: 0
                    }
                    resolve(obj);
                }
            }
        })
    }).then( res => {
        return res;
    })
}
// 获取文章 2/10
function getArticle(json) {
    let pageJson = JSON.parse(json);
    // 对分页参数进行处理 4.24
    let startPage = (pageJson.pageNo - 1) * pageJson.pageSize;
    let endPage = pageJson.pageSize;
    let sql = null;
    if (pageJson.type == 'all') {
        sql = `SELECT * FROM article limit ${startPage}, ${endPage}`;
    } else {
        sql = `SELECT * FROM article where type = '${pageJson.type}' limit ${startPage}, ${endPage}`;
    }
    let getAll = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            } else {
                // let sql = `SELECT * FROM Message limit ${startPage}, ${endPage}`;
                let sqlCont = null;
                if (pageJson.type == 'all') {
                    sqlCont = `select count(id) as total from article`;
                } else {
                    sqlCont = `select count(id) as total from article where type = '${pageJson.type}'`;
                }
                new Promise((res, ret) => {
                    connection.query(sqlCont, function (err, result1) {
                        if (err) {
                            resolve(err)
                        } else {
                            let obj = {
                                result: result,
                                pageNo: startPage + 1,
                                pageSize: endPage,
                                total: result1[0].total
                            }
                            resolve(obj)
                        }
                    })
                })
            }
        })
    })
    return getAll.then(function (successMessage) {
        return successMessage
    })
}
// 添加或编辑文章 2/12
// **************
// *article 文章内容
// *title 文章标题
// *type 文章类型 (web, mood, all)
// **************
function addOrEditArticle(json) {
    // article, title, type, id
    let data = JSON.parse(json);
    let res = null;
    if ( data.id != null ) {
        var editSql = `update article set content = ?, title = ?, type = ? where id = ?`;
        var editSqlParams = [data.article, data.title, data.type, data.id];
        res = new Promise((resolve, reject) => {
            connection.query(editSql, editSqlParams, function (err, result) {
                let obj = {};
                if (err) {
                    obj.status = 500;
                    let res = JSON.stringify(obj);
                    resolve(res);
                } else {
                    obj.status = 0;
                    let res = JSON.stringify(obj);
                    resolve(res);
                }
            });
        });
    } else {
       var addSql = 'INSERT INTO article(id, content, title, type) VALUES(0, ?, ?, ?)';
       var addSqlParams = [data.article, data.title, data.type];
       res = new Promise((resolve, reject) => {
           connection.query(addSql, addSqlParams, function (err, result) {
               let obj = {};
               if (err) {
                obj.status = 500;
                let res = JSON.stringify(obj);
                   resolve(res);
               } else {
                    obj.status = 0;
                    let res = JSON.stringify(obj);
                    resolve(res);
               }
           });
       });
    }
    return res.then(function (successMessage) {
        return successMessage;
    })
}
// 删除文章
function deleteArticle(id) {
    let delSql = `delete from article where id = ${id}`;
    let res = new Promise((resolve, reject) => {
        connection.query(delSql, function (err, result) {
            let obj = {},
                json = '';
            if (err) {
                obj.status = 500;
                json = JSON.stringify(obj);
                resolve(json);
            } else {
                obj.status = 0;
                json = JSON.stringify(obj);
                resolve(json);
            }
        })
        // return res
    })
    return res.then(function (successMessage) {
        return successMessage;
    })
}
// 根据id获取当前文章
function throughIdGetArticle(id) {
    let findSql = `SELECT * from article where id = ${id}`;
    let res = new Promise((resolve, reject) => {
        connection.query(findSql, function (err, result) {
            if (err) {
                resolve(err);
            } else {
                resolve(result);
            }
        })
    })
    return res.then(function (successArticle) {
        return successArticle;
    })
}
function getAllLngLat(){
    //
}
// 发布留言
function releaseMessage (json) {
    let sql = `INSERT INTO Message(id, time, content, user) VALUES(0, ?, ?, ?)`;
    let fontentJson = JSON.parse(json);
    // 将前段传来的参数进行解析城对象格式插入数据库
    let param = [fontentJson.time, fontentJson.content, fontentJson.user];
    let res = new Promise((resolve, reject) => {
        connection.query(sql, param, function (err, result) {
            console.log('err:',err )
            console.log('result:',result )
            if (err) {
                resolve('提交失败!');
            }
            resolve('提交成功!');
        });
    });
    return res.then(function (successMessage) {
        return successMessage == '提交成功!' ? JSON.stringify({
            status: 0
        }) : JSON.stringify({
            status: 500
        })
    })
}
// 获取留言列表
function getMessages(json){
    let pageJson = JSON.parse(json);
    // 对分页参数进行处理 4.24
    let startPage = (pageJson.pageNo - 1) * pageJson.pageSize;
    let endPage = pageJson.pageSize;
    let sql = `SELECT * FROM Message limit ${startPage}, ${endPage}`;
    let sqlTotla = 'select count(id) as total from Message'
    let getMess = new Promise ( (resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                resolve(err);
            } else {
                connection.query(sqlTotla, function (err1, result1) {
                    let obj = {
                        result: result,
                        pageNo: startPage + 1,
                        pageSize: endPage,
                        total: result1[0].total
                    }
                    if (err) {
                        resolve(err);
                    } else {
                        resolve(obj);
                    }
                })
            }
        })
    })
    return getMess.then((success) => {
        return JSON.stringify(success)
    })
}
// 删除留言服务 2018-05-19 00:51:10
function deleteMessage(id) {
    let sql = `delete from Message where id = ${id}`;
    return new Promise( (resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    let obj = {
                        status: 0
                    }
                    obj = JSON.stringify(obj);
                    resolve(obj)
                } else {
                    let obj = {
                        status: 500
                    }
                    obj = JSON.stringify(obj);
                    resolve(obj)
                }
            }
        })
    }).then( success => {
        return success;
    })
}
// signUp();
exports.signUp = signUp;
exports.getArticle = getArticle;
exports.addOrEditArticle = addOrEditArticle;
exports.deleteArticle = deleteArticle;
exports.throughIdGetArticle = throughIdGetArticle;
exports.getMessages = getMessages;
exports.releaseMessage = releaseMessage;
exports.deleteMessage = deleteMessage;
