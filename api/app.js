
const express = require('express');
const port = 1906;
const hostname = "0.0.0.0";
const app = express();
// const server = http.createServer(app);

const connection = require("./utils/db");

//配置 https 请求

const http = require("http");
const https = require("https");
var fs = require("fs");
// 第一步：https
var privateKey = fs.readFileSync('./cert/fk.key', 'utf8');
var certificate = fs.readFileSync('./cert/fk.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app);

const cors = require('cors');
app.use(cors()) // cors 解决跨域问题  jsonp 代理 
app.use(express.json()); // from-data 
app.use(express.urlencoded({ extended: false }));// x-www-form-urlencoded  获取 POST 请求 获取 参数数据
//有这两条，才能获得 post 请求方法中的req.body
app.use(express.static("public"));   // 设置 public 为静态资源目录  
app.get('/index', (req, res) => {
    res.json({
        code: 200,
        msg: "查看 服务器信息",
        query: req.query,
        headers: req.headers,
    })
})

//使用session 模块
const session = require("express-session");
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: { maxAge: 60 * 60 * 1000 },//sesiion 记录数据保存的时长，单位为ms
    resave: false,
    saveUninitialized: true
}))

// 导入 checkToken 中间件
const { checkToken } = require('./utils');
// app.use(checkToken);

const vue = require("./vue");
app.use('/vue', vue);

const project = require("./project");
app.use('/project', project);

const react = require("./react");
app.use("/react", react);


const wx = require("./wx");
app.use("/wx", wx);

// server.listen(port, hostname, () => {
//     console.log(`my api server is running at http://${hostname}:${port}`)
// })
httpsServer.listen(port, hostname, () => {
    console.log(`my api server is running  at https://${hostname}:${port}`)
})
