<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="commentBox">
          <div class="comImg">
            <img :src="data.aut_photo" alt="" />
          </div>
          <div class="comMsg">
            <div class="comAut">{{data.aut_name}}</div>
            <div class="comContent">{{data.content}}</div>
            <div class="comOther">
              <span class="myspan">{{data.pubdate | timefilter}}</span>
              <van-button v-if="showReplyBtn" @click="showReply" class="mybtn" round size="small" type="default"
                >回复{{data.reply_count}}</van-button
              >
            </div>
          </div>
          <div class="comLove"><van-icon name="like-o" />{{data.like_count}}</div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 倒入事件bus对象
import bus from '@/utils/bus'
export default {
  props:['data','showReplyBtn'],
  methods:{
    // 控制reply组件的打开状态
    showReply(){
      // 将父组件中的 replyshow改为true
      this.$emit('showReply',true)
      bus.$emit('passdata',this.data)
    }
  }
};
</script>

<style lang='less'>
.commentBox {
  display: flex;
  .comImg {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .comMsg {
    flex: 1;
    margin-left: 10px;
    .comAut {
      color: #708ab6;
    }
    .comContent {
      margin-left: 10px;
    }
    .comOther {
      .myspan {
        margin-right: 20px;
      }
      .mybtn {
        padding: 0 10px;
      }
    }
  }
}
</style>