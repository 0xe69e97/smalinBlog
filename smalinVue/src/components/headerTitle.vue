<template>
    <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <span class = "textLogo">Smalin</span>
            <Button v-if="!(login.isLogin)" style = "float: right;margin-top: 15px;" type="primary" shape="circle" icon="person"
            @click="modal1 = true">Sign up</Button>
            <Button type="primary" style = "float: right;margin-top: 15px;" shape="circle" icon="person"
            @click="exitLogin" v-if="login.isLogin">Exit</Button>
        </Header>
    <Modal style = "margin-top: 10%;"
        v-model="modal1"
        title="sign Up"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class = "userPass">
          <span>用户名：</span><Input v-model="userName" placeholder="Enter userName..." style="width: 300px" @keyup.enter="ok()"></Input>
          </div>
        <div class = "userPass">
          <span>密&nbsp;&nbsp;&nbsp;码：</span>
          <Input v-model="passWord" type = "password" placeholder="Enter passWord..." style="width: 300px" @keyup.enter="ok()"></Input>
          </div>
    </Modal>
    </Layout>

</template>

<script>
import * as TYPES from "../vuex/mutation-types.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "headerTitle",
  component: {},
  data() {
    return {
      map: null,
      latLng: null,
      modal1: false,
      userName: null,
      passWord: null
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      login: TYPES.login,
    })
  },
  methods: {
    ...mapActions({
      changelogin: TYPES.changelogin,
      changeeditArticle: TYPES.changeeditArticle,
    }),
    ok() {
      let passWord = hex_md5(this.passWord);
      client.invoke("signUp", [this.userName, passWord], res => {
        if (res.status == 500) {
          this.$Message.info('账号或者密码错误！');
        } else {
          this.$Message.info('登入成功！');
          // 更改登入信息
          this.changelogin({
            user: this.userName,
            isLogin: true
          })
          // 取消右键默认事件 
            document.oncontextmenu = function(e){
              e.preventDefault();
            };
        }
      });
      this.userName = null;
      this.passWord = null;
    },
    cancel() {
      this.$Message.info("取消登入！");
      this.userName = null;
      this.passWord = null;
    },
    exitLogin(){
      this.changelogin({
            user: null,
            isLogin: false
          })
    },
    editArticle(){
      this.changeeditArticle(true);
    }
  },
  mounted() {
  }
};
</script>

<style>
#main {
  position: absolute;
  text-align: center;
  top: 30%;
  left: 30%;
  width: 320px;
  margin-left: -160px;
  margin-top: -160px;
  font-size: 16px;
}
.mainStyle {
  width: 38rem;
  margin-top: 15%;
  margin-bottom: 15%;
}
.mainStyle p {
  width: 80rem;
  font-size: 4rem;
  font-weight: 700;
  line-height: 3.5rem;
  font-family: "roboto", monospace;
  width: 100%;
  height: auto;
}

.textLogo {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 36px;
}
.headButton {
  width: 600px;
}
.headButton Button {
  margin: 5px;
}
.userPass {
  margin: 25px;
}
</style>