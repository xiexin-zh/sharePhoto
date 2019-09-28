<template>
  <div class="list-box">
    <scroll-view
      class="main-scroll"
      scroll-y
      upper-threshold="50"
      lower-threshold="50"
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <ImgItem v-if="current==0?true:false"></ImgItem>
      <BoardItem v-if="current==1?true:false"></BoardItem>
    </scroll-view>
  </div>
</template>


<script>
import ImgItem from "../components/imgItem";
import BoardItem from "../components/boardtem";
export default {
  props: ["current"],
  components: {
    ImgItem,
    BoardItem
  },
  mounted() {
    console.log(1111);
  },
  methods:{
    upper(){

    },
    lower(){

    },
    scroll(){

    }

  }
};
</script>


<style scoped>
.list-box {
  display: flex;
  width: 100%;
  height: 100%;
}
.main-scroll {
  width: 100%;
  height: 100%;
}
</style>

