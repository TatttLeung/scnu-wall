// pages/index/personinfo.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:app.globalData.userid,
        perinfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.setData({
            userid:app.globalData.userid
        })
        this.getPerinfo()
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

    async getPerinfo(){
        wx.cloud.database().collection("user")
        .doc(this.data.userid)
        .get()
        .then(res=>
            {
                console.log("单条数据查询",res.data);
                this.setData({
                    perinfo:res.data //单条数据赋值给perinfo
                })
            }) 
            .catch(err=>{
                console.log("单条数据查询失败")
            })
    },
    logOut: function() {
        app.globalData.userid=null
        wx.navigateTo({
          url: '/pages/login/login'
        })
    }
})