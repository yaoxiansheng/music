<template>
    <div class="detal">
          <div class="detal_header" :style="{background:`url(${this.list.avator} )`}">
                 <div @click="gosinger()" class="gosinger"> < </div>
                 <div class="title">
                     {{list.name}}
                 </div>
             </div>
        <div class="wapper1">
            <div class="content1">
                 <div class="detal_border">
                      <ul v-for="(item,index) in singerlist" :key="index" @click="goplays(index)">
                         <li>{{item.songname}}</li>
                         <li class="name">{{list.name}} - {{item.name}}</li>
                     </ul>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import JSONP from '../../../common/api/jsonp'
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
// import BScroll from 'better-scroll'
export default {
   
    data() {
        return {
            list:[],
            singerlist:[]
        }
    },
    created() {
        this.inita();
    },
    mounted() {
        this.initScroll();
    },
    methods: {
        goplays(index){
            // 跳转到歌手页（本来就存在，点击传参使其显示）
            console.log(this.$store);
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
                // console.log(this.list);
            }
            let url=`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${this.list.FsingerMid}`
            JSONP(url,{param:'jsonpCallback'})
            .then( (data) => {
                // console.log('====================================');
                console.log(data.data);
                // console.log('====================================');
                var singer_id = data.data.singer_id;
                var singer_mid = data.data.singer_mid;
                data.data.list.forEach(element => {
                    this.singerlist.push({
                        name:element.musicData.albumname,
                        songname:element.musicData.songname,
                        singer_id:singer_id,
                        singer_mid:singer_mid,
                        songmid:element.musicData.songmid,
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${element.musicData.albummid}.jpg?max_age=2592000`
                    })
                });
                console.log(this.singerlist);
                
            })
            
        },
        gosinger(){
            if(!this.$route.params.info){ 
            return this.$router.back()
            }
            this.$router.push("/singer");
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
.detal{
    .w(375);
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(27, 27, 27);
    z-index: 99;
      .wapper1{  
         overflow: hidden;
         .w(375);
         position: fixed;
         .top(262);
         .bottom(0);
         
      }
    .detal_header{
        .w(375);
        .h(262);
        display: flex;
        position: fixed;
        background-size: 100% !important;
        .gosinger{
            // position: absolute;
            // .top(0);
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
            .name{
                color: hsla(0,0%,100%,.3);
            }
            li{ 
                .w(315);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
}
</style>
