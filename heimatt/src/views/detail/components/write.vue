<template>
  <div class="write">
    <van-search
      v-model="value"
      shape="round"
      show-action
      placeholder="填写评论"
      @search="onSearch"
    >
      <template slot="left-icon">
        <van-icon name="edit" />
      </template>
      <template slot="action">
        <div @click="onSearch">发送</div>
        <!-- <div class="icons">
          <van-icon class="icon" name="chat-o" />
          <van-icon class="icon" name="star-o" />
          <van-icon class="icon" name="good-job-o" />
          <van-icon class="icon" name="share-o" />
        </div> -->
      </template>
    </van-search>
  </div>
</template>

<script>
import { apiAddComments, apiAddReply } from "@/api/articles";
export default {
  props: ["isReply", "comid"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    // 提交评论
    async onSearch() {
      // 判断是 添加评论 还是 回复评论
      if (this.isReply === false) {
        // 1.得到当前书写的评论 this.value 和文章id: this.$route.params.artid
        // 2.将评论发送到服务器
        let res = await apiAddComments({
          artid: this.$route.params.artid,
          content: this.value.trim(),
        });
        // 3.返回的数据保存起来
        let commData = res.data.data.new_obj;
        // 4.将数据发送到详情页
        this.$emit("addComment", commData);
        this.value = "";
      } else {
        console.log("对已有的评论进行评论");
        let res = await apiAddReply({
          comid: this.comid.toString(), //当前评论的id,,拿到的是BigNumber,需要装换一下
          content: this.value.trim(),
          artid: this.$route.params.artid,
        });
        // 返回的数据保存起来
        let commReply = res.data.data.new_obj;
        // 4.将数据发送到评论的回复框reply
        this.$emit("passdata", commReply);
        this.value = "";
      }
    },
  },
};
</script>

<style lang='less'>
.write {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .van-search {
    background-color: #ccc !important;
  }
}

// .icons {
//   .icon {
//     font-size: 16px;
//     margin: 0 8px;
//   }
// }
</style>