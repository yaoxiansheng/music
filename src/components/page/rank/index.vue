<template>
    <div class="rank">
        <div class="wapper">
            <ul class="content">
                <li v-for="(item,index) in listrank" :key = "index" @click="godetalrank(item)">
                    <img :src="item.img" alt="">
                    <ul class="rank_border" >
                        <li v-for="(item2,inde) in item.name" :key = "inde">{{inde+1}}.{{item2.songname}}-{{item2.singername}}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import JSONP from "../../../common/api/jsonp" 
import APIconfig from "../../../common/api/apiconfig" 
export default {
    data() {
        return {
            listrank:[],
        }
    },
    methods: {
        godetalrank(item){
            this.$router.push({name:'detalRank',params:{info:item}})
        },
        inita(){
            JSONP(APIconfig.rank,{param:'jsonpCallback'})
            .then((data) => {
                data.data.topList.forEach(element => {
                    this.listrank.push({
                        _id:element.id,
                        img:element.picUrl,
                        name:element.songList
                    });
                });
                console.log(this.listrank)
                this.$nextTick(() => {
                    this.initScroll(); 
                })
            })
        },
        initScroll(){
           this.scroll=new BScroll('.wapper',{click:true})
        },
       
    },
    created() {
        this.inita();
    },
}
</script>
<style lang="less" scoped>
@import '~common/style/index.less';
    *{
        padding: 0px;
        margin: 0px;
    }
    ul,ol{
        list-style: none;
    }
    .wapper{
         overflow: hidden;
         .w(375);
         position: fixed;
         .top(88);
         .bottom(0);
    }
    .content{
        .padding(20,20,0,20);
        li{
            display: flex;
            .margin(0,0,20,0);
            img{
                .w(100);
                .h(100);
            }
            .rank_border{
                .padding(10,20,10,20);
                background: #333;
                .h(80);
                .w(190);
                overflow: hidden;
                font-size: @fontSize-s;
                // font-weight: 700;
                color: hsla(0,0%,100%,.3);
                li{ 
                    .w(200);
                    .margin(0,0,10,0);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    .l_h(20);
                    display: block;
                }
            }
        }
    }
</style>
