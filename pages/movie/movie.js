// pages/movie/movie.js
const utilData = require('../../utils/util.js');//必须要相对路径，不然报错
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_showing: [],
    coming_soon: [{
      name: 'INCEPTION',
      score: 6.3,
      score_star: 3,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRHnBfHpGScQdOc.jpg'
    }, {
      name: 'UNKNOWN',
      score: 9.1,
      score_star: 5,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRHnBpLPwpmIWmA.jpg'
    }, {
      name: '沙漠至尊',
      score: 2.1,
      score_star: 1,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRHnBewefozpGWT.jpg'
    }],
    top_50: [{
      name: '蜘蛛侠3',
      score: 6.3,
      score_star: 4,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRHnBLIZgPLtloq.jpg'
    }, {
      name: '杀破狼',
      score: 9.1,
      score_star: 5,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRHnBEtPIIEtFcw.jpg'
    }, {
      name: '美国队长',
      score: 5.8,
      score_star: 3,
      poster_url: 'https://cloud-minapp-7991.cloud.ifanrusercontent.com/1eRYjWebtuVYiVIz.jpg'
    }],
    title: [],
    moreMovieUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  InputSearch: function (e) {
    var value = e.detail.value;
    // 实例化查询对象
    var query = new wx.BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    query.contains('name', value);

    // 应用查询对象
    var Product = new wx.BaaS.TableObject(4122)
    Product.setQuery(query).find().then((res) => {
      // success
      console.log(res)
    }, (err) => {
      // err
      console.log(err)
    })
  },
  onLoad: function (options) {
    for (var item in utilData.moreMovieUrl) {
      this.setData({
        title: [...this.data.title, item],
        moreMovieUrl: [...this.data.moreMovieUrl, utilData.moreMovieUrl[item]]
      })
    }
    console.log(this.data);
    let tableID = 4122
    let recordID = ''

    let Product = new wx.BaaS.TableObject(tableID)

    Product.get(recordID).then((res) => {
      // success
      console.log(res.data)
      this.setData({
        hot_showing: res.data.objects.map(function (item, index) {
          item['score_star'] = Math.round(item.score / 2)//评分的星星数量，组件内部无法自己计算渲染
          console.log(item)
          return item
        })
      })
      console.log(this.data.hot_showing)
    }, (err) => {
      // err
    })
    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/top250',
    //   data:{},
    //   method:'GET',
    //   header:{
    //     "Content-Type":"application/xml"
    //   },
    //   success:function(res){
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
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