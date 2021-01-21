<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="save"
    ></van-nav-bar>
    <!-- 个人信息 -->
    <van-cell-group>
      <van-cell @click="openimg" title="头像" is-link>
        <template slot="default">
          <img class="img" :src="userInfo.photo" alt="" />
        </template>
      </van-cell>
      <van-cell @click="openNick" title="昵称" is-link :value="userInfo.name" />
      <van-cell title="介绍" is-link :value="user.intro" />
    </van-cell-group>
    <van-cell-group class="secondBox">
      <!-- 1为女，0位男 -->
      <van-cell title="性别" is-link :value="userInfo.gender ? '女' : '男'" />
      <van-cell title="生日" is-link :value="userInfo.birthday" />
    </van-cell-group>
    <!-- 昵称弹出框 -->
    <van-popup v-model="nickShow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="userInfo.name" required />
    </van-popup>
    <!-- 修改头像弹出框 -->
    <van-dialog
      v-model="imgShow"
      :show-confirm-button="false"
      :style="{ borderRadius: '10px' }"
    >
      <div class="imgbox">
        <div @click="openfile">从相册中选择</div>
        <div style="display: none">
          <input type="file" ref="myfile" @change="imgChange" />
        </div>
        <div>拍照</div>
        <div @click="imgShow = false">取消</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 导入获取用户资料的接口
import { apiGetSelf, apiGetUser, apiSetUser,apiSetPhoto } from "@/api/user";
// 使用vant中的图片预览
import Vue from "vue";
import { ImagePreview } from "vant";

// 全局注册
Vue.use(ImagePreview);

export default {
  data() {
    return {
      userInfo: {},
      user: {},
      // 控制昵称修改面板的显示和隐藏
      nickShow: false,
      // 控制修改头像的面板显示和隐藏
      imgShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async save() {
      try {
        // 将数据提交到服务器中
        await apiSetUser({
          name: this.userInfo.name,
          intro: this.user.intro,
          gender: this.userInfo.gender,
          birthday: this.userInfo.birthday,
        });
        // 提示用户信息修改完成
        this.$toast.success("用户信息已更新");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
    // 打开修改昵称
    openNick() {
      this.nickShow = true;
    },
    // 打开头像面板
    openimg() {
      this.imgShow = true;
    },
    // 打开图片选择器
    openfile() {
      // 得到 file 对象
      let myfile = this.$refs.myfile;
      // 触发它的点击事件
      myfile.click(); // 打开图片选择器
    },
    imgChange() {
      // 得到 file
      let file = this.$refs.myfile;
      // 得到选中的图片
      let myimgFile = file.files[0];
      // 图片预览
      // ImagePreview里面可以放路径或者base64格式,路径需要创建一个虚拟的路径,兼容性不好,这里选择用base64格式
      // 将选择的图片转换为base64格式，需要用到filereader对象
      // 1.得到FileReader对象
      let reader = new FileReader();
      // 2.开始转换
      reader.readAsDataURL(myimgFile);
      // 3.0转换完后触发的事件
      reader.addEventListener("load", () => {
        // console.log(reader.result);
        ImagePreview({
          images: [reader.result],
          onClose: this.closeImg,
        });
      });
    },
    // 关闭相框
    closeImg() {
      this.$dialog.confirm({
        message: "确认选择的头像",
      })
        .then( async() => {
           // 得到图片对象
        let myfile = this.$refs.myfile.files[0]
        // 1.0 发送请求到服务器
        let res = await apiSetUserPhoto(myfile)
        // 2.0 得到返回的图片信息
        let newImg = res.data.data.photo
        // 3.0 将图片地址重新设置给头像
        this.userInfo.photo = newImg
        // 关闭面板
        this.imgShow = false
        })
        .catch(() => {
          this.imgShow=false
        });
    },
  },
  async created() {
    // 获取用户个人信息
    let resSelf = await apiGetSelf();
    this.userInfo = resSelf.data.data;
    let resUser = await apiGetUser();
    this.user = resUser.data.data;
  },
};
</script>

<style lang='less'>
.navBar {
  background-color: skyblue;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.secondBox {
  margin-top: 20px;
}
.imgbox {
  text-align: center;
  div {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    margin: 0 20px;
  }
}
</style>