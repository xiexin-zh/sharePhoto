

<template>
  <div class="photo">
    <section class="up">
      <ul class="uUl">
        <li>
          <label for="name">名称</label>
          <input type="text" v-model="nickName" id="name" />
        </li>
        <li>
          <label for="introduce">简介</label>
          <input type="text" value="照片共享" id="introduce" />
        </li>
      </ul>
    </section>
    <section class="middle">
      <ul class="middleUl">
        <li class="middleLi">
          <ul class="midUl">
            <li>
              <span>编辑权限</span>
              <span>{{checkedOne?"允许相册成员添加照片":"仅本人可添加照片"}}</span>
            </li>
            <li class="one">
              <span>{{checkedOne?"是":"否"}}</span>
              <span>
                <switch :checked="checkedOne" @change="changeOne" />
              </span>
            </li>
          </ul>
        </li>
        <li class="middleLi">
          <ul class="midUl">
            <li>
              <span>相册加密</span>
              <span>{{!checkedTwo?"无需密码即可加入相册":"需输入密码才能加入相册"}}</span>
            </li>
            <li class="one">
              <span>{{checkedTwo?"是":"否"}}</span>
              <span>
                <switch :checked="checkedTwo" @change="changeTwo" />
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="down">
      <div @tap="createPhoto">创建相册</div>
    </section>
  </div>
</template>

<script>
import store from "../counter/store";

import {Photo} from "../../utils/index" 

export default {
  data() {
    return {
      checkedOne: true,
      checkedTwo: false,
      nickName:"我的相册",
    };
  },
  methods: {
    changeOne() {
      this.checkedOne = !this.checkedOne;
    },
    changeTwo() {
      this.checkedTwo = !this.checkedTwo;
    },
    createPhoto(){
      store.commit("sendNickName",this.nickName);
      Photo()
    }
  },
  computed: {
    userInfo() {
      return store.state.userInfo;
    }
  },
  mounted() {
    console.log(store.state.userInfo);
  },
};
</script>

<style>
.photo {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 30rpx;
}
.up {
  width: 100%;
  height: 45%;
}
.up > .uUl {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.up > .uUl > li {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #bbb;
}
.middle {
  width: 100%;
  height: 30%;
}
.down {
  width: 100%;
  height: 10%;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 85rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #bbb;
}
.down > div {
  width: 80%;
  height: 70%;
  background: purple;
  color: #fff;
  border-radius: 42rpx;
}
.middleUl {
  width: 100%;
  height: 100%;
}

.middleUl > .middleLi {
  width: 100%;
  height: 50%;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
.middleUl > .middleLi > .midUl {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middleUl > .middleLi > .midUl > li:nth-child(1) {
  display: flex;
  flex-direction: column;
}
.middleUl > .middleLi > .midUl > li:nth-child(1)>span:nth-child(2) {
    font-size: 24rpx;
    color: #aaa;
}
.one > span:nth-child(1) {
  margin: 0 30rpx;
}

input {
  color: purple;
}
</style>