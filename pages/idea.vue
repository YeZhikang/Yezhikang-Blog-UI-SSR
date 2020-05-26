<template>
  <div class="main-body">
    <div class="main-body__head">
      <h1 class="main-body__title">Idea</h1>
      <p>记录每天的思考/想法/计划</p>
    </div>
    <div class="main-body__body">
      <div
        class="body__recent"
        v-for="(active,index) in actives"
        :key="active.activeId"
      >
        <div class="main-body__body__avator">
          <img :src="emojiArr[active.index]" class="add-emoji"/>
        </div>
        <div class="main-body__body__message">
          <h4
            class="message__title"
            v-html="active.titleHtml"
          ></h4>
          <p
            class="message__text"
            v-html="active.main"
          ></p>

          <el-popover
            placement="top"
            width="160"
            v-model="active.isDeleteVis">
            <p>是否要删除该想法？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="active.isDeleteVis = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteIdea(active, active.activeId)">确定</el-button>
            </div>
            <i style="position:absolute;bottom: 2px;right: 10px" class="el-icon-more-outline" slot="reference"></i>
          </el-popover>
        </div>
        <el-popover
          v-if="!isFinished(active)"
          placement="top"
          width="250"
          v-model="active.visible"
        >
          <p>添加动态</p>
          <el-radio-group v-model="tagInfo.type">
            <el-radio
              size="mini"
              label="comment"
            >评论
            </el-radio>
            <el-radio
              size="mini"
              label="finished"
            >完成
            </el-radio>
            <el-radio
              size="mini"
              label="marked"
            >标记
            </el-radio>
            <el-radio
              size="mini"
              label="minus"
            >调整
            </el-radio>
          </el-radio-group>
          <el-input
            style="margin: 6px 0"
            type="textarea"
            placeholder="添加信息"
            v-model="tagInfo.text"
          ></el-input>
          <div style="text-align: right; margin: 0">
            <el-button
              size="mini"
              type="text"
              @click="visible = false"
            >取消
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleSubmitTag(active,active.activeId)"
            >确定
            </el-button>
          </div>
          <div
            slot="reference"
            class="main-body__body__mark"
          >
            <i class="el-icon-circle-plus-outline"></i>
          </div>
        </el-popover>
        <div
          class="main-body__body__mark"
          v-else
        >
          <i class="el-icon-circle-check"></i>
        </div>
        <the-tags :is-end="index === actives.length-1" :activesArr="active.tagArr"/>
      </div>
    </div>
    <div
      class="main-body__foot"
      style="position:relative;"
    >
      <div
        class="body__recent"
        style="width: 100%"
      >
        <div class="main-body__body__avator--add">
          <el-popover
            placement="top"
            v-model="emojiInfo.visible"
          >
            <div class="example-imgarr">
              <img
                @click="handleChangeEmoji(emoji,index)"
                class="avatar-example"
                v-for="(emoji,index) in emojiArr"
                :key="emoji"
                :src="emoji"
              >
            </div>
            <div
              slot="reference"
              style="text-align: center;line-height: 1"
            >
              <template v-if="!emojiInfo.isChooseEmoji">
                <i
                  style="font-size: 12px"
                  class="el-icon-plus"
                ></i><br/>
                <span style="font-size: 12px;font-weight: 300;width: 80%">表情</span>
              </template>
              <img v-else :src="emojiInfo.emojiSrc" class="add-emoji">
            </div>
          </el-popover>
        </div>

        <el-input
          class="input-area main-body__body__message--add"
          :autosize="{ minRows: 4, maxRows: 6}"
          type="textarea"
          v-model="textContext"
        ></el-input>
      </div>
      <!--            <div class="emoji-part"></div>-->

    </div>
    <el-button
      type="primary"
      style="margin-top: 15px;float: right"
      class="index-button--primary"
      size="mini"
      @click="handleSubmit"
    >确 定
    </el-button>
    <the-footer style="padding-bottom: 20px"/>
  </div>
</template>

<script>
import TheTags from "../components/TheTags";
import img0 from '../static/images/WechatIMG440.jpeg'
import img1 from '../static/images/WechatIMG85051.jpeg'
import img2 from '../static/images/WechatIMG85056.jpeg'
import img3 from '../static/images/WechatIMG85060.jpeg'
import TheFooter from "../components/TheFooter";

