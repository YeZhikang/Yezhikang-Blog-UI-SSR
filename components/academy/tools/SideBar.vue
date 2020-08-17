<template>
  <div class="side-bar">
    <div class="main-board">
      <div class="logo" style="text-align: center;">
        <img style="width: 220px;" src="../../../static/images/academy/banner.png" />
        <br />
        <span class="article">abs.hznu.edu.cn</span>
      </div>
      <div class="line" style="width: 32%; margin: 0 auto; border-bottom: 1px solid #969696; padding-top: 50px;"></div>
      <div class="mt50 ml60 side-bar__title">
        MORE STORIES:
        <div class="mt20" style="border-bottom: 3px solid #e95000; display: block; width: 34px;"></div>
        <ul style="padding-left: 20px; list-style-type: square;">
          <li class="sidebar-link">学院动态</li>
          <li class="sidebar-link">学院简介</li>
          <li class="sidebar-link">人才招聘</li>
          <li class="sidebar-link">学院理事</li>
          <li class="sidebar-link">科研成果</li>
          <li class="sidebar-link">教师风采</li>
        </ul>
      </div>
      <div class="line ml60" style="width: 32%; border-bottom: 1px solid #969696; padding-top: 50px;"></div>

      <div class="mt50 ml60 side-bar__title">
        ACADEMIC PROGRAMS:
        <div class="mt20" style="border-bottom: 3px solid #e95000; display: block; width: 34px;"></div>
        <ul style="padding-left: 20px; list-style-type: square;">
          <li class="sidebar-link">学术动态</li>
          <li class="sidebar-link">科研成果</li>
          <li class="sidebar-link">研究机构</li>
        </ul>
      </div>

      <div class="line ml60" style="width: 32%; border-bottom: 1px solid #969696; padding-top: 50px;"></div>

      <div class="mt50 ml60 side-bar__title">
        FOLLOW ABC:
        <div class="mt20" style="border-bottom: 3px solid #e95000; display: block; width: 34px;"></div>
        <ul style="padding-left: 20px; list-style-type: square;">
          <li class="sidebar-link">
            <span class="pjfont">Weibo <i class="el-icon-link"></i></span>
          </li>
          <li class="sidebar-link">
            <span class="pjfont">Tik tok <i class="el-icon-link"></i></span>
          </li>
          <li class="sidebar-link">
            <span class="pjfont">Wechat <i class="el-icon-link"></i></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style scoped>
.side-bar {
  padding: 30px 0;
  border-left: 1px solid #eeeeee;
}

.logo {
  margin-top: 20px;
}

.sidebar-link {
  line-height: 2.2;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 1px;
}

.article {
  font-size: 16px;
  line-height: 1.8;
  font-weight: 300;
}
.article-red {
  font-size: 14px;
  color: #b31b1b;
}

.article-grey {
  font-size: 14px;
  color: #666565;
}

.side-bar__title {
  font-weight: 300;
  font-size: 20px;
}

.tx-foot {
  padding-top: 46px;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  border-right: 1px solid #d7d5d5;
  padding-right: 6px;
}

.sidebar-link:hover {
  color: #fb7d1b;
}

.main-board {
  width: 80%;
}
@media screen and (max-width: 800px) {
  .main-board {
    width: 100%;
  }

  /*.ml60{*/
  /*    margin: 0 auto;*/
  /*    text-align: center;*/
  /*    width: 60%;*/
  /*}*/
}
</style>
