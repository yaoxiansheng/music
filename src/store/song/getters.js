export default{
    currentSong(state){
     let song=state.songlist[state.currentIndex]
     console.log(song,'xxxxx')
    //  if(song.songmid){
    //      //当前的歌曲数据添加2条数据 1.歌词请求地址 2.歌曲地址
    //     song.lyric=`http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${song.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552891385741`
    //     song.music=`http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${song.songmid}.m4a?guid=2386007907&vkey=24CE246E1034B853A923FBA3CE5CA13EC47620B7C69121AE4C66487F7B08E1271200563F19AAF928539C5A61AAC7C8F41CD278F95621552F&uin=0&fromtag=38` 
    //  }
        return song //获取正在播放的歌曲 相关信息
    }
}
