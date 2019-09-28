<template>
  <div>
    <button @click="switchToMine">跳转</button>
  </div>
</template>


<script>
export default {
  data(){

  },
  methods:{
    switchToMine(){
      mpvue.navigateTo({
        url:'/pages/mine/main?photoId=123456asdfg'
      })
    }
  }

}
</script>