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