<template>
    <div class="tab">
       <router-link 
           tag='div'
           to='/recommend'
           active-class='sel'
          >推荐</router-link>
          <router-link 
           tag='div'
           to='/singer'
           active-class='sel'
          >歌手</router-link>
          <router-link 
           tag='div'
           to='/rank'
           active-class='sel'
          >排行</router-link>
          <router-link 
           tag='div'
           to='/seacher'
           active-class='sel'
          >搜索</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
   @import '~common/style/index.less';
.tab{
    .w(375);
    .h(44);
    color:@fontColorWO;
    display: flex;
    font-size: @fontSize-l;
    text-align: center;
    justify-content: space-around;
    div{
        border-bottom: 2px solid @bgColor;
        .l_h(44);
    }
    .sel{
        border-bottom: 2px solid @fontColorSel;
        color: @fontColorSel;
    }
}
</style>
