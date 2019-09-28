
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const movie_schema = new Schema({
    genres: Array,
    rating: Object,
    title: String,
    casts: Array,
    directors: Array,
    images: Object,
    year: String,
    id: String
})
exports.Movie = mongoose.model('movie', movie_schema);


const user_schema = new Schema({
    id: String,
    username: String,
    nickname: String,
    password: String,
    dbpassword: String,
    usertel: String,
    avatar: String,
})
exports.User = mongoose.model('user', user_schema);

const goods_schema = new Schema({
    name: String,
    price: Number,
    discount: Number,
    img: String,
    type: Object
})
exports.Good = mongoose.model("good", goods_schema);


const shopcars_schema = new Schema({
    username: String,
    goodId: String,
    goodInfo: Object,
    count: Number,
    time: Date,
})
exports.Shopcar = mongoose.model("shopcar", shopcars_schema);

const projectgoods_schema = new Schema({
    title: String,
    img: String,
    price: Number,
    text: String,
    label: String,
    wishes: String,
    discount: String,
    type: String,
})
exports.Projectgood = mongoose.model("projectgood", projectgoods_schema);

const projectshopingcar_schema = new Schema({
    usertel: String,
    goodId: String,
    goodInfo: Object,
    count: Number,
    time: Date,
    checked: Boolean,
})
exports.Projectshopingcar = mongoose.model("projectshopingcar", projectshopingcar_schema);

const addressdetails_schema = new Schema({
    usertel: String,
    name: String,
    tel: String,
    address: String,
    isDefault: Boolean,
})
exports.Addressdetail = mongoose.model("addressdetai", addressdetails_schema);

const reactComment_schema = new Schema({

    title: String,
    content: String,
})
exports.ReactComment = mongoose.model("reactcomment", reactComment_schema)

const code_schema = new Schema({
    mobile: Number,
    code: Number,
    time: Date
})

exports.Code = mongoose.model("code", code_schema);

const userinfo_schema = new Schema({
    mobile: Number,
    pic: String,
})

exports.UserInfo = mongoose.model("userinfo", userinfo_schema);


const staff_schema = new Schema({
    name: String,
    sex: String,
    entrytime: String,
    salary: String,
    part: String,
    tel: Number,
    age: String,
    education: String,
    state: Boolean,
    avatar: String,
    ismanager:Boolean,
    code: String,
    time:String,
})

exports.Staff = mongoose.model("staffs", staff_schema)

const dimission_schema = new Schema({
    name: String,
    entrytime: String,
    reason: String,
    dimissiontime: String,
    state: Boolean,
})

exports.Dimission = mongoose.model("dimission", dimission_schema)

const ask_schema = new Schema({

    name: String,
    starttime: String,
    endtime: String,
    reason: String,
    state: Boolean,
})

exports.Ask = mongoose.model("asks", ask_schema);


// 管理员账号

const manager_schema = new Schema({
    manager: String,
    pwd: String,
    ismanager: Boolean,
})

exports.Manager = mongoose.model("manager", manager_schema);


//wx mpvue 写微信小程序 数据
const photos_schema =new Schema ({
    userInfo:Object,
    name:String,
    viewcount:Number,
    like:Number,
    photo:Array,
    content:String,
    time:String,
})

exports.Photos = mongoose.model("photos",photos_schema);



