window.addEventListener("load", () => {
    // const script = document.createElement("SCRIPT");
    // const script1 = document.createElement("SCRIPT");

    // script.src = "./js/home/home.js";
    // script1.src = "./js/home/carousel.js";

    // script.setAttribute("type", "module");
    // document.querySelector("body").appendChild(script)
    // script1.setAttribute("type", "module");
    // document.querySelector("body").appendChild(script1)

    hash = window.location.hash;
    changeComponent();
})

//导入对应的页面初始化函数
import { homePage } from "./home/home.js";
import { recommendListPage } from "./recommendList/recommendList.js";
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

//导入hash信息提取函数
import { getRouteroptions } from "./util/util.js";
let hash;
function changeComponent() {
    let options = getRouteroptions(hash);
    const [{ component }] = routers.filter(
        (router) => router.name == options.name
    );

    component(options);
    document.querySelector("#header-title").innerHTML = options.name;
}

window.addEventListener("hashchange", () => {
    hash = window.location.hash;
    changeComponent();
});