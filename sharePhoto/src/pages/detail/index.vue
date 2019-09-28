<template>
  <div class="detail-box">
    <div class="detail-img">
      <!-- <img :src="detailImg" alt=""> -->
      <image class='img' :src='detailImg' @tap='previewImg'></image>
    </div>
    <p class="detail-time">星期五 12:12</p>
    <div class="detail-foot">
      <div class="footOption delete">
        <img :src="deleteImg" alt=""  @tap='todoDelete'>
      </div>
      <div class="footOption download">
        <img :src="downloadImg" alt=""  @tap='todoDown'>
      </div>
      <div class="footOption like">
        <img :src="likeImg" alt=""   @tap='todoLike'>
      </div>
      <div class="footOption share">
        <button open-type="share">
          <img :src="shareImg" alt=""  @tap='todoShare'>
        </button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      detailImg:[require("../../../static/images/mine/minebg.png")],
      deleteImg:require("../../../static/images/mine/delete.png"),
      downloadImg:require("../../../static/images/mine/download.png"),
      likeImg:require("../../../static/images/mine/like.png"),
      shareImg:require("../../../static/images/mine/share.png"),
    }
  },
  methods:{
    previewImg(e){
      console.log('预览')
      wx.previewImage({
        current: 0,     
        urls: this.detailImg,               
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    todoDelete(e){
      console.log(e)
      //删除操作
    },
    todoDown(){
      wx.getImageInfo({
            src: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png',
            success: function (ret) {
                var path = ret.path;
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success(result) {
                        console.log(result)
                    }
                })
            }
        })
    },

    todoLike(){
      this.likeImg = require("../../../static/images/mine/like1.png")
    },

    todoShare(){
      
    }
  }
}


</script>


<style scoped>
  .detail-box{
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: relative;
  }
  .detail-img{
    width: 100%;
    height: 400px;
    padding-top: 20px;
    box-sizing: border-box;
    /* background-color: #f56; */
    overflow: hidden;
  }

  .detail-img image{
    width: 100%;
    /* height: 100%; */
  }
  .detail-time{
    text-align: right;
    color: rgb(159, 158, 158);
    font-size:14px;
    padding: 10px 10px;
    box-sizing: border-box;
  }
  .detail-foot{
    height: 50px;
    width: 100%;
    background-color: rgb(241, 235, 235);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;

  }

  .footOption{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footOption button{
    background: none;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footOption button::after{
    border: 0;
  }

  .footOption img{
    width: 25px;
    height: 25px;

  }
</style>