// pages/basics/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    location:'北京',
    garbageTypes: [
      {
        id: 0,
        name: '易腐垃圾',
        description: "易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾易腐垃圾"
      }, {
        id: 0,
        name: '有害垃圾',
        description: "有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾有害垃圾"
      }, {
        id: 0,
        name: '可回收物',
        description: "可回收物可回收物可回收物可回收物可回收物可回收物可回收物可回收物可回收物可回收物可回收物可回收物"
      }, {
        id: 0,
        name: '其他垃圾',
        description: "其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾其他垃圾"
      },
    ],
    garbageList: [
      {
        id: "垃圾1",
        name: "垃圾1"
      }, {
        id: "垃圾2",
        name: "垃圾2"
      }, {
        id: "垃圾3",
        name: "垃圾3"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      location: app.globalData.location
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      location: app.globalData.location
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  toLocation(){
    let url = "/pages/location/location?location="+this.data.location;
    wx.navigateTo({
      url: url
    })
  },
  toCamera(){
    let url = "/pages/home/camera/camera";
    wx.navigateTo({
      url: url
    })
  },
  toSearchGarbage(){
    let url = "/pages/home/searchGarbage/searchGarbage";
    wx.navigateTo({
      url: url
    })
  }
})