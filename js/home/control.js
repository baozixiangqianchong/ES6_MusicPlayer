import { getAudioSrc, getAudioInfo } from "../service/ajax.js";
// import { formatSongTime } from "../util/util.js";

/**
 * @description：初始化音乐播放器控制栏
 * @param{*}id：音乐的id
 * @return {*}
 */

export async function initPlayerControl(reloadAudio = true) {
    let musicId = Number(window.localStorage.getItem("musicId"));
    console.log(musicId, "musicId");
    //修改播放器底部控制栏对应的href值，以便跳转页面的时候能拿到歌曲id
    PlayerCoverBackMode("player", musicId);
    //加载歌曲
    const musicSrc = await getAudioSrc(musicId);
    const musicData = await getAudioInfo(musicId);
    if (reloadAudio) {
        const myAudio = document.querySelector("#myAudio");
        myAudio.src = musicSrc;
        isPlayProxy.isPlay = true;
    }

    let songInfo;
    musicData && (songInfo = musicData.songs[0]);
    playerControlRender(songInfo);
}

function playerControlRender(songInfo) {
    //修改播放器控制栏的视图
    console.log("songInfo", songInfo);

    document.querySelector(".songname").innerText = songInfo.name;
    document.querySelector(".singer").innerText = songInfo.ar[0].name;
    // document.querySelector(".total-time").innerText = formatSongTime(songInfo.dt);
    Array.from(document.querySelectorAll(".player-control-songinfo .img")).forEach((item) => {
        item.innerHTML = `<img src = "${songInfo.al.picUrl}" alt = '' /> `
    });
    document.querySelector(".player-control-unit #player-control").innerHTML = `
    <use xlink:href="#icon-bofangzhong"></use>
    `;
}

import { reactive } from "../util/reactive.js";

const isPlayProxy = reactive(
    {
        //用来控制播放、暂停
        isPlay: false,
    },
    playPauseKeyRender
)
const musicIdProxy = reactive(
    {
        musicId: 1813926556,
    },
    initPlayerControl
)

function playPauseKeyRender() {
    const myAudio = document.querySelector("#myAudio");
    const playerControl = document.querySelector(".player-control-unit #player-control");
    //控制音乐的播放和暂停
    // console.log(myAudio, myAudio.play(), myAudio.pause());
    isPlayProxy.isPlay ? myAudio.play() : myAudio.pause();
    //控制播放和暂停的图标
    isPlayProxy.isPlay
        ? (playerControl.innerHTML = `<use xlink:href="#icon-weibiaoti--"></use>`)
        : (playerControl.innerHTML = `<use xlink:href="#icon-zantingbofang"></use>`)

}

export function initPlayerEvent() {
    //事件的初始化放在首次加载 index.js时执行，控制播放及暂停
    const playerControl = document.querySelector(".player-control-unit #player-control");
    playerControl.addEventListener("click",
        () => {
            isPlayProxy.isPlay = !isPlayProxy.isPlay;
        });
}

/**
 * @description：点击底部播放栏封面图片，控制页面需要跳转的页面
 * @param{*}page需要跳转到页面
 * @param {*} id如果当前页是recommend，那么id为推荐歌单ID；如果当前页是player，那么id为musicId
 * @return {*}
 */
export function PlayerCoverBackMode(page, id) {
    if (page == "player") {
        document.querySelector("#playerCover").setAttribute("href", `#/player/:${id}`);
        document.querySelector("#playerCoverBack").classList.add("display-none");
        document.querySelector("#playerCover").classList.remove("display-none");
    } else if (page == "recommend") {
        document.querySelector("#playerCoverBack").setAttribute("href", `#/recommendList/:${id}`);
        document.querySelector("#playerCover").classList.add("display-none");
        document.querySelector("#playerCoverBack").classList.remove("display-none");
    }
}