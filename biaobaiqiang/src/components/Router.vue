<script>
    import Error404 from "@/components/Error404";
    import Profile from "@/components/individualPanel/Profile";
    import App from "@/components/index/App";
    import Login from "@/components/login/Login";
    import Edit from "@/components/individualPanel/Edit";

    const routes = [
        {
            path: "/",
            name: "首页",
            component: App,
            meta: {
                rule: 0
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                rule: 0
            }
        },
        {
            path: "/sign",
            component: Login,
            meta: {
                rule: 0
            }
        },
        {
            path: "/profile",
            component: Profile,
            meta: {
                rule: 1
            }
        },
        {
            path: "/edit",
            component: Edit,
            meta: {
                rule: 1
            }
        },
        {
            path: "*",
            component: Error404,
            meta: {
                rule: 0
            }
        }


    ]

    function addRouter(context) {
        // console.log(context.$cookies.get("isLogin") === "true")

        let arr=[]
        if(context.$cookies.get("user")!==null){
            for (let i = 0; i <routes.length ; i++) {
                if(routes[i].meta.rule<=1){
                    arr.push(routes[i])
                }
            }
        }else {
            console.log("未登录")
            for (let i = 0; i <routes.length ; i++) {
                if(routes[i].meta.rule===0){
                    arr.push(routes[i])
                }
            }
        }
        context.$router.options.routes.length=0
        for (let i = 0; i <arr.length ; i++) {
            context.$router.options.routes.push(arr[i])
        }
        context.$router.addRoutes(context.$router.options.routes)
        // console.log(arr)
        // console.log(context.$router)
    }



    export default {
        addRouter,
        routes

    }
</script>
