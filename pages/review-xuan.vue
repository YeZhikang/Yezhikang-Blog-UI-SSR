<template>
  <standard-page :is-large="true" title="Review" description="记录每天做了什么事，以及必要的<mark>日报与周报</mark>">
    <div class="fb">
      <!--今天的task-->
      <div class="today-mission">
        <div class="mission-menu">
          <div class="fb mission-item" v-for="(mission, index) in missions" :key="mission.title">
            <div class="mission__content">
              <div class="mission-item__title"><span class="title__index">{{ index + 1 }} : </span>{{ mission.title }}
              </div>
              <div class="mission-item__description">
                <span v-html="mission.description"></span>
              </div>
            </div>
            <div class="mission-item__checkbox">
              <el-checkbox v-model="mission.isFinished">Done</el-checkbox>
            </div>
          </div>
        </div>
        <!--日报-->
        <div class="today-report mt20">
          <h3>日报</h3>
          <el-input
            v-model="dailyReport"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 8}"
          ></el-input>
        </div>
        <!--周报-->
        <div v-if="isWeekend" class="today-report">
          <h3>周报</h3>
          <el-input
            v-model="weekendReport"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 8}"
          ></el-input>
        </div>
        <div class="mt20 task-operation" style="text-align: right">
          <el-button @click="handleSure" type="primary">确定</el-button>
        </div>
      </div>
      <!--过往的记录-->
      <review-daily :history="history"/>
    </div>
    <user-login
      @handle-sign="handleSign"
      :loading="loginLoading"
      :dialog-visible.sync="dialogVisible"
      :identify.sync="identify"
      :user.sync="user"
    />
  </standard-page>
</template>

<script>
import StandardPage from '@/components/standard-page';
import ReviewDaily from '@/components/review/review-daily';

import { contentWord, highlightWord } from '@/components/review/review-card';
import service from '@/service';
import UserLogin from '@/components/review/user-login';

export default {
  name: 'review-xuan',
  components: { UserLogin, ReviewDaily, StandardPage },
  created() {
    this.resizeWindow();
    service.get('/api/review/is-login').then(res => {
      this.initialData();
      this.loadHistory();
    }).catch(e => {
      this.dialogVisible = true;
    });
  },
  data() {
    return {
      loginLoading: false,
      user: '',
      identify: '',
      missions: [
        {
          id: 'isGetUpWell',
          title: '今天有 6:30 起床吗?',
          description: '之所以需要 6:30 起来，是因为可以避开早高峰，这样早点到公司，可以早点进入学习状态',
          isFinished: false,
        },
        {
          id: 'isSleepWell',
          title: '昨晚有 11:30 前睡吗?',
          description: '11：30睡，保障每天 7小时+ 的睡眠时间，这样才可以更有精力做事',
          isFinished: false,
        },
        {
          id: 'isWriteBlog',
          title: '今天有写博客吗?',
          description: '通常而言，不会要求每一天都产出一篇文章，但是每次学习完一个新东西、或者是实践中有产出和收获，还是要花些时间提炼',
          isFinished: false,
        },
        {
          id: 'isGoodMidDay',
          title: '今天中午状态怎么样? 有去看 课程/基础书 吗',
          description: '中午有2个小时的休息时间，除去吃饭的半小时，应该可以做些事情的，让我知道你做了什么~在「日报」中体现出来',
          isFinished: false,
        },
        {
          id: 'isNotAxious',
          title: '今天有特别焦虑吗?',
          description: '请不要特别焦虑...<mark>请相信自己，真心的，静心下来学习</mark>，如果忘了什么知识点，那就再去看一下，没事的',
          isFinished: false,
        },
      ],
      history: new Array(100).fill(null).map(item => ({ isActive: false, isDone: false })),
      dailyReport: `#日报 ${new Date().toLocaleDateString()}#`,
      weekendReport: `#周报 ${new Date().toLocaleDateString()}#`,
      isWeekend: new Date().getDay() > 5 || new Date().getDay() === 0,
      dialogVisible: false,
    };
  },
  methods: {
    handleSure() {
      const contentTask = {
        isWriteDailyReport: true,
      };
      const highlightTask = {};
      this.missions.forEach(item => {
        if (item.id in contentWord) {
          contentTask[item.id] = item.isFinished;
        } else if (item.id in highlightWord) {
          highlightTask[item.id] = item.isFinished;
        }
      });

      service.post('/api/review/item', {
        contentTask,
        highlightTask,
        dailyReport: this.dailyReport,
        weekendReport: this.isWeekend ? this.weekendReport : false,
        date: new Date().toLocaleDateString().split('/'),
      }).then(res => {
        this.$message.success('保存成功');
        this.loadHistory();
      });
    },
    resizeWindow() {
      this.$parent.$parent.$data.isLarge = true;
      this.$parent.$parent.$data.user = 'WangYaXuan';
      console.log(this.$parent.$parent)
      this.$on('hook:beforeDestroy', () => {
        this.$parent.$parent.$data.isLarge = false;
        this.$parent.$parent.$data.user = 'Ye Zhikang'
      });
    },
    handleSign() {
      this.loginLoading = true;
      service.post('/api/review/login', {
        user: this.user,
        identify: this.identify,
      }).then(res => {
        this.loginLoading = this.dialogVisible = false;
        this.$message.success('Sign 成功');
        this.initialData();
        this.loadHistory();
      }).catch(e => {
        this.loginLoading = false;
        this.$message.error('标识符或名称错误');
      });
    },
    loadHistory() {
      service.get('/api/review/history').then(res => {
        this.history = res.data.map(item => ({
          isActive: false,
          isDone: false,
          ...item,
        }));
      });
    },
    initialData() {
      service.get('/api/review/today').then((res) => {
        if (res) {
          const data = res.data;
          const tasks = { ...data.contentTask, ...data.highlightTask };
          for (let item of this.missions) {
            if (item.id in tasks) {
              item.isFinished = tasks[item.id];
            }
          }
          this.dailyReport = data.dailyReport;
          this.weekendReport = data.weekendReport;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.today-mission {
  width: 50%;

  .mission__content {
    width: 70%;
  }

  .mission-item {
    margin: 5px 0;
  }

  .mission-item__title {
    font-size: 16px;
  }

  .mission-item__description {
    font-size: 12px;
    font-weight: 300;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: darkgray;
  }
}

@media screen and (max-width: 600px) {
  .fb {
    flex-wrap: wrap;
  }
  .today-mission {
    width: 100%;
  }
}
</style>
