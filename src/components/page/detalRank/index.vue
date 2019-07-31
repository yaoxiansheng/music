<template>
    <div class="detalrank">
        <div class="wapper1">
            <div class="content1">
                 <div class="detal_header" :style="{background:`url(${this.list.avator} )`}">
                     <div @click="gosinger()" class="gosinger"> < </div>
                     <div class="title">
                         {{title}}
                     </div>
                 </div>
                 <div class="detal_border">
                      <ul v-for="(item,index) in singerlist" :key="index" @click="goplays(index)">
                          <img :src="imgs[0].one" alt="" v-if="index == 0">
                          <img :src="imgs[0].two" alt="" v-if="index == 1">
                          <img :src="imgs[0].three" alt="" v-if="index == 2">
                        <span v-if="index > 2">{{index+1}}</span> 
                        <div>
                            <li>{{item.songname}}</li>
                            <li class="name">{{item.singername}} - {{item.songname}}</li>
                        </div> 
                     </ul>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import JSONP from '../../../common/api/jsonp'
import BScroll from 'better-scroll'
import apiconfig from '../../../common/api/apiconfig';
import {mapMutations} from 'vuex'
export default {
   
    data() {
        return {
            list:[],
            singerlist:[],
            title:"",
            imgs:[]
        }
    },
    created() {
        this.inita();
    },
    methods: {
         goplays(index){
            // 跳转到歌手页
            this.$store.commit('addSongList',{songlist:this.singerlist,currentIndex:index})
        },
        initScroll(){
           this.scroll=new BScroll('.wapper1',{click:true})
        },
        // 路由传参需要页面刷新参数丢失问题
        inita(){
            if(!this.$route.params.info){ 
                return this.$router.back()
            }else{
                this.list = this.$route.params.info
                console.log(this.list);
            }
            //获取前三的图片 
            this.imgs = apiconfig.imgs;
            let url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=${this.list._id}&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5`
            JSONP(url,{param:'jsonpCallback'})
            .then( (data) => {
                console.log('====================================');
                console.log(data);
                console.log('====================================');
                this.title = data.topinfo.ListName;
                data.songlist.forEach(element => {
                    this.singerlist.push({
                        songname:element.data.songname,
                        name:element.data.albumname,
                        singername:element.data.singer[0].name,
                        songmid:element.data.songmid,
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${element.data.albummid}.jpg?max_age=2592000`
                    })
                });
                // console.log(this.singerlist);
                this.$nextTick(() => {
                    this.initScroll(); 
                })
            })
            
        },
        gosinger(){
            if(!this.$route.params.info){ 
            return this.$router.back()
            }
            this.$router.push("/rank");
        },
       
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
.detalrank{
    .w(375);
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(27,27,27);
    // z-index: 99;
      .wapper1{  
         overflow: hidden;
         .w(375);
         position: fixed;
         .top(0);
         .bottom(0);
         
      }
    .detal_header{
        .w(375);
        .h(262);
        display: flex;
        background-size: 100% !important;
        .gosinger{
            .padding(2,0,0,5);
            font-size: 22px;
            color: #ffcd32;
        }
        .title{
            position: absolute;
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            line-height: 40px;
            font-size: 18px;
            color: #fff;
        }
    }
    .detal_border{
        .padding(20,30,20,30);
        font-size: 15px;
        color: #fff;
        ul{
            .padding(5,0,5,0);
            display: flex;
            img{
                .margin(0,10,0,0);
                .w(25);
                .h(24)
            }
            span{
                display: block;
                .margin(0,10,0,0);
                .w(25);
                .h(24)
            }
            .name{
                color: hsla(0,0%,100%,.3);
            }
            li{
                .w(260);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
}
</style>