export default {
    name: "Idea",
    components: { TheTags,TheFooter },
    data() {
        return {
            textContext: '',
            tagInfo: {
                type: '',
                text: ''
            },
            actives: [],
            emojiArr: [
                img0,
                img1,
                img2,
                img3
            ],
            emojiInfo: {
                isChooseEmoji: false,
                emojiSrc: null,
                visible: false,
                index: null,
            }
        }
    },
    computed: {},
    methods: {
        async handleSubmit() {
            console.log(this.emojiInfo)
            if(this.emojiInfo.index === null) {
                this.$message({
                    type: 'error',
                    message: '请选择头像'
                })
                return
            }
            await this.$axios.post('/setActive', {
                textContext: this.textContext,
                createdAt: new Date().toLocaleDateString(),
                index: this.emojiInfo.index
            })

            this.textContext = null
            this.emojiInfo = {
                isChooseEmoji: false,
                emojiSrc: null,
                visible: false,
                index: null,
            }

            await this.getAllActives()
        },
        async getAllActives() {
            const res = await this.$axios.get('/getActive')
            const dataSource = res.data.doc

            for (let item of dataSource) {
                console.log(item.topicLst)
                item.titleHtml = item.topicLst.map(i => `<i class="topic-theme">${ i }</i>`).join(',')
                item.visible = false
                item.main = item.main.replace(/\n/g, '<br>')
                item.isDeleteVis = false
            }
            this.actives = dataSource
        },
        isFinished(active) {
            if (!active.tagArr) return false
            for (let item of active.tagArr) {
                if (item.type === 'finished') {
                    return true
                }
            }
            return false
        },
        async handleSubmitTag(active,activeId) {
            await this.$axios.post('/putTag', { activeId, ...this.tagInfo })
            await this.getAllActives()
            active.visible = false
            this.tagInfo = { type: '', text: '' }
        },
        handleChangeEmoji(emoji, index){
            this.emojiInfo.isChooseEmoji = true;
            this.emojiInfo.emojiSrc = emoji
            this.emojiInfo.visible = false;
            this.emojiInfo.index = index
            console.log(index)
        },
        async deleteIdea(active, activeId){
            await this.$axios.post('/deleteIdea', { activeId})
            active.isDeleteVis = false
            await this.getAllActives()
        }
    },
    created() {
        this.textContext = '#' + new Date().toString().split(" ").slice(0, 4).join("") + '#\n'
        this.getAllActives()
    }
}
</script>

<style
  lang="scss"
  scoped
>
  .main-body {
    margin: 0 auto;
    width: calc(60% + (1440px - 100%) / 3);
    padding-top: 200px;
    /*height: 100%;*/
    box-sizing: border-box;
    &__head h1 {
      margin: 0;
    }

    &__head p {
      margin: 0;
      font-weight: 300;
    }

    &__body {
      margin-top: 38px;
    }

    .main-body__body__avator {
      border-radius: 50%;
      height: 58px;
      width: 58px;
      display: inline-block;
      /*background-image: url("../static/images/WechatIMG443.jpeg");*/
      background-position: center;
      background-size: cover;


      &--add {
        border-radius: 50%;
        height: 58px;
        width: 58px;
        display: inline-flex;
        background-position: center;
        background-size: cover;
        border: 2px dashed #2c3e50;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    .body__recent {
      display: flex;
      position: relative;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .add-emoji {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .main-body__body__message {
      position: relative;
      width: calc(100% - 78px);
      left: 20px;
      border: 1px #393f4c solid;
      border-radius: 6px;
      padding: 12px;
      box-sizing: border-box;

      &--add {
        position: relative;
        width: calc(100% - 78px);
        left: 20px;
        border: 1px #393f4c solid;
        border-radius: 6px;
        box-sizing: border-box;
      }

      &--add:after {
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px;
        border-top-width: 7px;
        border-bottom-width: 7px;
        left: -20px;
        top: 15px;
        border-style: solid;
        content: '\00a0';
        border-color: transparent #393f4c transparent transparent;
      }
    }

    .main-body__body__message:after {
      position: absolute;
      width: 0;
      height: 0;
      border-width: 10px;
      border-top-width: 7px;
      border-bottom-width: 7px;
      left: -20px;
      top: 15px;
      border-style: solid;
      content: '\00a0';
      border-color: transparent #393f4c transparent transparent;
    }

    /*.main-body__body__message:before{*/
    /*    position: absolute;*/
    /*    width:0;*/
    /*    height: 0;*/
    /*    border-width: 10px;*/
    /*    top: 2px;*/
    /*    left: 2px;*/
    /*    border-style: solid;*/
    /*    content: '\00a0';*/
    /*    border-color:  transparent #282c35 transparent transparent;*/
    /*    z-index: 999;*/
    /*}*/
    .main-body__body__message h4, p {
      margin: 0 auto;
    }

    .main-body__body__message .message__title {
      margin: 0 16px 0 0;
      font-size: 15px;
    }

    .message__text {
      margin: 0;
      font-size: 12px;
    }

    .main-body__body__mark {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .input-area /deep/ .el-textarea__inner {
      background-color: transparent;
    }


    .main-body__foot {
      display: flex;
    }

    .emoji-part {
      height: 80px;
      width: 80px;
      background-color: white;
      border-radius: 50%;
    }

  }

  /deep/ .el-radio {
    margin-right: 6px !important;
  }

  /deep/ .el-radio__label {
    padding-left: 2px;
  }

  .topic-theme {

  }

  /deep/ .example-imgarr {
    padding: 12px;

    /deep/ img {
      width: 30px;
      height: 30px;

    }
  }

  /deep/ .avatar-example {
    width: 45px;
    height: 45px;
    padding-right: 8px;
  }

  .footer /deep/ .end{
  }

  .line{

    height: 30px;
    width: 2px;
    background-color: #393f4c;
    margin: 0 auto;
  }


  @media screen and (max-width: 600px) {
    .main-body {
      width: 90%;
      padding-top: 84px;
    }

  }
</style>
