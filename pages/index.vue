<template>
  <div class="main">
    <div class="main-body">
      <div class="welcome-block">
        <div class="intro">
          <h1>Hey,我是叶志康</h1>
          <p>
            我是一个前端开发者，爱好编程。对 <code class="pjfont">JavaScript</code> ,
            <code class="pjfont">Python</code> , <code class="pjfont">Node.js</code> 很感兴趣。
          </p>
          <div style="margin-top: 24px;">
            <el-button
              class="index-button index-button--primary"
              @click="urlRedirect({ name: 'pages' })"
              type="primary"
              size="mini"
              >Articles</el-button
            >
            <el-button
              class="index-button index-button--warning"
              type="warning"
              size="mini"
              @click="urlRedirect({ name: 'me' })"
              >About Me</el-button
            >
          </div>
        </div>
        <div class="welcome-card">
          <el-card>
            <img style="width: 80px; border-radius: 50%;" src="../assets/indexLogo.png" />
            <h3>Ye Zhikang</h3>
            <p>我在这里撰写博客和分享笔记，不求能帮助别人，但希望能记录自己每天的日常，让自己踏踏实实地进步。</p>
            <el-button style="margin-top: 20px;" size="mini" type="primary" plain>Follow</el-button>
          </el-card>
        </div>
      </div>
      <div class="recent-blog">
        <div class="fa">
          <h2>Recent Articles</h2>
          <el-button
            @click="urlRedirect({ name: 'pages' })"
            class="index-button--info"
            style="margin-left: 25px;"
            type="info"
            size="mini"
            >View all</el-button
          >
        </div>
        <div class="article-list">
          <div v-for="(article, index) in articleLst" :key="index" class="fa" style="margin-top: 25px;">
            <!--            <img :src="article.img" alt="">-->
            <img :src="pngCate[article.category]" style="width: 33px;" />
            <h4 style="width: 89%; padding: 0 15px;">
              <nuxt-link class="rl" :to="'/article/' + article.urlHash">{{ article.file }}</nuxt-link>
            </h4>
            <div class="isnew" style="min-width: 48px;">
              <el-tag type="warning" v-if="isNew(article.time)">New</el-tag>
            </div>
          </div>
        </div>
      </div>
      <the-footer id="footer">
        <template v-slot:ip>
          <div style="margin: 60px 0 10px 150px; text-align: right; padding-top: 15px;">
            <a href="http://www.beian.miit.gov.cn" class="pjfont" style="font-size: 12px; margin-top: 40px;"
              >浙ICP备 19033933号-2</a
            >
          </div>
        </template>
      </the-footer>
    </div>
  </div>
</template>

<script>
import TheFooter from '../components/TheFooter';
import JavaScript from '../assets/blogs/javascript.png';
import React from '../assets/blogs/react.png';
import Vue from '../assets/blogs/vue.png';
import CSS from '../assets/blogs/css.png';
import Golang from '../assets/blogs/Golang.png';
import DailyLife from '../assets/blogs/Daily Life.png';
import Design from '../assets/blogs/Design.png';
import NodeJS from '../assets/blogs/Node.JS.png';
import Python from '../assets/blogs/Python.png';
import SolveWay from '../assets/blogs/SolveWay.png';
import Tool from '../assets/blogs/Tool.png';
import axios from 'axios';

export default {
  name: 'Home',
  components: { TheFooter },
  head() {
    return {
      title: '叶志康的个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '叶志康的个人博客|记录|分享',
        },
        {
          hid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          hid: 'description',
          name: 'title',
          content: '叶志康的个人博客',
        },
        {
          hid: 'baidu-site-verification',
          name: 'baidu-site-verification',
          content: 'TwSq51KdIC',
        },
      ],
    };
  },
  data() {
    return {
      articleLst: [],
      pngCate: {
        JavaScript,
        Vue,
        React,
        CSS,
        Golang,
        Design,
        NodeJS,
        Python,
        SolveWay,
        Tool,
        DailyLife,
      },
    };
  },
  methods: {
    getAllArticleInfo() {
      this.$axios
        .post('/getArticles', { activeLabels: [], text: '' })
        .then((res) => {
          this.articleLst = res.data.articles.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    urlRedirect(obj) {
      this.$router.push(obj);
    },
    isNew(time) {
      return new Date() - new Date(time) < 100000000;
    },
  },
  async created() {

    // document.title = "叶志康的博客"
  },
  mounted() {
    // this.getAllArticleInfo();
  },
  asyncData() {
    return axios
      .post('http://121.43.155.100:8081/getArticles', { activeLabels: [], text: '' })
      .then((res) => {
        return {
          articleLst: res.data.articles.reverse().slice(0, 10),
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.article-list {
  margin-top: 40px;
}
.main-body {
  width: calc(52% + (1440px - 100%) / 3);
  margin: auto;
  padding-bottom: 25px;
}
.welcome-block {
  padding-top: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.welcome-block h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
}
.welcome-block h1 {
  font-size: 48px;
}

.welcome-block p {
  font-size: 18px;
  margin-top: 6px;
}

.welcome-card p {
  font-size: 14px;
  line-height: 1.8;
}

.welcome-card {
  width: 35%;
  text-align: center;
}

.intro {
  width: 60%;
}

.recent-blog {
  margin-top: 120px;
  text-align: left;
  font-size: 20px;
}

.isNew {
}

.article-list h4 {
  font-size: 18px;
  font-weight: 600;
}

@media screen and (max-width: 600px) {
  .recent-blog h2 {
    font-size: 24px;
  }
  .recent-blog h4 {
    font-size: 15px;
  }
  .recent-blog {
    margin-top: 45px;
  }
  .main-body {
    width: 90%;
  }

  .welcome-block {
    padding-top: 100px;
  }

  .welcome-card {
    display: none;
  }

  .intro {
    width: 500px;
  }

  .intro h1 {
    font-size: 40px;
    font-weight: 700;
    font-family: Arial;
  }

  .intro p {
    font-size: 16px;
    line-height: 1.8;
  }

  .main {
    width: 100%;
  }
}
</style>
