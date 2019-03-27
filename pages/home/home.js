// pages/home/home.js
var config = require('../../config');
var util = require('../../utils/util');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: [],
    value: ''
  },

  bindEye: function(e){
    var show = util.bindEye(e);
  },
  search: function(key){
    var that = this;
    console.log('search')
    var addList = wx.getStorage({
      key: "addList",
      success: function(res){
        console.log('成功')
        //用户没有输入
        if(key === ''){
          var result = res.data;
               result = result.slice(0,2);
          console.log(result,"add")
          that.setData({
            addList: result
          });
          console.log(that.data.addList)
        }
        //临时数组存储
        else{
          var arr = [];
          for(var i in res.data){
            if(res.data[i].vote_title.indexOf(key) >= 0){
              arr.push(res.data[i]);
            }
          }
          console.log(arr,key)
          if(arr.length===0){
            that.setData({
              addList: []
            })
          }
          else{
            that.setData({
              addList: arr
            })
          }
        }
        
      }
    })
  },
  searchInput: function(e){
    var search = this.search(e.detail.value);
    console.log("input")
  },
  searchFocus: function(e){
    var search = this.search(e.detail.value);
    console.log("focus")
  },
  searchBlur: function(e){
    var search = this.search(e.detail.value);
    this.setData({
      value: e.detail.value
    })
    console.log("blur")
  },
  bindSearch: function(e){
    var search = this.search(e.target.dataset.value);
    console.log("btn",e.target.dataset.value,'btn',this.data.value)
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
    var that = this;
     wx.request({
       url: config.url + '/add/home',
       method: 'POST',
       data: {
       },
       success: function(res) {
         console.log(res.data);
           wx.setStorage({
             key: "addList",
             data: res.data
           })
           var result = res.data;
               result = result.slice(0,10);
           that.setData({
             addList: result
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
  onShareAppMessage: function (res) {
    // var share = util.share(res);
    var voteId = res.target.dataset.add,
    nickname = res.target.dataset.user;
    var shareTitle = nickname ? nickname : '朋友';
    if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res)
    }
    console.log(nickname,"name")
    return {
        title: shareTitle + '等你投一票！',
        path: '/pages/vote/vote?shareFrom=share&nickname=' + nickname + '&voteId=' + voteId,
        success: function(res) {
            // 转发成功
            console.log(nickname,"转发成功")
        }
    }
  }
})