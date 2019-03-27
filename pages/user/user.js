// pages/user/user.js
var config = require('../../config');
var util = require('../../utils/util');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:['发布','参与'],
    currentTab:0,
    flagList: [],
    flag: true,
    release_title: '投票标题1',
    releaseList: [],
    involveList: [],
    InvolveDeleteFlag: false
  },
  bindFlag:function(e){
    var _index = e.target.dataset.index;
    var _flag = e.currentTarget.dataset.flag;
    var hide = "releaseList[" + _index + "].flag";
    console.log(_index,_flag);
    this.setData({
      [hide]: !_flag
    })
  },
  navbarTap: function(e){
    console.log(e.currentTarget.dataset.idx,"idx")
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(this.data.currentTab)
    if(this.data.currentTab===1){
      var show = this.onShow();
        this.setData({
          releaseList: this.data.involveList
        })
        console.log(this.data.InvolveDeleteFlag,this.data.involveList,"inv")
    }else{
      var show = this.onShow();
    }
  },

  bindOperateShow: function(e){
    var hide = this.bindFlag(e);
    console.log(this.data.releaseList,this.data.flag)
  },

  bindEye:function(e){
    // var _add_id = e.target.dataset.add;
    var hide = this.bindFlag(e); 
    var show = util.bindEye(e);
    // app.globalData.add_id = _add_id;
    // console.log(_add_id,app.globalData.add_id)
    // wx.navigateTo({
    //   url: '/pages/vote/vote'
    // })
  },
  bindDel:function(e){
    var that = this;
    var _add_id = e.target.dataset.del;
    app.globalData.add_id = _add_id;
    console.log(_add_id,app.globalData.add_id)
    wx.request({
      url: config.url + '/add/del',
      method: 'POST',
      data: {
        'add_id': app.globalData.add_id
      },
      success: function(res) {
        if (res.data == '删除成功') {
          wx.showToast({title: '删除成功',success: res => {
              var load = that.onShow();
        }});

        }
      },
      fail: function(res) {}
    })
  },
  // bindInvolveDel: function(e){
  //   var _index = e.target.dataset.index,
  //       _releaseList = this.data.releaseList;
  //   _releaseList.splice(_index,1);
  //   this.setData({
  //     releaseList: _releaseList,
  //     involveList: _releaseList,
  //     InvolveDeleteFlag : true
  //   })
  // },
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
    var that = this;
    console.log('tab',that.data.currentTab)
     wx.request({
       url: config.url + '/add/release',
       method: 'POST',
       data: {
         'user_id': app.globalData.user_id,
         'currentTab':that.data.currentTab
       },
       success: function(res) {
         console.log(res.data);
           that.setData({
             releaseList: res.data
           }); 
          
       },
       fail: function(res) {}
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

  }
})