// pages/movie/more_movie/more_movie.js
const utilData = require('../../../utils/util.js');//必须要相对路径，不然报错
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more_movie:[],
    pageCurrent:1,
    ISnoneData:false
  },
  // previewImg:function(){
  //   wx.previewImage({
  //     current: '', // 当前显示图片的http链接
  //     urls: ['https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRYjWebtuVYiVIz.jpg'] // 需要预览的图片http链接列表
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置title
    const tbID = decodeURIComponent(options.tbID);
    for (var item in utilData.moreMovieUrl){
      if (utilData.moreMovieUrl[item] == tbID) {
        wx.setNavigationBarTitle({ title: item })
      }
    }


    // var Product = new wx.BaaS.TableObject(tableID)

    // var query = new wx.BaaS.Query()
    // query.compare('amount', '>', 0)

    // Product.setQuery(query).limit(10).offset(0).find().then((res) => {
    //   // success
    // }, (err) => {
    //   // err
    // })

    this.getdata();


    
  },
  getdata:function(){
    wx.showLoading({
      title:'加载中...'
    })
    let tableID = 4122
    let recordID = ''
    let pageCurrent = this.data.pageCurrent;
    let Product = new wx.BaaS.TableObject(tableID)
    var query = new wx.BaaS.Query()
    Product.setQuery(query).limit(12 * pageCurrent).offset(12 * (pageCurrent-1)).find().then((res) => {
      // success
      console.log(res.data.objects);
      if (res.data.objects.length>0){
        this.setData({
          more_movie: this.data.more_movie.concat(res.data.objects.map(function (item, index) {
            item['score_star'] = Math.round(item.score / 2)//评分的星星数量，组件内部无法自己计算渲染
            return item
          }))
        })
      } else {
        this.setData({
          ISnoneData:true
        })
      }
      wx.hideLoading()
    }, (err) => {
      // err
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
    this.setData({
      pageCurrent: 1,
      more_movie:[],
      ISnoneData:false
    })
    this.getdata()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.ISnoneData) {
        wx.showToast({
          title: '到底啦！',
          icon:"loading",
          duration:1500
        })
    } else {
      this.setData({
        pageCurrent: ++this.data.pageCurrent
      })
      this.getdata()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})