const carouselControl = `
<button class="carousel-control carousel-control-left carousel-control-hover>
<svg class="icon" aria-hidden="true">
     <use xlink:href="#icon-xiangzuojiantou"></use>
       </svg>
</button>
<button class="carousel-control carousel-control-right carousel-control-hover>
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xiangyoujiantou"></use>
     </svg>
</button>
`
//轮播图配置
const carousel = {
    data: [],//轮播图数据
    currentIndex: 0,//轮播图当前切换的画面
    times: 6000,//轮播图多少时间切换画面
    animationTimes: 0.1,//轮播图动画持续时间，单位
    autoCycleTimer: new Set(),//如果在切换动画，无法进行切换画面
}

export function carouselRender(data) {
    // 初始化轮播图
    let carouselItem = "",
        carouselIndicatorsLi = "";
    const wrapper = document.querySelector(".carousel-wrapper");
    let { width = 0 } = wrapper.getBoundingClientRect()//得到图片的宽高
    //动态生成轮播图
    data.forEach((item, index) => {
        //指示器激活选中判断
        let isActive = carousel.currentIndex == index ? "active" : "";
        // 动态生成轮播图图片，并给每一张图片加上偏移量和动画效果
        carouselItem += `<div class="carousel-item ${"#" + index}" 
        style='transform:translateX(${width * (index - 1)}px);transition-duration:${carousel.animationTimes}s'>
            <img src="${item.pic}" alt="">
        </div>`;
        // 动态生成轮播图指示器
        carouselIndicatorsLi += `
            <li data-slide-to="${index}" class="carousel-indicators-li ${isActive}"></li>
        `
    });
    //通过模板字符串，按照home.html中的html结构进行排布
    const carouselContainer = `
        <div class="carousel-container" style="transition:transform ${carousel.animationTimes}s">
             ${carouselControl}
            <div class="carousel-content">
            ${carouselItem}
            </div>
        </div>
    `;
    const carouselIndicators = `
    <ul class="carousel-indicators d-flex">
        ${carouselIndicatorsLi}
    </ul>
    `
    //将得到的字符串通过 innerHTML 插入到轮播图盒子
    wrapper.innerHTML = (carouselContainer + carouselIndicators);
    //通过定时器开启自动轮播，每过一段时间调用getNext方法
    let timer = setInterval(getNext, carousel.times);
    carousel.autoCycleTimer.add(timer);
}

function getPrev() {
    //获取到轮播图每一项的图片容器
    const carouselItems = document.getElementsByClassName('carousel-item');
    let length = carouselItems.length;
    //当后退到第一张时，重置为总长度，防止index变为负数导致bug
    carousel.currentIndex == 0 && (carousel.currentIndex = length);
    //每调用一次 getPrev，序号-1
    let index = carousel.currentIndex = --carousel.currentIndex % length;
    //将类数组转变为数组
    let newArr = Array.from(carouselItems);
    //计算得到轮播图每一项的图片容器的宽度
    let { width = 0 } = getElementRect(carouselItems[0]);
    //轮播图数组移动
    newArr = [...newArr.slice(index), ...newArr.slice(0, index)];
    newArr.forEach((item, i) => {
        //轮播图数组第一项移动到最后一项，其他项顺序）
        if (i == 0) {
            item.style.opacity = 0;
            item.style.transform = `translatex(${width * (length - 1)}px)`;
        } else {
        }
        item.style.opacity = 1;
        item.style.transform = `translatex(${width * (i - 1)}px)`;

    });
    //指示器移动
    indicatorsRender(index);
}

function getNext() {
    const carouselItems = document.getElementsByClassName('carousel-item');
    let length = carouselItems.length;
    let index = carousel.currentIndex = ++carousel.currentIndex % length;
    let newArr = Array.from(carouselItems);
    let lens = newArr.length;
    let { width = 0 } = getElementRect(carouselItems[0]);
    //当index为0时轮播图数组不做处理，>o时进行数组每一项移动
    index != 0 && (newArr = [...newArr.slice(-index, lens), ...newArr.slice(0, lens - index)]);

    newArr.forEach((item, i) => {

        if (i == 0) {
            // 因为向右移动，轮播图数组最后一项移动到第一项，其他项顺序不变
            item.style.opacity = 0;
            item.style.transform = `translateX(${-width * (length - 1)}px)`;
        }
        // 往右走i-1个录播的距离
        item.style.transform = `translateX(${width * (i - 2)}px)`;
        item.style.opacity = 1
    })
    indicatorsRender(index)
}

export function indicatorsRender(index) {
    //获取到轮播图每一项的指示器
    const indicators = document.getElementsByClassName('carousel-indicators-li');
    Array.from(indicators).forEach((item, i) => {
        if (index == i) {
            //当index和指示器下标相同添加active类
            item.setAttribute("class", "carousel-indicators-li active")
        } else {
            item.setAttribute("class", "carousel-indicators-li")
        }
    })
}
function getElementRect(ele) {
    return ele.getBoundingClientRect();
}
import Ajax from "../service/ajax.js";

