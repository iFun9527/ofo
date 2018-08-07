// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:{
      num:0,
      desc:''
    },
    actionText:'拍摄/相册',
    picUrls:[],
    checkboxValues:[],
    itemsValue:[{
      value:'私锁私用',
      checked:false,
      color: '#b9dd08'
    }, {
        value: '车牌缺损',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '轮胎坏了',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '车锁坏了',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '违规乱停',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '密码不对',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '刹车坏了',
        checked: false,
        color: '#b9dd08'
      }, {
        value: '其他故障',
        checked: false,
        color: '#b9dd08'
      }],
      btnColor:'#f2f2f2'
  },
  changeCheckbox:function(e){
    console.log(e);
    var _value = e.detail.value;
    if(_value.length == 0){
     this.setData({
       btnColor: '#f2f2f2',
       checkboxValues: []
     })
    }else{
      this.setData({
        checkboxValues:_value,
        btnColor:'#b9dd08'
      })
    }
  },
  clickPhoto:function(){
    wx.chooseImage({
      success:(res) => {
        console.log(res);
        var _picUrls = this.data.picUrls;
        var _tfs = res.tempFilePaths;
        for(let temp of _tfs){
          _picUrls.push(temp);
          this.setData({
            picUrls: _picUrls,
            actionText: "+"
          })
        }
      }
    })
  },
  delPic:function(e){
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index,1);
    this.setData({
      picUrls:_picUrls
    })
    if(_picUrls.length == 0){
      this.setData({
        actionText:'拍摄/相册'
      })
    }
  },
  changeNumber:function(){
    this.setData({
      inputValue:{
        num:e.detail.value,
        desc:this.data.inputValue.desc
      }
    })
  },
  changeDesc: function () {
    this.setData({
      inputValue: {
        num: e.detail.inputValue.num,
        desc: this.detail.value
      }
    })
  },
  submit:function(){
    if(this.data.picUrls.length > 0 && this.data.checkboxValues.length > 0){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b66b4861fc80e53a3ad625c/submitSuccess',
        success:(res) => {
          wx.showToast({
            title: '提交成功',
            icon:'success'
          })
        }
      })
    }else{
      wx.showModal({
        title: '请填写完整的反馈信息',
        content: '你愁啥，快去填',
        confirmText:'我怂我填',
        cancelText:'劳资不填',
        success:(res) => {
          if(res.confirm){

          }else{
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }
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
  
  }
})