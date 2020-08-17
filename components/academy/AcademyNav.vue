<template>
  <div class="nav">
    <div class="nav__head">
      <div class="nav__link" @click="handlePush(false)">阿里巴巴商学院</div>
      <div class="nav__link nav__link__b"><i class="el-icon-suitcase-1"></i> 学院主页</div>
      <div class="nav__link nav__link__b"><i class="el-icon-box"></i> 学院办公网</div>
      <div class="nav__link nav__link__b"><i class="el-icon-medal"></i> 人才招聘</div>
      <div class="nav__link nav__link__b"><i class="el-icon-user"></i> Login</div>
      <div class="nav__search">
        <input placeholder="Search" class="search__box" type="text" />
      </div>
    </div>
    <div class="nav__body" @mouseleave="handleLeave">
      <img class="body__avatar" src="../../static/images/academy/academy-icon.jpeg" alt="" @click="handlePush(false)" />
      <div class="body__link-container">
        <div
          :class="{ 'nav__link--body': true, 'inside-link--active': link.name === insideNav.name }"
          @mouseover="handleCheck(link)"
          @mouseout="handleOut()"
          @click="handlePush(link, link.links[0])"
          v-for="link in bodyNavLinks"
          :key="link.name"
        >
          {{ link.name }}
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <div v-show="isCheckDetail" ref="navCloser" class="nav__closer">
          <div style="color: #006699;">
            <img :src="currentNav.imageURL" alt="" style="width: 196px; height: 110px;" />
            <p style="font-size: 14px; font-weight: 400; letter-spacing: 3px; margin-top: 10px;">
              <router-link class="aca-ao" to="/" style="color: #006699;">回顾院景 </router-link>
            </p>
          </div>
          <div class="check-item">
            <div class="link-body" v-for="link in currentNav.links.slice(0, 3)" :key="link.title">
              <span @click="handlePush(currentNav, link)" class="aca-ao">{{ link.title }}</span>
            </div>
          </div>
          <div class="check-item">
            <div class="link-body" v-for="link in currentNav.links.slice(3)" :key="link.title">
              <span @click="handlePush(currentNav, link)" class="aca-ao" to="/">{{ link.title }}</span>
            </div>
          </div>
          <div class="reading">
            <p style="font-size: 10px; color: rgb(88, 88, 88); margin-bottom: 15px; font-weight: 900;">RELATED LINKS</p>
            <div class="reading-link">Centers & Institutes</div>
            <div class="reading-link">Public Service Center</div>
            <div class="reading-link">LINKSEngaged</div>
            <div class="reading-link">Summer Sessions</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="inside-link__area" v-if="isInside">
      <div
        @click="handlePush(insideNav, link)"
        :class="{ 'inside-link': true, 'inside-link--active': link.title === insideLink.title }"
        v-for="link in insideNav.links"
        :key="link.title"
      >
        {{ link.title }}
      </div>
    </div>
  </div>
</template>

<script>
import bg1 from '../../static/images/academy/nav-overview-about.jpg';
import bg2 from '../../static/images/academy/nav-overview-academics.jpg';
import bg3 from '../../static/images/academy/nav-overview-admissions.jpg';
import bg4 from '../../static/images/academy/nav-overview-engagement.jpg';
import { checkBack, checkTranslate } from '../../static/javascript/data';

