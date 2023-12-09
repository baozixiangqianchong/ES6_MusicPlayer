import { getRecommendList } from "../service/ajax.js";
import { formatCreateTime } from '../util/util.js'
import { clearAllTimer } from "../home/carousel.js";
import { reactive } from "../util/reactive.js";
import { PlayerCoverBackMode } from "../home/control.js";

const recommendDetail = {
  detail: {},
  playlist: {},
  listActive: 0,//歌单列表被选中的歌曲Id
}

// 响应式数据：当数据改变时，执行歌单列表初始化函数
const activeProxy = reactive({
  active: recommendDetail.listActive,
},
  initList
)


export const recommendListPage = async ({ params = "" }) => {
  document.querySelector("#app").innerHTML = `加载中...`;
  const result = await getRecommendList(params);
  const musicId = window.localStorage.getItem("musicId");

  if (result.code == 404) {
    document.querySelector("#app").innerHTML = `未找到资源`;
  } else {
    window.localStorage.setItem("lastRecommendId", params);
    PlayerCoverBackMode("player", musicId);

    recommendDetail.detail = result.playlist;
    recommendDetail.playlist = result.playlist.tracks;
    initDescribe();
    initList();
    initEvent();
  }
  clearAllTimer()
}

function initEvent() {
  const songListWrap = document.querySelector(".recommend-list-songlist-body");
  // songListWrap.addEventListener(
  //   "mouseenter",
  //   (e) => {
  //     const targetName = e.target.nodeName.toLocaleLowerCase();
  //     if (targetName == "li") {
  //       const id = e.target.getAttribute("data-index");
  //       activeProxy.active = id;
  //     }
  //   },
  //   true
  // );
  songListWrap.addEventListener(
    "dblclick",
    async (e) => {
      console.log(e, "e");
      //修改列表的播放图标
      const targetName = e.target.nodeName.toLocaleLowerCase();
      if (targetName == "li") {
        const id = e.target.getAttribute("data-index");
        isPlayProxy.active = id;
        window.localStorage.setItem("musicId", id);
      } else if (targetName == "div") {
        const id = e.target.parentNode.getAttribute("data-index");
        isPlayProxy.active = id;
        window.localStorage.setItem("musicId", id);
      }
      isPlayProxy.isPlay = true; initPlayerControl();
    },
    true
  )
}



function initDescribe() {
  //推荐歌单描述初始化
  let tagsTemplate = ""
  recommendDetail.detail.tags.forEach((tag, index) => {
    index == recommendDetail.detail.tags.length - 1
      ? (tagsTemplate += `<span class="tag">${tag}</span>`)
      : (tagsTemplate += `<span class="tag">${tag}/</span>`);
  });
  let time = formatCreateTime(recommendDetail.detail.createTime);
  document.querySelector("#app").innerHTML = `
    <div class="w">
    <div class="recommend-header">
      <a href="#home">首页</a> /
      <span>推荐歌单</span>
    </div>
    <div class="recommend-wrapper">
      <!-- 推荐页内容 -->
      <div class="recommend-describe d-flex justify-content-start">
        <!-- 歌单介绍 -->
        <div class="recommend-describe-left">
          <img
            src="${recommendDetail.detail.coverImgUrl}"
            alt=""
          />
        </div>
        <div
          class="recommend-describe-right d-flex flex-column align-items-start"
        >
          <h4 class="recommend-describe-right-title single-text-omitted">
            ${recommendDetail.detail.name}
          </h4>
          <div class="recommend-describe-right-creator d-flex">
            <img
              class="avatar"
              src="${recommendDetail.detail.creator.avatarUrl}"
              alt=""
            />
            <span class="creator">${recommendDetail.detail.creator.detailDescription}</span>
            <span class="create-time">${time}</span>
          </div>
          <div class="recommend-describe-right-add d-flex">
            <span class="btn">播放全部</span><span class="add">+</span>
          </div>
          <div class="recommend-describe-right-info">
            <div class="info">
              <span class="label">标签：</span>
              ${tagsTemplate}
            </div>
            <div class="info">
              <span class="label">歌曲：</span>
              <span class="label-info">${recommendDetail.detail.trackCount}</span>
              <span class="label">播放：</span>
              <span class="label-info">${recommendDetail.detail.playCount}</span>
            </div>
            <div class="info">
              <span class="label">简介：</span>
              <span class="label-info">${recommendDetail.detail.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend-list">
        <!-- 歌单列表 -->
        <h4 class="recommend-title">
          歌曲列表
        </h4>
        <ul class="recommend-list-songlist-header d-flex justify-content-start">
          <li class="songlist-header-name">歌曲</li>
          <li class="songlist-header-author">歌手</li>
          <li class="songlist-header-album">专辑</li>
          <li class="songlist-header-time">时长</li>
        </ul>
        <ul class="recommend-list-songlist-body"></ul>
      </div>
    </div>
  </div>
    `
}

function initList() {
  const listDomn = document.getElementsByClassName("recommend-list-songlist-body")[0];
  let listTemplate = "";
  let isEvenOrOdd = "";
  recommendDetail.playlist.forEach((item, index) => {
    isEvenOrOdd = index % 2 == 0 ? "even" : "odd";
    listTemplate += `
    <li class="songlist-item ${isEvenOrOdd}  ${activeProxy.active == item.id ? 'active' : ''} d-flex justify-content-start" data-index=${item.id}> 
      <div class="songlist-number font-color">
        <span class="index">${index + 1}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
      </div>
      <div class="songlist-songname">${item.name}</div>
      <div class="songlist-artist font-color">${item.ar[0].name}</div>
      <div class="songlist-album font-color">${item.al.name}</div>
      <div class="songlist-time font-color">
        ${Math.floor(item.dt / 1000 / 60)}:${Math.round((item.dt / 1000) % 60)}
      </div>
    </li>
    `
  })
  listDomn.innerHTML = listTemplate;
}

import { initPlayerControl } from "../home/control.js";
//双击播放音乐涉及到的变量，变量改变前面的播放标志也改变
const isPlayProxy = reactive(
  {
    active: recommendDetail.listActive,//存放音乐的id
    isPlay: false,//歌曲是否在播放
  },
  initList
)
