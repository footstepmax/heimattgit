<template>
  <div class="robot">
    <!-- 头部导航 -->
    <van-nav-bar
      fixed
      class="login-nav-bar"
      left-arrow
      @click-left="$router.back()"
    >
      <template slot="title">
        <div class="mylogin">首页</div>
      </template>
    </van-nav-bar>
    <!-- 聊天框 -->
    <div class="chatBox">
      <div class="chat">
        <div class="chatimg">
          <img src="@/assets/dog.jpg" alt="" />
        </div>
        <div class="chatmsg">你好</div>
      </div>
      <div class="chat person">
        <div class="chatimg">
          <img src="@/assets/dog.jpg" alt="" />
        </div>
        <div class="chatmsg">你好</div>
      </div>
    </div>
    <!-- 输入框 -->
    <van-search
      class="sendMsg"
      v-model="value"
      shape="round"
      show-action
      placeholder="输入内容"
      @search="onSearch"
    >
      <template slot="left-icon">
        <van-icon name="edit" />
      </template>
      <template slot="action">
        <div @click="onSearch">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      console.log("hhh");
    },
  },
};
</script>

<style lang='less' scope>
.login-nav-bar {
  background-color: #3e9df8;
  .van-icon {
    color: #fff;
  }
  .mylogin {
    color: #fff;
  }
  .van-cell__title {
    width: 50px;
  }
}
.sendMsg {
  margin-top: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ccc;
}
.chatBox {
  position: fixed;
  top: 46px;
  left: 0;
  bottom: 54px;
  width: 100%;
  .chat {
    display: flex;
    align-items: center;
    margin: 10px;
    .chatimg img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .chatmsg {
      border: 2px solid #ccc;
      border-radius: 12px;
      padding: 5px 10px;
      margin:0 10px;
    }
  }
  .person{
      flex-direction: row-reverse;
  }
}
</style>