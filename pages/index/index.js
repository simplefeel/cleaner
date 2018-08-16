//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')

Page({
    data: {
        taskData: [],
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isShowAll: false,
        isNotEmpty: false,
        hasComplete: false,
        btnText: '显示已完成事项',
        tiemInfo: '',
        num: 0 //代办数量,
    },
    //事件处理函数
    bindViewTap: function() {
        // wx.navigateTo({
        //     url: '../logs/logs'
        // })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        //获取日期
        let timeStr = util.formatTime(new Date())

        //获取初始代办事项列表
        let store = wx.getStorageSync('TASKLIST') || []

        //获取已完成的事项列表
        let domeList = []
        store.forEach((o, i) => {
            if (o.isComplete) {
                domeList.push(o)
            }
        })

        this.setData({
            doneData: domeList,
            taskData: store,
            isNotEmpty: store.length > 0,
            num: store.length - domeList.length,
            tiemInfo: timeStr
        })
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onAddClick(e) {
        this.setData({
            taskData: e.detail,
            isNotEmpty: e.detail.length > 0,
            num: e.detail.length - this.data.doneData.length
        })
    },

    onChangeTaskStatus(e) {
        let doneList = []
        e.detail.forEach((o, i) => {
            if (o.isComplete) {
                doneList.push(o)
            }
        })
        this.setData({
            taskData: e.detail,
            doneData: doneList,
            num: e.detail.length - doneList.length
        })
        wx.setStorageSync('TASKLIST', e.detail)
    },

    showAll(e) {
        let text = this.data.isShowAll ? '显示已完成事项' : '隐藏已完成事项'
        this.setData({ isShowAll: !this.data.isShowAll, btnText: text })
    },

    clearAll(e) {
        this.setData({ taskData: [], doneData: [], isNotEmpty: false })
        wx.setStorageSync('TASKLIST', [])
    }
})
