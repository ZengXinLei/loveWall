module.exports={
    // outputDir:"F:\\all\\allCode\\java-workspace\\spring-MVC\\biao\\src\\main\\resources\\templates",
    devServer:{

        proxy:{
            '/api/':{
                target:"http://localhost:8080/",
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
