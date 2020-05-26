<template>
  <div>
    <div class="fb" style="flex-wrap: wrap">
      <div class="model-container">
        <div class="model-des"><i class="el-icon-link"></i></div>
        <h1 class="model-title">{{ item }} <span class="article" style="color: darkgrey;">APRIL 9, 2020</span> <span style="float: right;line-height: 46px" class="article article-red">{{ par }} / {{ item }}</span></h1>
        <p class="article"> <span class="pjfont">阿里巴巴商学院</span>成立于2008年10月31日，是杭州师范大学与阿里巴巴集团共建的校企合作学院，杭师大著名校友、原阿里巴巴集团董事局主席马云先生出任学院首任理事长、院长。学院以培养数字经济时代创新型优秀管理人才和创业者为使命，致力于商业和管理理论创新，努力成为新型商学院的标杆。学院现任院长是原阿里巴巴集团学术委员会主任曾鸣教授。</p>
        <p class="article">阿里巴巴商学院以在互联网新经济领域的人才培养、研究、社会服务和创新创业教育为特色，特别是在信息经济、智能商业、电子商务服务、大数据分析、社交网络、网络营销等方向上优势明显。</p>
        <p class="article">学院设有电子商务、国际商务、市场营销、物流管理等四个本科专业，电子商务专业为国家一流本科专业建设点、省级优势专业；国际商务专业为国家一流本科专业建设点、省级特色专业；拥有管理科学与工程一级学科硕士点、国际商务专业硕士点、软件工程专业硕士点（联合）以及服务科学与管理、计算机应用技术（联合）等两个二级学科硕士点；学院建设了一支包括长江学者、教育部新世纪人才、教育部教指委委员副主任委员、国家优青、钱江学者、浙江省杰青在内专职教师队伍，80%以上具有博士学位，还拥有一支以阿里巴巴集团高管、专家和社会各界专家学者组成的兼职教师队伍。目前全日制在校本科生、研究生、留学生1200余名。</p>
        <p class="article"> 学院建立了融入阿里巴巴优秀企业文化，企业全程参与、创新创业教育全程贯通、与产业发展紧密结合的人才培养“阿里巴巴模式”，走出了一条创新创业型互联网商务人才培养的新路子，获得国家级大学生校外实践教育基地1个、国家级“十二五”规划教材2部、浙江省高等教育教学成果奖二等奖2项、浙江省重点建设实验教学示范中心1个等标志性成果。学院还组织编写出版了教育部电子商务类专业教指委推荐的新一代高等学校电子商务实践与创新系列规划教材。学院目前主持在研包括国家重点研发计划项目、国家优青项目在内的自然科学基金、社会科学基金项目11项，欧盟合作项目2项，在《Physics Reports》、《美国科学院院刊》（PNAS）等刊物上发表了一大批高影响因子学术论文，举办承办了“国际网络科学会议NetSciX2018”、“第九届全国复杂网络学术会议”等一系列国际国内顶级学术会议，学院还与欧盟科技框架项目组联合成立“中欧联合实验室”，与阿里巴巴集团联合成立“阿里巴巴复杂科学研究中心”。</p>
        <p class="article">近3年，学生获得包括“创青春”全国大学生创业大赛金奖2项在内的国家级学科竞赛奖项27项，连续四年获得全国大学生电子商务“三创赛”特等奖。学院现有在校生创业团队30余个、注册公司26家，在校生创业营收2019年突破2.3亿元。毕业生广受社会欢迎，近三年平均就业率98%以上、平均签约率95%以上，五年来近50%毕业生入职阿里、腾讯、百度、美团、网易等知名互联网企业并涌现出第十三届中国大学生年度人物仉元旭、全国大学生创业英雄10强钱思聪为代表的一大批优秀毕业生。时任浙江省委书记夏宝龙、浙江省省长李强和杭州市委书记赵一德等省市领导分别视察学院创业园区，给予充分肯定和热情鼓励。学院近年来为商务部、浙江省、杭州市、阿里巴巴集团等完成一批横向合作项目，举办了“首席电商官@总裁班”、 “新加坡、马来西亚东盟电商高级研修班”等境内外各类高端培训，建立了良好的社会声誉。</p>
        <p class="article article-grey txr tx-foot">
          EDIT BY YEZHIKANG
          <br>
          <span style="font-size: 12px;line-height: 0">LAST MODIFIED | APR 9, 2020</span>
        </p>
      </div>
      <side-bar class="sidebar"/>
    </div>
    <academy-footer/>
  </div>

</template>

<script>
import AcademyFooter from "../../../../components/academy/AcademyFooter";
import SideBar from "../../../../components/academy/tools/SideBar";
import {checkBack} from "../../../../static/javascript/data";

export default {
    name: "AcademyModel",
    components: { SideBar, AcademyFooter },
    layout: 'academy',
    data(){
        return{
            par: '',
            item: ''
        }
    },
    watch: {
        $route: {
            handler: function (val) {
                const { par, item } = val.params
                const { parName, name } = checkBack(par, item)
                this.par = parName
                this.item = name
            },
            immediate: true
        }
    },
    // beforeRouteEnter(to,from,next){
    //     next(vm => {
    //         const {par, item} = vm.$route.params
    //         console.log(par)
    //         const {parName, name} = checkBack(par, item)
    //         vm.par = parName
    //         vm.item = name
    //         console.log(vm)
    //     })
    // },
    // beforeRouteUpdate(to,from,next){
    //     const {par, item} = to.params
    //     const {parName, name} = checkBack(par, item)
    //     this.par = parName
    //     this.item = name
    //     next()
    // }
}
</script>

<style lang="scss" scoped>
  .model-container{
    width: 53%;
    margin-left: 11%;
    padding: 0 0 100px;
    position: relative;
    .article{
      font-size: 16px;
      line-height: 1.8;
      font-weight: 300;
      letter-spacing: 1px;
    }
    .article-red{
      font-size: 14px;
      color: #b31b1b
    }

    .article-grey{
      font-size: 14px;
      color: #666565
    }

    .tx-foot{
      padding-top: 46px;
      font-size: 16px;
      font-weight: 200;
      letter-spacing: 1px;
      border-right: 1px solid #d7d5d5;
      padding-right: 6px;
    }
  }

  .txr{
    text-align: right;
  }

  .model-title{
    margin-top: 0;
    padding-top: 130px;
    font-weight: 300;
    letter-spacing: 2px;
    padding-left: 18px;
    border-left: 1px solid orange;
    margin-bottom: 62px;
  }

  .model-des{
    position: absolute;
    top:65px;
    padding: 2px 5px;
    background: orange;
    color: white;
    border-radius: 50%;
    left: -13px;
  }

  .sidebar{
    width: 26%;
  }

  @media screen and (max-width: 800px) {
    .sidebar{
      width: 100%;
      border-top: 1px solid rgb(231, 231, 231);
    }

    .model-container{
      width: 80%;
    }
  }

</style>
