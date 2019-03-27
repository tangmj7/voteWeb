//app.js
var config = require('/config');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // wx.getUserInfo({
    //   lang: "zh_CN",
    //   success: res => {
    //     var that = this;
    //     that.globalData.userInfo = res.userInfo;
    //     wx.request({
    //       url: config.url + '/users/',
    //       data: {
    //         'user_name': res.userInfo.nickName,
    //         'user_avatarUrl': res.userInfo.avatarUrl,
    //         'user_province': res.userInfo.province,
    //         'user_city': res.userInfo.city,
    //         'user_gender': res.userInfo.gender
    //       },
    //       method: 'POST',
    //       success: function(user_res){
    //         that.globalData.user_id = user_res.data.user_id;
    //         that.globalData.user_name = user_res.data.user_name;
    //         that.globalData.user_avatarUrl = user_res.data.user_avatarUrl;
    //         that.globalData.user_province = user_res.data.user_province;
    //         that.globalData.user_city = user_res.data.user_city;

    //         console.log(user_res.data);
    //       },
    //       fail: function(user_res){
    //         console.log("fail");
    //       }
    //     })
    //   }
    // })

  //   var token = wx.getStorageSync('token');
  //   if (token === null || token === '') {
  //     var that = this;
  //     var login = that.login();
  //   } else {
  //     console.log("不用授权")
  //   }
  // },
  // login: function(e){
  //   wx.login({
  //     success: function(res){
  //       var code = res.code;
  //       console.log("code",code)

  //       if(code){

  //         wx.getUserInfo({
  //           lang: "zh_CN",
  //           success: res => {
  //             var that = this;
  //             var userInfo = res.userInfo;
  //             // that.globalData.userInfo = res.userInfo;
  //             wx.request({
  //               url: config.url + '/users/',
  //               data: {
  //                 'code': code,
  //                 'user_name': userInfo.nickName,
  //                 'user_avatarUrl': userInfo.avatarUrl,
  //                 'user_province': userInfo.province,
  //                 'user_city': userInfo.city,
  //                 'user_gender': userInfo.gender
  //               },
  //               method: 'POST',
  //               success: function(user_res){
  //                 that.globalData.user_id = user_res.data.user_id;
  //                 that.globalData.user_name = user_res.data.user_name;
  //                 that.globalData.user_avatarUrl = user_res.data.user_avatarUrl;
  //                 that.globalData.user_province = user_res.data.user_province;
  //                 that.globalData.user_city = user_res.data.user_city;
      
  //                 console.log(user_res.data,"login");
  //               },
  //               fail: function(user_res){
  //                 console.log("fail");
  //               }
  //             })
  //           }
  //         })

  //       }
  //     }
  //   })
  },
  globalData: {
    _id: null,
    userInfo: null,
    user_id: null,
    user_name: null,
    user_avatarUrl: null,
    user_province: null,
    user_city: null,
    add_id: null
  }
})