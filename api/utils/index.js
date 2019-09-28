

var crypto = require("crypto"); // node 模块 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key)
    var crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key)
    var decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted;
}
const keys = "1906";




exports.aesEncrypt = aesEncrypt;//加密
exports.aesDecrypt = aesDecrypt; // 解密

exports.keys = keys; //秘钥

// 检测 后端session   token 是否存在 是否登录 
// req.headers.AUTH_TOKEN  把 token 传递过来  
// 后端需要处理的逻辑  
// 1. 如果 req.headers 没有token 直接判断 token不存在,请马上登录
// 2. 前端 req.headers 有 token ,但是 后端 的 session 没有存储token token过期或者失效
// 3. 前端 req.headers 有 token, 后端 session 也有 token  但是不匹配  token不匹配

// exports.checkToken = function (req, res, next) {
     
//     console.log(req.path);//=》vue/login
//     if (req.path !== "/vue/login" && req.path !== "/vue/register") {
//         const client_token = req.headers['token'];//前端的token 
//         const server_token = req.session.token;  // 后端的token
//         console.log(11)
//         console.log(req.session);
//         console.log(11)

//         if (client_token) {
//             if (server_token) {
//                 if (client_token == server_token) {
//                     next();
//                 } else {
//                     res.json({
//                         code: 500,
//                         msg: "token不匹配",
//                         type: 0,
//                     })
//                 }
//             } else {
//                 res.json({
//                     code: 500,
//                     msg: "token过期或失效"
//                 })
//             }
//         } else {
//             res.json({
//                 code: 500,
//                 msg: "token不存在，请马上登录",
//                 type: 0,
//             })
//         }
//     } else {
//         next();
//     }
// }

exports.checkToken = function(req,res,next){
    // console.log(req.path);
    if(req.path!=="/project/login"&&req.path!=="/project/register"){
        const client_token =req.headers['token'];//接受前端通过请求头发送过来的token
        const server_token = req.session.token;//接受后端在登录时存入session中的token
        if(client_token){

            if(server_token){
                if(client_token==server_token){
                    next();
                }else{
                    res.json({
                        code:500,
                        msg:"token不匹配",
                        type:0,
                    })
                }
            }else{//如果client_token存在，serve_token不存在，表示token过期或不存在
                res.json({
                    code:500,
                    msg:"token过期或不存在",
                    type:0,
                })
            }
        }else{//如果client_token不存在，表示没有登录
            res.json({
                code:500,
                msg:"token不存在，请马上登录",
                type:0,
            })
        }


    }else{
        next();//如果不是登录或注册其中一个页面的话，就直接跳过，进入下一个中间件
    }
}
