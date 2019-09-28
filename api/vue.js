

const express = require("express");
const router = express.Router();

const {Movie,User,Good,Shopcar} = require("./utils/schema");

const Mock = require("mockjs");

const {keys,aesEncrypt,aesDecrypt} = require("./utils");

router.get("/index",(req,res)=>{
    res.send("这是一个 vue 项目的 路由接口")
});


router.get("/movie",(req,res)=>{
    const {
        limit 
    } = req.query;
    Movie.find({},{}).limit(parseInt(limit)).sort({_id:-1}).then(result=>{
        res.json({
            code:200,
            msg:"获取电影数据成功",
            result
        })
    })  
})

const Random = Mock.Random;

router.get("/mock/data",(req,res)=>{
    var list = [];
    for(var i = 0;i<200;i++){
        let obj =  {
            uid:Random.id(), 
            title:Random.csentence(5,28),
            city:Random.city(),
            names:Random.cname(),
            pic:Random.image('200x100', '#02adea', 'wuhan1906'),
            time:Random.date('yyyy-MM-dd') + " " + Random.time()
        }
        list.push(obj)
    }
    res.json({
        code:200,
        msg:'获取mock数据成功',
        result:list
    })
})

router.post("/register",(req,res)=>{
    const body = req.body;
    console.log(req.body);
    
    User.findOne({
        $or:[
            {
                username:body.username,
            },
            {
                usertel:body.usertel
            }
        ]
    },{}).then(result=>{
        console.log(result)
        if(result){
            res.json({
                code:200,
                msg:"注册失败,用户名或者手机号已经存在",
                type:0
            })
        }else{
            User.insertMany(body).then(result=>{
                res.json({
                    code:200,
                    msg:"注册成功...",
                    type:1
                })
            })
        }
    })
})


router.post("/login",(req,res)=>{
    const body = req.body;
    console.log(body);
    User.findOne({
        $or:[
            {
                username:body.keys,
            },
            {
                mobile:body.keys,
            }
        ]
    },{}).then(result=>{
        if(result){
            if(result.password==body.password){
                // token    发送给前端  
                // session  后端 
                console.log(req.session);
                
                const token = aesEncrypt(result.username,keys);
                req.session.token = token; 
                
                res.json({
                    code:200,
                    msg:"登录成功",
                    token,
                    type:1
                })
            }else{
                res.json({
                    code:200,
                    msg:"密码错误",
                    type:0
                })
            }
        }else{
            res.json({
                code:200,
                msg:"用户名或者手机号不存在",
                type:0
            })
        }
    })
    
})
//上传头像 
const multer = require("multer");
//导入 multer 模块
const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./public/avatar");
            //设置 仓库，放置上传的图片的目录为./public/avatar
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+'wh'+file.originalname)
        }//原始文件名=> originalname
        //设置上传头像的原始文件名
})
//创建上传对象
const upload = multer({storage}).any();

//上传头像
router.post("/uploadAvatar",upload,(req,res)=>{
    var pic = req.files[0].path;

    var username = aesDecrypt(req.session.token,keys);
    //通过update 功能在数据库中更新头像数据，
    User.updateOne({
        username
    },{
        $set:{
            avatar:pic
        }
    }).then(result=>{
        res.json({
            code:200,
            msg:"头像上传成功",
            pic,
            result
        })
    })

})
//配置 路由通过用户名查询该用户是否 有头像
// 根据result 进行不同的操作
router.post("/getavatar",(req,res)=>{
    const {username} = req.body;
    User.findOne({
        username  
    }).then(result=>{
        if(result.avatar){
            res.json({
                code:200,
                msg:"获取个人头像成功",
                type:1,
                avatar:result.avatar
            })
        }else{
            res.json({
                code:200,
                msg:"个人头像尚未上传",
                type:0,
                avatar:null
            })
        }
    })

})


// 商品操作  
// 查询
router.get("/getGoods",(req,res)=>{
    let {limit,keyword} = req.query;
    limit =limit*1||0;
    var obj ={};
    if(keyword){//如果 有关键字就搜索关键字 匹配的内容 ，没有就为空，搜索全部
        obj={
            $or:[
                {name:new RegExp(keyword)},
                {"type.text":new RegExp(keyword)}
            ]
        },{}
    }
    Good.find(obj,{}).sort({_id:-1}).limit(limit).then(result=>{
        res.json({
            code:200,
            msg:"获取商品数据成功",
            result,
        })
    })

})
// 获取商品 导航/分类内容
router.get("/getGoodTypes",(req,res)=>{
    Good.distinct("type").then(result=>{//通过 去重查询到good的所有type种类
        res.json({
            code:200,
            msg:"获取商品分类成功",
            result,
        })
    })
})

//商品 详情 路由，通过商品_id 获得单个商品的信息
router.get("/getGoodDetail",(req,res)=>{
    const {
        goodId
    }=req.query;
    console.log(goodId);
    Good.findOne({
       id:goodId,
    }).then(result=>{
        console.log(result)
        res.json({
            code:200,
            msg:"获取商品详情数据成功",
            result
        })
    })
})



// 删除
// 修改
// 添加  
//购物车 逻辑 有则update数量增加，没有则新增


router.get("/addShopcar",(req,res)=>{
    const {
        username,
        goodId,
        goodInfo,
        count,
    }=req.query;
   Shopcar.findOne({
       username,
       goodId
   }).then(result=>{
       //数量累加 $inc
       if(result){
           Shopcar.update({
               username,
               goodId
           },{
               $inc:{
                   count:count*1,
               }
           }).then(result=>{
               res.json({
                   code:200,
                   msg:'购物车数量更新完成',
                   result,
               })
           })
       }else{
           //直接新增 insert
           Shopcar.insertMany({
               username,
               goodId,
               goodInfo,
               count:count*1,
               time:Date.now()
           }).then(result=>{
               res.json({
                   code:200,
                   msg:'购物车新增完成',
                   result,
               })
           })
       }
   })
})
//2.查询购物商品信息，包括商品总数量
router.get("/getShopcarInfo",(req,res)=>{
    const {
        username
    }=req.query;
    console.log(username)

    Shopcar.find({username},{}).sort({time:-1}).then(result=>{
        if(result){
            console.log(result)

            let total =0;
            result.forEach(item=>{
                total+=item.count*1;
            })

            res.json({
                code:200,
                msg:'获取购物车信息成功',
                carList:result,
                total
            })
        }else{
            res.json({
                code:100,
                msg:'购物车空空如也',
                carList:null
            })
        }
    })


})

//购物车删除功能
router.get("/delGood",(req,res)=>{
    const {goodId} =req.query;
    Shopcar.deleteMany({goodId}).then(result=>{
        if(result){
            console.log(result)
        res.json({
            code:200,
            msg:"删除成功",
            result,
            type:1,
        })
    }else{
        res.json({
            code:100,
            msg:"删除失败",
            result,
            type:1
        }) 
    }
    })

})


module.exports = router;