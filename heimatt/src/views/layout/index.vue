<template>
  <div>
    <!-- 由子组件来渲染 -->
    <router-view></router-view>
    <!-- 导航区域 -->
    <!-- route 开启路由模式 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
};
</script>

<style>
</style>