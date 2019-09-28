const mongoose =require('mongoose');

const port = 27017;

const hostname="0.0.0.0";

const dbName = 1906;

const COON_DB_STR=`mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(COON_DB_STR,{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('connect',()=>{
    console.log("数据库已经连接成功...")
})

module.exports = connection;