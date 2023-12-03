import { getBannerList } from "../service/ajax.js";
const result = await getBannerList();
const carouselData = []
// result.data.blocks[0].extInfo.banners;

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
    "pic": "https://seopic.699pic.com/photo/40008/1320.jpg_wh1200.jpg",
    // "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
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
    "pic": "https://seopic.699pic.com/photo/40008/1970.jpg_wh1200.jpg",
    // "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
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

carouselData.push(a)
carouselData.push(b)
carouselData.push(c)

const homePageTemplate = `
<div class="w">
    <div class="carousel-wrapper">
    <!-- 轮播图结构 -->
        <div class="carousel-container">
    
            <!-- 切换箭头 -->
            <!--轮播图图片需要动态生成  -->
            <!-- 指示器 -->
           
        </div>
    </div>
    <div class="recommend-playlist">
    <!-- 推荐歌单结构 -->
        <h3 class="recommend-playlist-header">
            推荐歌单
            <svg class="icon" aria-hidden="'true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
        </h3>
        <div
            class="recommend-playlist-container d-flex justify-content-between"
        >
            <!-- 推荐歌单需要动态生成 -->

        </div>
    </div>
</div>`;

//首页初始化
document.querySelector("#app").innerHTML = homePageTemplate;

import { carouselRender, initCarouselEvent } from "./carousel.js";
//首次渲染轮播图
carouselRender(carouselData);
//轮播图事件绑定
initCarouselEvent();