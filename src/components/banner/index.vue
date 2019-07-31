<template>
    <div class="banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" 
                 v-for='(item,index) of list'
                :key='index'
                >
                    <img :src="item.picUrl" alt="" class="banner_img">
                </div>
                
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import  Swiper from 'swiper' //引入swiper
import Apiconfig from "common/api/apiconfig.js"
export default {
     data() {
            return {
                list:[]
            }
        },
    methods: {
        initswiper() {
           new Swiper ('.swiper-container', {
              loop: true, // 循环模式选项
              autoplay:true,
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })        
        },
        initdata(){
            let url = Apiconfig.banners;
            this.$axios.get(url)
            .then((data) => {
                 this.list = data.data.slider
                 this.$nextTick(() => {
                     this.initswiper();
                 })
            })
        }
    },
    created() {
        this.initdata();
    },
}
</script>
<style lang="less" scoped>
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
@import "~common/style/index.less";
.banner{
    .banner_img{
         width: 100%;
         height: 50%;
    }
    .swiper-comtainer{
        .w(375);
        .h(180);
    }
}

</style>
