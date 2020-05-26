<template>
    <div class="academy-footer">
        <div class="bg"></div>
        <div class="bg2"></div>

        <div style="z-index: 5;position:relative;">
            <h2 style="font-size: 24px;font-weight: 400;color: white">常用链接</h2>
        </div>
        <div class="footer-link-container">
            <div class="footer-unit" v-for="index in Math.ceil(linksArr.length/3)" :key="index">
                <div class="footer-unit-link els-1" v-for="(link,i) in linksArr.slice(index*3,(index+1)*3)" :key="i">{{ link.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AcademyFooter",
    data() {
        return {
            linksArr: [
                {
                    title: '教务处',
                    url: ''
                },
                {
                    title: '信息公开网',
                    url: ''
                },
                {
                    title: '校应用导航',
                    url: ''
                },
                {
                    title: '政采云平台',
                    url: ''
                },
                {
                    title: '实验教学中心',
                    url: ''
                }, {
                    title: '慕课教学平台',
                    url: ''
                }, {
                    title: '复杂科学研究中心',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                }, {
                    title: '教务处',
                    url: ''
                },
            ]
        }
    }
}
</script>

<style
    lang="scss"
    scoped
>
    .academy-footer {
        padding: 24px 8vw;
        height: 260px;
        position: relative;
        /*background-color: #222;*/
        background-color: #c36322;


        .bg2 {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            top: 0;
            clip-path: polygon(0 0%, 0 100%, 25% 0);
            background-image: url("../../static/images/academy/academy-icon.jpeg");
            opacity: 0.1;
            z-index: 0;
        }



        .bg {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            top: 0;
            background-image: url("../../static/images/academy/hznu-bg.jpeg");
            background-size: cover;
            background-position: center;
            opacity: 0.3;
            clip-path: polygon(0 100%, 100% 100%, 100% 0, 25% 0);
            filter: blur(0);
        }

        .footer-link-container {
            margin-left: 16%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            z-index: 5;

            .footer-unit {
                flex-grow: 1;
                text-align: center;
                border-right: 1px white solid;
                .footer-unit-link{
                    font-size: 16px;
                    color: white;
                    padding-top: 8px;
                    padding-bottom: 8px;
                }
            }

            .footer-unit:last-child{
                border: none
            }
        }
    }

    .footer-unit-link{
        width: 100%;
    }

    @media screen and (max-width: 800px){
        .bg2{
            display: none;
        }

        .bg{
            clip-path: none !important;
        }

        .footer-link-container{
            margin: 0 !important;
            flex-wrap: wrap;
            align-items: flex-start !important;
            justify-content: flex-start !important;
        }

        .academy-footer .footer-link-container .footer-unit{
            text-align: left;
        }

        .footer-unit{
            width: 50%;
            flex-shrink: 0;
            border-right: none !important;
        }

        .academy-footer{
            height: auto !important;
        }

    }

    .footer-unit{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>
