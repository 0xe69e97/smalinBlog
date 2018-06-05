<template>
    <div class = "articleList">
      <!-- 删除对话框 -->
      <Modal v-model="articleFlag" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除文章</span>
        </p>
        <div style="text-align:center">
            <p>你确定删除文章吗？删除文章后，不可恢复。</p>
            <!-- <p>你确定删除吗？</p> -->
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="del">删除</Button>
        </div>
    </Modal>
      <!-- 渲染服务器请求回来的home页的文章列表 -->
        <div v-for = "(item, index) in content" :key = "index" class = "content" @click = "clickArticleList(item.id, item.title)" @contextmenu="delArticle(item.id)">
          <div class = "leftContent">
            <div class = "articleTitle"><h1>{{ item.title }}</h1></div>
            <div class = "articlePreview" v-html = "item.content"></div>
          </div>
          <!-- 右侧图片 -->
            <div class = "photo">
              <img src = "../../assets/nophoto.png" />
            </div>
        </div>
        <!-- 分页 -->
        <div class = "pageing">
      <Page :total="totalMessage" v-if="totalMessage > 10" show-elevator show-sizer show-total 
      @on-change = "changePageNo" @on-page-size-change = "changePageSize"></Page>
      <!-- 添加文章 -->
        <div class = "addArticle" v-if="login.isLogin == true" @click="addArticle">
          <Icon type="ios-compose-outline"></Icon>
        </div>
    </div>
    </div>
</template>

<script>
import * as TYPES from "../../vuex/mutation-types.js";
import { mapGetters,mapActions } from "vuex";
export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      articleFlag: false,
      articleType: "",
      content: "",
      page: {
        pageNo: 1,
        pageSize: 10
      },
      totalMessage: 0,
      currArticleId: 0
    };
  },
  computed: {
    ...mapGetters({
      login: TYPES.login,
      getArticleId: TYPES.getArticleId,
      changeFlag: TYPES.changeFlag,
    })
  },
  watch: {
    changeFlag: function (){
      this.getArticle();
    }
  },
  methods: {
    ...mapActions({
      changegetArticleId: TYPES.changegetArticleId,
      changeshowBar: TYPES.changeshowBar,
      changetitle: TYPES.changetitle
    }),
    save() {
      let content = document.getElementById("article").innerText;
    },
    clickArticleList(id, title){
      this.changegetArticleId({
        show: true,
        id: id
      });
      this.changetitle(title);
    },
    // 获取文章列表
    getArticle () {
      if (this.$route.name == "Home") {
        this.articleType = "all";
      } else {
        this.articleType = this.$route.name;
      }
      let json = {
        type: this.articleType,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize
      }
      json = JSON.stringify(json);
      client.invoke("getArticle", [json], res => {
        this.content = res.result;
        this.totalMessage = res.total;
        // 请求成功，进度条读完
        this.$Loading.finish();
      });
    },
    delArticle(id){
      if (this.login.isLogin !== true) {
        return
      }
      this.articleFlag = true;
      this.currArticleId = id;
      // this.del(id)
    },
    del(){
      client.invoke('deleteArticle', [this.currArticleId], res => {
        let data = JSON.parse(res);
          this.articleFlag = false;
        if ( data.status == 0 ) {

          // this.modal_loading = false;
          this.$Message.success('删除成功！');
          this.getArticle();
        } else {
          this.$Message.error('删除失败！');
        }
      })
    },
    addArticle(){
      this.changegetArticleId({
        id: null,
        show: true
      })
      this.changetitle('');
    },
    // 更改当前页数
    changePageNo(pageNo){
      this.page.pageNo = pageNo;
      this.getArticle();
    },
    // 更改当前显示条数
    changePageSize(pageSize){
      this.page.pageSize = pageSize;
      this.getArticle();
    },
  },
  mounted() {
    // 进度条开始
    this.$Loading.start();
    // 请求默认文章
    this.getArticle();
    this.$on('test', function (){
      alert('a')
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.articleList {
  width: 100%;
  height: 100%;
}
.content {
  width: calc(100% - 20px);
  height: 230px;
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid #999;
  cursor: pointer;
  transition: border 0.5s;
  float: left;
}
.content:hover {
  border-bottom: 1px solid rgb(45, 140, 240);
  transition: border 0.5s;
}
.photo {
  float: left;
}
.photo img {
  width: 210px;
  height: 210px;
}
.articleTitle {
  width: 100%;
  height: 30px;
  overflow: hidden;
}
.time {
  font-size: 14px;
  font-weight: bold;
}
.leftContent {
  width: calc(100% - 220px);
  float: left;
}
.addArticle{
  border: 1px dashed #dddee1;
  width: calc(100% - 20px);
  height: 230px;
  line-height: 230px;
  text-align: center;
  font-size: 64px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: border 0.5s, color .5s;
  float: left;
}
.addArticle:hover {
  border: 1px dashed rgb(45, 140, 240);
  color: rgb(45, 140, 240);
  transition: border 0.5s, color .5s;
}
.pageing{
  margin-top: 30px;
  width: 100%;
  height: 50px;
  text-align: center;
}
.articlePreview{
    padding: 10px;
    height: 170px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: auto;
}
</style>
