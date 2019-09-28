const express = require("express");

const router = express.Router();

const { Movie, User, Good, Shopcar, Projectgood, Projectshopingcar, Addressdetail } = require("./utils/schema");
const { keys, aesEncrypt, aesDecrypt } = require("./utils");

router.post("/register", (req, res) => {
    const body = req.body;
    const { usertel } = body;

    User.findOne({
        usertel,
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "注册失败，该手机号已被使用",
                type: 0
            })
        } else {
            User.insertMany(body).then(result => {
                res.json({
                    code: 100,
                    msg: "注册成功",
                    type: 1
                })
            })
        }
    })

})

router.post("/login", (req, res) => {
    const body = req.body;
    const { usertel, password, dbpassword } = body;
    User.findOne({ usertel }).then(result => {
        if (result) {//result为查询到的该组数据
            if (body.password == result.password) {
                // token    发送给前端  
                // session  后端 
                //  Session {
                //     cookie:
                //      { path: '/',
                //        _expires: 2019-08-27T10:00:51.298Z,
                //        originalMaxAge: 3600000,
                //        httpOnly: true } }
                console.log(req.session)
                const token = aesEncrypt(result.usertel, keys);
                req.session.token = token;
                //将手机号存入后端req.session.token 
                res.json({
                    code: 200,
                    msg: "登录成功",
                    type: 1,
                    token,//将token发往前端
                })

            } else {
                res.json({
                    code: 200,
                    msg: "手机号和密码不匹配",
                    type: 0,
                })
            }

        } else {
            res.json({
                code: 200,
                msg: "该手机号尚未注册，请前往注册",
                type: 0
            })
        }


    })


})

//上传头像
const multer = require("multer");
//导入 multer 模块

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
        //设置 仓库，放置上传的图片的目录为./public/avatar

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + 'wh' + file.originalname)
    }
    //原始文件名=> originalname
    //设置上传头像的原始文件名
})
//创建上传对象
const upload = multer({ storage }).any();

//上传头像

router.post("/uploadImg", upload, (req, res) => {
    console.log('xxxx');
    console.log(req.files);
    var pic = req.files[0].path;
    console.log(pic)
    //设置文件路径
    var usertel = aesDecrypt(req.session.token, keys);
    console.log(usertel);
    User.updateOne({
        usertel
    }, {
            $set: {
                avatar: pic
            }
        }).then(result => {
            res.json({
                code: 200,
                msg: "头像上传成功",
                pic,
                result
            })
        })
})
//配置 路由通过用户名查询该用户是否 有头像
// 根据result 进行不同的操作
router.post("/getImages", (req, res) => {
    const { usertel } = req.body;
    User.findOne({
        usertel
    }).then(result => {
        if (result.avatar) {
            res.json({
                code: 200,
                msg: "获取个人头像成功",
                type: 1,
                avatar: result.avatar
            })
        } else {
            res.json({
                code: 200,
                msg: "个人头像尚未上传",
                type: 0,
                avatar: null
            })
        }
    })

})
router.get("/getGoods", (req, res) => {

    Projectgood.find().sort({ id: -1 }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "获取数据成功",
                type: 1,
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "获取数据失败",
                type: 0,
                result,
            })
        }
    })


})
//获取商品的种类
router.get("/getGoodTypes", (req, res) => {
    Projectgood.distinct('typech').then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "获取分类的数据成功",
                type: 1,
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "获取分类数据失败",
                type: 0,
                result,
            })
        }
    })

})
//搜索列表
router.get("/getSearchList", (req, res) => {
    const { keyword } = req.query;

    Projectgood.find({ title: new RegExp(keyword) }, {}).sort({ id: 1 }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "搜索商品列表成功",
                type: 1,
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "搜索商品列表失败",
                type: 0,
                result,
            })
        }
    })

})

router.get("/getGooddetail", (req, res) => {
    const query = req.query;
    const { goodId } = query;
    Projectgood.findOne({ _id: goodId }).then(result => {
        if (result) {
            res.json({
                code: 200,
                type: 1,
                msg: "获取商品详情数据成功",
                result,
            })
        } else {
            res.json({
                code: 100,
                type: 0,
                msg: "获取商品详情数据失败",
                result,
            })
        }

    })

})
router.get("/addShopcar", (req, res) => {

    const query = req.query;
    const { usertel, goodId, goodInfo, count, checked } = query;
    Projectshopingcar.findOne({
        usertel,
        goodId
    }).then(result => {
        if (result) {
            Projectshopingcar.update({
                usertel,
                goodId
            }, {
                    $inc: { count: count * 1 }
                }).then(result => {
                    res.json({
                        code: 200,
                        msg: "购物车数量更新完成",
                        result,
                    })
                })
        } else {
            Projectshopingcar.insertMany({
                usertel,
                goodId,
                goodInfo,
                count: count * 1,
                time: Date.now(),
                checked,
            }).then(result => {
                res.json({
                    code: 200,
                    msg: "加入购物车成功",
                    result
                })
            })
        }
    })
})

