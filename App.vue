<script>
export default {
  onLaunch: function() {
    // console.log('App Launch')
    wx.cloud.init();
    wx.cloud
      .callFunction({ name: "index", data: { api: "getUserInfo" } })
      .then(res => {
        wx.setStorageSync("openId", res.result.openid);
      });
  },
  onShow: function() {
    // console.log('App Show')
  },
  onHide: function() {
    // console.log('App Hide')
  }
};
</script>

<style>
/*每个页面公共css */
page {
  font-size: 32rpx;
}
</style>
