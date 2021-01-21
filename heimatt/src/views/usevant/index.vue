<template>
  <div>
    <h3>我是vant组件</h3>
    <h4>1.使用vant中的按钮</h4>
    <van-button type="primary" @click="fn">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h4>2.单元格的使用</h4>
    <van-cell title="单元格" value="内容" label="描述信息">
      <template slot="title">
        <van-icon name="like-o" />
        我使用了title插槽
        <van-icon name="like-o" />
      </template>
      <template slot="default">
        <van-icon name="star-o" />
        我使用了default插槽
        <van-icon name="star-o" />
      </template>
      <template slot="label">
        <van-icon name="chat-o" />
        我使用了label插槽
        <van-icon name="chat-o" />
      </template>
    </van-cell>
    <h4>3.图标的使用</h4>
    <van-icon name="like-o" />
    <van-icon name="chat-o" />
  </div>
</template>

<script>
export default {
  methods: {
    fn() {
      console.log("点了按钮");
    },
  },
};
</script>

<style>
</style>