//获取商品信息
router.get("/getGoodInfo", (req, res) => {
    const { usertel } = req.query;
    Projectshopingcar.find({ usertel }, {}).sort({ time: -1 }).then(result => {
        if (result) {
            let total = 0;
            result.forEach(item => {
                total += item.count * 1;
            })
            console.log(result);
            res.json({
                code: 200,
                msg: "获取购物车信息成功", carList: result,
                total
            })
        } else {
            res.json({
                code: 100,
                msg: "获取购物车信息成功",
                carList: result,
                total
            })
        }
    })

})

router.get("/deleteGood", (req, res) => {
    const { goodId } = req.query;
    Projectshopingcar.deleteMany(
        {
            $or: [
                { goodId },
            ]
        },


    ).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "删除商品成功",
                result,
                type: 1,
            })
        } else {
            res.json({
                code: 100,
                msg: "删除商品失败",
                result,
                type: 0
            })
        }

    })
})

//商品数量增加和减少

router.get("/changeGoodCount", (req, res) => {
    const { goodId, num } = req.query;
    //通过num的值决定是增加还是减少
    Projectshopingcar.updateMany(
        { goodId },
        {
            $inc: {
                count: num * 1
            }
        }).then(result => {
            if (result) {
                res.json({
                    code: 200,
                    msg: "商品数量增加成功",
                    result,
                    type: 1
                })

            } else {
                res.json({
                    code: 100,
                    msg: "商品数量增加失败",
                    result,
                    type: 0

                })
            }

        })






})
//删除多个商品
//删除商品

// db.users.remove(
//     {
//         $or: [{
//             username: "tuantuan",
//         }, {
//             username: "lihua"
//         }]
//     }
// )//remove  功能和作用与deleteMany类似,可以同时删除多个
router.get("/deleteMany", (req, res) => {
    let { goodId } = req.query;
    console.log(goodId)
    goodId = JSON.parse(goodId)
    console.log(goodId)
    Projectshopingcar.remove({
        $or: goodId
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "删除多个数据成功",
                type: 1,
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "删除多个数据失败",
                type: 0,
                result,
            })
        }

    })


})

//查找地址
router.get("/findAddress", (req, res) => {
    let { usertel } = req.query;
    Addressdetail.find({ usertel }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "查找地址成功",
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "查找地址失败",
                result,
            })
        }

    })

})
//新增地址

router.get("/addAddress", (req, res) => {

    const { usertel, name, tel, address } = req.query;

    Addressdetail.insertMany({ usertel, name, tel, address }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "新增地址成功",
                result,
            })
        } else {
            res.json({
                code: 100,
                msg: "新增地址失败",
                result,
            })
        }
    })

})
    //修改地址
    router.get("/editAddress", (req, res) => {
        const { usertel, name, tel, address, _id } = req.query;
        Addressdetail.find({ _id }).then(result => {
            if (result) {
                Addressdetail.updateMany({ _id }, {
                    $set: {
                        usertel,
                        name,
                        tel,
                        address,
                    }
                }).then(result => {
                    if (result) {
                        res.json({
                            code: 200,
                            msg: "更新数据成功",
                            type: 1,
                            result
                        })
                    } else {
                        res.json({
                            code: 100,
                            msg: "更新数据失败",
                            type: 0,
                            result
                        })
                    }
                })

            } else {
                res.json({
                    code: 100,
                    mgs: "没有数据可以更新"
                })
            }
        })
    })



//删除地址
router.get("/deleteAddress",(req,res)=>{
    const {_id} =req.query;
    Addressdetail.deleteMany({_id}).then(result=>{
        if(result){
            res.json({
                code:200,
                msg:"删除地址成功",
                type:1,
                result,
            })
        }else{
            res.json({
                code:100,
                msg:"删除地址失败",
                type:0,
                result,
            })
        }
        
    })

})
module.exports = router;