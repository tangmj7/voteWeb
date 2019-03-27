// pages/a/a.js
var app = getApp();
var config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 1500,
                    mask: true
                });
                //尝试再次登录
                wx.reLaunch({
                    url: '/pages/home/home'
                })
                var login = that.login();
                
            } else {
                return;
            }
        }
    })
  },

  bindGetUserInfo: function(e){
    if(e.detail.userInfo){
        var that = this;
        var login = that.login();      
    }else{
        wx.showModal({
            title:"提示",
            content:"请授权后再使用",
            success: function(res){
                if(res.confirm){
                    console.log("确定")
                }
            }
        })
    }

  },
  login: function(){
  
    wx.login({
        success: function(res){
          var code = res.code;
          console.log("code",code)
  
          if(code){
  
            wx.getUserInfo({
              lang: "zh_CN",
              success: res => {
                var that = this;
                var userInfo = res.userInfo;
                // that.globalData.userInfo = res.userInfo;
                wx.request({
                  url: config.url + '/users/',
                  data: {
                    'code': code,
                    'user_id': null,
                    'user_name': userInfo.nickName,
                    'user_avatarUrl': userInfo.avatarUrl,
                    'user_province': userInfo.province,
                    'user_city': userInfo.city,
                    'user_gender': userInfo.gender
                  },
                  method: 'POST',
                  success: function(user_res){
                    app.globalData.user_id = user_res.data.user_id;
                    app.globalData.user_name = user_res.data.user_name;
                    app.globalData.user_avatarUrl = user_res.data.user_avatarUrl;
                    app.globalData.user_province = user_res.data.user_province;
                    app.globalData.user_city = user_res.data.user_city;
                  wx.reLaunch({
                      url: '/pages/home/home'
                  })
                  console.log(app.globalData.user_id,"app_user_id")
                  },
                  fail: function(user_res){
                    console.log("fail");
                  }
                })
              }
            })
  
          }
        }
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

  }
})