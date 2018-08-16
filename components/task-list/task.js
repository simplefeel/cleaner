const util = require('../../utils/util.js')

// components/task-list/task.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        taskData: Array,
        hasComplete: Boolean,
        num: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        startX: 0, //开始坐标
        startY: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        touchstart: function(e) {
            let that = this
            that.data.taskData.forEach((o, i) => {
                if (o.isTouchMove) {
                    o.isTouchMove = false
                }
            })
            this.setData({
                startX: e.changedTouches[0].clientX,
                startY: e.changedTouches[0].clientY,
                taskData: that.data.taskData
            })
        },

        touchmove: function(e) {
            var that = this,
                index = e.currentTarget.dataset.index, //当前索引
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
            that.data.taskData.forEach((o, i) => {
                if (i === index) {
                    if (angle === 3) {
                        o.isTouchMove = true
                    }
                    if (angle === 4) {
                        o.isTouchMove = false
                    }
                }
            })
            this.setData({ taskData: that.data.taskData })
        },

        handleDel: function(e) {
            this.data.taskData.splice(e.currentTarget.dataset.index, 1)
            this.setData({ taskData: this.data.taskData })
            this.triggerEvent('changeTaskStatus', this.data.taskData)
        },

        checkboxChange: function(e) {
            let _index = e.detail.value[0],
                that = this
            that.data.taskData.forEach((o, i) => {
                if (o.id === Number(_index)) {
                    o.isComplete = true
                }
            })
            this.triggerEvent('changeTaskStatus', that.data.taskData)
        }
    }
})
