// pages/add/add.js
var app = getApp();
var config = require('../../config');
var i = 0;
var data = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:['基本设置','投票选项','高级设置'],
    currentTab:0,
    optionList: [
      {
        icon: '', value: '', pic: 'img/pic.png'
      },
      {
        icon: '', value: '', pic: 'img/pic.png'
      }
    ],
    voteTypeIndex: 0,
    voteType: ['单选', '多选'],
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
    region: ['不限', '不限', '不限'],
    customItem: '不限',
    optionValue: null,
    optionAll: [],
    add_id: 1,
    imgList: []
  },
  navbarTap: function(e){
    console.log(e.currentTarget.dataset.idx,"idx")
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.log(this.data.currentTab)
    if(this.data.currentTab===1){
      // var show = this.onShow();
      //   this.setData({
      //   })
      //   console.log(this.data.InvolveDeleteFlag,this.data.involveList,"inv")
    }else{
      // var show = this.onShow();
    }
  },
  //图片上传预览
  chooseImage: function (e) { 
    var that = this;
    var _index = e.target.dataset.index;
    var pic = "optionList[" + _index + "].pic";
    var valueAllPic = "optionAll[" + _index + "].pic";
    var imgList = "imgList[" + _index + "]";

    wx.chooseImage({
      count:1,
      sizeType: ['origanal','compressed'],//可选择原图或压缩后的图片
      sourceType: ['album','camera'],//可选择性开放访问相册、相机
      success: function(res){
        console.log(res.tempFilePaths)//图片的本地文件路径列表
        that.setData({
          [pic]: res.tempFilePaths[0],
          [valueAllPic]: res.tempFilePaths[0],
          [imgList]: res.tempFilePaths[0]
        })
        // var tempFilePaths = res.tempFilePaths;
        // wx.uploadFile({
        //   url: config.url + '/upload/', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   // header: { 'Content-Type': "multipart/form-data" },
        //   success: function(res){
        //     console.log("图片上传成功",res)
        //     wx.showToast({
        //       title:"图片上传成功"
        //     })
        //   },
        //   fail: function(){
        //     console.log("图片上传失败")      
        //   }
        // })
    // console.log(that.data.imgList,"图片")
    // var upload = that.uploadFile();
      }
    })
   },
  //图片上传服务器
  uploadFile: function(){
    var that = this;
    var imgList = that.data.imgList;
    // var data = {
    //   "length": imgList.length
    // };
for(var i=0;i<imgList.length;i++){



  wx.uploadFile({
    url: config.url + '/add/', //仅为示例，非真实的接口地址
    filePath: imgList[i],
    name: 'file',
    formData: data,
    success: function(add_res){
      wx.showToast({
        title:"图片上传成功"
      })
      console.log("图片上传成功",imgList)

      if(i==imgList.length){
        console.log("图片全部上传完毕")

        var nickname = add_res.user_name,
            voteId = add_res.add_id;
              console.log("创建成功")
              wx.showToast({
                title: '创建成功', success: res => {
                  app.globalData.add_id = add_res.data._id;
                  wx.navigateTo({
                    url: '/pages/voteHtml/voteHtml'
                    // url: '/pages/voteHtml/voteHtml?shareFrom=share&nickname=' + nickname + '&voteId=' + voteId
    
                  })
                }
              })


      }

        console.log(add_res.data);

    },
    fail: function(){
      console.log("图片上传失败")      
    },
    complete: function(){
      
    }
  })




}
    
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

  optionValue: function (e) {
    var optionValue = e.detail.value;
    var _index = e.target.dataset.index;
    var value = "optionList[" + _index + "].value";
    // var pic = "optionList[" + _index + "].pic";

    var valueAllOption = "optionAll[" + _index + "].option";
    var valueAllFlag = "optionAll[" + _index + "].flag";
    var valueAllCount = "optionAll[" + _index + "].count";
    var valueAllPic = "optionAll[" + _index + "].pic";
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
    console.log(optionValue, this.data.optionAll,this.data.optionList,"value值");

  },
  //添加选项
  addOption: function (e) {
    var _optionList = this.data.optionList;
    _optionList.push({ icon: 'img/sub.png', value: '' ,pic: 'img/pic.png'});
    this.setData({ optionList: _optionList });
  },
  delOption: function (e) {
    var _index = e.target.dataset.index;
    var _optionList = this.data.optionList;
    var _optionAll = this.data.optionAll;
    var _imgList = this.data.imgList;

    if (_index > 1) {
      _optionList.splice(_index, 1);
      _optionAll.splice(_index, 1);
      _imgList.splice(_index, 1);
    }
    this.setData({
      optionList: _optionList,
      optionAll: _optionAll,
      imgList: _imgList

    });
    console.log(this.data.imgList,"删除图片")
  },

  //提交表单
  formSubmit: function (e) {
    var that = this;
    var value = e.detail.value;
    var date = value.vote_date + ' ' + value.vote_time;
    data.user_id = JSON.stringify(app.globalData.user_id);
    data.user_name = JSON.stringify(app.globalData.user_name);
    data.user_avatarUrl= JSON.stringify(app.globalData.user_avatarUrl);
    data.vote_title = JSON.stringify(value.vote_title);
    data.vote_detail = JSON.stringify(value.vote_detail);
    data.vote_option = JSON.stringify(that.data.optionAll);
    data.vote_type = JSON.stringify(value.vote_type);
    data.vote_region = JSON.stringify(value.vote_region);
    data.vote_limitDate = JSON.stringify(date);
    data.vote_anonymous = JSON.stringify(value.vote_anonymous);
    data.flag = JSON.stringify(true);
    data.countAllOption = 0;
    data.length = that.data.imgList.length;

    if (value.vote_title != '' && value.vote_select1 != '' && value.vote_select2 != '') {
      // var num = 0;
      // for(var i=0;i<that.data.imgList.length;i++){
      //   if(that.data.imgList[i]===null){
      //     wx.showToast({
      //       title:"请填写完整"
      //     })
      //   }else{
      //     num++;
      //     if(num===that.data.imgList.length){
            var upload = that.uploadFile();
            // wx.request({
            //   url: config.url + '/add/',
            //   data: {
            //     'user_id': app.globalData.user_id,
            //     'user_name': app.globalData.user_name,
            //     'user_avatarUrl': app.globalData.user_avatarUrl,
            //     'vote_title': value.vote_title,
            //     'vote_detail': value.vote_detail,
            //     'vote_option': that.data.optionAll,
            //     'vote_type': value.vote_type,
            //     'vote_region': value.vote_region,
            //     'vote_limitDate': date,
            //     'vote_anonymous': value.vote_anonymous,
            //     'flag': true,
            //     'countAllOption': 0
            //   },
            //   method: 'POST',
            //   success: function (add_res) {
            //     var nickname = add_res.user_name,
            //       voteId = add_res.add_id;
            //     console.log("创建成功")
            //     wx.showToast({
            //       title: '创建成功', success: res => {
            //         app.globalData.add_id = add_res.data._id;
            //         wx.navigateTo({
            //           // url: '/pages/vote/vote'
            //           url: '/pages/vote/vote?shareFrom=share&nickname=' + nickname + '&voteId=' + voteId
      
            //         })
            //       }
            //     })
      
            //     console.log(add_res.data);
            //   }
            // })

          // }
        // }
      // }
      
    }
    else {
      if (value.vote_title === '') {
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
      } else {
        if (value.vote_select1 === '' || value.vote_select2 === '') {
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

    console.log(value, date);
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