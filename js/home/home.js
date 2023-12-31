//请求数据
import { getBannerList } from "../service/ajax.js";

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
        <div class="recommend-playlist-container d-flex justify-content-between">
            <!-- 推荐歌单需要动态生成 -->
        </div>
    </div>
</div>`;

import { carouselRender, initCarouselEvent, initRecommendEvent, recommendRender } from "./carousel.js";
export async function homePage() {
    //首页初始化
    document.querySelector("#app").innerHTML = homePageTemplate;

    const result = await getBannerList();
    //轮播图数据
    const carouselData = result.data.blocks[0].extInfo.banners;
    //推荐歌单
    const recommendData = [...result.data.blocks[2].creatives];

    // const a = {
    //     "bannerId": "hp-vip-updt#t#UnLogin",
    //     "pic": "https://seopic.699pic.com/photo/40008/5974.jpg_wh1200.jpg",
    //     "exclusive": false,
    //     "titleColor": "blue",
    //     "showAdTag": false,
    //     "targetType": 70000,
    //     "targetId": 100000128,
    //     "typeTitle": "新用户限时 还剩6天",
    //     "url": "orpheus://nm/user/anonymousLogin?scene=NEW_GUEST_BANNER",
    //     "songFinishStatus": false,
    //     "logInfo": "{\"rightsAward\":\"homepage_one_day_vip\",\"loginStatus\":\"unLogin\"}"
    // }
    // carouselData.push(a)

    //首次渲染轮播图
    carouselRender(carouselData);
    //轮播图事件绑定
    initCarouselEvent();
    //渲染推荐歌单 
    recommendRender(recommendData);
    // 初始化页面事件
    initRecommendEvent()
}
