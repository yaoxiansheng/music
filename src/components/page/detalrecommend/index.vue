<template>
    <div class="detal">
        <div class="detal_header" :style="{background:`url(${this.list.imgurl} )`}">
            <div @click="godetalrecommend()" class="gosinger"> < </div>
            <div class="title">
                {{list.dissname}}
            </div>
        </div>
        <div class="wapper2">
            <div class="content2">
                 <div class="detal_border">
                      <ul v-for="(item,index) in singerlist" :key="index" @click="goplays(index)">
                         <li>{{item.songname}}</li>
                         <li class="name">{{item.name}} - {{item.songorig}}</li>
                     </ul>
                 </div>
            </div>
        </div>

    </div>
</template>
<script>
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'
// import BScroll from 'better-scroll'
export default {
   
    data() {
        return {
            list:[],
            singerlist:[],
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
           this.scroll=new BScroll('.wapper2',{click:true})
        },
        // 路由传参需要页面刷新参数丢失问题
        inita(){
            if(!this.$route.params.detalinfo){ 
                return this.$router.back()
            }else{
                this.list = this.$route.params.detalinfo;
            }
            let url=`/music/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${this.list.dissid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`
           this.$axios.get(url)
            .then( (data) => {
                console.log("data",data);
                data.cdlist[0].songlist.forEach(element => {
                    this.singerlist.push({
                        songname:element.songname,
                        songorig:element.songorig,
                        songmid:element.songmid,
                        name:element.singer[0].name,
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${element.albummid}.jpg?max_age=2592000`
                    })
                });
                 console.log(this.singerlist)
            })
            
        },
        godetalrecommend(){
            if(!this.$route.params.detalinfo){ 
            return this.$router.back()
            }
            console.log(2222);
            this.$router.push("/recommend");
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
    background: rgb(57, 57, 57);
      .wapper2{  
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
