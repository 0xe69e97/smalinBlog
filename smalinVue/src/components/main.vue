<template>
 <div class="main">
    <headerTitle></headerTitle>
      <sideBar></sideBar>
      <Content></Content>
      <rightAlert></rightAlert>
</div>
</template>

<script>
import css from '../libs/sheets-of-paper-a4.css'
import headerTitle from "./headerTitle";
import sideBar from "./sidebar";
import Content from "./content";
import rightAlert from "./contents/article";
export default {
  name: "Main",
  components: {
    headerTitle,
    sideBar,
    Content,
    rightAlert
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  mounted(){
    // 默认跳转路由到home组件 2018/2/8
    this.$router.push('/Home');
  }
};
</script>

<style scoped>
.sider{
  float:left;
}
</style>