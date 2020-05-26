<template>
  <div style="height: 100%">
    <div class="container">
      <div class="container__header">
        <h1 class="container__header__text">猜数字</h1>
        <h4 class="container__header__text">请输入<span style="color: #3a8ee6">0-99</span>之间的一个数字</h4>
      </div>
      <div class="container__body">
        输入：
        <el-input-number
          size="small"
          :min="1"
          :max="100"
          ref="input-num"
          v-model="currentNum"
          :disabled="guessSit.status === '等于'"
        />
        <el-button
          @click="handleGuess"
          size="small"
          type="primary"
          class="index-button--primary"
          style="margin-left: 10px"
          :disabled="guessSit.status === '等于'"
        >确定
        </el-button>
      </div>
      <div class="container__history">
        <el-button
          v-if="(guessSit.status === '等于')"
          class="appear-button  index-button--warning"
          @click="restart"
          type="warning"
          size="mini"
        ><i class="el-icon-refresh-right"></i> 再来一次
        </el-button>
        <div v-if="guessSit.isShow">这个数<span style="color: #3a8ee6"> {{ guessSit.status }} </span>{{ trulyGuess
                                    }},

          <span>已经猜了 <span style="font-weight: 600;color: lightcoral">{{ guessSit.count }} </span>次</span>
        </div>
        <div
          v-if="guessSit.isShow"
          ref="guess-bar"
          class="guess-bar"
        >
          <!--          <i v-for="(guess,index) of guessArr" :ref="`guess-${index}`" class="el-icon-location"></i>-->
          <!--          <i class="el-icon-location"></i>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: "GuessNumber",
    data() {
        return {
            number: null,
            trulyGuess: null,
            guessArr: [],
            currentNum: null,
            guessSit: {
                isShow: false,
                status: null,
                count: 0,
            }
        }
    },
    components: {},
    methods: {
        getRandomNumber() {
            this.number = Math.floor(Math.random() * 99 + 1)
        },
        handleGuess() {
            if (!this.currentNum) return;
            this.trulyGuess = this.currentNum
            if (this.number === this.currentNum) {
                this.guessSit = {
                    isShow: true,
                    status: '等于',
                    count: this.guessSit.count + 1
                }
                this.$nextTick(() => {
                    const guessBar = this.$refs['guess-bar']
                    const newFlag = document.createElement('i')
                    const leftDistance = `${ ((this.currentNum - 1) / 99) * 100 }% - 8px`
                    newFlag.classList.add('el-icon-location', 'el-icon-location--bingo')
                    newFlag.style.left = `calc( ${ leftDistance } )`
                    guessBar.appendChild(newFlag)
                })
            } else {
                this.guessSit = {
                    isShow: true,
                    status: this.number > this.currentNum ? '大于' : '小于',
                    count: this.guessSit.count + 1
                }
                this.$nextTick(() => {
                    const guessBar = this.$refs['guess-bar']
                    const newFlag = document.createElement('i')
                    const newBanBar = document.createElement('div')

                    const leftDistance = `${ ((this.currentNum - 1) / 99) * 100 }% - 8px`
                    const leftBarDistance = `${ ((this.currentNum - 1) / 99) * 100 }%`

                    // console.log(leftDistance)
                    newFlag.classList.add('el-icon-location')
                    newBanBar.classList.add('guess-bar-ban')

                    newFlag.style.left = `calc( ${ leftDistance } )`

                    if (this.guessSit.status === '小于') {
                        newBanBar.style.left = `calc( ${ leftBarDistance } )`
                        newBanBar.style.right = '-1px'
                        newBanBar.style.borderTopRightRadius = '2px'
                        newBanBar.style.borderBottomRightRadius = '2px'
                    } else {
                        newBanBar.style.left = `-1px`
                        newBanBar.style.width = `calc( ${ leftBarDistance } )`
                        newBanBar.style.borderTopLeftRadius = '2px'
                        newBanBar.style.borderBottomLeftRadius = '2px'
                    }
                    guessBar.appendChild(newFlag)
                    guessBar.appendChild(newBanBar)
                })
            }
        },
        restart() {
            this.getRandomNumber()
            this.currentNum = 1
            this.guessSit = {
                isShow: false,
                status: null,
                count: 0
            }
        }
    },
    created() {
        this.getRandomNumber()
    }
}
</script>

<style scoped>
  .container {
    text-align: left;
    box-sizing: border-box;
    padding-top: 100px;
    height: 100%;
    margin: 0 auto;
    width: calc(60% + (1440px - 100%) / 3);
  }

  .container__header {
    text-align: left;
  }

  .container__header__text {
    font-weight: 400;
    margin: 0;
  }

  .container__body {
    margin-top: 20px;
  }

  .container__history {
    margin-top: 50px;
    padding-top: 15px;
    border-top: 2px dashed lightgrey;
  }

  .guess-bar {
    margin-top: 75px;
    width: 100%;
    height: 2px;
    border: 1px solid darkgrey;
    border-radius: 2px;
    background-color: rgb(244, 244, 244);
    position: relative;
    animation: appear 0.2s linear;
    animation-fill-mode: forwards;
  }

  @keyframes appear {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }

  >>> .guess-bar-ban {
    position: absolute;
    top: -1px;
    /*left: -1px;*/
    /*width: 30%;*/
    height: 2px;
    border: 1px solid #3a8ee6;
    background-color: rgba(58, 142, 230, 0.39);
    animation: appear 0.2s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
    opacity: 0;
    /*border-radius: 2px;*/
  }

  .appear-button {
    animation: appear 0.2s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
    opacity: 0;
    position: fixed;
    bottom: 25px;
    margin: 0 auto;
    right: 5%;
  }

  >>> .el-icon-location {
    position: absolute;
    top: -16px;
    opacity: 0;
    animation: appear 0.2s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
    color: #3a8ee6;
    /*left: -8px;*/
  }

  >>> .el-icon-location--bingo {
    color: lightcoral;
  }

  @media screen and (max-width: 800px ) {
    .container {
      width: 90%;
    }
  }
</style>
