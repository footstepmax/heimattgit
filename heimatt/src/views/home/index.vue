<template>
  <div class="home">
    <!-- 头部导航 -->
    <van-nav-bar fixed class="login-nav-bar">
      <template slot="title">
        <div class="mylogin">首页</div>
      </template>
    </van-nav-bar>
    <!-- bar切换 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="(item, index) in channelList"
        :key="index"
        :title="item.name"
      >
        <!-- 添加下拉刷新 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 添加list，完成上拉加载更多 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              class="mycell"
              v-for="(subitem, subindex) in item.list"
              :key="subindex"
            >
              <!-- 设置文章的标题 -->
              <template slot="title">
                <div>{{ subitem.title }}</div>
                <!-- 文章图片 -->
                <van-grid
                  v-if="subitem.cover.type > 0"
                  :border="false"
                  :column-num="3"
                >
                  <van-grid-item
                    v-for="(imgItem, imgIndex) in subitem.cover.images"
                    :key="imgIndex"
                  >
                    <van-image lazy-load class="myImage" :src="imgItem" />
                  </van-grid-item>
                </van-grid>
                <!-- 其他信息 -->
                <div class="otherbox">
                  <div class="other">
                    <span>{{ subitem.aut_name }}</span>
                    <span>{{ subitem.comm_count }}评论</span>
                    <span>{{ subitem.pubdate | timefilter }}</span>
                  </div>
                  <div class="more">
                    <van-icon @click="openmore(subitem)" name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="mymenu" @click="openChannel">
      <van-icon name="wap-nav" />
    </div>
    <!-- 频道操作面板 -->
    <!-- <mypop :value='show' @input="show=$event" /> -->
    <!-- <mypop v-model="show" :channelList='channelList' :active='active' @update:active='active=$event'/> -->
    <mypop v-model="show" :channelList="channelList" :active.sync="active" />
    <!-- <more  :value='moreShow' @input="moreShow=$event"/> -->
    <more v-model='moreShow' :artid='artid' @delArticle='delArticle'/>
  </div>
</template>

<script>
// 导入频道数据请求方法
import { apiGetChannel } from "../../api/channels";
// 导入获取localstorage的方法
import { getItem } from "../../utils/mylocal.js";
// 导入获取文章信息的接口
import { apiGetArticleList } from "../../api/articles";
import mypop from "./components/mypop.vue";
import more from "./components/more.vue";

export default {
  components: { mypop, more },
  name: "home",
  data() {
    return {
      // 默认显示的tab的下标
      active: 0,
      // // 定义一个要显示的数据源
      // list: [],
      // // list的属性：用来设置list组件是否处于加载状态
      // loading: false,
      // // list的属性：用来设置list组件中的数据是否全部加载完毕
      // finished: false,
      // // 下拉刷新
      // isLoading: false,
      // 定义频道数据
      channelList: [],
      // 控制操作面板的显示和隐藏
      show: false,
      // 控制查查more操作面板的显示和隐藏
      moreShow: false,
      // 文章id
      artid:0
    };
  },
  methods: {
    // 下拉加载更多，当list加载时会被触发，下拉触底的时候也会触发
    async onLoad() {
      // 得到当前频道
      let currentChannle = this.channelList[this.active];
      // 得到当前频道对应的 id
      let id = currentChannle.id;
      // 得到当前频道下的文章数据
      let res = await apiGetArticleList({
        channel_id: id,
        timestamp: Date.now(),
      });
      currentChannle.list = [...currentChannle.list, ...res.data.data.results];
      // console.log(res.data.data.results);
      // 手动设置 loading 为 false
      currentChannle.loading = false;
      if (res.data.data.results.length === 0) {
        currentChannle.finished = true;
      }
    },
    // 上拉刷新的方法
    onRefresh() {
      setTimeout(() => {
        // 得到当前频道
        let currentChannle = this.channelList[this.active];
        currentChannle.loading = false;
        currentChannle.finished = false;
        currentChannle.isLoading = false;
        currentChannle.list = [];
        this.$toast.success("刷新成功");
        this.onLoad();
      }, 1000);
    },
    addOtherProp() {
      // 把list和pullreflesh组件的属性添加到每个频道数据当中
      this.channelList.forEach((item) => {
        // (item.loading = false),
        //   (item.finished = false),
        //   (item.isLoading = false),
        //   // 把数据源也添加到里面去
        //   (item.list = []);
        // 在vue中要实现数据双向绑定的前提是数据在data中有定义，如果没有定义后续添加的属性需要使用$set方法
        this.$set(item, "loading", false);
        this.$set(item, "finished", false);
        this.$set(item, "isLoading", false);
        this.$set(item, "list", []);
      });
    },
    // 打开频道操作面板
    openChannel() {
      this.show = true;
    },
    // 打开more操作面板
    openmore(subitem){
      this.moreShow=true
      this.artid=subitem.art_id
    },
    // 子组件more点击不感兴趣后触发的事件
    delArticle(){
      // 1.得到数据源：当前选中频道下的list
      let dataList=this.channelList[this.active].list
      // 2.拿到不感兴趣的文章id   就是this.artid
      // 根据id删除dataList中的数据
      dataList.forEach((item,index)=>{
        if(item.art_id=this.artid){
          dataList.splice(index,1)
        }
      })
    }
  },
  async created() {
    // 判断用户是否登录
    // 拿到用户信息
    let user = this.$store.state.user;
    try {
      if (user.token) {
        // 用户携带token说明登录，发送请求
        let res = await apiGetChannel();
        // console.log(res);
        // 将数据渲染到页面上
        this.channelList = res.data.data.channels;
      } else {
        // 没有登录，就已没登录的状态访问
        // 判断本地之前有没有操作过频道数据
        let channels = getItem("channels");
        if (channels) {
          // 如果有就拿到该数据，渲染到页面
          this.channelList = channels;
        } else {
          // 如果localstorage没有数据，那就发送请求，从服务器获取,然后渲染到页面
          let res = await apiGetChannel();
          this.channelList = res.data.data.channels;
        }
      }
    } catch (error) {
      console.log(error);
    }
    // 给频道添加额外的属性，也就是list和pullrefresh组件的状态属性和list源数据
    this.addOtherProp();
  },
};
</script>

<style lang='less' scope>
.login-nav-bar {
  background-color: #3e9df8;
  .mylogin {
    color: #fff;
  }
  .van-cell__title {
    width: 50px;
  }
}
.home {
  margin-bottom: 50px;
  margin-top: 90px;
}
.van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0px;
  z-index: 999;
  width: 90%;
}
.mymenu {
  position: fixed;
  top: 46px;
  right: 0;
  z-index: 999;
  height: 44px;
  line-height: 44px;
  width: 10%;
  text-align: center;
  font-size: 20px;
}
.otherbox {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 12px;
    color: #ccc;
    margin-right: 5px;
  }
  .more {
    border: 1px solid #ccc;
    width: 20px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    border-radius: 2px;
  }
}
</style>