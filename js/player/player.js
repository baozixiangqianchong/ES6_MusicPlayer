import { PlayerCoverBackMode } from "../home/control.js";

export async function playerPage({ params: id }) {
    document.querySelector("#app").innerHTML = "playerPage加载中";
    //更改歌曲是否返回推荐列表详情页还是去播放列表
    const lastRecommendId = window.localStorage.getItem("lastRecommendId")
    PlayerCoverBackMode("recommend", lastRecommendId);
}