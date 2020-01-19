// pages/location/location.js
const app = getApp()
var city = require('../../utils/city.js')
var lineHeight = 0;
var endWords = "";
var isNum;
var QQMapWX = require('../../libs/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  //在腾讯地图开放平台申请密钥 http://lbs.qq.com/mykey.html
  key: '24MBZ-YUGK6-ONHSU-ESCKC-MAQ3F-RPFXA'
});
Page({
  data: {
    latitude: 39.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../../images/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '../../images/location.png'
    }],
    tabIndex: 0,
    cityName: "", //获取选中的城市名
    cityCode:"",
    pageName: "",
    "hidden": true,
    lineHeight: "",
    city: [],
    winHeight: ""
  },
  onLoad: function (options) {
    this.setData({
      cityName: decodeURIComponent(options.cityName),
      pageName: options.pageName
    });
    this.geocoder();
    this.getCityList();
  },
  onShow(options) {

  },
  onReady: function (e) {
    // var cityChild = city.City[0];
    // var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     lineHeight = (res.windowHeight - 290) / 23;
    //     console.log(res.windowHeight - 160)
    //     that.setData({
    //       city: cityChild,
    //       winHeight: res.windowHeight,
    //       lineHeight: lineHeight
    //     })
    //   }
    // })
  },
  getCenterLocation: function () {
    qqmap.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    qqmap.moveToLocation()
  },
  translateMarker: function () {
    qqmap.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  changeTab(e) {
    this.setData({
      tabIndex: e.target.dataset.tabindex
    })
  },
  // getCityList: function () {
  //   var that = this;
  //   qqmap.getCityList({
  //     success: function (res) {
  //       console.log("省区数据：", res.result[0])
  //       console.log("城市数据：", res.result[1])
  //       console.log("区县数据：", res.result[2])
  //       that.setData({
  //         cityData: res.result[1]
  //       })

  //       // var province = res.result[0];
  //       // var provinceData = [];
  //       // for(var i = 0; i < province.length; i++){
  //       //   var obj = {}
  //       //   obj.code = province[i].id;
  //       //   obj.name = province[i].name;
  //       //   obj.py = '';
  //       //   for (var j = 0; j<province[i]['pinyin'].length; j++){
  //       //     obj.py += province[i]['pinyin'][j];
  //       //   }
  //       //   obj.type = 1;
  //       //   obj.state = 1;
  //       //   obj.status = 0;
  //       //   provinceData.push(obj)
  //       // }
  //       // wx.request({
  //       //   method:'post',
  //       //   data: {
  //       //     provinceData: provinceData
  //       //   },
  //       //   url: 'http://2833964ut1.qicp.vip/saveProvince',
  //       //   success:function(res){

  //       //   }
  //       // })

  //       //录入城市数据
  //       // var city = res.result[1];
  //       // var cityData = [];
  //       // for (var i = 0; i < city.length; i++) {
  //       //   var obj = {}
  //       //   obj.code = city[i].id;
  //       //   obj.name = city[i].name;
  //       //   obj.py = '';
  //       //   for (var j = 0; j < city[i]['pinyin'].length; j++) {
  //       //     obj.py += city[i]['pinyin'][j];
  //       //   }
  //       //   obj['province_code'] = city[i].id.substr(0,3) + '000';
  //       //   obj.state = 1;
  //       //   obj.status = 0;
  //       //   cityData.push(obj)
  //       // }
  //       // wx.request({
  //       //   method: 'post',
  //       //   data: {
  //       //     cityData: cityData
  //       //   },
  //       //   url: 'http://2833964ut1.qicp.vip/saveCity',
  //       //   success: function (res) {

  //       //   }
  //       // })
  //     }
  //   });
  // },
  //触发全部开始选择
  chStart: function () {
    this.setData({
      trans: ".3",
      hidden: false
    })
  },
  //触发结束选择
  chEnd: function () {
    this.setData({
      trans: "0",
      hidden: true,
      scrollTopId: this.endWords
    })
  },
  //获取文字信息
  getWords: function (e) {
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
      showwords: this.endWords
    })
  },
  //设置文字信息
  setWords: function (e) {
    var id = e.target.id;
    this.setData({
      scrollTopId: id
    })
  },

  // 滑动选择城市
  chMove: function (e) {
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    var height = 0;
    var that = this;
    ;
    var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
      success: function (res) {
        height = res.windowHeight - 10;
      }
    });

    //判断选择区域,只有在选择区才会生效
    if (y > offsettop && y < height) {
      // console.log((y-offsettop)/lineHeight)
      var num = parseInt((y - offsettop) / lineHeight);
      endWords = cityarr[num];
      // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
      that.endWords = endWords;
    };


    //去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    //DOTO 这里暂时还有问题，还是比较卡，待优化
    if (isNum != num) {
      // console.log(isNum);
      isNum = num;
      that.setData({
        showwords: that.endWords
      })
    }
  },
  //选择城市，并让选中的值显示在文本框里
  bindCity: function (e) {
    console.log(e);
    var cityName = e.currentTarget.dataset.city;
    var cityCode = e.currentTarget.dataset.code;
    this.setData({ 
      cityName: cityName,
      cityCode: cityCode
    })
    this.geocoder()

  },
  geocoder: function () {
    var self = this;
    qqmap.geocoder({
      address: self.data.cityName,
      success: function (res) {
        console.log(res)
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        self.setData({
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            width: 20,
            height: 20
          }]
        })

      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  bindViewTap: function () {
    var pageName = this.data.pageName;
    app.globalData.cityName = this.data.cityName;
    app.globalData.cityCode = this.data.cityCode;
    var url = "/pages/home/home/home";
    wx.switchTab({
      url: url,
    })
  },
  getCityList(){
    var that = this;
    var url = app.globalData.requestUrl +'/http/city/listCity';
    wx.request({
      url: url,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.data)
        var cityChild = res.data.data;
        wx.getSystemInfo({
          success: function (res) {
            lineHeight = (res.windowHeight - 290) / 23;
            console.log(res.windowHeight - 160)
            that.setData({
              city: cityChild,
              winHeight: res.windowHeight,
              lineHeight: lineHeight
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})