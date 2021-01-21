<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      background="#3296fa"
      v-model="value"
      @input="think"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template slot="action">
        <div @click="onCancel" class="mycancel">取消</div>
      </template>
    </van-search>
    <!-- 联想区域 -->
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell
        @click="onSearch(item.oldItem)"
        v-for="(item, index) in thinkList"
        :key="index"
        icon="search"
      >
        <template slot="title">
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <van-icon @click="delAll" name="delete-o" />
        </template>
      </van-cell>
      <van-cell
        icon="search"
        @click="onSearch(item)"
        v-for="(item, index) in historyList"
        :key="index"
        :title="item"
      >
        <template slot="right-icon">
          <van-icon @click.stop="del(item)" name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiThink } from "@/api/search.js";
import { getItem, setItem } from "../../utils/mylocal";
export default {
  data() {
    return {
      // 搜索框中的数据源
      value: "",
      // //   是否显示联想
      // isThink: false,
      thinkList: [],
      // 定时器
      timer: null,
      // 搜索历史
      historyList: [],
    };
  },
  methods: {
    // 搜索框的搜索事件
    onSearch(key) {
      // 保存数据到搜索历史列表中，且保存到本地localstorage
      this.historyList.unshift(key);
      // 保存数据之前先去重
      // let res=new Set(this.historyList)
      this.historyList = [...new Set(this.historyList)];
      setItem("history", this.historyList);
      //   key为搜索框内的数据
      //   console.log(key);
      this.$router.push(`/searchResult/${key}`);
    },
    onCancel() {
      this.value = "";
      this.thinkList = [];
    },
    // 联想事件,只要搜索框中的内容发送改变就会触发
    think() {
      // 清空定时器
      clearTimeout(this.timer);
      // 设置定时器
      this.timer = setTimeout(async () => {
        // 判断内容是否为空
        if (this.value.trim().length <= 0) {
          // 不继续执行
          // 且清空联想数组
          this.thinkList = [];
          return;
        }
        let res = await apiThink(this.value);
        this.thinkList = res.data.data.options;
        // 输入内容高亮处理
        this.thinkList = this.thinkList.map((item) => {
          return {
            oldItem: item,
            newItem: item
              .split(this.value)
              .join(`<span style='color:red'>${this.value}</span>`),
          };
        });
      }, 500);
    },
    // 删除搜索历史
    del(subitem) {
      this.historyList.forEach((item, index) => {
        if (item === subitem) {
          this.historyList.splice(index, 1);
        }
      });
      setItem("history", this.historyList);
    },
    // 清空搜索历史
    delAll() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确认要清空搜索历史吗？",
        })
        .then(() => {
          this.historyList = [];
          setItem("history", this.historyList);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  created() {
    // 得到搜索的历史数据
    this.historyList = getItem("history") || [];
  },
};
</script>

<style lang='less'>
.mycancel {
  color: #fff;
}
.mycancel:active {
  color: #ccc;
}
.van-search__action:active {
  background-color: #3296fa;
}
</style>