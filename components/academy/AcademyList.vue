<template>
  <div>
    <div class="fb" style="flex-wrap: wrap;">
      <div class="model-container">
        <h1 class="model-title">{{ item }}</h1>
        <div class="model-list">
          <div class="model-unit fa" v-for="(newItem, i) in newsArr" :key="i" @click="handlePush(newItem)">
            <div class="date" style="font-weight: 300; flex-shrink: 0; font-size: 14px; color: darkgrey;">
              「{{ newItem.date }}」
            </div>
            <div class="unit-title els-1">
              {{ newItem.title }}
            </div>
            <div v-if="newItem.isPermission" style="margin-left: auto; color: #e29200;">
              <i class="el-icon-lock"></i>
            </div>
          </div>
        </div>

        <el-pagination class="pagination" layout="prev, pager, next" :total="50"> </el-pagination>
      </div>
      <side-bar class="sidebar" />
    </div>
    <academy-footer />
  </div>
</template>

<script>
import AcademyFooter from './AcademyFooter';
import SideBar from './tools/SideBar';
import { checkBack } from '../../static/javascript/data';

export default {
  name: 'AcademyList',
  components: { SideBar, AcademyFooter },
  data() {
    return {
      par: '',
      item: '',
      newsArr: [
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
        {
          title: '“红色闪耀”护送学子归来 ——阿里巴巴商学院党员志愿者在行动',
          url: '/',
          date: '2020-05-18',
          isPermission: true,
        },
        {
          title: '学院党委发〔2020〕2号中共阿里巴巴商学院委员会 阿里巴巴商学院关于印发2020年党政工作要点的通知',
          url: '/',
          date: '2020-05-18',
          isPermission: false,
        },
      ].map((item) => {
        item.id = Date.now() + Math.floor(Math.random() * 10000);
        return item;
      }),
    };
  },
  methods: {
    handlePush(navItem) {
      const { par, item } = this.$route.params;
      this.$router.push({
        name: 'ali-read',
        params: {
          par,
          item,
        },
        query: {
          articleId: navItem.id,
        },
      });
    },
  },
  watch: {
    // $route: {
    //     handler: function (val) {
    //         const { par, item } = val.params
    //         const { parName, name } = checkBack(par, item)
    //         this.par = parName
    //         this.item = name
    //     },
    //     immediate: true
    // }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { par, item } = vm.$route.params;
      const { parName, name } = checkBack(par, item);
      vm.par = parName;
      vm.item = name;
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { par, item } = to.params;
    const { parName, name } = checkBack(par, item);
    this.par = parName;
    this.item = name;
    next();
  },
};
</script>

<style lang="scss" scoped>
.model-container {
  width: 53%;
  margin-left: 11%;
  padding: 40px 0;

  .article {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .article-red {
    font-size: 14px;
    color: #b31b1b;
  }

  .article-grey {
    font-size: 14px;
    color: #666565;
  }

  .sidebar {
    width: 26%;
  }

  .tx-foot {
    padding-top: 46px;
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 1px;
    border-right: 1px solid #d7d5d5;
    padding-right: 6px;
  }
}

.pagination {
  margin: 35px 0 30px;
  justify-content: flex-end;
  display: flex;
}

.txr {
  text-align: right;
}

.model-title {
  font-weight: 300;
  letter-spacing: 2px;
  padding-left: 18px;
  border-left: 6px solid orange;
  margin-bottom: 0;
  /*margin-bottom: 62px;*/
}

.model-unit {
  margin: 6px 0 6px 0;
  background: white;
  padding: 6px 8px;
  cursor: pointer;
}

.model-unit:hover {
  background-color: rgba(245, 218, 177, 0.4);
}

.unit-title {
  font-size: 18px;
  font-weight: 300;
  margin-left: 10px;
}

.model-list {
  padding-top: 62px;
  border-left: 1px solid orange;
}

@media screen and (max-width: 800px) {
  .sidebar {
    width: 100%;
    border-top: 1px solid rgb(231, 231, 231);
  }

  .model-container {
    width: 80%;
    padding-bottom: 20px;
  }

  .model-list {
    padding-top: 30px;
  }

  .unit-title {
    font-size: 14px;
  }

  .date {
    display: none;
  }
  .pagination {
    margin: 20px auto;
  }
}
</style>
