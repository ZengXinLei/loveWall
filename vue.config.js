module.exports={
    // outputDir:"F:\\all\\allCode\\java-workspace\\spring-MVC\\biao\\src\\main\\resources\\templates",
    outputDir:"F:\\all\\allCode\\vue\\loveWall\\dist",
    devServer:{
        port:80,
        proxy:{
            '/api/':{
                target:"http://miluyiguan:8080/",
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                    "^/api/": ""
                }
            }
        }
    },
    // pages:{
    //     login:{
    //         entry:"src/js/login.js"
    //     },
    //     index:"src/main.js"
    // }
}
