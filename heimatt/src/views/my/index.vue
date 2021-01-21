<template>
  <div class="my">
    <!-- 用户信息 -->
    <div class="userInfo" v-if="isLogin">
      <div class="msg">
        <div class="uimg" @click="$router.push('/userinfo')"><img src="@/assets/dog.jpg" alt="" /></div>
        <div class="uname">稳如老狗</div>
        <div class="utoday">
          <div>今日阅读</div>
          <div>1分钟</div>
        </div>
      </div>
      <div class="fansbox">
        <div class="dongtai">
          <span>3295</span>
          <span>动态</span>
        </div>
        <div class="follow">
          <span>3295</span>
          <span>关注</span>
        </div>
        <div class="fans">
          <span>3295</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <div class="userInfo" v-else>
      <div class="box" @click="$router.push('/checklogin')">
        <van-icon class="usericon" name="user-o" />
      </div>
    </div>
    <!-- 收藏区域 -->
    <van-grid :column-num="3" class="star" :border="false">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" class="middle" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 消息区域 -->
    <van-cell-group class="message">
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link @click="$router.push('/robot')" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入获取用户自己信息的接口
import { apiGetUser } from "@/api/user";
export default {
  data() {
    return {
      isLogin: false,
      // 保存用户信息,
      userInfo: {},
    };
  },
  async created() {
    // 判断用户是否登录，不用$login,因为这就是登录页面，不需要返回
    let user = this.$store.state.user;
    if (user.token) {
      this.isLogin = true;
      let res = await apiGetUser();
      // 接口报401，就不渲染了
      this.userInfo=res.data.data
      console.log(res);
    } else {
      this.isLogin = false;
    }
  },
};
</script>

<style lang='less'>
.my {
  background-color: #f5f7f9;
}
.userInfo {
  height: 160px;
  background-color: #3e9df8;
  padding: 20px;
}
.msg {
  display: flex;
  position: relative;
  margin-top: 20px;
  .uimg {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }
  .uname {
    color: #fff;
    font-size: 20px;
    margin-left: 20px;
  }
  .utoday {
    position: absolute;
    right: -20px;
    top: 18px;
    padding: 2px 16px;
    font-size: 15px;
    border-radius: 25px 0 0 25px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
}
.fansbox {
  display: flex;
  text-align: center;
  div {
    display: flex;
    flex: 1;
    margin: 20px;
    color: #fff;
    flex-direction: column;
  }
}
.star {
  margin-bottom: 10px;
  .middle {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
}
.box {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  line-height: 60px;
  .usericon {
    font-size: 50px;
  }
}
</style>