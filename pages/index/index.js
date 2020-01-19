//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    PageCur: 'home',
    location:''
  },
  onLoad(){
    this.setData({
      location:app.globalData.location
    })
    console.log(this.data.location)
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})
