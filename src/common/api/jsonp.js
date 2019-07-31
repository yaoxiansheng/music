// 引入第三方插件
import originJsonp from 'jsonp'

function JSONP(url, opt) {
    // 传入地址与回调
    return new Promise((resolve, reject) => {
        // 插件方法并且错误的回调优先
        originJsonp(url, opt, (err, res) => {
            if (err) { reject(err) }
            resolve(res)
        })
    })
}
// 抛出
export default JSONP