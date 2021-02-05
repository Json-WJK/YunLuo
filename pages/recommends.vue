<template>
  <div class="recommends">
    <!-- 推荐列表 -->
    <div class="recommendList">
      <div class="recommend">
        <div class="recommendBox">
          <!-- 用户、发布时间 -->
          <div class="info">
            <div class="portrait">
              <img src alt />
            </div>
            <div class="nameAndDate">
              <div class="name">地铁站的风</div>
              <div class="date">2021-02-05</div>
            </div>
          </div>
          <!-- 发布内容 -->
          <div class="content">
            <!-- 文本内容 -->
            <div class="text">芜湖起飞</div>
            <!-- 图片内容 -->
            <div class="imgs"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  onShow() {},
  onLoad() {},
  methods: {}
};
</script>

<style lang='less'>
page {
  background: #f8f8f8;
}
.recommends {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 0;
  .recommendList {
    width: 100%;
    .recommend {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20rpx;
      .recommendBox {
        width: 100%;
        background: #fff;
        border-radius: 20rpx;
        box-sizing: border-box;
        padding: 20rpx;
        .info {
          width: 100%;
          display: flex;
          align-items: center;
          .portrait {
            min-width: 60rpx;
            min-height: 60rpx;
            width: 60rpx;
            height: 60rpx;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: red;
            }
          }
          .nameAndDate {
            max-width: 80%;
            margin-left: 10rpx;
            .name {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
            .date {
              color: #aaa;
              font-size: 28rpx;
            }
          }
        }
        .content {
          .text {
            margin-top: 20rpx;
          }
          .imgs {
            margin-top: 20rpx;
          }
        }
      }
    }
  }
}
</style>

