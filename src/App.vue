<template>
  <div id="app">
    <Mheader></Mheader>
    <Tab></Tab>
    <router-view></router-view>
    <Plays></Plays>
  </div>
</template>

<script>
import Mheader from "components/m-header/index"
import Tab from "components/table/index"
import Plays from "components/page/plays/index"
export default {
  name: 'App',
  components:{Mheader,Tab,Plays}
}
</script>

<style lang="less" scoped>
@import "~common/style/index.less";
#app {
  background:@bgColor;
  .w(375);
  position: fixed;
  top: 0;
  bottom: 0;
}
</style>
