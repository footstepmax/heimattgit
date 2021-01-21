<template>
  <div class="detail">
    <!-- 设置头部导航 -->
    <van-nav-bar class="search-nav-bar" @click-left="$router.back()" left-arrow>
      <template slot="title">
        <div class="mysearch">文章标题</div>
      </template>
    </van-nav-bar>
    <!-- 标题区域 -->
    <h2>{{ detailObj.title }}</h2>
    <!-- 作者信息 -->
    <van-cell>
      <template slot="title">
        <div class="autBox">
          <div class="autImg">
            <img :src="detailObj.aut_photo" alt="" />
          </div>
          <div class="autMsg">
            <div>{{ detailObj.aut_name }}</div>
            <div>{{ detailObj.pubdate | timefilter }}</div>
          </div>
          <div class="followed">
            <van-button
              @click="followed"
              v-if="detailObj.is_followed === false"
              size="small"
              type="info"
              >+ 关注</van-button
            >
            <van-button
              @click="unfollowed"
              v-else
              color="#ccc"
              size="small"
              type="info"
              >已关注</van-button
            >
          </div>
        </div>
      </template>
    </van-cell>
    <!-- 文章内容 -->
    <van-cell>
      <template slot="title">
        <div v-html="detailObj.content"></div>
      </template>
    </van-cell>
    <!-- 点赞、不喜欢按钮 -->
    <div class="btns">
      <van-button
        @click="addZan"
        icon="like"
        class="btn"
        round
        plain
        :type="detailObj.attitude === 1 ? 'primary' : 'default'"
        >点赞</van-button
      >
      <van-button
        icon="delete-o"
        class="btn"
        round
        plain
        :type="detailObj.attitude === 0 ? 'danger' : 'default'"
        >不喜欢</van-button
      >
    </div>
    <!-- 评论区域 -->
    <van-cell title="文章评论"></van-cell>
    <!-- 评论结构 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment :showReplyBtn='true' @showReply='replyShow=$event' :data="item" v-for="(item, index) in commentList" :key="index" />
    </van-list>
    <!-- 添加评论的结构 -->
    <write :isReply='false' @addComment='addComment'></write>
    <reply v-model="replyShow"></reply>
  </div>
</template>

<script>
import comment from "./components/comment";
import write from "./components/write";
// 导入回复组件
import reply from "./components/reply";
// 导入获取文章详情的方法
import {
  apiGetDetail,
  apiNoLike,
  apiLike,
  apiGetComment,
} from "@/api/articles";
// 导入操作用户的方法
import { apiFollowed } from "@/api/user";
export default {
  data() {
    return {
      artid: 0,
      // 文章详情
      detailObj: {},
      // list的加载状态
      loading: false,
      // list组件的加载完毕状态
      finished: false,
      // 分页的标识
      offset: null,
      // 结束的标识
      endid: 0,
      // 评论的数据源
      commentList: [],
      // 控制回复组件的显示隐藏
      replyShow:false
    };
  },
  components: {
    comment,
    write,
    reply
  },
  methods: {
    async getArticleDetail() {
      let res = await apiGetDetail(this.artid);
      this.detailObj = res.data.data;
      // console.log(this.detailObj);
    },
    // 关注
    async followed() {
      try {
        //  作者id
        let autId = this.detailObj.aut_id;
        // 发送请求到服务器
        await apiFollowed(autId);
        this.detailObj.is_followed = true;
        this.$toast.success("关注成功");
      } catch (error) {
        this.$toast.fail("出错了");
      }
    },
    // 取关
    async unfollowed() {
      try {
        //  作者id
        let autId = this.detailObj.aut_id;
        // 发送请求到服务器
        await apiUnFollowed(autId);
        this.detailObj.is_followed = false;
        this.$toast.success("取关成功");
      } catch (error) {
        this.$toast.fail("出错了");
      }
    },
    // 点赞
    // async
     addZan() {
      let attitude = this.detailObj.attitude;
      if (attitude === 1) {
        // 已经为点赞状态，再次点击即为取消点赞
        // await apiNoLike(this.artid);
        // 手动将态度设置为-1
         this.detailObj.attitude = -1
      } else {
        // await apiLike(this.artid);
         this.detailObj.attitude = 1
      }
    },
    // List加载方法
    async onLoad() {
      // 请求文章的评论数据
      let res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
      });
      // console.log(res);
      // 保存数据
      this.commentList = [...this.commentList, ...res.data.data.results];
      this.offset = res.data.data.last_id;
      this.endid = res.data.data.end_id;
      setTimeout(() => {
        if (this.offset === this.endid) {
          this.finished = true;
        }
        this.loading = false;
      }, 1000);
    },
    // 添加评论的方法
    addComment(commData){
      this.commentList.unshift(commData)
    },

  },
  created() {
    // 得到文章的id
    this.artid = this.$route.params.artid;
    // 根据文章id发送请求到服务器获取文章详情
    this.getArticleDetail();
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
.detail {
  margin-bottom: 54px;
  h2 {
    text-align: center;
  }
}
.autBox {
  display: flex;
  align-items: center;
  .autImg img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .autMsg {
    flex: 1;
    margin-left: 10px;
  }
}
.btns {
  text-align: center;
  .btn {
    margin: 20px;
  }
}
.van-cell__title {
  img {
    width: 100%;
  }
}
</style>