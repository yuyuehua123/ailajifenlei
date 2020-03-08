var BASEURL = "https://www.lajirecycle.com"

//用户登录接口
module.exports.LOGIN = BASEURL + '/login'
//获取城市列表
module.exports.LISTCITY = BASEURL + "/http/city/listCity"
//根据城市编码获取垃圾类别
module.exports.LISTCATE = BASEURL + "/http/city/listCate" 
//根据城市编码和垃圾类别获取垃圾列表
module.exports.LISTGARBAGE = BASEURL + '/http/city/listGarbage'

//根据城市编码和垃圾名称获取垃圾类别(没有服务接口)
module.exports.GARBAGETEXTSEARCH = BASEURL + '/'
//根据城市编码和图片获取垃圾类别()
module.exports.GARBAGEIMAGESEARCH = BASEURL + '/'


