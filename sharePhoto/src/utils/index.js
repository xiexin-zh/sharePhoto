function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const itemList =['从手机相册中选择','电脑批量传图','导入聊天照片'];

import store from "../pages/counter/store"

export function Photo() {

  mpvue.showActionSheet({
    itemList,
    success:res=> {
      console.log(res.tapIndex)
      if(res.tapIndex==0){
        mpvue.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success :res=> {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            store.commit("getPath",tempFilePaths);
            mpvue.navigateTo({ url: '/pages/sharePhoto/main'});
          }
        })
      }

    },
    fail(res) {
      console.log(res.errMsg)
    }
  })

}







export default {
  formatNumber,
  formatTime,
  Photo
}
