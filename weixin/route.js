/**
 * Created by Leiyalin on 2019/5/14.
 */

export class RouteUtils {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new RouteUtils();
    }
    return this.instance;
  }

  splicingParams(paramsObj) {
    var paramsStr = '';
    for (let key in paramsObj) {
      paramsStr += key + '=' + paramsObj[key] + '&';
    }
    paramsStr = paramsStr.substring(0, paramsStr.length - 1);
    return paramsStr;
  }

  getShareMessageObj(title, path, paramsObj) {
    if (paramsObj !== null && paramsObj !== undefined && paramsObj !== '') {
      path = '/pages' + path + path + '?' + this.splicingParams(paramsObj) + '&isShowHome=1';
    } else {
      path = '/pages' + path + path + '?isShowHome=1'
    }
    return {
      title: title,
      path: path,
      success: function (res) {
        // 转发成功
        console.log("转发成功" + res);
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败" + res);
      }
    }
  }

  navigateTo(path, paramsObj) {
    let url = '/pages' + path + path;
    var pages = getCurrentPages();
    if (pages.length === 10) {
      this.redirectTo(path, paramsObj);
    } else {
      if (paramsObj === null || paramsObj === undefined || paramsObj === '') {
        wx.navigateTo({
          url: url
        })
      } else {
        wx.navigateTo({
          url: url + '?' + this.splicingParams(paramsObj)
        })
      }
    }
  }

  redirectTo(path, paramsObj) {
    let url = '/pages' + path + path;
    if (paramsObj === null || paramsObj === undefined || paramsObj === '') {
      wx.redirectTo({
        url: url
      })
    } else {
      wx.redirectTo({
        url: url + '?' + this.splicingParams(paramsObj)
      })
    }
  }

  switchTab(path) {
    let url = '/pages' + path + path;
    wx.switchTab({
      url: url
    })
  }

  reLaunch(path, paramsObj) {
    let url = '/pages' + path + path;
    if (paramsObj === null || paramsObj === undefined || paramsObj === '') {
      wx.reLaunch({
        url: url
      })
    } else {
      wx.reLaunch({
        url: url + '?' + this.splicingParams(paramsObj)
      })
    }
  }

  navigateBack(delta) {
    var pages = getCurrentPages();
    if (pages.length === 1) {
      this.redirectTo('/index')
    } else {
      wx.navigateBack({
        delta: delta
      })
    }
  }
}

