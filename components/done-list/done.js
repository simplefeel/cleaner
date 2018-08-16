// components/done-list/done.js
const util = require('../../utils/util.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        doneData: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        startX: 0, //开始坐标
        startY: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        touchstart: function(e) {
            let that = this
            that.data.doneData.forEach((o, i) => {
                if (o.isTouchMove) {
                    o.isTouchMove = false
                }
            })
            this.setData({
                startX: e.changedTouches[0].clientX,
                startY: e.changedTouches[0].clientY,
                doneData: that.data.doneData
            })
        },

        touchmove: function(e) {
            var that = this,
                id = e.currentTarget.dataset.index, //当前索引
                startX = that.data.startX, //开始X坐标
                startY = that.data.startY, //开始Y坐标
                touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
                touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
                //获取滑动角度
                angle = util.GetSlideDrection(
                    startX,
                    startY,
                    touchMoveX,
                    touchMoveY
                )
            that.data.doneData.forEach((o, i) => {
                if (o.id === id) {
                    if (angle === 3) {
                        o.isTouchMove = true
                    }
                    if (angle === 4) {
                        o.isTouchMove = false
                    }
                }
            })
            this.setData({ doneData: that.data.doneData })
        },

        handleDel: function(e) {
            let _id = e.currentTarget.dataset.id,
                _index
            let store = wx.getStorageSync('TASKLIST') || []
            store.forEach((o, i) => {
                if (o.id === Number(_id)) {
                    _index = i
                }
            })
            store.splice(_index, 1)
            this.triggerEvent('changeTaskStatus', store)
        },
        checkboxChange: function(e) {
            let selectCol = e.detail.value
            let doneData = this.data.doneData
            let unSelectCol = ''
            doneData.forEach((o, i) => {
                if (selectCol.indexOf(o.id + '') === -1) {
                    unSelectCol = o.id
                }
            })

            let store = wx.getStorageSync('TASKLIST') || []
            store.forEach((o, i) => {
                if (o.id === Number(unSelectCol)) {
                    o.isComplete = false
                }
            })
            this.triggerEvent('changeTaskStatus', store)
        }
    }
})
