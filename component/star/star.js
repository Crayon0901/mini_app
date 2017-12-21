// component/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // aboutMe:false
    movieDetail: {
      type: 'object',
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  // 组件生命周期函数，在组件实例进入页面节点树时执行
  attached:function(){
    console.log(this.properties.movieDetail)
    // this.setData({
    //   score: Math.round(this.properties.movieDetail/2)//判断显示多少个星星，四舍五入
    // })
  }
})
