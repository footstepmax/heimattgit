<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="search-nav-bar" @click-left="onClickLeft" left-arrow>
      <template slot="title">
        <div class="mysearch">搜索结果</div>
      </template>
    </van-nav-bar>
    <!-- 新闻区域 -->
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          @click="toDetail(item.art_id)"
          v-for="(item, index) in searchResult"
          :key="index"
        >
          <template slot="title">
            <div>{{ item.title }}</div>
            <van-grid
              v-if="item.cover.type > 0"
              :border="false"
              :column-num="3"
            >
              <van-grid-item
                v-for="(imgitem, imgindex) in item.cover.images"
                :key="imgindex"
              >
                <van-image :src="imgitem" />
              </van-grid-item>
            </van-grid>
            <div class="searchbox">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | timefilter }}</span>
            </div>
            <van-grid direction="horizontal" :column-num="3" class="other">
              <van-grid-item @click="comment" icon="comment-o" text="评论" />
              <van-grid-item @click="star" icon="like-o" text="点赞" />
              <van-grid-item @click="share" icon="share-o" text="分享" />
            </van-grid>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入搜索数据的方法
import { apiGetSearchResult } from "@/api/search.js";
export default {
  data() {
    return {
      // 下拉刷新的状态
      isLoading: false,
      // 上拉加载更多的状态
      loading: false,
      // 上拉加载完毕
      finished: false,
      // 加载的数据源
      list: [],
      // 搜索关键字
      key: "",
      // 当前页
      page: 0,
      // 每页条数
      perpage: 10,
      // 搜索的结果
      searchResult: [],
    };
  },
  methods: {
    //   点击左上角箭头返回到上一个路由
    onClickLeft() {
      this.$router.back();
    },
    //  下拉刷新触发
    onRefresh() {
      console.log("下拉刷新");
    },
    //  上拉加载更多触发
    async onLoad() {
      this.page++;
      // 请求数据
      let res = await apiGetSearchResult({
        page: this.page,
        perpage: this.perpage,
        q: this.key,
      });
      this.searchResult = [...this.searchResult, ...res.data.data.results];
      // console.log(this.searchResult);
      if (res.data.data.results.length <= 0) {
        this.finished = true;
      }
      // 将请求状态设置为false
      this.loading = false;
    },
    // 点击评论判断登录
    comment() {
      // 进行登录的验证
      // 得到用户的登录信息
      let user = this.$store.state.user;
      if (!user.token) {
        this.$router.push("/login");
        return;
      }
      console.log("评论成功");
    },
    // 点赞，采用全局登录判断
    star() {
      if (this.$login() === false) {
        return; // 后续代码不执行
      }
      console.log("点赞成功");
    },
    // 分享，采用插件封装全局登录验证的方法
    share() {
      if (this.$login() === false) {
        return; // 后续代码不执行
      }
      console.log("分享成功");
    },
    // 文章详情页
    toDetail(artid) {
      // console.log(artid);
      this.$router.push(`/detail/${artid}`)
    },
  },
  created() {
    //   获取动态路由中的参数
    this.key = this.$route.params.mykey;
  },
};
</script>

<style lang='less'>
.search-nav-bar {
  background-color: #3e9df8;
  .mysearch {
    color: #fff;
  }
}
.van-nav-bar .van-icon {
  color: #ffffff;
}
.van-grid-item__icon {
  font-size: 16px;
}
.searchbox {
  span {
    margin-right: 10px;
  }
}
</style>