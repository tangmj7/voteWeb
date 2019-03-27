var app = getApp();

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
//查看
function bindEye(e){
  var _add_id = e.target.dataset.add;
  app.globalData.add_id = _add_id;
  console.log(_add_id,app.globalData.add_id,"3333")
  wx.navigateTo({
    url: '/pages/voteHtml/voteHtml'
  })
}
//分享
function share(res) {
  var voteId = res.target.dataset.add,
      nickname = res.target.dataset.user;
  var shareTitle = nickname ? nickname : '朋友';
  if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
  }
  console.log(nickname,"name",voteId,shareTitle)
  var result = {
    title: shareTitle + '等你投一票！',
    desc: '最具人气的小程序开发联盟!',
    path: '/pages/vote/vote?shareFrom=share&nickname=' + nickname + '&voteId=' + voteId,
    success: function(res) {
        // 转发成功

    }
}
  return result;
}
module.exports = {
  formatTime: formatTime,
  bindEye: bindEye,
  share: share
}
