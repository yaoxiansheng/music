<template>
    <div class="singer">
        <div class="wapper">
            <ul class="content">
                <!-- 遍历标题 -->
                <li v-for="(group,index) in singerList" :key = "index">
                    <div class='title' :ref='group.title'>{{group.title=='hot'?'热门':group.title}}</div>
                    <ul class='singer-group'>
                        <!-- 遍历图片与内容 -->
                        <li v-for='(item,index) in group.items' :key='index' class='singer-item' @click="godetal(item)">
                            <div>
                                <img width='50' height='50' :src='item.avator' alt="">
                                <span>{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
         <!-- 侧边栏 -->
        <ul class='slider'
           @touchstart='start'
           @touchmove='move'
        >
            <li v-for='(item,index) in sliderData' :key='index'
            :class='index==Findex?"sel":""'
            @click="go(item)"
            >
                {{item==='hot'?'热':item}}
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
import Apiconfig from 'common/api/apiconfig.js'
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            singerList:[],
            Findex:0,
        }
    },
    methods: {

        start(e){
             console.log('按下')
             this.startY=e.touches[0].clientY  //保存按下的y坐标
             console.log(e)
             // 获取按下位置在数组中下标
             console.log(e.target.innerText);
             console.log(this.sliderData);

             this.startIndex=this.sliderData.indexOf(e.target.innerText);

            },
         move(e){
             let moveY=e.touches[0].clientY
             let distance=moveY-this.startY

             let index=Math.ceil(distance/18) //移动过的块数
             console.log('移动',distance,index)
             let length=this.sliderData.length-1
             this.Findex=index+this.startIndex
             //边界判断  0-数据长度-1
             if(this.Findex<=0){
                 this.Findex=0
             }else if(this.Findex>=length){
                 this.Findex=length
             }
             console.log(this.Findex);
             let Findex=this.sliderData[this.Findex]
             // Findex 移动下标 不能超过总的数组长度

             console.log(Findex)
              this.scroll.scrollToElement(this.$refs[Findex][0])
            },
        godetal(item){
            console.log("item",item);
            this.$router.push({name:'detal',params:{info:item}})
        },
        go(item){
            // console.log(this.$refs[item])
            this.scroll.scrollToElement(this.$refs[item][0])
        },
        // 初始化
        inita(){
            this.$axios.get(Apiconfig.singer)
            .then((data) => {
               let list = data.data.list;
              
               var obj = {
                  "hot":{
                      title:'hot',
                      items:[]
                  }
               };
               var index = 0;
              //处理数据
               list.forEach(element => {
                   index++;
                   if(index <= 20){
                       obj.hot.items.push({
                            name:element.Fsinger_name,
                            avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                            Findex:element.Findex,
                            FsingerMid:element.Fsinger_mid
                       })
                   }
                   if(obj[element.Findex]){
                       obj[element.Findex].items.push({
                           name:element.Fsinger_name,
                            avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                            Findex:element.Findex,
                            FsingerMid:element.Fsinger_mid
                       })
                   }else{
                       obj[element.Findex] = {
                           title :element.Findex,
                           items :[]
                       }
                       obj[element.Findex].items.push({
                           name:element.Fsinger_name,
                            avator:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${element.Fsinger_mid}.jpg?max_age=2592000`,
                            Findex:element.Findex,
                            FsingerMid:element.Fsinger_mid
                       })
                   }
               });
               console.log('====================================');
               console.log(obj);
               console.log('====================================');
               let hot = [];
               let arr = [];
                // 排除 9 开头的  将hot 已经字母开头进行区分
               for (const key in obj) {
                   if (key != 9) {
                      if(key=='hot'){
                            hot.push(obj[key])
                        }else{
                            arr.push(obj[key]) 
                        } 
                   }
               }
               //排序
               arr.sort((a,b) => {
                   return a.title.charCodeAt()-b.title.charCodeAt()
               })
               this.singerList=hot.concat(arr)
                console.log(this.singerList)
                this.$nextTick(()=>{
                    this.initScroll()
                })
            })
        },
        initScroll(){
           this.scroll=new BScroll('.wapper', {click:true})
        },
    },
    created() {
        this.inita();
    },
    // 侧边栏方法
   computed:{
       ceateScrollHeight(){
          //获取每一个组距离顶部的高度
         let arr= this.singerList.map((el)=>{ //每个组元素的高度
                return 30+70*el.items.length
           })
           let heights=[];//保存高度  距离最上面的高度
           let height=0
           
           for (let index = 0; index < arr.length; index++) {
               height+=arr[index]
               heights.push(height)
           }
           console.log(arr)
           console.log(heights)
           return heights;
         
       },
        sliderData(){   
            let arr=this.singerList.map((item)=>{
               return item.title
           })
           return arr;
       }
   }
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
.singer{
    .top(88);
    .bottom(0);
    position: fixed;
    .w(375);
  .wapper{  
      overflow: hidden;
      .w(375);
      position: fixed;
      .top(88);
      .bottom(0);
    ul{
        li{
            .title{
                .w(375);
                box-sizing: border-box;
                .h(30);
                .l_h(30);
                color: @fontColorWO;
                background: #333;
                font-size: @fontSize-l;
                .padding(0,0,0,20);
            }
            .singer-group{
                color: #fff;
                .singer-item{
                    .h(70);
                    .w(375);
                    .padding(20,0,0,20);
                    box-sizing: border-box;
                    div{
                      display: flex;
                      img{
                          border-radius:50%; 
                      }
                      span{
                          display: inline-block;
                          .h(50);
                          .l_h(50);
                          color:@fontColorWO;
                          font-size: @fontSize-m;
                          .padding(0,0,0,20);
                      }
                    }
                }
            }
        }
    }
  }
    .slider{
    z-index: 9;
     border-radius:10px;
     .padding(20,0,20,0); 
     position: absolute;
     right: 10px;
     top:50%;
     .w(20);
     transform: translate3d(0,-50%,0);
     background:@fontColorNormal;
    //  background: #fff;
     li{
         .w(20);
         .h(18);
         font-size: @fontSize-s;
         text-align: center;
         color: @fontColorWO;
         
     }
    }
    .sel{
         color: @fontColorSel;
     }
}
</style>
