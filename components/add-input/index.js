// components/task-list/task.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        taskStr: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleInput: function(e) {
            this.setData({ taskStr: e.detail.value })
        },
        handleClick: function() {
            if (!this.data.taskStr) {
                return
            }
            let store = wx.getStorageSync('TASKLIST') || []
            store.unshift({ value: this.data.taskStr, id: Date.now() })
            this.setData({ taskStr: '', id: Date.now() })
            wx.setStorageSync('TASKLIST', store)
            this.triggerEvent('addClick', store)
        }
    }
})
