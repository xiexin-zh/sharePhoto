
const express = require("express");

const router = express.Router();

const { ReactComment, Code, UserInfo, Staff, Dimission, Ask, Manager } = require("./utils/schema");

const { getResult } = require("./config");

const { createToken, getMobile, checkToken } = require("./utils/token");

router.get("/index", (req, res) => {

    res.send("这是一个 react 项目 路由接口")
})




//查询 评论
router.get("/getComments", (req, res) => {


    ReactComment.find().then(result => {
        res.json({
            code: 200,
            msg: "获取数据成功",
            result,
        })

    })
})

//删除内容

router.get("/delComment", (req, res) => {
    const query = req.query
    const { did } = query
    // console.log(query)
    console.log(did)

    ReactComment.deleteMany({ _id: did }).then(result => {

        res.json({
            code: 200,
            msg: "删除成功",
            result
        })


    })

})

//新增 评论

router.post("/addComment", (req, res) => {

    const body = req.body;
    ReactComment.insertMany(body).then(result => {

        ReactComment.find().then(result => {
            res.json({
                code: 200,
                msg: "评论增加成功",
                result
            })
        })

    })

})

function getCode() {
    let code = "";
    for (let i = 0; i < 4; i++) {
        var num = Math.floor(Math.random() * 10);
        code += num;
    }
    return code;
}
//获取发送验证码

router.post("/sendCode", (req, res) => {
    const {
        mobile
    } = req.body;
    if (mobile == "") {
        res.json({
            code: 200,
            msg: "请输入手机号"
        })
    }
    const code = getCode();
    console.log(22)
    console.log(code)
    console.log(mobile)

    getResult(code, mobile).then(response => {
        if (response.data.code !== "000000") {
            // db.staffs.updateMany({tel:15241423423},{$set:{code:2000,time:Date.now()}})
            Staff.updateMany(
                {
                    tel: mobile,
                },
                {
                    $set: {
                        code: code,
                        time: Date.now()
                    }
                }).then(result => {
                    console.log(result)
                    res.json({
                        code: 200,
                        msg: "验证码发送成功",
                        param: code,
                        type: 1,
                        mobile,
                        result
                    })
                })
        } else {
            res.json({
                code: 200,
                msg: "验证码请求失败",
                param: code,
                type: 0
            })
        }
    }).catch(err => {
        res.json({
            code: 200,
            msg: "服务器错误",
            type: 0
        })
    })

})

//校验 验证码

router.post("/checkCode", (req, res) => {
    const {
        mobile,
        code
    } = req.body;

    Staff.findOne({
        tel: mobile,
        code
    }).then(result => {
        console.log(11)
        console.log(result)
        if (result) {
            const time = Date.now();
            if (time - result.time < 60 * 1000) {
                const token = createToken(mobile);
                //根据 手机号得到 一个 加密的token
                //在验证通过的时候，随着响应 返回 前端 

                res.json({
                    code: 200,
                    msg: "验证码---验证通过",
                    type: 1,
                    token,
                })
            } else {
                res.json({
                    code: 100,
                    msg: "验证码过期---失效",
                    typw: 0
                })
            }

        } else {
            res.json({
                code: 100,
                msg: "验证码无效",
                type: 0
            })
        }
    })
})

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/avatar");
        //上传的头像的存储的路径
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "wh" + file.originalname)
        //file.originalname ==》上传的图片的原来的名字
        //上传的头像的 新命名 
    }
})

//创建对象

const upload = multer({ storage }).any();

//上传头像
// router.post("/uploadreact", upload, (req, res) => {
//     console.log(req.files[0])
//     //上传的 图片的信息 ，包含 名称路径 等
//     // path 是其中 一个 属性
//     // 指的是 图片 在后台 新路径
//     var pic = req.files[0].path;

