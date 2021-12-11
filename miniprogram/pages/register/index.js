// pages/register/index.js
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
const userCollection = db.collection('user');//注意，这里就是刚才的集合的名字——user
let sname = null;//变量，用于存放用户输入的账号
let pwd = null;//变量，用于存放用户输入的密码
let grade=null;
let project=null;
let nickname=null;
let gradeData=['',18,19,20,21];
let idx;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      index:0,
      gradeArr:['',18,19,20,21]
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

    bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value
      })
      idx = this.data.index;
      grade = gradeData[idx];
    },

    //输入用户名
  inputName: function (event) {
    sname  = event.detail.value//将用户输入的账号放到变量里面
  },
  //输入密码
  inputPassword(event) {
    pwd = event.detail.value//将用户输入的密码放到变量里面
  },
  inputGrade(event){
    grade = event.detail.value
  },
  inputnickname(event){
    nickname = event.detail.value
  },
  inputproject(event){
    project = event.detail.value
  },
  
  register:function(evt)//注册函数
  {
    let flag = false  //表示账户是否存在,false为初始值
    if(sname===null || pwd===null || grade===null||nickname===null||project===null)
    {
      wx.showToast({
        title: '没填写相关信息',
        icon: 'error',
        duration: 2500
      })
    } else{
    userCollection.get({
      success: (res) => {
        let user = res.data;  //获取到的对象数组数据
        //console.log(user);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (sname === user[i].stuname) { //账户已存在
            flag = true;
            break;
          }
        }
        if (flag === true) {  //账户已存在
          wx.showToast({
            title: '账号已注册！',
            icon: 'error',
            duration: 1500
          })
        }
        else {  //账户未注册
          userCollection.add({
            data:{
              stuname:sname,
              password:pwd,
              name:nickname,
              fans:0,
              grade:grade,
              project:project,
              trade:0,
              subscribe:0,
              msg:0
            }
          })
          wx.showToast({	//显示注册成功信息
            title: '注册成功！',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){wx.navigateTo({  //等待显示成功信息后再跳转
            url: "/pages/login/login", //注册成功后跳转页面
          })},1500)
        }
      }
    })
  }
  }


  
})