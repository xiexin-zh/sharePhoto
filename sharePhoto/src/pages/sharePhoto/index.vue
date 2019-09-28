
<template>
  <div class="share">
    <div class="content">
      <textarea class="text" placeholder="这一刻的想法" v-model="text"></textarea>
    </div>
    <div class="choose">
      <div v-for="(img,i) in images" :key="i">
        <img :src="img" alt />
      </div>
      <div class="chooseImg" @click="chooseImg">+</div>
    </div>
    <div class="footer">
      <div class="publish" @tap="publishPhoto">确认发布</div>
    </div>
  </div>
</template>

<script>
import store from "../counter/store";
import axios from "axios";
export default {
  data() {
    return {
      text: "",
      images: []
    };
  },
  onLoad() {
    this.images = [...this.images, ...store.state.path];
  },
  methods: {
    chooseImg() {
      mpvue.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          this.images = [...this.images, tempFilePaths];
        }
      });
    },
    computed: {
      nickName() {
        return store.state.nickName;
      }
    },
    publishPhoto() {
      mpvue.request({
        url: "https://localhost:1906/wx/addPhoto", //仅为示例，并非真实的接口地址
        data: {
            name:store.state.nickName,
            userInfo:store.state.userInfo,
            content:this.text,
            photo:this.images,
            like:0,
            viewcount:0,
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method:"POST",
        success(res) {
          mpvue.navigateTo({ url: '/pages/mine/main' });
        }
      });
    }
  }
};
</script>

<style>
.share {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20rpx;
}
.content {
  width: 100%;
  height: 100rpx;
}
.content > .text {
  width: 100%;
  height: 100rpx;
}
.choose {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.choose > div {
  margin: 18rpx;
}
.choose > div > img {
  width: 200rpx;
  height: 200rpx;
}
.choose > .chooseImg {
  width: 200rpx;
  height: 200rpx;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80rpx;
  font-weight: 400;
  color: #aaa;
}
.footer {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer > .publish {
  width: 80%;
  height: 80%;
  background: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 80rpx;
  color: #fff;
}
</style>