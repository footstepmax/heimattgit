<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <comment :showReplyBtn="false" :data="currentcomm"></comment>
      <!-- 回复的列表 -->
      <van-cell title="当前评论的回复"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment
          :showReplyBtn="false"
          :data="item"
          v-for="(item, index) in replyList"
          :key="index"
        />
      </van-list>
      <write
        @passdata="passdata"
        :comid="this.currentcomm.com_id"
        :isReply="true"
      ></write>
    </van-popup>
  </div>
</template>

<script>
import comment from "./comment";
import write from "./write";
// 导入bus
import bus from "@/utils/bus";
// 导入获取回复的数据
import { apiGetReply } from "@/api/articles";
export default {
  props: ["value"],
  components: {
    comment,
    write,
  },
  data() {
    return {
      // 当前评论的数据（接收）
      currentcomm: {},
      //   list加载状态
      loading: false,
      //   list加载完成
      finished: false,
      //   分页标识
      offset: null,
      endid: 0,
      // 回复评论的数据源
      replyList: [],
    };
  },
  methods: {
    async onLoad() {
      let comid = this.currentcomm.com_id.toString();
      //   console.log(comid);
      // 请求评论回复的数据
      let res = await apiGetReply({
        comid: comid,
        offset: this.offset,
      });
      //   console.log(res);
      // 保存数据
      this.replyList = [...this.replyList, ...res.data.data.results];
      this.offset = res.data.data.last_id;
      this.endid = res.data.data.end_id;
      // 判断数据是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true;
      }
      // 关闭加载状态
      this.loading = false;
    },
    // 接收 write 组件传入的数据
    passdata(obj) {
      this.replyList.unshift(obj);
      // 将评论数据+1
      this.currentcomm.reply_count += 1;
    },
  },
  created() {
    //   接收当前评论的数据
    bus.$on("passdata", (value) => {
      this.currentcomm = value;
      //   console.log(this.currentcomm);
      // 清除之前的回复数据
      this.loading = false;
      this.finished = false;
      this.offset = null;
      this.endid = 0;
      this.replyList = [];
    });
  },
};
</script>

<style>
</style>