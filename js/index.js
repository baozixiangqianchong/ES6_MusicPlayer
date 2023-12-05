//导入对应的页面初始化函数
import { homePage } from "./home/home.js";
import { recommendListPage } from "./recommendList/recommendList.js";
import { reactive } from "./util/reactive.js";
//导入hash信息提取函数
import { getRouteroptions } from "./util/util.js";

//路由表
const routers = [
    {
        name: "home",
        path: "/home",
        component: homePage
    },
    {
        name: "recommendList",
        path: "/recommendList",
        component: recommendListPage,
    }
];

// let hash;

function changeComponent() {
    let options = getRouteroptions(hashProxy.hash);
    const [{ component, name }] = routers.filter(
        (router) => router.name == options.name
    );

    component(options);
    document.querySelector("#header-title").innerHTML = name;
}

window.addEventListener("hashchange", () => {
    // hash = window.location.hash;
    // changeComponent();
    hashProxy.hash = window.location.hash;
});
// 监听页面 load和hashchange 事件，事件触发后对代理对象赋值
window.addEventListener("load", () => {
    // const script = document.createElement("SCRIPT");
    // const script1 = document.createElement("SCRIPT");

    // script.src = "./js/home/home.js";
    // script1.src = "./js/home/carousel.js";

    // script.setAttribute("type", "module");
    // document.querySelector("body").appendChild(script)
    // script1.setAttribute("type", "module");
    // document.querySelector("body").appendChild(script1)

    // hash = window.location.hash;
    // changeComponent();
    hashProxy.hash = window.location.hash;
})

//数据响应式执行函数
let effective = () => changeComponent();
// 数据响应式处理
export const hashProxy = reactive(
    {
        hash: ""
    },
    effective
)