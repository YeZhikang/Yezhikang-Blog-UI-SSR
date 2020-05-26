<template>
    <div>
        <slot name="head"></slot>
        <div class="active-card">
            <div class="fa fb">
                <template v-if="isInside">
                    <div class="fa ">
                        <img style="width: 30px" src="../../static/images/academy/icon2.png"/>
                        <span class="ml10" style="font-size: 24px;font-weight: 400">学院动态</span>
                    </div>
                    <el-tooltip class="item" effect="dark" content="更多动态" placement="top">
                        <div @click="checkMore()"  style="font-size: 22px;cursor:pointer;">
                            <i class="el-icon-more-outline"></i>
                        </div>
                    </el-tooltip>
                </template>
            </div>
            <div class="new-active fb mt20">
                <div class="new-image"></div>
                <div style="flex-grow: 1;margin-left: 12px;">
                    <h2 class="new-active-title">胡华副校长来学院检查指导疫情防控工作</h2>
                    <p class="new-active-main"> 5月13日上午，胡华副校长到学院检查疫情防控情况 5月13日上午，胡华副校长到学院检查疫情防控情况</p>
                </div>
            </div>
            <div >
                <div class="fa mt20" v-for="(newItem,index) in newsArr" :key="index">
                    <DateRender :time="newItem.time" />
                    <div class="ml20 new-main">
                        <h3 style="font-size: 16px;font-weight: 400" class="els-1">{{ newItem.title }}</h3>
                        <p style="font-size: 12px;font-weight: 300" class="els-2">{{ newItem.main }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DateRender from "./tools/DateRender";
export default {
    name: "ActiveCard",
    components: { DateRender },
    props:{
        title:{
            type: String
        },
        url: {
            type: String
        },
        imgURL: {
            type: String
        },
        // newsArr: {
        //     type: Array
        // },
        iconURL:{
            type: String
        },
        isInside:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            newsArr: [
                {
                    title: '我院召开开学工作专题部署会',
                    main: '学院通过钉钉平台召开全体教职工视频会议，专题部署本学期开学工作。',
                    time: '2020/04/20'
                },
                {
                    title: '我院召开开学工作专题部署会',
                    main: '学院通过钉钉平台召开全体教职工视频会议，专题部署本学期开学工作。',
                    time: '2020/04/20'
                },
                {
                    title: '我院召开开学工作专题部署会',
                    main: '学院通过钉钉平台召开全体教职工视频会议，专题部署本学期开学工作。',
                    time: '2020/04/20'
                },
                {
                    title: '我院召开开学工作专题部署会',
                    main: '学院通过钉钉平台召开全体教职工视频会议，专题部署本学期开学工作。',
                    time: '2020/04/20'
                },
                {
                    title: '我院召开开学工作专题部署会',
                    main: '学院通过钉钉平台召开全体教职工视频会议，专题部署本学期开学工作。',
                    time: '2020/04/20'
                },
            ]
        }
    },
    methods:{
        checkMore(){

        }
    }
}
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
    }
    .active-card{
        z-index: 44;
        background-color: white;
        /*position: relative;*/
        padding: 36px;
        box-shadow: 0px 3px 12px 0px rgba(183,183,183,0.5);
    }

    .new-image{
        background-image: url("http://abs.hznu.edu.cn/upload/resources/image/2020/05/14/7580267.png");
        height: 136px;
        width: 224px;
        background-position: center;
        background-size: cover;
        flex-shrink: 0;
    }

    .new-active{
        .new-active-title{
            font-size: 18px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            font-weight: 400;
        }
        .new-active-main{
            margin-top: 12px;
            font-size: 14px;
            color: darkgrey;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
        }
    }

    @media screen and (max-width: 800px){

        .new-image{
            width: 140px;
            height: 90px;
        }

        .new-active-title{
            font-size: 16px !important;
        }

        .new-active-main{
            font-size: 12px !important;
            margin-top: 5px !important;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2 !important;
        }

        .new-main{
            margin-left: 10px;
        }


        .active-card{
            padding: 20px;
        }

    }
</style>