Ajax({
    url: "/homepage/block/page",
}).then((res) => {
    // constrecommendData=[...res.data.blocks[1].creatives];
    // recommendRender(recommendData);
    // 获取推荐歌曲
    carousel.data = []
    //  res.data.blocks[0].extInfo.banners;
    const a = {
        "bannerId": "hp-vip-updt#t#UnLogin",
        "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
        "exclusive": false,
        "titleColor": "blue",
        "showAdTag": false,
        "targetType": 70000,
        "targetId": 100000128,
        "typeTitle": "新用户限时 还剩6天",
        "url": "orpheus://nm/user/anonymousLogin?scene=NEW_GUEST_BANNER",
        "songFinishStatus": false,
        "logInfo": "{\"rightsAward\":\"homepage_one_day_vip\",\"loginStatus\":\"unLogin\"}"
    }
    const b = {
        "bannerId": "hp-vip-updt#t#UnLogin",
        // "pic": "https://seopic.699pic.com/photo/40008/1320.jpg_wh1200.jpg",
        "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
        "exclusive": false,
        "titleColor": "blue",
        "showAdTag": false,
        "targetType": 70000,
        "targetId": 100000128,
        "typeTitle": "新用户限时 还剩6天",
        "url": "orpheus://nm/user/anonymousLogin?scene=NEW_GUEST_BANNER",
        "songFinishStatus": false,
        "logInfo": "{\"rightsAward\":\"homepage_one_day_vip\",\"loginStatus\":\"unLogin\"}"
    }
    const c = {
        "bannerId": "hp-vip-updt#t#UnLogin",
        // "pic": "https://seopic.699pic.com/photo/40008/1970.jpg_wh1200.jpg",
        "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
        "exclusive": false,
        "titleColor": "blue",
        "showAdTag": false,
        "targetType": 70000,
        "targetId": 100000128,
        "typeTitle": "新用户限时 还剩6天",
        "url": "orpheus://nm/user/anonymousLogin?scene=NEW_GUEST_BANNER",
        "songFinishStatus": false,
        "logInfo": "{\"rightsAward\":\"homepage_one_day_vip\",\"loginStatus\":\"unLogin\"}"
    }
    carousel.data.push(a)
    carousel.data.push(b)
    carousel.data.push(c)

    //首次渲染轮播图
    carouselRender(carousel.data);
})


import { debounce } from '../util/util.js'

function leftHandle() {
    //左切换箭头事件处理//清空定时器暂停轮播
    clearAllTimer();//切换到前一张
    getPrev();//开启定时器继续轮播，并将定时器加入到定时器保存器中
    let timer = setInterval(getNext, carousel.times);
    carousel.autoCycleTimer.add(timer);
}
function rightHandle() {
    //右切换箭头事件处理
    clearAllTimer();
    getNext();
    let timer = setInterval(getNext, carousel.times);
    carousel.autoCycleTimer.add(timer);
}
// 函数防抖
const leftHandleDebounce = debounce(leftHandle, 500);
const rightHandleDebounce = debounce(rightHandle, 500);
export function initCarouselEvent() {
    const leftControl = document.getElementsByClassName("carousel-control-left");
    const rightControl = document.getElementsByClassName("carousel-control-right");
    const carouselcontainer = document.querySelector(".carousel-container");
    const indicatorsWrapper = document.querySelector(".carousel-indicators");
    //左右箭头切换事件
    leftControl[0].addEventListener("click", leftHandleDebounce);
    rightControl[0].addEventListener("click", rightHandleDebounce);
    //移入移出控制轮播播放事件
    carouselcontainer.addEventListener("mouseenter", () => {
        //移入轮播图通过移除定时器达到轮播图暂停的目的
        clearAllTimer();
    });
    carouselcontainer.addEventListener("mouseleave", () => {
        //移出轮播图通过设置定时器达到开启轮播图轮播的目的
        let timer = setInterval(getNext, carousel.times);
        carousel.autoCycleTimer.add(timer);
    });
    //指示器事件处理函数：通过事件委托到父级容器ul，减少对每个指示器添加事件监听
    indicatorsWrapper.addEventListener("mouseenter",
        (e) => {
            if (e.target.tagName === "LI") {
                clearAllTimer();
                //得到每个指示器的序号
                const index = e.target.getAttribute("data-slide-to");
                //序号-1，调用getNext会+1，两者相抵消，根据序号指定到对应的图片
                carousel.currentIndex = index - 1;
                getNext();
                let timer = setInterval(getNext, carousel.times);
                carousel.autoCycleTimer.add(timer);
            }
        }, true)

}
function clearAllTimer() {
    if (carousel.autoCycleTimer.size > 0) {
        for (const i of carousel.autoCycleTimer) {
            clearInterval(i)
        }
        carousel.autoCycleTimer.clear()
    }
}

function recommendRender(data) {
    // 获得推荐歌单盒子
    const recommendWrapper = document.querySelector(".recommend-playlist-container");
    let template = "";
    let length = data.length;
    data.forEach((item, index) => {
        template += `<li data-index=${index} class="recommend-playlist-item d-flex flex-column}" style="width:${98 / length}%">
            <div class="recommend-playlist-cover">
                <a href='#/recommendList/:${item.creativeId}'>
                    <img src="${item.uiElement.image.imageUrl} alt="">
                        <svg class="recommend-playlist-icon icon" aria-hidden="true">
                            <use xlink:href="#icon-hanhan-01-011"></use>
                        </svg>
                </a>
            </div>
            <div class="recommend-playlist-title multi-text-omitted">
                ${item.uiElement.mainTitle.title}
            </div>
        </li>`
    })
    recommendWrapper.innerHTML = template;
}

function initRecommendEvent() {
    //动态增加hover类
    const recommendWrapper = document.querySelector(".recommend-playlist-container")
    recommendWrapper.addEventListener("mouseenter",
        (e) => {
            if (e.target.tagName === "LI") {
                e.target.setAttribute("class",
                    "recommend-playlist-item d-flex flex-column hover");
            }
        }, true)
    recommendWrapper.addEventListener("mouseleave",
        (e) => {
            if (e.target.tagName === "LI") {
                e.target.setAttribute("class",
                    "recommend-playlist-item d-flex flex-column")
            }
        }, true)
}
