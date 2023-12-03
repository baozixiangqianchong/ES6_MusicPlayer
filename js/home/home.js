// import { getBannerList } from "../service/ajax.js";
// const result = await getBannerList();
// const carouselData = result.data.blocks[0].extInfo.banners;
// console.log(carouselData, "****")

const homePageTemplate = `
<div class="w">
    <div class="carousel-wrapper">
    <!-- 轮播图结构 -->
        <div class="carousel-container">
    
            <!-- 切换箭头 -->
            <!--轮播图图片需要动态生成  -->
            <!-- 指示器 -->
            <ul class="carousel-indicators d-flex">

            </ul>
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