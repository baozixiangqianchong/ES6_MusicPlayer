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

export function blur(ele, src) {
    //设置canvas 画布
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    // 获得canvas上下文
    const ctx = canvas.getContext("2d");
    //Image（）函数将会创建一个新的HTMLImageElement实例。它的功能等价于document.createElement('img')
    const img = new Image();
    img.src = src;
    //添加属性crossorigin，增加img元素的跨域支持，设置值为anonymous，表示对此元素的
    img.setAttribute("crossorigin", "anonymous");
    //当img元素加载完成时执行
    img.onload = function () {
        const { width, height } = canvas;
        //图片裁剪操作
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
        //将图片转变为base64的编码格式
        let imgSrc = canvas.toDataURL();
        if (ele) {
            //设置背景图片
            ele.style.backgroundImage = "url(" + imgSrc + ")";
        }
    }
}

// const imgBox = document.querySelector(".player-background-image");
// const src = "https://tse1-mm.cn.bing.net/th?id=0IP.M2dHJdmuluNPhu0DWuMLIKgHaEo&w=170&h=106&c=8&rs=1&g1t=90&dpr=1.25&pid=3.1&rm=2"
// blur(imgBox, src)

/**
 * 原来的字符串格式：[00:16.64]白鸽在长椅下\n[00:20.41]等来了一只乌鸦\n
 * 转变后的对象数组格式[{time：16.64，lyric："白鸽在长椅下"},{time：20.41,yric："等来了一只乌鸦"}]
 */
/**
 * @description：格式化歌词格式
 * @param {*} lyricStr
 * @return {*}
 */
export function formatSonglyric(lyricStr) {
    if (typeof lyricStr != "string")
        return "歌词加载失败";
    const tempArr = lyricStr.split("\n");
    const lyric = tempArr.map((v, i) => {
        let reg = /^\[(\w*:\w*.?\w*)\](.*)/g;
        let lyricObj = {};
        if (reg.test(v)) {
            let timeStr = RegExp.$1;
            let second = timeStr.split(":").reduce(
                (accumulator, curValue) => 60 * Number(accumulator) + Number(curValue)
            ).toFixed(2);
            lyricObj.time = Number(second);
            lyricObj.lyric = RegExp.$2;
        }
        return lyricObj;
    })
    return lyric;
}

/**
 * @description：添加歌曲列表去除重复
 * @param {*}songList需要添加的列表
 * @return {*}
 */

export function songListFilter(songList) {
    let songListArr = JSON.parse(window.localStorage.getItem("songList")) || [];
    let addToList = songList.map((item) => ({
        id: item.id,
        name: item.name,
        ar: item.ar,
        dt: item.dt,
    }));
    //去重
    songListArr = [...addToList, ...songListArr];
    const tempMap = new Map();
    songListArr.forEach((item) => {
        // 通过此方法达到的 Map 对象格式为{item.id->item},key值唯一性!
        tempMap.has(item.id) && tempMap.set(item.id, item);
    });
    //限制数量
    const limitArr = [...tempMap.values()];
    limitArr.length > 100 && (limitArr = limitArr.slice(limitArr.length - 100));
    // return limitArr;
    return songListArr
}
//将时间转换为 mm:ss
export function formatSongTime(timestamp) {
    return `${Math.floor(timestamp / 1000 / 60)}:${Math.round((timestamp / 1000) % 60)}`;
}