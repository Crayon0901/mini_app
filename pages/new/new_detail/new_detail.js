// pages/new/news_detail/new_detail.js
const backgroundAudioManager = wx.getBackgroundAudioManager();
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsMusicing: false
  },
  previewImg:function(e){
    console.log(e);
    
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  handlechangecollect: function () {
    wx.getUserInfo({
      success: function (data) {
        console.log('datadatadatadatadata', data);
      }
    })
    wx.showLoading({ title: '加载中', mask: true })
    let tableID = 4032
    let recordID = this.data.id ? this.data.id : ''

    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.getWithoutData(recordID)
    console.log(!this.data.collect_state)
    product.set('collect_state', !this.data.collect_state)
    product.update().then((res) => {
      // success
      console.log(res.data)
      this.setData({ ...res.data })
      wx.hideLoading()
    }, (err) => {
      // err
    })
  },
  handlechangeshare: function () {
    wx.showLoading({ title: '加载中', mask: true })
    let tableID = 4032
    let recordID = this.data.id ? this.data.id : ''

    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.getWithoutData(recordID)
    console.log(!this.data.share_state)
    product.set('share_state', !this.data.share_state)
    product.update().then((res) => {
      // success
      console.log(res.data)
      this.setData({ ...res.data })
      wx.hideLoading()
    }, (err) => {
      // err
    })
  },
  handlemusic: function () {
    backgroundAudioManager.title = this.data.music_title;
    backgroundAudioManager.epname = this.data.epname;
    backgroundAudioManager.singer = this.data.singer;
    backgroundAudioManager.coverImgUrl = this.data.coverImgUrl;
    const IsMusicing = this.data.IsMusicing;
    if (backgroundAudioManager.src === this.data.music_url) {//先判断当前全局播放器的url是否跟当前页面一致
      if (IsMusicing) {
        backgroundAudioManager.pause();
        this.setData({
          IsMusicing: false
        })
        app.globalData.g_IsMusicing = false;
      }
      else {
        backgroundAudioManager.play();
        this.setData({
          IsMusicing: true
        })
        app.globalData.g_IsMusicing = true;
      }
    } else {
      backgroundAudioManager.src = this.data.music_url;
      this.setData({
        IsMusicing: true
      })
      app.globalData.g_IsMusicing = true;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(backgroundAudioManager.paused)
    // if (backgroundAudioManager.paused === false) {
    //   console.log('1111');
    //   this.setData({
    //     IsMusicing: !backgroundAudioManager.paused
    //   })
    //   console.log(this.data.IsMusicing)
    // }


    // wx.onBackgroundAudioPlay(function () {
    //   this.setData({
    //     IsMusicing: true
    //   })
    // });
    // wx.onBackgroundAudioPause(function () {
    //   this.setData({
    //     IsMusicing: false
    //   })
    // });
    const id = decodeURIComponent(options.id)
    console.info('options is', id);
    wx.showLoading({ title: '加载中', mask: true })
    let tableID = 4032
    let recordID = id;//查询全部id则recordID制空即可，在返回的数据中res.data.objects即为全部数据的数组

    let Product = new wx.BaaS.TableObject(tableID)

    Product.get(recordID).then((res) => {
      // success
      console.log(res.data)
      this.setData({ ...res.data });
      wx.setNavigationBarTitle({ title: res.data.content_title })
      console.log(app.globalData.g_IsMusicing);
      //全部播放器则使用全局变量控制播放状态,并判断当前进入的页面歌曲与正在播放的歌曲是否是同一首歌
      this.setData({
        IsMusicing: res.data.music_url === backgroundAudioManager.src?app.globalData.g_IsMusicing :false
      })
      
      wx.hideLoading()
    }, (err) => {
      // err
      console.log(err)
    })
    // var that = this;
    // backgroundAudioManager.onPlay(function () {
    //   console.log('播放了')
    //   that.setData({
    //     IsMusicing: true
    //   })
    // })
    // backgroundAudioManager.onPause(function () {
    //   console.log('暂停了')
    //   that.setData({
    //     IsMusicing: false
    //   })
    // })
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