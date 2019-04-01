/**
 * Created by Leiyalin on 2019/3/31.
 */

export class WxApiUtils {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new WxApiUtils();
    }
    return this.instance;
  }

  setSysCodeAndName(options) {
    if (utils.isNotNull(options.syscode) && utils.isNotNull(options.sysname)) {
      const app = getApp();
      app.globalData.syscode = options.syscode;
      app.globalData.sysname = options.sysname;
    }
  }

  setChannelid(options) {
    if (utils.isNotNull(options.channelid) && utils.isNotNull(options.channelname)) {
      const app = getApp();
      app.globalData.channelid = channelid;
      app.globalData.channelname = channelname;
      app.globalData.channelsource = 3;
    }
  }

  showWarnToast(title) {
    wx.showToast({
      image: '/pages/images/tishi.png',
      title: title,
      icon: 'none',
    })
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

  getUserInfo(userInfoCallback) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              userInfoCallback(res.userInfo);
            }
          });

        }
      }
    })
  }

  getNavigationBarHeight() {
    const app = getApp();
    let statusBarHeight = app.globalData.statusBarHeight;
    let navigationBarHeight = app.globalData.navigationBarHeight;
    return statusBarHeight + navigationBarHeight;
  }

  getNavigationBar(title, isShowHome) {
    const app = getApp();
    let statusBarHeight = app.globalData.statusBarHeight;
    let navigationBarHeight = app.globalData.navigationBarHeight;
    var navigationObj = {
      statusBarHeight: statusBarHeight,
      navigationBarHeight: navigationBarHeight,
      title: title,
      isShowHome: isShowHome,
      height: statusBarHeight + navigationBarHeight
    };

    return navigationObj;
  }

  /*跳转到首页*/
  navigateToHome() {
    console.log('触发公共返回首页方法')
    this.redirectTo('/index');
  }

  /*回退上一级或者首页 */
  back(obj) {
    if (obj) {
      this.navigateToHome();
    } else {
      this.navigateBack(1);
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

  splicingParams(paramsObj) {
    var paramsStr = '';
    for (let key in paramsObj) {
      paramsStr += key + '=' + paramsObj[key] + '&';
    }
    paramsStr = paramsStr.substring(0, paramsStr.length - 1);
    return paramsStr;
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

