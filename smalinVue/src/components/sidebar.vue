<template>
     <div class="sidebar" :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}" :class = "{sidebar2: mark}">
         <div class = "menu">
             <div v-for = "(item,index) in menu" :key = "item.id" @click = "clickMenu(item)" :class = "{selectMenu: index == active}">
               <span><Icon style = "padding: 5px;" :type="item.type"></Icon><span v-show = "showText">{{ item.name }}</span></span>
              </div>
         </div>
         <div class = "sidebarBottom">
           <div class = "shrinkage"  @click = "shrinkage" :class = "{shrinkageOverturn: overturn}">
              <Icon style = "font-size: 24px; line-height: 60px;" type="chevron-left"></Icon>
           </div>
         </div>
    </div>
</template>

<script>
import * as TYPES from "../vuex/mutation-types.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "sidebar",
  data() {
    return {
      menu: [
        {
          name: "Home",
          type: "ios-home-outline",
          id: "0"
        },
        {
          name: "Map",
          type: "ios-book-outline",
          id: "1"
        },
        {
          name: "Web",
          type: "social-chrome-outline",
          id: "2"
        },
        {
          name: "Mood",
          type: "ios-heart-outline",
          id: "3"
        },
        {
          name: "Message",
          type: "ios-compose-outline",
          id: "4"
        }
      ],
      isCollapsed: false,
      active: 0,
      mark: false,
      showText: true,
      overturn: false
    };
  },
  computed: {
    ...mapGetters({
      leftBarState: TYPES.leftBarState
    }),
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    ...mapActions({
      changeleftBarState: TYPES.changeleftBarState,
    }),
    clickMenu(item) {
      this.active = item.id;
      this.$router.push(item.name);
    },
    shrinkage() {
      this.mark = !this.mark;
      this.changeleftBarState(this.mark);
      this.overturn = !this.overturn;
      setTimeout(() => {
        this.showText = !this.mark;
      }, 130);
    }
  },
  mounted() {
  }
};
</script>

<style>
.sidebar {
  position: absolute;
  width: 260px;
  height: calc(100% - 95px);
  margin: 15px;
  transition: width 0.5s;
}
.sidebar2 {
  position: absolute;
  width: 60px;
  height: calc(100% - 95px);
  margin: 15px;
  transition: width 0.5s;
}
.menu {
  margin-top: 60px;
}
.menu div {
  width: 100%;
  height: 60px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  line-height: 60px;
  border-right: 2px solid white;
  background-color: rgb(255, 255, 255);
  transition: background-color 0.5s;
}
.menu div span:first-child {
  margin-left: 30%;
  width: 65%;
}
.menu div:hover {
  background-color: rgb(243, 243, 243);
  color: rgb(45, 140, 240);
  transition: background-color 0.5s, color 0.3s;
}
.menu div:active {
  border-right: 6px solid rgb(45, 140, 240);
  /* background-color: rgb(243, 243, 243); */
  /* color: rgb(45, 140, 240); */
  transition: border-right 0.1s;
}
.selectMenu {
  color: rgb(45, 140, 240);
  border-right: 2px solid rgb(45, 140, 240) !important;
}
.sidebarBottom {
  position: absolute;
  width: 100%;
  height: 60px;
  /* background-color: red; */
  bottom: 0px;
  text-align: center;
}
.shrinkage {
  width: 100%;
  height: 60px;
  text-align: center;
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform 0.5s;
}
.shrinkageOverturn {
  transform: rotate(180deg);
  transition: transform 0.5s;
}
</style>