//导入对应的页面初始化函数
import { homePage } from "./home/home.js";
import { recommendListPage } from "./recommendList/recommendList.js";
import { reactive } from "./util/reactive.js";
//导入hash信息提取函数
import { getRouteroptions } from "./util/util.js";

import { initPlayerControl, initPlayerEvent } from './home/control.js'
import { playerPage } from "./player/player.js";

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
    }, {
        name: 'player',
        path: '/player',
        component: playerPage
    }
];

// let hash;

function changeComponent() {
    let options = getRouteroptions(hashProxy.hash);
    console.log(routers, "routers");
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
    hashProxy.hash = window.location.hash;
    initcontrol();
})

function initcontrol() {
    //初始化的时候加载歌曲
    initPlayerControl();
    //绑定底部控制栏的事件
    initPlayerEvent();
}

//数据响应式执行函数
let effective = () => changeComponent();
// 数据响应式处理
export const hashProxy = reactive(
    {
        hash: ""
    },
    effective
)