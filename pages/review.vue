<template>
  <standard-page :is-large="true" title="Review">
    <template #description>
      <div style="width: 50%" class="fb">
        <span>记录每天做了什么事，以及必要的<mark>日报与周报</mark></span>
        <el-link @click="handleAddMission" style="color: #3a8ee6">新增任务项</el-link>
      </div>
    </template>
    <template #default>
      <div class="fb">
        <!--今天的task-->
        <div class="today-mission">
          <div class="mission-menu">
            <div class="fb mission-item" v-for="(mission) in missions" :key="mission.title">
              <template v-if="!mission.hide">
                <div class="mission__content">
                  <div class="mission-item__title">{{ mission.title }}
                  </div>
                  <div class="mission-item__description">
                    <span v-html="mission.description"></span>
                  </div>
                </div>
                <div class="mission-item__checkbox">
                  <el-checkbox v-model="mission.isFinished">Done</el-checkbox>
                </div>
              </template>
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
        <review-daily :missions="missions" :history="history"/>
      </div>
      <user-login-dialog
        @handle-sign="handleSign"
        :loading="loginLoading"
        :dialog-visible.sync="dialogVisible"
        :identify.sync="identify"
        :user.sync="user"
      />
      <add-task-dialog
        @handle-add-task="handleAddTask"
        :dialog-visible.sync="addTaskDialogVisible"
        :identify.sync="taskIdentify"
        :title.sync="title"
        :type.sync="taskType"
        :task-description.sync="taskDescription"
      />
    </template>
  </standard-page>
</template>

<script>
import StandardPage from '@/components/standard-page';
import ReviewDaily from '@/components/review/review-daily';

import { contentWord, highlightWord } from '@/components/review/review-card';
import service from '@/service';
import UserLogin from '@/components/review/user-login';
import AddTaskDialog from '@/components/review/add-task-dialog';

export default {
  name: 'review',
  components: { AddTaskDialog, 'user-login-dialog': UserLogin, ReviewDaily, StandardPage },
  created() {
    this.resizeWindow();
    service.get('/api/review/is-login').then(res => {
      this.loadHistory();
      this.getConfig().then(res => this.loadTodayData());
    }).catch(e => {
      this.dialogVisible = true;
    });
  },
  data() {
    return {
      addTaskDialogVisible: false,
      taskIdentify: '',
      title: '',
      taskDialogLoading: false,
      loginLoading: false,
      user: '',
      identify: '',
      taskDescription: '',
      // missions: [
      //   {
      //     id: 'isGetUpWell',
      //     title: '今天有 6:30 起床吗?',
      //     description: '之所以需要 6:30 起来，是因为可以避开早高峰，这样早点到公司，可以早点进入学习状态',
      //     isFinished: false,
      //   },
      //   {
      //     id: 'isSleepWell',
      //     title: '昨晚有 11:30 前睡吗?',
      //     description: '11：30睡，保障每天 7小时+ 的睡眠时间，这样才可以更有精力做事',
      //     isFinished: false,
      //   },
      //   {
      //     id: 'isWriteBlog',
      //     title: '今天有写博客吗?',
      //     description: '通常而言，不会要求每一天都产出一篇文章，但是每次学习完一个新东西、或者是实践中有产出和收获，还是要花些时间提炼',
      //     isFinished: false,
      //   },
      //   {
      //     id: 'isGoodMidDay',
      //     title: '今天中午状态怎么样? 有去看 课程/基础书 吗',
      //     description: '中午有2个小时的休息时间，除去吃饭的半小时，应该可以做些事情的，让我知道你做了什么~在「日报」中体现出来',
      //     isFinished: false,
      //   },
      //   {
      //     id: 'isNotAxious',
      //     title: '今天有特别焦虑吗?',
      //     description: '请不要特别焦虑...<mark>请相信自己，真心的，静心下来学习</mark>，如果忘了什么知识点，那就再去看一下，没事的',
      //     isFinished: false,
      //   },
      // ],
      missions: [],
      history: new Array(100).fill(null).map(item => ({isActive: false, isDone: false})),
      dailyReport: `#日报 ${new Date().toLocaleDateString()}#`,
      weekendReport: `#周报 ${new Date().toLocaleDateString()}#`,
      isWeekend: new Date().getDay() > 5 || new Date().getDay() === 0,
      dialogVisible: false,
      taskType: 'contentTask',
    };
  },
  methods: {
    handleAddMission(){
      this.addTaskDialogVisible = true;
    },
    handleAddTask(){
      this.taskDialogLoading = true;
      service.post('/api/review/add-task', {
        id: this.taskIdentify,
        title: this.title,
        description: this.taskDescription,
        type: this.taskType
      }).then(res => {
        this.$message.success('新增成功');
        this.taskDialogLoading = false;
        this.addTaskDialogVisible = false;
        this.getConfig();
        this.loadTodayData();
      }).catch(err => {
        this.$message.error('新增失败');
        this.taskDialogLoading = false;
        this.addTaskDialogVisible = false;
      })
    },
    handleSure() {
      const contentTask = {};
      const highlightTask = {};
      this.missions.forEach(item => {
        if(item.type === 'contentTask'){
          contentTask[item.id] = item.isFinished
        }else if(item.type === 'highlightTask'){
          highlightTask[item.id] = item.isFinished
        }
      });

      contentTask.isWriteDailyReport = true;

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
      this.$on('hook:beforeDestroy', () => {
        this.$parent.$parent.$data.isLarge = false;
      });
    },
    handleSign() {
      this.loginLoading = true;
      service.post('/api/review/login', {
        user: this.user,
        identify: this.identify
      }).then(res => {
        this.loginLoading = this.dialogVisible = false;
        this.$message.success('Sign 成功');
        this.loadTodayData();
        this.loadHistory();
      }).catch(e => {
        this.loginLoading = false;
        this.$message.error('标识符或名称错误')
      })
    },
    loadHistory(){
      service.get('/api/review/history').then(res => {
        this.history = res.data.map(item => ({
          isActive: false,
          isDone: false,
          ...item,
        }));
      })
    },
    /**
     * 获取任务表单
     */
    getConfig(){
      return service.get('/api/review/config').then(res => this.missions = res.data);
    },
    loadTodayData(){
      service.get('/api/review/today').then((res) => {
        console.log(res);
        if(res){
          const data = res.data;
          const tasks = {...data.contentTask, ...data.highlightTask};
          for(let item of this.missions){
            if(item.id in tasks){
              this.$set(item, 'isFinished', true)
            }
          }
          this.dailyReport = data.dailyReport;
          this.weekendReport = data.weekendReport;
          console.log(this.missions)
        }
      })
    }
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

@media screen and (max-width: 600px){
  .fb{
    flex-wrap: wrap;
  }
  .today-mission {
    width: 100%;
  }
}
</style>
