<template>
 <div class="content" :class = "{changeContent: changeContent}" :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
     <div class = "contentAll">
        <router-view></router-view>
     </div>
</div>
</template>

<script>
import * as TYPES from "../vuex/mutation-types.js";
import { mapGetters } from "vuex";
export default {
  name: "Content",
  components: {},
  data() {
    return {
      changeContent: false
    };
  },
  watch: {
    leftBarState: function() {
      this.changeContent = this.leftBarState;
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      leftBarState: TYPES.leftBarState
    })
  },
  mounted() {}
};
</script>

<style scoped>
.content {
  position: absolute;
  margin: 15px;
  width: calc(100% - 320px);
  margin-left: 300px;
  height: calc(100% - 95px);
  overflow: hidden;
  transition: width 0.5s, margin-left 0.5s;
}
.changeContent {
  width: calc(100% - 120px);
  margin-left: 100px;
  transition: width 0.5s, margin-left 0.5s;
}
.contentAll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>