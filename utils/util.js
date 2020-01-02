const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const request_server = function (token, url, info, callback) {
  var self = this
  info = info || "";
  wx.request({
    url: url,
    // method:'POST',
    header: getRequestHeader(),
    data: {
      token: token,
      info: info
    },
    success: function (res) {
      if (res.data.code != 200) {
        // app.alert( { 'content':res.data.msg } );
        console.log("!!!!!!!!!!!!!!!!!!!!!!");
        console.log(res.data);
        return;
      }
      if (callback) {
        callback(res.data)
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
const getRequestHeader = function () {
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'Authorization': getCache("token")
  }
}
const getCache = function (key) {
  var value = undefined;
  try {
    value = wx.getStorageSync(key);
  } catch (e) {
  }
  return value;
}

module.exports = {
  formatTime: formatTime,
  request_server: request_server
}
