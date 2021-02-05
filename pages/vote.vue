<template>
  <div class="vote">
    <!-- 投票标题and分享按钮 -->
    <div class="titleAndShare">
      <div class="title">吃啥，自己报名咯！</div>
      <div class="share">
        <img src="@/static/image/share.png" alt />
        <button class="shareButton" open-type="share">分享</button>
      </div>
    </div>
    <!-- 投票列表 -->
    <div class="voteList">
      <div v-for="(item, index) in voteList" :key="index" @click="setVote(item)" class="voteItem">
        <div class="title">{{ item.name }}</div>
        <div class="right">
          <span class="num">{{ item.voteNum || 0 }}人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, votePort } from "@/static/port/cloudPort";
import { getNowFormatDate } from "@/static/utils";
export default {
  components: {},
  data() {
    return {
      voteList: []
    };
  },
  computed: {},
  watch: {},
  onShow() {
    wx.showShareMenu();
    this.getVoteList();
    this.watchVoteRes();
  },
  onLoad() {},
  methods: {
    // 获取投票列表
    getVoteList() {
      votePort.getVoteList().then(res => {
        console.log(res, "可投票列表");
        this.voteList = res.data;
        this.getVoteRes();
      });
    },
    // 获取投票情况
    getVoteRes() {
      votePort.getVoteRes().then(res => {
        this.voteList = this.voteList.map(el => {
          el.voteNum = 0;
          res.data.map(item => {
            item.voteItemId == el._id && (el.voteNum += 1);
          });
          return el;
        });
        console.log(this.voteList, res, "投票情况");
      });
    },
    // 即时获取图片情况
    watchVoteRes() {
      db.collection("voteRes")
        .where({ date: getNowFormatDate() })
        .watch({
          onChange: snapshot => {
            this.getVoteRes();
          },
          onError: err => {
            console.error("the watch closed because of error", err);
          }
        });
    },
    // 点击投票
    setVote(item) {
      wx.showModal({
        title: "报名确认",
        content: "确定要报名吃 " + item.name + " 吗？",
        success(res) {
          if (res.confirm) {
            wx.showLoading({ title: "报名中", mask: true });
            votePort.isVote().then(res => {
              if (res.data.length) {
                wx.hideLoading();
                if (res.data[0].voteItemId != item._id) {
                  wx.showModal({
                    title: "善变之人（渣男）",
                    content: "今天已经报名了，是否修改报名结果？",
                    confirmText: "我是渣男",
                    success(successRes) {
                      if (successRes.confirm) {
                        votePort
                          .updateVote({ _id: res.data[0]._id, id: item._id })
                          .then(updateVoteRes => {
                            wx.showToast({
                              title: "报名成功",
                              icon: "none",
                              mask: true
                            });
                          });
                      }
                    }
                  });
                } else {
                  wx.showModal({
                    title: "别点了",
                    content: "今天已经报名了" + item.name + "，你忘了吗？",
                    confirmText: "我知道了",
                    showCancel: false,
                    success(res) {}
                  });
                }
              } else {
                votePort.setVote(item._id).then(res => {
                  wx.hideLoading();
                  wx.showToast({
                    title: "报名成功",
                    icon: "none",
                    mask: true
                  });
                  this.getVoteList();
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang='less'>
page {
  background: #f8f8f8;
}
.vote {
  .titleAndShare {
    box-sizing: border-box;
    padding: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .share {
      position: relative;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .shareButton {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .voteList {
    .voteItem {
      width: 100%;
      height: 100rpx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20rpx;
      margin-bottom: 16rpx;
      box-shadow: rgb(200, 200, 200) 0rpx 0rpx 10rpx;
      .title {
        font-size: 30rpx;
      }
      .right {
        .num {
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
