// pages/home/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraContext: '',
    isActive: true,
    tempImagePath: '',
    hasResult: false,
    imageGarbage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  record: function () {
    let that = this;
    this.setData({
      cameraContext: wx.createCameraContext()
    });
    this.data.cameraContext.takePhoto({
      quality: "high",
      success: function (res) {
        that.setData({
          isActive: false,
          tempImagePath: res.tempImagePath
        });
        wx.showLoading({
          title: '正在识别',
          mask: true
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data);
            wx.request({
              url: 'http://2833964ut1.qicp.vip/garbageImageSearch', //仅为示例，并非真实的接口地址
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              data: {
                base64: res.data,
                cityId: '110000'
              },
              success(res) {
                wx.hideLoading();
                console.log(res.data);
                if (res.data) {
                  that.setData({
                    hasResult: true,
                    imageGarbage: JSON.parse(res.data)
                  })
                  console.log(that.data.imageGarbage)
                }
              }
            })
          }
        })
      }
    })
  },
})