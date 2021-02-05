<script>
import { common, votePort } from "static/port/cloudPort";
export default {
  onLaunch: function() {
    // console.log('App Launch')
    common.getUserInfo().then(res => {
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
