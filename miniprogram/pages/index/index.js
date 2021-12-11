// pages/index/index.js
const app = getApp();
var startX, endX;  //首先创建2个变量 来记录触摸时的原点
var moveFlag = true;// 判断执行滑动事件

Page({

    /**
     * 页面的初始数据
     */
    data: {
      id:app.globalData.userid,
      page : 1,
      ani1: '',
      ani2: '',
      currentab: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        id:app.globalData.userid
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
      //console.log(this.data.id)
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

    },

    touchStart: function (e) {
 
      startX = e.touches[0].pageX; // 获取触摸时的原点
   
      moveFlag = true;
   
    },
    // 触摸移动事件
    touchMove: function (e) {
      endX = e.touches[0].pageX; // 获取触摸时的原点
      if (moveFlag) {
        if (endX - startX > 50) {
          console.log("move right");
          this.move2right();
          moveFlag = false;
        }
        if (startX - endX > 50) {
          console.log("move left");
          this.move2left();
          moveFlag = false;
        }
      }
    },
    // 触摸结束事件
    touchEnd: function (e) {
      moveFlag = true; // 回复滑动事件
    },
    clicktab1:function(e){
      this.move2right();
     this.setData({
       currentab:0
     })
  console.log('广场')
    },
    clicktab2:function(e){
      this.move2left();  
      this.setData({
        currentab:1
      })
      console.log('关注')
    },
    //向左滑动操作
    move2left() {
      var that = this;
      if (this.data.page == 2) { 
        return
      }
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 100
      });
      animation.opacity(0.2).translate(-500, 0).step()
      this.setData({ 
        ani1: animation.export() 
      })
      setTimeout(function () {
        that.setData({
          page: 2, 
          ani2: '',
          currentab:1
        });
      }, 300) 
    },
   
    //向右滑动操作
    move2right() {
      var that = this;
      if (this.data.page == 1) {
        return
      }
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        delay: 100
      });
      animation.opacity(0.2).translate(500, 0).step()
      this.setData({
        ani2: animation.export()
      })
      setTimeout(function () {
        that.setData({
          page: 1,
          ani1: '',
          currentab:0
        });
      }, 300)
    }

})