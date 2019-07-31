<template>
    <div class="seacher">
        <div class="input">
            <input type="text" ref="inp" placeholder="搜索歌曲、歌手">
            <ul v-if="!be">
                <li v-for="(item,index) in seachers" :key = index @click="goplays(index)">
                    {{item.songname}} - {{item.singer[0].name}}
                </li>
            </ul>
        </div>
        <div class="seacherBorder"> 
            <p v-if="be">热门搜索</p>
            <ul v-if="be" >
                <li v-for="(item,index) in list" :key = "index" @click="inpv(item)">
                    {{item.k}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Apiconfig from "common/api/apiconfig.js"
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            list:[],
            be:true,
            seachers:[],
            singerlist:[]
        }
    },
    methods: {
         inpv(val){
             var inpu  = this.$refs.inp;
             inpu.value = val.k.trim();
             this.searchinput()
             this.searchinput2()
         },
         goplays(index){
           // 跳转到歌手页（本来就存在，点击传参使其显示）
           this.$store.commit('addSongList',{songlist:this.singerlist,currentIndex:index})
           },
         inita(){
             this.$axios.get(Apiconfig.seacher)
             .then((data) => {
                 var index = 0;
                 data.data.hotkey.forEach(element => {
                        index++
                        if(index <= 10){
                            this.list.push(element);
                        }
                 });
               this.inpval();
                
             })
         },
         inpval(){
             var inpu  = this.$refs.inp;
            //  监听input的变化
            // 组件显示和隐藏
             inpu.addEventListener("change",this.searchinput);
            // 搜索
             inpu.addEventListener("change",this.searchinput2);
         },
         searchinput(){
             var inpu  = this.$refs.inp.value;
             if(inpu){
                 this.be = false;
             }else{
                 this.be = true;
             }
         },
         searchinput2(){
             var inpu  = this.$refs.inp.value;
             var url = `/seach/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${inpu}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`;
             this.$axios.get(url)
             .then((data) => {
                 console.log(data);
                 
                 this.seachers = [];
                 var index = 0;
                 data.data.song.list.forEach(element => {
                    index++
                    if(index <= 13){
                        this.seachers.push(element);
                        this.singerlist.push({
                        img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${element.albummid}.jpg?max_age=2592000`,
                        songname:element.songname,
                        songmid:element.songmid,
                        name:element.albumname
                        })
                    }
                 });
             })
         }
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
.seacher{
    .padding(20,20,20,20);
}
    .input{
        align-items: center;
        box-sizing: border-box;
        .w(330);
        .padding(0,6,0,6);
        .h(40);
        background: #333;
        border-radius: 6px;
        ul{
            li{
                font-size: 18px;
                color: hsla(0,0%,100%,.3);
                .margin(10,0,10,0);
            }
        }
        input{
            .w(260);
            .l_h(6);
            background: #333;
            color: #fff;
            font-size: 14px;
            border: none;
            .margin(0,15,0,15);
            position: relative;
            .top(-15);
            outline:none;
        }
    }
    .seacherBorder{
        p{
            font-size: @fontSize-l;
            color: hsla(0,0%,100%,.5);
            .margin(15,0,0,0);
        }
        ul{
            .padding(0,0,0,0);
             .margin(-10,0,0,0);
            li{
                display: inline-block;
                .padding(2,8,2,8);
                .margin(0,10,0,0);
                border-radius: 6px;
                background: #333;
                font-size: 14px;
                color: hsla(0,0%,100%,.3);
            }
        }
    }
</style>
