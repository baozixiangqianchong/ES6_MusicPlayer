// 公用函数
export function debounce(fn, times, isImmediately = true) {
    // 防抖函数
    let timer = null;
    let cb;
    if (isImmediately) {
        cb = function (...args) {
            timer && clearTimeout(timer);
            let isDone = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, timer);
            isDone && fn.apply(this, args);
        }
    } else {
        cb = function (...args) {
            const content = this;
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(content, args);
            }, times);
        };
    }
    return cb;
}
export function getRouteroptions(hash) {
    const options = {
        //路由配置选项
        name: "",
        params: "",
        query: ""
    }
    if (!hash || hash == "#home") {
        options.name = "home";
    } else {
        //提取name params query信息
        //     0    1      2
        //<a href='#/name/:params?query1=value1?query2=value2'></a>
        try {
            const routerArr = hash.slice(1).split("/");
            options.name = routerArr[1];
            const paramsArr = routerArr[2].split("?");
            options.params = paramsArr[0].slice(1);
            options.query = paramsArr.slice(1);
        } catch (error) {
            options.name = "404";
        }
    }
    return options
}

/**
 * @description:日期格式化函数XXXX-XX-XX
 * @param{*}time
 * @return{*}
 */
export function formatCreateTime(time) {
    let now = new Date(time);
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    return `${year} - ${month} - ${day}`
}

// export function blur(src) {
//     //设置canvas 画布
//     const canvas = document.querySelector("#canvas");
//     canvas.width = 100;
//     canvas.height = 100;
//     // 获得canvas上下文
//     const ctx = canvas·getcontext("2d");
//     //Image（）函数将会创建一个新的HTMLImageElement实例。它的功能等价于document.createElement('img')
//     const img = new Image();
//     img.src = src;
//     //添加属性crossorigin，增加img元素的跨域支持，设置值为anonymous，表示对此元素的
//     img.setAttribute("crossorigin", "anonymous");
//     //当img元素加载完成时执行
//     img.onload = function () {
//         const { width, height } = canvas;
//         //图片裁剪操作
//         ctx.drawImage(img, 0, 0, img.width, img.height, 5, 5, width, height);
//     }
// }
// const src = "https://tse1-mm.cn.bing.net/th?id=0IP.M2dHJdmuluNPhu0DWuMLIKgHaEo&w=170&h=106&c=8&rs=1&g1t=90&dpr=1.25&pid=3.1&rm=2"
// blur(src)