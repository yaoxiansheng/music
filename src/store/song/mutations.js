export default{
    addSongList(state,params){
        // 进行播放  添加播放列表  确定要播放哪一首歌曲
        state.songlist=params.songlist
        state.currentIndex=params.currentIndex
        console.log("addSongList");
    },
    nextSong(state){
        // 边界判断
        state.currentIndex=state.currentIndex+1
    },
    prevSong(state){
        //边界判断
        if(state.currentIndex > 0)
        state.currentIndex=state.currentIndex-1
    },
    godetail(state){
        state.songlist = [];
    }
}