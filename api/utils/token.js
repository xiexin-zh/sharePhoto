const jwt = require("jsonwebtoken");
//密钥
const serect = "wuahn1906";
//生成 token
//加密
exports.createToken = function (data) {
    return jwt.sign(data, serect);
}
//解密
exports.checkToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, serect, (err, data) => {
            if (err) {
                throw err;
                reject("token 解密失败")
            } else {
                resolve(data);
            }
        })
    })
}
// exports.getMobile = function (req, res, callback) {
//     const { token } = req.headers;
//     checkToken(token).then(mobile => {
//         callback(mobile);//异步回调
//     }).catch(err => {
//         res.json({
//             code: 500,
//             err: err,
//             type: 0,
//             msg: "解密失败，token 不存在或者无效"
//         })
//     })

// }
