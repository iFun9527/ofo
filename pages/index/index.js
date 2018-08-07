// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'113.62',
    latitude:'24.84',
  },
  bindcontroltap:function(e){
    switch(e.controlId){
      case 1 :
        this.movetoCenter();
        break;
      case 2 :
        if(this.timer){
          wx.navigateBack({
            delta:1
          })
        }else{
          wx.scanCode({
            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              wx.request({
                url: 'https://www.easy-mock.com/mock/5b66b4861fc80e53a3ad625c/password',
                success: (res) => {
                  console.log(res);
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: () => {
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              })
            },
            fail: () => {
              console.log(1212)
            }
          })
        }
       break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = options.timer;
    console.log("onLoad");
    wx.getLocation({
      success: res => {
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls:[{
            id:1,
            iconPath:"/images/location.png",
            position:{
              width:50,
              height:50,
              left:20,
              top:res.windowHeight - 80
            },
            clickable:true
          },{
            id:2,
            iconPath:"/images/use.png",
            position:{
              width:90,
              height:90,
              left:res.windowWidth/2 - 45,
              top:res.windowHeight - 125
            },
            clickable:true
          },{
            id:3,
            iconPath:"/images/warn.png",
            position:{
              width:50,
              height:50,
              left:res.windowWidth - 70,
              top:res.windowHeight - 80
            },
            clickable:true
          },{
            id:4,
            iconPath:"/images/avatar.png",
            position:{
              width:50,
              height:50,
              left:res.windowWidth - 70,
              top:res.windowHeight - 155
            },
            clickable:true
          },{
            id:5,
            iconPath:"/images/marker.png",
            position:{
              width:30,
              height:45,
              left:res.windowWidth/2 - 15,
              top:res.windowHeight/2 - 45
            }
          }]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  movetoCenter: function () {
    this.mapctx.moveToLocation();
  },
  onShow: function () {
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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