//     getMobile(req, res, (mobile) => {
//         UserInfo.findOne({
//             mobile
//         }).then(result => {
//             if (result) {
//                 //如果用户之前上传过图片，就用最新的覆盖之前的图片
//                 UserInfo.updateMany({
//                     mobile
//                 }, {
//                     $set: {
//                         pic
//                     }
//                 })
//             } else {
//                 //没有 就加入数据库
//                 UserInfo.insertMany({
//                     mobile, pic
//                 })
//             }
//             res.json({
//                 msg: "头像上传成功",
//                 code: 200,
//                 mobile,
//                 pic
//             })
//             console.log(mobile)
//         })
//     })

// })

// router.post("/getAvatar", (req, res) => {

//     getMobile(req, res, (mobile) => {

//         UserInfo.findOne({
//             mobile
//         }).then(result => {
//             if (result) {
//                 res.json({
//                     code: 200,
//                     msg: "获取头像成功",
//                     result,
//                     type: 1
//                 })
//             } else {
//                 res.json({
//                     code: 200,
//                     msg: "头像未上传",
//                     type: 0
//                 })
//             }
//         })

//     })

// })

router.get("/getStaff", (req, res) => {

    const { part, keyword } = req.query;
    console.log(part)
    var obj = {};
    if (part) {
        obj = {
            part
        }
    } else if (keyword) {
        obj = {
            name: new RegExp(keyword)
        }
    }
    console.log(obj)
    Staff.find(obj).sort({ _id: -1 }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "获取员工信息成功",
                type: 1,
                result,
            })
        } else {
            res.json({
                code: 500,
                msg: "获取员工信息失败",
                type: 0,
                result,
            })
        }
    })
})
// 管理员 denglu

router.post("/managerlogin", (req, res) => {
    const { manager, pwd } = req.body;
    Manager.findOne({ manager }).then(result => {
        if (result) {
            if (pwd == result.pwd) {
                res.json({
                    code: 200,
                    msg: "管理员登录",
                    type: 1,
                    result,
                })
            } else {
                res.json({
                    code: 500,
                    msg: "密码错误",
                    type: 0,
                    result,
                })
            }
        } else {
            res.json({
                code: 500,
                msg: "输入管理员账号不存在",
                type: 0,
                result,
            })
        }
    })
})






//获取 某提个 员工 信息

router.get("/getOneStaff", (req, res) => {
    const { keyword } = req.query;
    console.log(keyword)
    Staff.findOne({
        $or: [
            {
                name: new RegExp(keyword),
            },
            {
                serial: new RegExp(keyword),
            }
        ]
    },
        {
        }).then(result => {
            if (result) {
                global.staffName = result.name;
                res.json({
                    code: 200,
                    msg: "查询个人档案成功",
                    result,
                    avatar: result.avatar,
                })
            } else {
                res.json({
                    code: 500,
                    msg: "查询个人档案失败",
                    result: [],
                })
            }

        })

})

// 修改 员工信息

router.post("/modificationStaff", (req, res) => {


    const { name, sex, education, age, tel, part, state, entrytime, oldName } = req.body;
    let obj = {};

    if (name && sex && education && age && tel && part && entrytime && oldName) {
        obj.name = name;
        obj.sex = sex;
        obj.education = education;
        obj.age = age;
        obj.tel = tel;
        obj.part = part;
        obj.state = state;
        obj.entrytime = entrytime;
    }
    console.log(obj)
    Staff.updateMany({ name: oldName }, {
        $set: obj
    }).then(result => {
        if (result) {

            Staff.findOne({ name }).then(result => {

                if (result) {
                    console.log(result)
                    res.json({
                        code: 200,
                        msg: "修改员工信息成功",
                        type: 1,
                        result,
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "修改员工信息失败",
                        type: 0,
                        result,
                    })
                }

            })

        } else {
            res.json({
                code: 500,
                msg: "员工信息修改失败",
                type: 0,
                result,
            })
        }
    })
})

router.get("/getPartStaff", (req, res) => {

    const { part } = req.query;
    Staff.find({ part }).then(result => {
        if (result) {
            res.json({
                code: 200,
                type: 1,
                result,
                msg: "获取部分员工信息成功",
            })
        } else {
            res.json({
                code: 500,
                type: 1,
                result,
                msg: "获取部分员工信息失败"
            })
        }
    })

})

