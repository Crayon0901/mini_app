//index.js
//获取应用实例
const app = getApp()
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    motto: '初始化info',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    muscisrc:'',
    musciauthor:'',
    musciname:'',
    musicposter:'',
    danmulist: [],
    videotime:0
  },
  bindvideo:function(e){
    this.setData({
        // videotime: Math.ceil(e.detail.currentTime)
        videotime: Math.ceil(e.detail.currentTime)+1   //手机有延迟，需要加一秒
      })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  SkipPage: function () {
    var a = '1 2 3' 
    wx.switchTab({//跳转到带tab选项的页面
      url: `../new/new?name=${encodeURIComponent(a)}`
    })
  },
  bindInputBlur: function (e) {
    const vd = wx.createVideoContext('myVideo');
    console.log(this.data.videotime)
    this.setData({
      ...this.data,
      danmulist: [...this.data.danmulist,
      {
        text:e.detail.value,
        color: getRandomColor(),
        time: this.data.videotime
      }]
    })
    console.log(this.data.danmulist)
  },
  getdata: function () {
    this.audioCtx = wx.createAudioContext('temp_Audio')
    this.audioCtx.play()
    let tableID = 3924
    let recordID = '5a30c5ed09a80529ae53d7c0'

    let Product = new wx.BaaS.TableObject(tableID)

    Product.get(recordID).then((res) => {
      // success
      console.log(res.data)
      this.setData({
        muscisrc: res.data.pathname,
        musciauthor: res.data.author,
        musciname: res.data.music_name,
        musicposter: res.data.poster
      })
      console.log(this.data);
    }, (err) => {
      // err
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '方晓辉个人小程序_DemoTest',
      path: '/page/index'
    }
  }
})
