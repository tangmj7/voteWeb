// pages/vote/vote.js
var config = require('../../config');
var util = require('../../utils/util')
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vote_title: '',
    vote_detail: '',
    vote_option:[],
    voteOption:[],
    percent:20,
    percentFlag: true,
    vote_type: '单选',
    date: '2018-11-29',
    time: '22:00',
    limitDate: null,
    vote_region: null,
    flag: true,
    btnFlag: true,
    chooseOption: [],
    countAll: 0,
    countAllOption: 0,
    userCount: 0,
    progressFlag: true,
    hideShowFlag: null,
    user_name: null,
    add_id: null,
    picFlag: 0,
    timer: null
  },
  //多选
  bindChooseMany:function(e){
    var that = this;
    var _index = e.target.dataset.index;
    var _flag = e.currentTarget.dataset.flag;
    var _count = e.currentTarget.dataset.count;    
    var hideConfirm = "vote_option[" + _index + "].flag";
    console.log(_index,_flag);
    this.setData({
      [hideConfirm]: !_flag,
    })
  },
  //单选
  bindChooseOne:function(e){
    var that = this;
    var _index = e.target.dataset.index;
    var _flag = e.currentTarget.dataset.flag;
    var flag = that.data.flag;
    var _count = e.currentTarget.dataset.count; 
    var _countAll = that.data.countAll;    
    
    // var hideConfirm = "vote_option[" + _index + "].flag";
    var len = that.data.vote_option.length;
    for(var i=0;i<len;i++){
    var hideConfirm = "vote_option[" + i + "].flag";
    var countOne = "vote_option[" + i + "].count";

        if(i==_index){
          that.setData({
            [hideConfirm]: !_flag
          }) 

      }else{
          that.setData({
            [hideConfirm]: flag
        })

      }
    }
    console.log(_index,_flag,that.data.vote_option,_count,that.data.countAll);
  },
  bindChooseOption: function(e){
    var that = this;
    // var _countAll = that.data.countAll;    
    // var _count = e.currentTarget.dataset.count; 
    // var _index = e.target.dataset.index;
    // var _flag = e.currentTarget.dataset.flag;
    // var voteCount = "vote_option[" + _index + "].count";
    if(that.data.vote_type == '单选'){
      var chooseOne = that.bindChooseOne(e);
      
    }else{
      var chooseMany = that.bindChooseMany(e);
      //投票计数
    
    // if(_flag==true){
    //   _count++;
    //   _countAll++;
    // }else{
    //   _count--;
    //   _countAll--;
    // }
    // that.setData({
    //   [voteCount]: _count,
    //   countAll: _countAll,
    //   percentFlag:true,
    //   progressFlag: true
    // })
    // console.log(that.data.vote_option,_count,that.data.countAll,"count");
    }


    //选项全为ture,btnFlag为ture，不可点击
    var List = that.data.vote_option;
    var n = 0;
    for(var i=0;i<List.length;i++){
      if(List[i].flag == true){
        n++;
      }
      console.log(List[i].flag,"List");
    }
    if(n==List.length){
      that.setData({
        btnFlag: true
      });
    }else{
      that.setData({
        btnFlag: false
      });
    }
    console.log(n,List.length,"长度",that.data.countAll)
    console.log(that.data.vote_option);
 
  },
