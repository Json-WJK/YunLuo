import { getNowFormatDate } from '../utils';
wx.cloud.init()

const db = wx.cloud.database({
  env: "wjk-json"
});
const openId = () => wx.getStorageSync('openId')

const votePort = {
  getUserInfo: () => wx.cloud.callFunction({ name: "index", data: { api: "getUserInfo" } }), // 获取用户信息
  getVoteList: () => db.collection("vote").get(), // 获取投票列表
  getVoteRes: () => db.collection("voteRes").where({ date: getNowFormatDate() }).get(), // 获取今日投票情况
  isVote: () => db.collection("voteRes").where({ date: getNowFormatDate(), openId: openId() }).get(), // 查询用户今日是否投过票
  setVote: id => db.collection('voteRes').add({ data: { date: getNowFormatDate(), openId: openId(), voteItemId: id } }), // 用户投票
}

export { db, openId, votePort }