// component/movie_list/movie_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieDetail:{
      type:'Array',
      value:[]
    },
    movieTitle: {
      type: 'string',
      value: ''
    },
    moreMovie: {
      type: 'string',
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMoreMovie:function(){
      const movieType = this.properties.moreMovie;
      
      wx.navigateTo({
        url: `/pages/movie/more_movie/more_movie?tbID=${encodeURIComponent(movieType)}`,
      })
    }
  }
})
