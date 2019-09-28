<template>
  <div class="index">
    <div class="header">
      <div class="left">
        <image :src="userInfo.avatarUrl" />
      </div>
      <div class="right">
        <ul class="rUl">
          <li>
            关注
            <br />0
          </li>
          <li>
            发布
            <br />0
          </li>
          <li>
            粉丝
            <br />0
          </li>
        </ul>
      </div>
    </div>
    <div class="tabBar">
      <ul class="tUl">
        <li :class="isGuanzhu?'active':''" @click="changeActive">关注</li>
        <li :class="isGuanzhu?'':'active'" @click="changeActive2">我的</li>
      </ul>
      <ul class="tContent">
        <li v-if="isGuanzhu" class="mineContent">关注的内容</li>
        <li v-else class="mineContent">
          <ul class="contentUl">
            <li class="contentLi"  @click="createPhoto">
              <text>+</text>
               <text>创建相册</text>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "../counter/store";

export default {
  data() {
    return {
      isGuanzhu: true
    };
  },
  computed: {
    userInfo() {
      return store.state.userInfo;
    }
  },

  methods: {
    changeActive(e) {
      this.isGuanzhu = true;
    },
    changeActive2() {
      this.isGuanzhu = false;
    },
    createPhoto(){
      mpvue.navigateTo({ url: '/pages/createPhoto/main' });
    }
  },

  created() {}
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  height: 200rpx;
  width: 100%;
  display: flex;
}
.left {
  height: 100%;
  width: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left > image {
  width: 50%;
  height: 50%;
  border-radius: 50%;
}
.right {
  height: 100%;
  width: 550rpx;
}
.right > .rUl {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
}
.tabBar {
  width: 100%;
  box-sizing: border-box;
  padding: 50rpx;
  flex: 1;
}
.tabBar > .tUl {
  width: 100%;
  display: flex;
  height: 50rpx;
  line-height: 50rpx;
}
.tabBar > .tUl > li {
  padding: 0 20rpx;
}
.tabBar > .tUl > li.active {
  background: #0f0;
  border-radius: 50rpx;
}
.tContent,
.tContent > li,
.mineContent,
.contentUl {
  width: 100%;
  height: 100%;
}
.contentUl{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.contentUl>li{
  margin-top:40rpx; 
  box-sizing: border-box;
  padding: 30rpx;
  width: 48%;
  height: 400rpx;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
