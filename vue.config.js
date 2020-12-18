module.exports = {
    // 开发服务器设置
    devServer: {
        // 配置是否自动打开浏览器
        open: true,
        // 设置 npm run serve 启动后的端口号
        port: 3000,
        // 如果你开始了eslint,不要让eslint在页面中遮罩，它错误会在console.log控制台打印
        overlay: false,
        // vue项目代理请求
        proxy: {
            // 规则
            // axios中相对地址开头的字符串  匹配请求uri中的前几位
            // 前缀
            // 自己后端接口，/api/abc/getdata.php       （不允许跨域）
            // 别人的接口：/aliyun/getdata.php      （允许跨域）
            "/api": {
                // 把相对地址中的域名 映射到 目标地址中
                // localhost:3000 => https://api.iynn.cn/film/api/v1/
                target: "https://api.iynn.cn/film/api/v1",
                // 修改host请求的域名为目标域名
                // changeOrigin: false,
                changeOrigin: true,
                // 请求uri和目标uri有一个对应关系
                // 请求/api/login ==> 目标 /v1/api/login
                pathRewrite: {
                    // 剔除刚才添加用于区分是否跨域的“/api”前缀
                    "^/api": "",
                },
            },
        },
    },
};
