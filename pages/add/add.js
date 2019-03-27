// pages/add/add.js
var app = getApp();
var config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [
      {
        icon: '',value:''
      },
      {
        icon: '',value:''
      }
    ],
    voteTypeIndex:0,
    voteType:['单选','多选'],
    objectVoteType: [
      {
        id: 0,
        name: '单选'
      },
      {
        id: 1,
        name: '多选'
      }
    ],
    date: '2018-11-27',
    time: '12:00',
    region: ['不限', '不限','不限'],
    customItem: '不限',
    optionValue: null,
    optionAll: [],
    add_id: 1
  },

  bindChangeVoteType: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      voteTypeIndex: e.detail.value
    })
  },

  bindChangeVoteDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindChangeVoteTime: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindChangeVoteRegion: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindChangeAnonymous: function (e) {
    console.log('发送选择改变，携带值为', e.detail.value)
  },

  optionValue:function(e){
    var optionValue = e.detail.value;
    var _index = e.target.dataset.index;
    var value = "optionList[" + _index + "].value";

    var valueAllOption = "optionAll[" + _index + "].option";
    var valueAllFlag = "optionAll[" + _index + "].flag";
    var valueAllCount = "optionAll[" + _index + "].count";
    var valueList = {};
    var flag = true;
    // this.data.optionAll.push(valueList);

    this.setData({
      [value]: optionValue,
      [valueAllOption]: optionValue,
      [valueAllFlag]: flag,
      [valueAllCount]: 0
      // optionAll: this.data.optionAll
    });
    this.setData({
      optionAll: this.data.optionAll
    });
    console.log(optionValue,this.data.optionAll);

  },
//添加选项
  addOption: function(e){
    var _optionList = this.data.optionList;
    _optionList.push({icon:'img/sub.png',value:''});
    this.setData({optionList:_optionList});
  },
  delOption: function (e) {
    var _index = e.target.dataset.index;
    var _optionList = this.data.optionList;
    var _optionAll = this.data.optionAll;
    if(_index>1){
      _optionList.splice(_index, 1);
      _optionAll.splice(_index, 1);
    }
    this.setData({ 
      optionList: _optionList,
      optionAll: _optionAll 
    });
  },

  //提交表单
  formSubmit: function(e){
    var that = this;
    var value = e.detail.value;
    var date = value.vote_date + ' ' + value.vote_time;
    
    if(value.vote_title!='' && value.vote_select1!='' && value.vote_select2!=''){
      wx.request({
        url: config.url + '/add/',
        data : {
          'user_id': app.globalData.user_id,
          'user_name': app.globalData.user_name,
          'user_avatarUrl': app.globalData.user_avatarUrl,
          'vote_title': value.vote_title,
          'vote_detail':value.vote_detail,
          'vote_option':that.data.optionAll,
          'vote_type': value.vote_type,
          'vote_region':value.vote_region,
          'vote_limitDate':date,
          'vote_anonymous':value.vote_anonymous,
          'flag':true,
          'countAllOption':0
        },
        method: 'POST',
        success: function(add_res){
          var nickname = add_res.user_name,
              voteId = add_res.add_id;
          wx.showToast({title: '创建成功',success: res => {
            app.globalData.add_id = add_res.data._id;
            wx.navigateTo({
                // url: '/pages/vote/vote'
                url: '/pages/vote/vote?shareFrom=share&nickname=' + nickname + '&voteId=' + voteId
  
            })
          }})
          
          console.log(add_res.data);
        }
      })
    }
    else{
      if(value.vote_title===''){
        wx.showModal({
          title: '提示',
          content: '请填写标题',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // var onshow = that.onShow();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        if(value.vote_select1==='' || value.vote_select2===''){
          wx.showModal({
            title: '提示',
            content: '至少两个选项',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                // var onshow = that.onShow();
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
      
    }
    
    console.log(value,date);
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

  }
})