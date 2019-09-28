<template>
  <div class="guide">
    <div class="avatar" @click="gotoIndex">
      <img :src="userAvatarUrl" alt />
    </div>
    <div class="nickname">{{userNickName}}</div>
    <div v-if="is">
      <button class="btn" open-type="getUserInfo" @getuserinfo="UserInfo">是否授权登录</button>
    </div>
  </div>
</template>

<script>
import store from "../counter/store";

export default {
  data() {
    return {
      userAvatarUrl: "",
      userNickName: "",
      userinfo: {},
      is: true
    };
  },
  methods: {
    gotoIndex() {
      mpvue.navigateTo({
        url: "/pages/index/main"
      });
    },
    UserInfo(e) {
      console.log(e);
      mpvue.getUserInfo({
        success: res => {
          var userInfo = res.userInfo;
          var nickName = userInfo.nickName;
          var avatarUrl = userInfo.avatarUrl;
          var gender = userInfo.gender; //性别 0：未知、1：男、2：女
          var province = userInfo.province;
          var city = userInfo.city;
          var country = userInfo.country;
          this.userAvatarUrl = avatarUrl;
          this.userNickName = nickName;
          store.commit("getUserInfo", userInfo);
          this.is = false;
        }
      });
    }
  },

  onLoad() {
    mpvue.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          mpvue.getUserInfo({
            success: res => {
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              var avatarUrl = userInfo.avatarUrl;
              var gender = userInfo.gender; //性别 0：未知、1：男、2：女
              var province = userInfo.province;
              var city = userInfo.city;
              var country = userInfo.country;
              this.userAvatarUrl = avatarUrl;
              this.userNickName = nickName;
              store.commit("getUserInfo", userInfo);
              this.is = false;
            }
          });
        }
      }
    });
  },
  onShow: function() {},
  created() {}
};
</script>

<style scoped>
.guide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200rpx;
}
.avatar {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
}
.avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.nickname {
  font-size: 40rpx;
  text-align: center;
}
.btn {
  border: 0;
  outline: none;
}
</style>
