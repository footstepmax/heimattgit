<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
      <!-- 我的频道区域 -->
      <van-cell class="myChannel">
        <template slot="title">
          <div>我的频道</div>
        </template>
        <template slot="default">
          <van-button
            v-if="showIcon === false"
            @click="showIcon = true"
            size="mini"
            round
            plain
            hairline
            type="danger"
            >编辑</van-button
          >
          <van-button
            v-else
            @click="showIcon = false"
            size="mini"
            round
            plain
            hairline
            type="danger"
            >完成</van-button
          >
        </template>
      </van-cell>
      <!-- 我的频道选项 -->
      <van-grid>
        <van-grid-item
          class="itemFarther"
          v-for="(item, index) in channelList"
          :key="index"
        >
          <template slot="text">
            <span
              class="word"
              @click="changeActive(index)"
              :class="{ active: active === index }"
              >{{ item.name }}</span
            >
            <van-icon
              @click.stop="delChannel(item)"
              v-if="showIcon === true && index != 0"
              class="itemSon"
              name="clear"
            />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道区域 -->
      <van-cell class="myChannel">
        <template slot="title">
          <div>推荐频道</div>
        </template>
      </van-cell>
      <!-- 推荐频道选项 -->
      <van-grid>
        <van-grid-item
          @click="addChannel(item)"
          class="iconFarther"
          v-for="(item, index) in otherChannel"
          :key="index"
        >
          <template slot="text">{{ item.name }}</template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannel, apiResetChannel } from "../../../api/channels";
// 导入操作localstorage的方法
import { getItem, setItem } from "../../../utils/mylocal.js";

export default {
  name: "mypop",
  // value控制频道操作面板是否显示，channelList为我的频道模块的数据,   active得到当前频道下标，显示高亮
  props: ["value", "channelList", "active"],
  data() {
    return {
      // 控制xx的显示和隐藏
      showIcon: false,
      // 保存所有的频道数据
      allChannels: [],
    };
  },
  computed: {
    otherChannel() {
      let ids = this.channelList.map((item) => {
        return item.id;
      });
      let other = this.allChannels.filter((item) => {
        return !ids.includes(item.id);     
      });
      return other; //[id:'',name:'']
    },
  },
  methods: {
    // 得到所有的频道
    async getAllChannel() {
      let res = await apiGetAllChannel();
      // console.log(res);
      this.allChannels = res.data.data.channels;
    },
    // 添加频道
    async addChannel(item) {
      // 动态添加其它的额外属性
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "isloading", false);
      this.$set(item, "list", []);
      // 将当前频道添加到我的频道列表中
      this.channelList.push(item);
      // 将我的频道数据进行保存：判断用户是否登录
      // 得到用户的登录信息
      let user = this.$store.state.user;
      // 如果登录
      if (user.token) {
        // 根据我的频道数据生成 channels
        let channels = [];
        // 去掉第一条数据：推荐数据
        // slice 可以从数据中去掉一条数据
        this.channelList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2,
          });
        });
        // 将我的频道数据提交到服务器中
        let res = await apiResetChannel(channels);
        console.log(res);
      } else {
        // 未登录
        // 将频道数据保存到 Localstorage 中
        setItem("channels", this.channelList);
      }
    },
    // 删除频道
    async delChannel(obj) {
      this.channelList.forEach((item, index) => {
        if (item.id === obj.id) {
          this.channelList.splice(index, 1);
        }
      });
      // 判断是否登录
      let user = this.$store.state.user;
      if (user.token) {
        let channels = [];
        this.channelList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2,
          });
        });
        // 将数据提交到服务器
        await apiResetChannel(channels);
      } else {
        setItem("channels", this.channelList);
      }
    },
    // 切换高亮
    changeActive(index) {
      // 将数据交给 home
      // this.$emit('active',index)
      // 用sync方式传递，简写方式而已
      this.$emit("update:active", index);
    },
  },
  created() {
    this.getAllChannel();
  },
};
</script>

<style lang='less' scope>
.myChannel {
  margin-top: 46px;
}
.itemFarther {
  position: relative;
  .itemSon {
    position: absolute;
    top: 0;
    right: 0;
    color: #ccc;
  }
  .word {
    font-size: 12px;
    color: #646566;
  }
}
.van-button__content {
  margin: 0 10px;
}
.van-grid-item__content .active {
  color: red;
}
</style>