<template>
  <div class="review-daily">
    <div class="block-area">
      <div @click="handleCheck(block)" v-for="block in history"
           :class="{block: true, 'is-active': block.isActive, 'is-done': block.isDone}"></div>
    </div>
    <div v-if="checkInfo" class="block-detail">
      <div class="block-detail__content">
        <el-card>
          <template v-if="checkInfo.date">
            <div class="fa">
              <h4>完成情况 - {{ checkInfo.date.join('-') }}</h4>
              <el-rate
                :value="checkInfo.star"
                class="ml10"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <review-card :missions="missions"  :check-info="checkInfo"/>
          </template>
          <template v-else>
            <h4>完成情况 - 暂无记录</h4>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewCard from '@/components/review/review-card';
export default {
  name: 'review-daily',
  components: { ReviewCard },
  props: {
    history: {
      type: Array,
      default: () => (new Array(100).fill(null).map(item => ({isActive: false, isDone: false})))
    },
    missions: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      activeArr: [],
      // history: new Array(100).fill(null).map((item, i) => ({
      //     star: 4.6,
      //     date: '2020-08-13',
      //     contentTask: {
      //       isGetUpWell: true,
      //       isSleepWell: true,
      //       isGoodMidDay: true,
      //       isWriteDailyReport: true,
      //     },
      //     highlightTask: {
      //       isWriteBlog: true,
      //       isNotAxious: true,
      //     },
      //     isActive: false,
      //     isDone: true,
      //     dailyReport: {
      //       time: '2020-08-16',
      //       description: '今天做了这些事，\n\nHahhahaha,今天做了这些事，Hahhahaha,今天做了这些事，Hahhahaha,今天做了这些事，Hahhahaha',
      //     },
      //     weekendReport: false,
      //   }),
      // ),
      checkInfo: this.history.slice(-1)[0],
    };
  },
  methods: {
    handleCheck(block) {
      if (this.checkInfo) {
        this.checkInfo.isActive = false;
      }
      this.checkInfo = block;
      this.checkInfo.isActive = true;
    },
  },
  watch: {
    history: {
      handler: function(val, oldVal){
        if(val.slice(-1)[0] !== oldVal.slice(-1)[0]){
          this.checkInfo.isActive = false;
          this.checkInfo = val.slice(-1)[0];
          this.checkInfo.isActive = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.review-daily {
  width: 40%;

  .block-area {
    margin: 0 0 20px 0;
    display: flex;
    flex-wrap: wrap;

    .block {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background: rgba(0, 0, 0, .1);
      margin: 4px;
      transition: 0.05s;
      cursor: pointer;

      &:hover {
        background: #cfd6de;
      }
    }

    .is-active {
      background: rgba(0, 122, 255, 0.12);
    }

    .is-done {
      background: rgba(0, 122, 255, 0.2);
    }
  }
}

.block-detail__content h3, h2, h1, h4, h5 {
  font-weight: 400;
  margin: 0;
}

.check-daily-report {
  white-space: pre-wrap;
}

@media screen and (max-width: 600px){
  .review-daily {
    width: 100%;
    margin-top: 50px;
  }
}

</style>
