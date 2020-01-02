// pages/home/searchGarbage/searchGarbage.js
const app = getApp();
const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
const query = wx.createSelectorQuery()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    inputBottom:"40px",
    recordState: false, //录音状态
    content: '' //内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  toIndex(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  inputFocus:function(){
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },
  inputBlur:function(){

  },
  /**
 * 语音识别---初始化
 */
  initRecord: function () {
    const that = this;
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res);
    }
    //识别开始事件
    manager.onStart = function (res) {
      console.log("成功开始录音", res)
    }
    //识别错误事件
    manager.onError = function (err) {
      console.log("error msg", err);
    }
    manager.onStop = function (res) {
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) { }
        })
        return;
      }
      var text = res.result;
      that.setData({
        content: text
      })
    }
  },

  /**
   * 按下录音
   */
  start_say: function () {
    this.setData({
      recordState: true
    })
    //语音识别
    manager.start({
      lang: 'zh_CN'
    })
  },

  /**
   * 结束录音
   */
  end_say: function () {
    this.setData({
      recordState: false
    })
    //语音结束
    manager.stop();
  }
})