const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const week = date.getDay()
    let xingqi
    switch (week) {
        case 0:
            xingqi = '星期日'
            break
        case 1:
            xingqi = '星期一'
            break
        case 2:
            xingqi = '星期二'
            break
        case 3:
            xingqi = '星期三'
            break
        case 4:
            xingqi = '星期四'
            break
        case 5:
            xingqi = '星期五'
            break
        case 6:
            xingqi = '星期六'
            break
        default:
            xingqi = '系统错误！'
    }

    return [year, month, day].map(formatNumber).join('/') + ' ' + xingqi
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
const GetSlideDrection = function(startX, startY, endX, endY) {
    var dy = endY - startY

    var dx = endX - startX

    var result = 0

    //如果滑动距离太短

    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result
    }

    var angle = GetSlideAngle(dx, dy)

    if (angle >= -45 && angle < 45) {
        result = 4
    } else if (angle >= 45 && angle < 135) {
        result = 1
    } else if (angle >= -135 && angle < -45) {
        result = 2
    } else if (
        (angle >= 135 && angle <= 180) ||
        (angle >= -180 && angle < -135)
    ) {
        result = 3
    }

    return result
}

const GetSlideAngle = function(dx, dy) {
    return (Math.atan2(dy, dx) * 180) / Math.PI
}

module.exports = {
    formatTime: formatTime,
    GetSlideDrection: GetSlideDrection
}
