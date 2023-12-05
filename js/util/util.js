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