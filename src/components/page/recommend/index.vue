<template>
    <div class="recommed">
        <div class="warpper">
            <div class="content">
                <Banner></Banner>
                <div class="middle">热门榜单推荐</div>
                <ul>
                    <li v-for="(item,index) in list"
                    :key='index'
                    @click="goto(item)"
                    >
                        <div class="left">
                            <!-- <img src="item." alt=""> -->
                            <img v-lazy="item.imgurl" width="60" height="60" alt="">
                        </div>
                        <div class="right">
                            <h4>{{item.name}}</h4>
                            <p>{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Banner from "components/banner/index"
import Apiconfig from "common/api/apiconfig.js"
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            list:[]
        }
    },
     components:{Banner},
     methods: {
         goto(item){
             console.log('跳转2');
             this.$router.push({name:'detalrecommend',params:{detalinfo:item}})
         },
         initScroll(){
            this.scroll=new BScroll('.warpper',{click:true});
        },
         inita(){
             this.$axios.get(Apiconfig.recommend)
             .then((data) =>{
                let arr = [];
                data.data.list.forEach(element => {
                    arr.push({
                       dissid:element.dissid,
                       name:element.creator.name,
                       dissname:element.dissname,
                       imgurl:element.imgurl
                    })
                });
                this.list = arr;
               
             
             })
         }
     },
     created() {
         this.inita();
     },
     mounted() {
         this.initScroll();
     },
}
</script>
<style lang="less" scoped>
@import '~common/style/index.less';
    .middle{
        .w(375);
        .h(65);
        .l_h(65);
        color:@fontColorSel; 
        font-size: @fontSize-l;
        text-align: center;
    }
    .warpper{ 
        .w(375);
        position: fixed;
        .top(88);
        .bottom(0);
        overflow: hidden;
    }
    ul{
        padding-left: 20px;
       margin: 0;
            li{
                .w(375);
                .h(60);
                .padding(0,20,20,0);
                 display: flex;
                 align-items: center;
                .left{
                   .padding(0,20,0,0);
                   .w(60);
                   .h(60);
                }
                .right{
                    h4,p{
                      .h(20);
                       .l_h(20);
                       font-size: @fontSize-l;
                       color: #fff;
                    }               
                   p{
                      color: @fontColorWO;
                       
                   }    
                }

           }
        }
</style>
