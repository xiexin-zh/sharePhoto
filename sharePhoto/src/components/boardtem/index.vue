<template>
  <div class="board-box">
    <div class="board-con">
      <div class="con-avatar">
        <img :src="touxiang" alt="">
      </div>
      <div class="con-text">
        <p class="text-p1">从心开始</p>
        <p class="text-p2">2019年09月28日 10:24:22</p>
        <p class="text-p3">美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美</p>
      </div>
      <div class="con-pop">
        ...
      </div>
    </div>


    <div class="board-con">
      <div class="con-avatar">
        <img :src="touxiang" alt="">
      </div>
      <div class="con-text">
        <p class="text-p1">从心开始</p>
        <p class="text-p2">2019年09月28日 10:24:22</p>
        <p class="text-p3">美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美</p>
      </div>
      <div class="con-pop">
        ...
      </div>
    </div>




    <div class="board-con">
      <div class="con-avatar">
        <img :src="touxiang" alt="">
      </div>
      <div class="con-text">
        <p class="text-p1">从心开始</p>
        <p class="text-p2">2019年09月28日 10:24:22</p>
        <p class="text-p3">美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美美</p>
      </div>
      <div class="con-pop">
        ...
      </div>
    </div>



    <div class="board-con">
      <div class="con-avatar">
        <img :src="touxiang" alt="">
      </div>
      <div class="con-text">
        <p class="text-p1">从心开始</p>
        <p class="text-p2">2019年09月28日 10:24:22</p>
        <p class="text-p3">美美美美美美美美美美美美美美美美美美美美美美美美美</p>
      </div>
      <div class="con-pop">
        ...
      </div>
    </div>


  </div>
</template> 


<script>
export default {
  data(){
    return{
      touxiang: require("../../../static/images/mine/minebg.png")
    }
  }
}
</script>


<style scoped>

.board-box{
  width: 100%;
  height: 100%;
  /* background-color: aquamarine; */
}

.board-con{
  width: 100%;
  height: 115px;
  padding: 10px 0;
  overflow: hidden;
  margin-bottom: 20px;
}

.con-avatar{
  width: 20%;
  height: 100%;
  /* background-color: rgb(120, 95, 95); */
  position: relative;
  float: left;
}
.con-avatar img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -25px;
}
.con-text{
  width: 70%;
  height: 100%;
  /* background-color: rgb(126, 208, 159); */
  float: left;
}
.con-text .text-p1{
  color: rgb(125, 124, 123);
}
.con-text .text-p2{
  color: rgb(176, 174, 171);
  font-size: 12px;
}
.con-text .text-p3{
  color: #333;
  margin-top: 5px;
}

.con-pop{
  width: 10%;
  height: 100%;
  /* background-color: rgb(128, 65, 93); */
  float: left;
  text-align: center;
  font-size:16px;
  color: rgb(125, 124, 123);
  letter-spacing: 2px;
}


</style>