//隐藏选中的图片，勾
  confirmHide: function(){
    var that= this;
    var List = that.data.vote_option;

        for(var i=0;i<List.length;i++){
           List[i].flag = true;
        }
        that.setData({
          vote_option:List
        })
  },

  voteLimit: function(){

        wx.showModal({
          title: '提示',
          content: '投票已截止',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // var onshow = that.onShow();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

    
  },
//倒计时
dateLimit: function(){
  var that = this;
  var timer = that.data.timer;
  var time;
  var currentTime = new Date();
  // currentTime = currentTime.toString().replace(/\-/g,"/");

    var limitDate = that.data.date;
    var limitYear = limitDate.substr(0,4),
        limitMonth = limitDate.substr(5,2),
        limitDay = limitDate.substr(8,2),
        limitHour = limitDate.substr(11,2),
        limitMin = limitDate.substr(14,2),
        limitSec = limitDate.substr(17,2);

  var endTime = new Date(limitYear+'/'+limitMonth+'/'+limitDay+' '+that.data.time);
  // var endTime = limitDate.toString().replace(/\-/g,"/");
  // endTime = new Date(endTime);
  var leftTime = parseInt((endTime.getTime()-currentTime.getTime())/1000);
  console.log(leftTime,"剩余时间",currentTime,endTime)
  var day = parseInt(leftTime/(24*60*60)),
      hour = parseInt(leftTime/(60*60)%24),
      min = parseInt((leftTime/60)%60),
      sec = parseInt(leftTime%60);
  time = day + '天' + hour + '时' +  min + '分' + sec + '秒'; 
 
  if(leftTime<0){
    time = "已结束";
    clearTimeout(timer);
  
  }else{
    timer = setTimeout(that.dateLimit,1000);
  }    
  that.setData({
    limitDate: time
  })
},

  voteSubmit:function(e){
    var that = this;
    // console.log(List,"successList");
    // that.setData({
    //   vote_option: List
    // })
    var voteRegion = that.data.vote_region;
    var regionPro = voteRegion[0],
        regionCity = voteRegion[1];
    var regionP = regionPro.substr(0,2),
        regionC = regionCity.substr(0,2);

    var user_province = app.globalData.user_province,
        user_city = app.globalData.user_city;
    var userCity = user_city.substr(0,2);
    console.log(user_province,userCity,regionP,regionC,"地区")
    var time = util.formatTime(new Date());
    var currentYear = time.substr(0,4),
        currentMonth = time.substr(5,2),
        currentDay = time.substr(8,2),
        currentHour = time.substr(11,2),
        currentMin = time.substr(14,2);
    var limitDate = that.data.date;
    var limitYear = limitDate.substr(0,4),
        limitMonth = limitDate.substr(5,2),
        limitDay = limitDate.substr(8,2),
        limitHour = limitDate.substr(11,2),
        limitMin = limitDate.substr(14,2);

    var voteLimit;
    console.log(currentYear,currentMonth,currentDay)
    console.log(limitYear,limitMonth,limitDay,'限制时间',typeof(time))

    // if(currentYear>limitYear && currentMonth>limitMonth && currentDay>limitDay
    //   || currentYear==limitYear && currentMonth>limitMonth
    //   || currentYear==limitYear && currentMonth==limitMonth && currentDay>limitDay
    //   || currentYear==limitYear && currentMonth==limitMonth && currentDay==limitDay && currentHour>limitHour
    //   || currentYear==limitYear && currentMonth==limitMonth && currentDay==limitDay && currentHour==limitHour && currentMin>=limitMin){
    if(that.data.date === "已结束"){  
        voteLimit = that.voteLimit();
    }

    else{
      if(user_province==regionP && userCity==regionC
        ||user_province==regionP && regionC=='不限'
        ||regionP=='不限' && regionC=='不限'){
  
          wx.request({
            url: config.url + '/vote/count',
            method: 'POST',
            data: {
              'add_id': app.globalData.add_id,
              'user_id': app.globalData.user_id,
              'vote_title': that.data.vote_title,
              'flag': that.data.hideShowFlag,
              'chooseOption': that.data.vote_option,
              'countAll': that.data.countAll
            },
            success: function(res) {
              console.log(res.data);
              
              if(res.data == '用户已投过票'){
                wx.showModal({
                  title: '提示',
                  content: '您已投过票',
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      var onshow = that.onShow();
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }else{
                
                that.setData({
                  vote_option: res.data.chooseOption,
                  // countAll: res.data.countAll,
                  countAllOption: res.data.countAll,
                  userCount: res.data.userCount,
                  percentFlag: false
      
                });
                // var List = that.data.vote_option;
                // for(var i=0;i<List.length;i++){
                //    List[i].flag = true;
                // }
                // that.setData({
                //   vote_option:List
                // })
      
                var confirmHide = that.confirmHide();
              }
            },
            fail: function(res) {}
          })
  
        }
        else{
          wx.showModal({
            title: '提示',
            content: '您不符合要求',
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
    
    var time = new Date();
   console.log(util.formatTime(new Date()),'时间') 
    var that = this;
    wx.request({
      url: config.url + '/add/vote',
      method: 'POST',
      data: {
        'add_id': app.globalData.add_id,
        'user_id': app.globalData.user_id
      },
      success: function(res) {
        console.log(res.data);
        var vote_type;
        console.log(res.data.vote_type)
        if(res.data.vote_type == '0'){
          vote_type = '单选';
        }else{
          vote_type = '多选';
        }
        
        that.setData({
          vote_title: res.data.vote_title,
          vote_detail: res.data.vote_detail,
          vote_type: vote_type,
          date: res.data.vote_limitDate,
          vote_option: res.data.vote_option,
          voteOption: res.data.vote_option,
          countAllOption:res.data.countAllOption,
          userCount:res.data.userCount,          
          percentFlag: false,
          vote_region: res.data.vote_region,
          hideShowFlag: res.data.flag,
          user_name: res.data.user_name,
          add_id: res.data._id
        });
        var pic = that.data.vote_option[0].pic;
        var picFlag;
        if (pic.indexOf(pic)==-1 ) {
          picFlag = 0;
        } else {
          picFlag = 1;
        }
        that.setData({
          picFlag: picFlag
        })

        // var List = that.data.vote_option;

        // for(var i=0;i<List.length;i++){
        //    List[i].flag = true;
        // }
        // that.setData({
        //   vote_option:List
        // })
        var confirmHide = that.confirmHide();
        var dateLimit = that.dateLimit();
        // var show = that.onShow();
        
        console.log(that.data.countAllOption,that.data.countAll)
      },
      fail: function(res) {
        console.log("失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏 n
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