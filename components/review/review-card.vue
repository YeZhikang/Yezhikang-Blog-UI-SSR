<template>
  <div>
    <div class="detail-info">
      <div class="highlight-task mt20" v-if="checkInfo && Object.keys(checkInfo.highlightTask).length">
        <h4 style="margin-bottom: 10px"><i class="el-icon-star-on"></i> HighLight</h4>
        <div
          v-for="highlight in Object.keys(checkInfo.highlightTask)"
          class="task-list-item fb fa highlight-item"
        >
          <template v-if="checkInfo.highlightTask[highlight]">
            <div class="task-list-item__content">{{ getTitleOfId(highlight) }}</div>
            <i class="el-icon-s-flag"></i>
          </template>
        </div>
      </div>

      <div class="content-task mt20" v-if="checkInfo && Object.keys(checkInfo.contentTask).length">
        <h4 style="margin-bottom: 10px"><i class="el-icon-star-on"></i> 日常任务</h4>
        <div v-for="content in Object.keys(checkInfo.contentTask)"
             class="task-list-item fb fa content-item">
          <template v-if="checkInfo.contentTask[content]">
            <div class="task-list-item__content">
              <i class="el-icon-finished"></i>
              {{ getTitleOfId(content) }}
            </div>
          </template>
        </div>
      </div>
    </div>

    <el-collapse class="mt30" v-model="activeArr">
      <el-collapse-item v-if="checkInfo.dailyReport" :title="checkInfo.date.join('-') + ' 日报'" name="1">
        <div class="check-daily-report" v-html="checkInfo.dailyReport"></div>
      </el-collapse-item>
      <el-collapse-item v-if="checkInfo.weekendReport" :title="checkInfo.date.join('-') + ' 周报'" name="2">
        <div class="check-daily-report" v-html="checkInfo.weekendReport"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export const contentWord = {
  isGetUpWell: '准时起床',
  isSleepWell: '准时睡觉',
  isGoodMidDay: '中午有提升',
  isWriteDailyReport: '今天有写日报',
};

export const highlightWord = {
  isWriteBlog: '撰写了博客',
  isNotAxious: '没有焦虑，静下心来学习！',
};

export default {
  name: 'review-card',
  props: {
    checkInfo: {
      type: Object | Boolean,
      default: false
    },
    missions: {
      type: Array,
      default: () => ([])
    }
  },
  data(){
    return {
      contentWord: Object.freeze(contentWord),
      highlightWord: Object.freeze(highlightWord),
      activeArr:[]
    }
  },
  methods: {
    getTitleOfId(word){
      for(let {id, title} of this.missions){
        if(id === word){
          return title
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.task-list-item {
  margin: 5px 0;
  padding-left: 20px;
}

.task-list-item__content {
  font-size: 14px;
}

.highlight-item > .el-icon-s-flag {
  color: #e95000;
}

.el-icon-finished {
  color: #3a8ee6;
}

.block-detail__content h3, h2, h1, h4, h5 {
  font-weight: 400;
  margin: 0;
}

.check-daily-report {
  white-space: pre-wrap;
}
</style>
