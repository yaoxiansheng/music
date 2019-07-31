<template>
    <div class = "plays" v-if='songlist.length'>
         <div class='fullSreen'>
            <span @click="godetail()" > < </span>
            <div class='bg'>
                <img :src="songInfo.img" alt="">
            </div>
            <div class='header'>{{songInfo.songname}}</div>
            <h5>{{songInfo.name}}</h5>
            <div class='cd'>
                <div class='cd_wapper'>
                    <img :src="songInfo.img" alt="">
                    <audio 
                    ref='audio' 
                    @canplay="canPlay"
                    :src="songInfo.audiosrc" 
                    controls></audio>
                </div>
            </div>
            <br>
            <p>{{line.txt}}</p>
          <button @click='nextSong'>next</button>
          <button @click='prevSong'>befor</button>
          
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
export default {
    data(){
        return{
            line:{txt:'loading'}
        }
    },
    computed:{
        
        ...mapState({songlist:state=>state.song.songlist,
        currentIndex:state=>state.song.currentIndex}),
        songInfo(){
            // 当前的歌曲信息
            let info = this.songlist[this.currentIndex]
            if(info==[]||info==undefined){
            return []
            }else{
                let songmid=info.songmid
                console.log("songmid",songmid);
                //拼接歌词链接与歌曲链接
                info.audiosrc=`'http://dl.stream.qqmusic.qq.com/C400' +${songmid} + '.m4a?fromtag=38&guid=5931742855&vkey=577AFCD8396DD62F1EF4BB62B7BB2E54C3D0C12DD970E15EB21EBBDF913B0AD752F2EB470DE418FCAD3CFB94D2B07D286A5A5F08A5A2C4D5`
                info.lyricsrc=`/music/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552895615274&Vkey`
            }
            return info;
        }
    },

    methods: {
         getLyric(url){
         console.log(url)
            this.$axios.get(url)
            .then((data)=>{
                // console.log(data)
                let text=Base64.decode(data.lyric)
                console.log(text)
                let LyricObj=new Lyric(text,(line)=>{
                    console.log(line)
                    this.line=line
                })
                // console.log(LyricObj)
                // console.log(LyricObj.__proto__)
                LyricObj.play()//播放歌词
            })
         },
         canPlay(){
         console.log('加载完毕')
         this.audio=this.$refs.audio
         console.log(this.audio)
         this.audio.play()
     },
        godetail(){
             this.$store.commit('godetail')
        },
        // 下一首歌的方法
        ...mapMutations(['nextSong','prevSong'])
    },
    watch: {
        songInfo(newSong,oldSong){
         //歌曲变化的所有逻辑处理
         console.log('歌曲发生变化')
         // 加载新的歌词信息
         console.log(newSong)
         console.log(this.$ref.audio.__proto__);
         this.getLyric(newSong.lyricsrc)
     }
    },

}
</script>
<style lang="less" scoped>
@import '~common/style/index.less';
.plays{
    background:black;
    position: fixed;
    .top(0);
    .bottom(0);
    .w(375);
    font-size: 15px;
     .fullSreen{
        position: fixed;
        top:0;
        bottom: 0;
        color:#fff;
        text-align: center;
        .w(375);
        .bg{
            position: absolute;;
            z-index: -999;
            .w(375);
            height: 100%;
            // background: red;
            img{
                width: 100%;
                height: 100%;
                filter: blur(20px);
                opacity: 0.7;
            }
        }
        .cd{
            .w(375);
            .h(375);
            display: flex;
            justify-content: center;
            align-items: center;
            div{
                width: 75%;
                height: 75%;
                border-radius: 50%;
                border: 10px solid rgba(0,0,0,.3);
                img{
                    width:100%;
                    height: 100%;
                    border-radius:50%; 
                }
            }
        } 

    }
}
</style>
