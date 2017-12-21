// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },
  //跳转详情页
  handleTapToDetail:function(e){
    const id = e.currentTarget.dataset.id;
    console.log('eeeeeeeeeee', id);
    wx.navigateTo({
      url: `./new_detail/new_detail?id=${encodeURIComponent(id)}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('options is', decodeURIComponent(options.name));
    wx.showLoading({title:'加载中',mask:true})
    let tableID = 4032
    let recordID = '';//查询全部id则recordID制空即可，在返回的数据中res.data.objects即为全部数据的数组

    let Product = new wx.BaaS.TableObject(tableID)

    Product.get(recordID).then((res) => {
      // success
      console.log(res.data)
      this.setData({
        array: res.data.objects
      })
      wx.hideLoading()
    }, (err) => {
      // err
      console.log(err)
    })
  },
  // onPullDownRefresh:function(){
  //   wx.showToast({ title: '成功', icon:'success'})
  // },
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