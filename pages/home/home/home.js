// pages/basics/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    garbageOneId:0,
    cityName:"",
    cityCode:"",
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
      cityName: app.globalData.cityName,
      cityCode: app.globalData.cityCode
    });
    wx.showShareMenu({
      withShareTicket: true
    });
    this.getGarbageTypes()
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
    });
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
  onShareAppMessage: function (res) {
    if(res.from === 'button'){

    }
    return {
      title:'分享',
      path:'/pages/home/home/home?id=123',
      success:function(res){
        console.log(res)
      }
    }
  },
  tabSelect(e) {
    var that = this;
    console.log(e.currentTarget.dataset.index);
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    });
    that.setData({
      garbageOneId: e.currentTarget.dataset.id
    })
    that.getGarbageList(that.data.cityCode, that.data.garbageOneId);
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
  },
  /**
   * 根据城市code获取垃圾分类
   */
  getGarbageTypes(){
    var that = this;
    var url = app.globalData.requestUrl + '/http/city/listCate';
    console.log(app.globalData.requestUrl,that.data.cityCode)
    wx.request({
      url: url,
      data: { cityCode: that.data.cityCode},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(res.data.data){
          that.setData({
            garbageTypes:res.data.data,
            garbageOneId:res.data.data[0].id
          });
          that.getGarbageList(that.data.cityCode, that.data.garbageOneId);
        }
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 根据城市编码和垃圾类别查询垃圾列表
   */
  getGarbageList(code, garbageOneId){
    console.log(code,garbageOneId)
    var that = this;
    var url = app.globalData.requestUrl + '/http/city/listGarbage';
    wx.request({
      url: url,
      data: {
        cityCode:code,
        garbageOneId: garbageOneId
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if(res.data.data){
          that.setData({
            garbageList: res.data.data
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

})