export default {
  name: 'AcademyNav',
  data() {
    return {
      isCheckDetail: false,
      isInside: false,
      isEnter: false,
      insideNav: '',
      insideLink: '',
      bodyNavLinks: [
        {
          name: 'About ABC',
          imageURL: bg1,
          links: [
            {
              title: '学院简介',
              url: '',
            },
            {
              title: '学院理事',
              url: '',
            },
            {
              title: '学院领导',
              url: '',
            },
            {
              title: '机构设置',
              url: '',
            },
          ],
        },
        {
          name: '学院动态',
          imageURL: bg2,
          links: [
            {
              title: '学院动态',
              url: '',
            },
            {
              title: '学院简介',
              url: '',
            },
            {
              title: '人才招聘',
              url: '',
            },
          ],
        },
        {
          name: '信息公开',
          imageURL: bg3,
          links: [
            {
              title: '信息公开',
              url: '',
            },
            {
              title: '院务信息',
              url: '',
            },
            {
              title: '党务信息',
              url: '',
            },
            {
              title: '其他信息',
              url: '',
            },
          ],
        },
        {
          name: '科学研究',
          imageURL: bg4,
          links: [
            {
              title: '科学研究',
              url: '',
            },
            {
              title: '学术成果',
              url: '',
            },
            {
              title: '科研成果',
              url: '',
            },
            {
              title: '科研机构',
              url: '',
            },
          ],
        },
        {
          name: '学生工作',
          imageURL: bg1,
          links: [
            {
              title: '学生工作',
              url: '',
            },
            {
              title: '思政工作',
              url: '',
            },
            {
              title: '团学动态',
              url: '',
            },
            {
              title: '学生事务',
              url: '',
            },
            {
              title: '创新创业',
              url: '',
            },
            {
              title: '心理健康',
              url: '',
            },
          ],
        },
        {
          name: '实习就业',
          imageURL: bg2,
          links: [
            {
              title: '实习信息',
              url: '',
            },
            {
              title: '就业信息',
              url: '',
            },
          ],
        },
        {
          name: '党建工作',
          imageURL: bg3,
          links: [
            {
              title: '党建动态',
              url: '',
            },
            {
              title: '主题教育',
              url: '',
            },
            {
              title: '党纪党规',
              url: '',
            },
          ],
        },
      ],
      currentNav: { links: [] },
      isDblCheck: false,
    };
  },
  methods: {
    handleCheck(link) {
      this.isCheckDetail = true;
      this.currentNav = link;
    },
    handleOut() {
      // this.isCheckDetail = false;
      // this.currentNav = {}
    },
    handleLeave() {
      this.isCheckDetail = false;
    },
    handlePush(currentNav, link) {
      let name, params;
      let transParName, transName;
      if (link) {
        const checkObj = checkTranslate(currentNav.name, link.title);
        transParName = checkObj.transParName;
        transName = checkObj.transName;
      }
      switch (currentNav.name) {
        case undefined:
          name = 'ali-business-school';
          this.insideLink = '';
          this.insideNav = '';
          this.isInside = false;
          break;
        case 'About ABC':
          name = 'ali-business-school-article-par-item';
          params = {
            par: transParName,
            item: transName,
          };
          this.insideNav = currentNav;
          this.insideLink = link;
          this.isInside = true;
          break;
        default:
          name = 'ali-business-school-list-par-item';
          params = {
            par: transParName,
            item: transName,
          };
          this.insideNav = currentNav;
          this.insideLink = link;
          this.isInside = true;
      }

      console.log(params);
      this.$router.push({
        name,
        params,
      });
    },
  },
  created() {},
  watch: {
    $route: {
      handler: function (val) {
        const { params, query } = val;

        if (params.par !== 'about' && this.$route.name === 'ali-read' && !query.articleId) {
          this.$router.push({
            name: 'bridge',
            params,
            query,
          });
          return;
        }

        const { parName, name } = checkBack(params.par, params.item);
        if (parName && name) {
          for (let item of this.bodyNavLinks) {
            if (item.name === parName) {
              for (let link of item.links) {
                if (link.title === name) {
                  this.insideLink = link;
                  this.insideNav = item;
                  this.isInside = true;
                }
              }
            }
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
}

.nav {
}

.nav__head {
  height: 40px;
  background-image: url('../../static/images/academy/academy-nav-background.png');
  background-position: center;
  background-size: cover;
  /*border-image: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff) 3;*/
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  padding: 0 8%;
  font-size: 12px;

  .nav__link:nth-child(4) {
    padding-right: 20px;
    border-right: 1px solid rgba(222, 222, 222, 0.6);
  }

  .nav__link {
    padding-left: 20px;
    cursor: pointer;
  }

  .nav__link:hover {
    color: ivory;
  }

  .search__box {
    appearance: none;
    margin-left: 20px;
    background-color: rgba(200, 200, 200, 0.3);
    border: 1px solid rgba(155, 155, 155, 0.3);
    outline: none;
    height: 28px;
    padding-left: 12px;
    color: white;
    transition: 0.2s width;
    border-radius: 3px;
    box-sizing: border-box;
    width: 140px;

    &:focus {
      width: 180px;
      border-color: #3a8ee6;
    }
  }
}

.nav__link--body {
  font-size: 20px;
  font-weight: 400;
  color: rgb(44, 44, 44);
  /*font-family: 'Roma';*/
  /*font-family: "Heiti SC", Arial;*/
  cursor: pointer;
  transition: 0.2s;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    color: rgb(88, 88, 88);
    background-color: rgba(233, 233, 233, 0.5);
  }
}

.nav__body {
  padding: 14px 8%;
  display: flex;
  align-items: center;
  position: relative;

  .body__avatar {
    height: 128px;
    width: 128px;
    position: relative;
    z-index: 100;
    cursor: pointer;
  }

  .body__link-container {
    margin-left: auto;
    width: calc(100% - 214px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__closer {
    position: absolute;
    left: 0;
    right: 0;
    top: 140px;
    height: 210px;
    z-index: 5;
    background-color: white;
    padding: 0 8% 20px calc(8% + 214px);
    transition: 0.3s;
    animation: collapse 0.2s;
    display: flex;
    border-bottom: 1px solid rgb(233, 233, 233);
  }

  .reading {
    padding-left: 20px;
  }
}

.check-item {
  padding: 0 150px 0 35px;
  color: #006699;
}

.check-item:nth-child(3) {
  /*padding-right: 25px;*/
  padding: 0 250px 0 0;
  border-right: 1px solid lightgrey;
  height: 150px;
}

.link-body {
  margin-bottom: 12px;
}

.reading-link {
  color: black;
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 500;
  font-family: freight-sans-pro-n4, freight-sans-pro, sans-serif;
}

.inside-link__area {
  height: 50px;
  background-color: rgb(248, 248, 248);
  border: 1px solid rgb(240, 240, 240);
  display: flex;
  align-items: center;
  padding: 0 9%;
}

.inside-link {
  padding-right: 26px;
  font-size: 14px;
  color: #5a5a5a;
  letter-spacing: 2px;
  padding-left: 26px;
  cursor: pointer;
  transition: 0.1s;

  /*border-right: 1px solid lightgrey;*/
}

.inside-link:hover {
  text-decoration: underline;
}

.inside-link:last-child {
  border: none;
}

.inside-link--active {
  font-weight: 600;
  color: #e97419;
}

@keyframes collapse {
  0% {
    height: 0;
  }
  100% {
    transform: translate(0, 0);
  }
}

@media screen and (max-width: 800px) {
  .inside-link__area .inside-link {
    font-size: 12px;
    padding: 0 6px;
  }

  .inside-link__area {
    overflow: hidden;
  }

  .body__avatar {
    width: 35px !important;
    height: 35px !important;
  }

  .body__link-container {
    margin-left: 0 !important;
    width: auto !important;
  }
  .nav__link--body {
    font-size: 14px;
    flex-shrink: 0;
  }

  .nav__link__b {
    display: none !important;
  }

  .nav__body {
    overflow: scroll;
  }

  .nav__head {
    justify-content: flex-start !important;
    padding: 0 8%;
  }

  .nav__link:nth-child(1) {
    padding-left: 0;
  }
  .nav__closer {
    display: none !important;
  }
}
</style>