//新增 员工

router.get("/addStaff", (req, res) => {

    const { name, sex, age, part, tel, salary, entrytime, state } = req.query;

    var obj = {};
    if (name && sex && age && part && tel && salary && entrytime && state) {
        obj.name = name,
            obj.sex = sex,
            obj.age = age,
            obj.part = part,
            obj.tel = tel,
            obj.salary = salary,
            obj.entrytime = entrytime,
            obj.state = state
    }
    Staff.insertMany(obj).then(result => {

        if (result) {
            Staff.find().then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        msg: "新增员工数据成功",
                        type: 1,
                        result,
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "新增员工数据失败",
                    })
                }
            })

        }

    })
})


//新增离职 申请 名单

router.get("/addDimission", (req, res) => {

    const { name, entrytime, reason, dimissiontime, state } = req.query;

    var obj = {};
    if (name && entrytime && reason && dimissiontime) {
        obj.name = name;
        obj.entrytime = entrytime,
            obj.reason = reason,
            obj.dimissiontime = dimissiontime;
        obj.state = state;
    }
    Dimission.insertMany(obj).then(result => {
        if (result) {
            Dimission.find({}).sort({ _id: -1 }).then(result => {

                if (result) {
                    res.json({
                        code: 200,
                        msg: "新增离职名单成功",
                        type: 1,
                        result,
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "新增离职名单失败",
                        type: 0,
                        result,
                    })
                }
            })
        }
    })
})

//查询 离职 员工 名单

router.get("/searchDimission", (req, res) => {

    Dimission.find().sort({ _id: -1 }).then(result => {

        if (result) {
            res.json({
                code: 200,
                result,
                msg: "查询离职员工名单成功",
                type: 1
            })
        } else {
            res.json({
                code: 500,
                result,
                msg: "查询离职员工名单失败",
                type: 0
            })
        }

    })

})

// 修改离职员工状态

router.get("/updateStaffState", (req, res) => {
    const { name } = req.query;
    console.log(name)
    Dimission.find({ name }).then(result => {
        if (result) {
            console.log(result[0])
            Dimission.updateMany({ name: result[0].name }, {
                $set: {
                    state: true,
                }
            }).then(result => {
                if (result) {
                    Dimission.find().then(result => {
                        if (result) {
                            res.json({
                                code: 200,
                                msg: "离职审批成功",
                                result,
                                type: 1
                            })
                        }
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "审批申请失败",
                        result,
                        type: 0
                    })
                }
            })
        } else {
            res.json({
                code: 500,
                msg: "此员工不存在"
            })
        }
    })
})

//修改 列表 离职 员工 状态

router.get("/updateliststate", (req, res) => {

    const { name } = req.query;

    Dimission.find({ name }).then(result => {

        if (result) {
            Staff.updateMany({ name: result[0].name }, {
                $set: {
                    state: result[0].state
                }
            }).then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        msg: "同步跟新员工信息成功",
                        result,
                        type: 1
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "同步跟新员工信息失败",
                        result,
                        type: 0
                    })
                }
            })
        } else {
            res.json({
                code: 500,
                msg: "同步员工信息失败",
                result,
            })
        }
    })

})

//撤销 离职 申请


router.get("/removeDimission", (req, res) => {
    const { name } = req.query;
    Dimission.find({ name }).then(result => {
        if (result) {
            Dimission.deleteMany({ name: result[0].name }).then(result => {
                if (result) {
                    Dimission.find({}).then({ _id: -1 }).then(result => {
                        if (result) {

                            res.json({
                                code: 200,
                                msg: "撤销申请成功",
                                type: 1,
                                result,
                            })
                        }

                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "撤销申请离职失败",
                        result,
                        type
                    })
                }
            })
        } else {
            res.json({
                code: 500,
                msg: "该员工不存在",
                result
            })
        }
    })



})

// 新增 请假  列表 

