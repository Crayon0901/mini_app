//app.js
App({
  onLaunch: function () {
    // require SDK
    require('./sdk-v1.1.1')
    // 初始化 SDK
    let clientID = 'e43b88faacff07c0269b'
    wx.BaaS.init(clientID)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // let tableID = 3924
    // let Product = new wx.BaaS.TableObject(tableID)
    // let product = Product.create()

    // // 设置方式一
    // let apple = {
    //   music_name: 'apple',
    //   author: 'fang'
    // }
    // product.set(apple).save().then((res) => {
    //   // success
    //   console.log(res)
    // }, (err) => {
    //   // err
    //   console.log(res)
    // })





    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     appid: 'wxa07a04787483aa04',//res.code
        //     secret: 'adb8bbe68c91eae065cb0a17259d1e03',
        //     js_code: res.code,
        //     grant_type: 'authorization_code'
        //   },
        //   success: function (data) {
        //     console.log(data);
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
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
  },
  globalData: {
    userInfo: null,
    g_IsMusicing:false
  }
})