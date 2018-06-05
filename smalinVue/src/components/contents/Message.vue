<template>
  <div class = "message">
    <div class = "contents">
      <!-- 删除对话框 -->
      <Modal v-model="displayFlag" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除留言</span>
        </p>
        <div style="text-align:center">
          <p>你确定删除留言吗？删除留言后，不可恢复。</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long @click="deleteMessage">删除</Button>
        </div>
      </Modal>
      <div class = "content" v-for="item in contens" :key="item.id" @contextmenu="clickDel(item.id)">
        <div class = "title">
          User：{{ item.user }}，Say：
        </div>
        <div class = "messages" v-html="item.content">
        </div>
        <div class = "foote">发表时间：{{ item.time }}</div>
      </div>
    </div>
    <!-- 分页 -->
    <div class = "pageing" v-if="totalMessage > 10">
      <Page :total="totalMessage" show-elevator show-sizer show-total 
      @on-change = "changePageNo" @on-page-size-change = "changePageSize"></Page>
    </div>
    <div class = "published-message">
      <div class = "biaodan">
        <table width = 100%>
          <tr>
            <td style = "width: 42px;"><span style = "color: red;min-width: 42px">*</span>邮箱：</td>
            <td>
              <Input v-model="email" placeholder="Enter email..." style="max-width: 640px"></Input>
            </td>
          </tr>
          <tr>
            <td><span style = "color: red;">*</span>内容：</td>
            <td>
              <Input v-model="message" type="textarea" :rows="4" placeholder="Enter something..." style="max-width: 640px"></Input>
            </td>
          </tr>
        </table>
        <div class = "submitButton">
          <Button type="primary" @click="sunmitMessage">提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as TYPES from "../../vuex/mutation-types.js";
import { mapGetters,mapActions } from "vuex";
export default {
  name: 'Message',
  data () {
    return {
      displayFlag: false,
      messageId: null,
      contens: [],
      message: '',
      email: '',
      page: {
        pageNo: 1,
        pageSize: 10
      },
      totalMessage: 0
    }
  },
  computed: {
    ...mapGetters({
      login: TYPES.login
    })
  },
  mounted(){
    this.getMessage();
  },
  methods: {
    // 获取留言列表
    getMessage(){
      let param = {
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize
      }
      param = JSON.stringify(param);
      client.invoke("getMessages",[param], res => {
        let data = JSON.parse(res);
        this.contens = data.result;
        this.email = '';
        this.message = '';
        this.totalMessage = data.total;
        // 请求成功，进度条读完
        this.$Loading.finish();
      });
    },
    // 发表留言
    sunmitMessage(){
    // 表单验证，如果邮箱内容和内容为空，或者邮箱无@字符，验证失败
    if ( this.email == '' ) {
      this.$Message.warning('邮箱不可为空！');
      return
    }
    if (this.email.indexOf('@') == -1) {
      this.$Message.warning('邮箱格式不正确！');
      return
    }
    if ( this.message == '') {
      this.$Message.warning('留言内容不可为空！');
      return
    }
      // 获取当前留言的日期
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if ( month < 10 ) {
        month = `0${month}`
      }
      let day = date.getDate();
      if ( day < 10 ) {
        day = `0${day}`
      }
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      let seconds = date.getSeconds();
      if (seconds < 10 ) {
        seconds = `0${seconds}`
      }
      let currDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      let reg = new RegExp("\n", "g");
      this.message = this.message.replace(reg, "</br>");
      let param = {
        user: this.email,
        content: this.message,
        time: currDate
      }
      param = JSON.stringify(param);
      client.invoke('releaseMessage', [param], (res) => {
        let data = JSON.parse(res);
        if ( data.status == 0) {
          this.getMessage();
          this.$Message.success('保存成功！');
        } else {
          this.$Message.error('保存失败！');
        }
      })
    },
    clickDel(id) {
      if (this.login.isLogin == false) {
        return
      }
      this.displayFlag = true;
      this.messageId = id;
    },
    // 删除留言 2018-05-19 00:50:37
    deleteMessage (){
      client.invoke('deleteMessage', [this.messageId], res => {
        let data = JSON.parse(res);
        if (data.status == 0) {
          this.displayFlag = false;
          this.$Message.success('删除成功！');
          // 刷新留言列表
          this.getMessage();
        } else {
          this.$Message.error('删除失败！');
        }
      })
    },
    // 更改当前页数
    changePageNo(pageNo){
      this.page.pageNo = pageNo;
      this.getMessage();
    },
    // 更改当前显示条数
    changePageSize(pageSize){
      this.page.pageSize = pageSize;
      this.getMessage();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message{
	width: 99%;
	height: auto;
	/*background-color: black;*/
	border-radius: 100px;
	/* border: solid 1px rgb(45, 140, 240); */
}
.contents{
  width: calc(100% - 60px);
  min-height: calc(100% - 260px);
  height: auto;
  overflow: hidden;
  margin-left: 30px;
  margin-top: 30px;
  /* background-color: black; */
}
.content{
  width: 100%;
  height: auto;
  min-height: 200px;
  margin-top: 10px;
  border-bottom: 1px dotted #999;
}
.title{
  color: #464c5b;
  font-size: 16px;
  font-weight: 700;
}
.messages{
  min-height: 150px;
  color: #657180;
  font-size: 12px;
}
.foote{
  font-size: 14px;
  color: #464c5b;
  font-weight: 700;
  position: relative;
}
.pageing{
  margin-top: 30px;
  width: 100%;
  height: 50px;
  text-align: center;
}
.published-message{
  margin-bottom: 50px;
  height: 300px;
  width: 50%;
  margin-left: 25%;
}
.biaodan{
  width: 100%;
  height: 300px;
  padding: 50px;
  /* background-color: black; */
}
.biaodan td {
  min-width: 42px;
}
.submitButton{
  margin-top: 15px;
  margin-right: 30px;
  float: right;
}
</style>