router.get("/addAsk", (req, res) => {

    const { name, starttime, endtime, reason, state } = req.query;

    var obj = {};
    if (name && starttime && endtime && reason) {
        obj.name = name;
        obj.starttime = starttime;
        obj.endtime = endtime;
        obj.reason = reason;
        obj.state = state;
    }
    console.log(obj)

    Ask.insertMany(obj).then(result => {

        if (result) {
            res.json({
                code: 200,
                msg: "申请发出成功",
                type: 1,
                result,
            })

        } else {
            res.json({
                code: 500,
                msg: "申请发出失败",
                type: 0,
            })
        }
    })
})

router.get("/getAsk", (req, res) => {

    Ask.find().sort({ _id: -1 }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "获取请假员工数据成功",
                result,
            })
        } else {
            res.json({
                code: 500,
                msg: "获取请假员工数据失败",
                result,
            })
        }

    })


})

//改变 请假 状态

router.get("/updateAskState", (req, res) => {

    const { name } = req.query;
    Ask.updateMany({ name: name }, {
        $set: {
            state: true,
        }
    }).then(result => {
        if (result) {
            Ask.find().sort({ _id: -1 }).then(result => {
                if (result) {
                    res.json({
                        code: 200,
                        result,
                        msg: "请假审批通过",
                    })
                } else {
                    res.json({
                        code: 500,
                        msg: "请假审批未通过",
                    })
                }
            })
        } else {
            res.json({
                code: 500,
                msg: "请假审批未通过",
            })
        }
    })
})

//上传 头像到 数据库

router.post("/uploadAvatar", upload, (req, res) => {

    var pic = req.files[0].path;
    let name = global.staffName;
    console.log(name)

    Staff.find({ name }).then(result => {

        if (result) {

            Staff.updateMany({ name }, {
                $set: {
                    avatar: pic
                }
            }).then(result => {

                if (result) {
                    res.json({
                        code: 200,
                        msg: "头像上传成功",
                        result,
                        type: 1,
                        avatar: pic,
                    })
                }

            })
        } else {
            res.json({
                code: 500,
                msg: "头像上传失败",
                result,
                type: 0
            })
        }


    })

})


// //  上传 头像
// router.post("/uploadreact", upload, (req, res) => {
//     console.log(req.files[0])
//     //上传的 图片的信息 ，包含 名称路径 等
//     // path 是其中 一个 属性
//     // 指的是 图片 在后台 新路径
//     var pic = req.files[0].path;

//     getMobile(req, res, (mobile) => {
//         UserInfo.findOne({
//             mobile
//         }).then(result => {
//             if (result) {
//                 //如果用户之前上传过图片，就用最新的覆盖之前的图片
//                 UserInfo.updateMany({
//                     mobile
//                 }, {
//                     $set: {
//                         pic
//                     }
//                 })
//             } else {
//                 //没有 就加入数据库
//                 UserInfo.insertMany({
//                     mobile, pic
//                 })
//             }
//             res.json({
//                 msg: "头像上传成功",
//                 code: 200,
//                 mobile,
//                 pic
//             })
//             console.log(mobile)
//         })
//     })

// })
// 获取 数据 库 原本 图片

router.post("/getImage", (req, res) => {

    let { name } = req.body;

    Staff.findOne({
        name
    }).then(result => {
        console.log(result)
        if (result) {

            res.json({
                code: 200,
                msg: "获取头像成功",
                result,
                type: 1,
                avatar: result.avatar,
            })
        } else {
            res.json({
                code: 200,
                msg: "未找到头像",
                type: 0
            })
        }
    })
})

// router.post("/getAvatar", (req, res) => {

//     getMobile(req, res, (mobile) => {

//         UserInfo.findOne({
//             mobile
//         }).then(result => {
//             if (result) {
//                 res.json({
//                     code: 200,
//                     msg: "获取头像成功",
//                     result,
//                     type: 1
//                 })
//             } else {
//                 res.json({
//                     code: 200,
//                     msg: "头像未上传",
//                     type: 0
//                 })
//             }
//         })

//     })

// })







module.exports = router;