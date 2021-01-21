<template>
  <van-dialog :value="value" :showConfirmButton="false">
    <!-- 基本选项 -->
    <van-cell-group v-if="isReport === false">
      <van-cell>
        <template slot="title">
          <van-icon @click="$emit('input', false)" name="cross" />
        </template>
      </van-cell>
      <van-cell @click="dislike" title="不感兴趣" icon="location-o" />
      <van-cell
        @click="isReport = true"
        title="反馈垃圾内容"
        icon="location-o"
        is-link
      />
      <van-cell title="拉黑作者" icon="location-o" />
    </van-cell-group>
    <!-- 举报选项 -->
    <van-cell-group v-if="isReport === true">
      <van-cell>
        <template slot="title">
          <van-icon @click="isReport = false" name="arrow-left" />
        </template>
      </van-cell>
      <van-cell
        @click="report(item.id)"
        v-for="(item, index) in type"
        :key="index"
        :title="item.name"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 导入操作文章的方法
import { apiDislike, apiReport } from "@/api/articles.js";
export default {
  name: "more",
  //   value控制面板显示和隐藏，artid是文章的id
  props: ["value", "artid"],
  data() {
    return {
      //   是否处于举报状态
      isReport: false,
      // 举报类型
      type: [
        { id: 0, name: "其他问题" },
        { id: 1, name: "标题夸张" },
        { id: 2, name: "低俗色情" },
        { id: 3, name: "错别字多" },
        { id: 4, name: "旧闻重复" },
        { id: 5, name: "广告软文" },
        { id: 6, name: "内容不实" },
        { id: 7, name: "涉嫌违法犯罪" },
        { id: 8, name: "侵权" },
      ],
    };
  },
  methods: {
    //   对文章不感兴趣
    async dislike() {
      //   1.关闭面板
      this.$emit("input", false);
      //   2.从数据源中删除当前id对应的文章
      this.$emit("delArticle");
      //   3.将文章id当前发送到服务器中，将文章标记为不感兴趣
      let res = await apiDislike(this.artid);
      console.log(res);
    },
    // 举报文章
    // 文章的id，举报类型，remake为空
    async report(type) {
      try {
          let res = await apiReport({
        artid: this.artid,
        type: type,
      });
            // 提示框
      this.$toast.success("举报成功");
      } catch (error) {
      this.$toast.fail("举报失败");
      }
      // 关闭面板
      this.$emit("input", false);
      //   切换为基本选项
      this.isReport = false;
    },
  },
};
</script>

<style>
</style>