<template>
  <div class="mine-photo">
    <div class="mine-topBg">
      <img class="topBg-img" :src="minebg" alt />
      <div class="topBg-user">
        <div class="user-touxiang">
          <img :src="touxiang" alt />
          <div>管理相册</div>
        </div>
        <div class="user-name">
          <p class="p1">从心开始的相册</p>
          <p class="p2">
            浏览
            <span>23</span>粉丝
            <span>0</span>点赞
            <span>0</span>
          </p>
          <p class="p3">照片共享</p>
        </div>
        <div class="user-share">
          <button  open-type="share">分享</button>
        </div>
      </div>
    </div>
    <div class="mine-photoConent">
      <div class="mine-con">
        <div class="mine-tab">
          <nav
            v-for="(tab,index) in tabList"
            :key="index"
            @click="changeCurrent(index)"
            :class="current==index?'tabs active':'tabs'"
          >{{tab.text}}</nav>
        </div>
        <swiper class="mine-swiper" bindchange="swiperChange">
          <swiper-item>
            <ListTab :current="current"></ListTab>
          </swiper-item>
        </swiper>
      </div>
      <div class="mine-addimg">
        <img :src="current==0?addImg:editImg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import ListTab from '../../components/list'
import Card from '../../components/card'
export default {
  data() {
    return {
      addImg:require("../../../static/images/mine/add.png"),
      editImg:require("../../../static/images/mine/edit.png"),
      current:0,
      tabList:[{text:'所有'},{text:'留言板'}],
      minebg: require("../../../static/images/mine/minebg.png"),
      photoId: "",
      touxiang: require("../../../static/images/mine/minebg.png")
    };
  },
  methods: {
    changeCurrent(index){
      this.current=index
    }
  },
  components:{
    ListTab,
    Card
  },
  mounted() {
    
  },
  onLoad(options) {
    //判断有么有传参
    /* if (options.photoId) {
      this.photoId = options.photoId;
    } else {
      mpvue.navigateBack({
        //没有返回上一级
        delta: 2
      });
    } */



  }
};
</script>


<style scoped>
.mine-photo {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.mine-topBg {
  width: 100%;
  height: 120px;
  position: relative;
}
.topBg-img {
  width: 100%;
  height: 120px;
}
.topBg-user {
  width: 95%;
  height: 130px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.user-touxiang {
  flex: 2;
  /* background-color: #ccc; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-touxiang img {
  display: block;
  width: 75%;
  height: 50%;
  border-radius: 50%;
}
.user-touxiang > div {
  font-size: 12px;
  width: 70%;
  height: 15%;
  margin-top: 15px;
  border: 1px solid #666;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.user-name {
  flex: 4;
  padding-left: 10px;
  box-sizing: border-box;
  /* background-color: red; */
}
.user-name .p1 {
  font-size: 20px;
  color: #333;
  padding-top: 20px;
  letter-spacing: 2px;
}
.user-name .p2 {
  color: rgb(160, 158, 158);
  font-size: 12px;
  padding-top: 10px;
}
.user-name .p2 span {
  margin: 0 10px;
}
.user-name .p3 {
  padding-top: 22px;
  font-size: 13px;
  color: #333;
  letter-spacing: 2px;
}
.user-share {
  flex: 2;
  /* background-color: aqua; */
  display: flex;
  position: relative;
}
.user-share > button {
  width: 55px;
  height: 25px;
  line-height: 25px;
  background-color: green;
  font-size: 13px;
  color: #fff;
  border-radius: 30px;
  position: absolute;
  top: 20px;
  right: 10px;
}

.mine-photoConent {
  width: 100%;
  flex: 1;
  background-color: #f3efef;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 90px;
  position: relative;
}

.mine-photoConent .mine-con {
  width: 95%;
  height: 100%;
  /* background-color: red; */
}
.mine-con {
  display: flex;
  flex-direction: column;

}

.mine-tab{
  display: flex;
  height: 40px;
  justify-content:space-around;
  align-items: center;
  color: #333;
  
}

.tabs{
  width: 50px;
  height: 38px;
  padding-top: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid #f3efef;
  text-align: center;
}
.tabs.active{
  border-bottom: 2px solid blue;
}

.mine-swiper{
  flex: 1;
  margin-top: 20px;
}

.mine-addimg{
  width: 50px;
  height:50px;
  /* background-color: #fff; */
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -25px;
  overflow: hidden;

}

.mine-addimg img{
  width: 100%;
  height:100%;
  border-radius: 50%;
  display: block;
}
</style>