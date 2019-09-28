<template>
  <div class="img-box">
    <div class="imgitem" v-for="(im,index) in imgs" :key="index">
      <navigator class="img-nav" url="/pages/detail/main">
        <img :src="im.path" alt />
      </navigator>
    </div>

    <div v-if="imgs.length % 3==1?true:false" class="space"></div>
    <div v-if="imgs.length % 3==2?true:false" class="space"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgs: [
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") },
        { path: require("../../../static/images/mine/minebg.png") }
      ]
    };
  }
};
</script>


<style scoped>
.img-box {
  width: 100%;
  height: 100%;
  display: flex;
  /* background-color: pink; */
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 10px;
  box-sizing: border-box;
}

.imgitem {
  width: 210rpx;
  height: 210rpx;
  /* background-color: blue; */
  margin-bottom: 10px;
}

.img-nav,
.imgitem img {
  width: 210rpx;
  height: 210rpx;
}

.space {
  width:210rpx;
  height: 210rpx;
  margin-bottom: 10px;
}
</style>