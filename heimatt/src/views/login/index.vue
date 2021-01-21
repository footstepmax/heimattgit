<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="login-nav-bar">
      <template slot="title">
        <div class="mylogin">登录</div>
      </template>
    </van-nav-bar>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="obj.mobile"
        placeholder="请输入手机号"
        :error-message="errMsg.mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <van-field
        v-model="obj.code"
        placeholder="请输入短信验证码"
        :error-message="errMsg.code"
      >
        <template slot="left-icon">
          <i class="mylock iconfont icon-lock"></i>
        </template>
        <template #button>
          <van-button
            class="btn-code"
            size="small"
            type="primary"
            color="#eaeaea"
            round
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button
        :loading="loginLoading"
        class="btndl"
        type="info"
        size="large"
        @click="onSubmit"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { apiLogin } from "../../api/user";
export default {
  name: "login",
  data() {
    return {
      obj: {
        mobile: "13911112222",
        code: "246810",
      },
      errMsg: {
        mobile: "",
        code: "",
      },
      loginLoading: false,
    };
  },
  methods: {
    //   登录逻辑
    // 用async和await来包装请求
    onSubmit() {
      if (!this.verify()) {
        //   不通过，直接return，后续代码不执行
        return;
      }
      //   登录时设置loading状态
      this.loginLoading = true;
      //   console.log("登录成功");
      // 通过验证发送请求
      //   登录loading状态太快，为了看到效果设置定时器，与此同时，async修饰的异步代码的函数改为了setTimeout中的箭头函数
      setTimeout(async () => {
        //   用try-catch来包裹返回的结果
        try {
          let res = await apiLogin(this.obj);
          // console.log(res);
          // 登录成功后，需要将用户信息保存在vuex中，且需要保存在localstorage中
          this.$store.commit("setUser", res.data.data);
          // 打印仓库中的user数据
          // console.log(this.$store.state.user);
          this.$toast.success("登录成功");
          // 成功之后页面跳转到首页
          // 这里做路由判断，第一次登录，，登录验证打回的登录
          if (this.$route.path === "/login") {
            this.$router.push("/home");
          } else {
            this.$router.back();
          }
        } catch (error) {
          //   console.log(error);
          // 使用vant提供的提示框，在组件中使用需要加this.$
          this.$toast.fail("登录失败");
        }
        //   登录成功后取消loading状态
        this.loginLoading = false;
      }, 1000);
    },
    // 验证方法封装
    verify() {
      let isOk = [];
      if (this.obj.mobile.trim().length !== 11) {
        this.errMsg.mobile = "手机号格式有误";
        isOk.push(false);
      } else {
        this.errMsg.mobile = "";
        isOk.push(true);
      }
      if (this.obj.code.trim().length !== 6) {
        this.errMsg.code = "验证码格式有误";
        isOk.push(false);
      } else {
        this.errMsg.code = "";
        isOk.push(true);
      }
      //   直接返回，如果不包含false说明验证通过
      return !isOk.includes(false);
    },
  },
};
</script>

<style lang='less'>
.login-nav-bar {
  background-color: #3e9df8;
  .mylogin {
    color: #fff;
  }
  .van-cell__title {
    width: 50px;
  }
}
.icon-iphone {
  font-size: 25px;
}
.icon-lock {
  font-size: 25px;
}
.btn-code {
  color: #ccc !important;
}
.login-btn {
  margin: 20px 10px;

  .btndl {
    border-radius: 5px;
  }
}
</style>