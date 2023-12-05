const BASE_URL = "http://localhost:3000";
export default function Ajax({
    //请求参数配置
    method = "GET",
    //默认为'get'请求
    url,
    data = {},
}) {
    return new Promise((resolve) => {
        //通过Promise 返回异步请求
        const xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + url);
        xhr.onload = function () {
            resolve(JSON.parse(xhr.response));
        };
        xhr.onerror = function () {
            //待最后进行错误处理操作
            if (xhr.status == 0) {

            }
        };
        xhr.send(JSON.stringify(data));
    });
}

/**
 * @description:获得轮播图信息
 * @param{*}
 * @return[*}
 */
export async function getBannerList() {
    const result = Ajax({
        url: `/homepage/block/page`
    })
    return result
}
//推荐歌单初始化
/**
 * @description:获得推荐歌单列表
 * @param{*} musicId
 * @return
*/
export async function getRecommendList(musicId) {
    const result = Ajax({
        url: `/playlist/detail?id=${musicId}`
    });
    return result;
}