<template>
  <div style="width: 100%;">
    <div class="main">
      <div style="display: flex; align-items: center; width: 100%;">
        <img class="imgLogo" :src="pngCate.Design" />
        <div>
          <h1 class="title" style="word-break: break-all; margin-bottom: 0; margin-top: 0;">{{ blogInfo.file }}</h1>
          <span style="font-size: 13px; color: darkgrey; line-height: 1;"
          >{{ blogInfo.time }} / <span style="font-weight: 600; font-size: 15px;"> share</span></span
          ><br />
          <el-tag
            class="index-button--warning"
            style="margin-top: 20px"
            type="primary"
            size="mini"
            plain
          >数据结构与算法
          </el-tag>
          <!--          <el-tag v-if="userName === 'super'" @click="deleteBlog()" type="danger" size="mini">删除博客</el-tag>-->
        </div>
      </div>
      <div class="htmlBlock" v-html="mdHtml" v-highlight></div>
      <article-anchor ref="anchor"></article-anchor>
      <!--        <el-card>-->
      <!--          <div style="display: flex;align-items: center;justify-content: space-around;font-size: 16px;line-height: 1.8">-->
      <!--            <img src="../../assets/indexLogo.png" class="imgLogo2">-->
      <!--            <div style="width: 68%">-->
      <!--              <p>-->
      <!--                心若改变，你的态度跟着改变；态度改变，你的习惯跟着改变；习惯改变，你的性格跟着改变；性格改变，你的人生跟着改变。-->
      <!--              </p>-->
      <!--              <i style="float: right">——亚伯拉罕·马斯洛</i>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </el-card>-->
      <the-footer id="footer"></the-footer>
    </div>
  </div>
</template>

<script>
import TheFooter from '../../../components/TheFooter';
import JavaScript from 'assets/blogs/javascript.png';
import React from 'assets/blogs/react.png';
import Vue from 'assets/blogs/vue.png';
import CSS from 'assets/blogs/css.png';
import Golang from 'assets/blogs/Golang.png';
import DailyLife from 'assets/blogs/Daily Life.png';
import Design from 'assets/blogs/Design.png';
import NodeJS from 'assets/blogs/Node.JS.png';
import Python from 'assets/blogs/Python.png';
import SolveWay from 'assets/blogs/SolveWay.png';
import Tool from 'assets/blogs/Tool.png';
import { Loading } from 'element-ui';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import axios from 'axios';
import marked from 'marked';
import ArticleAnchor from '@/components/article-anchor';
import service from '@/service';

const translateText = (str) => {

  return str.replace(/https:\/\/www.yezhikang.site/g, 'http://121.43.155.100');
};

export default {
  name: 'File',
  components: { ArticleAnchor, TheFooter },
  head() {
    return {
      title: `${this.blogInfo.file} - 叶志康`,
    };
  },
  data() {
    return {
      mdHtml: '',
      title: '',
      time: '',
      category: '',
      blogInfo: {},
      isShowAnchor: false,
      // userName: localStorage.getItem('userName'),
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
  computed: {
    isDark() {
      if (window.document.body.classList.contains('dark')) {
        return 'rgba(0,0,0,0.1)';
      } else {
        return 'rgba(255,255,255,0.4)';
      }
    },
  },
  mounted() {
    // let hash = this.$route.params.hash;
    // console.log(hash);
    // let loadingInstance1 = Loading.service({ background: this.isDark });
    // this.$axios.post('/getmd', { hash }).then(res => {
    //     this.mdHtml = this.$marked(res.data.text);
    //     this.title = res.data.file;
    //     this.time = res.data.time;
    //     this.category = res.data.category;
    //     window.document.title = this.title + " — Yezhikang";
    //     loadingInstance1.close()
    //     console.log(res.data)
    // }).catch(error => {
    //     console.log(error)
    // })
    window.addEventListener('scroll', this.addAnchor, false);
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.addAnchor, false);
    })
  },
  methods: {
    deleteBlog() {
      this.$axios
        .post('/deleteBlog', { hash: this.$route.params.hash })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功',
            });
          }
        })
        .catch((error) => console.log(error));
    },
    addAnchor(){
      if(document.documentElement.scrollTop > 300){
        this.$refs.anchor.$el.classList.remove('article-anchor__alpha')
      }else{
        this.$refs.anchor.$el.classList.add('article-anchor__alpha')
      }
    }
  },
  directives: {
    highlight(el) {
      let highlight = el.querySelectorAll('pre code');
      highlight.forEach((block) => {
        hljs.highlightBlock(block);
      });
    },
  },
  asyncData({ params: {file} }) {
    return service
      .get(`${process.env.BASE_URL}/api/algorithm/one`, {
        params: {
          file
        },
      })
      .then(({ data: {file,text,time} }) => {
        const txt = marked(translateText(text)).replace(/<h1.+<\/h1>/, '');
        return {
          blogInfo: {
            time,
            file
          },
          mdHtml: txt,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
>>> ::selection {
  background-color: rgba(8, 96, 96, 0.44);
  color: white;
}

.main {
  text-align: left;
  width: calc(52% + (1440px - 100%) / 3);
  margin: 0 auto;
  padding-top: 160px;
  padding-bottom: 25px;
}

.imgLogo {
  width: 150px;
  padding: 35px 35px 35px 0;
}

.title {
  font-size: 26px;
}

.htmlBlock >>> p {
  width: 100%;
  font-size: 15px;
}

.htmlBlock >>> code{
  font-family: monaco, serif;
  font-size: 12px;
}

.htmlBlock >>> ul{
  padding-left: 14px;
  font-size: 14px;
}

.htmlBlock >>> li p{
  margin: 4px 0;
}

.htmlBlock >>> img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.htmlBlock >>> a {
  color: #3a8ee6;
}

>>> code:not(.hljs) {
  display: inline;
  margin: 4px 0;
  background-color: rgba(184, 128, 3, 0.07);
  padding: 4px 3px;
  border-radius: 5px;
}

>>> table {
  font-size: 12px;
  margin: 0 auto;
  width: calc(100% - 50px);
  border: 1px solid lightgrey;
  border-collapse: collapse;
  overflow: auto;
}

>>> thead {
  width: calc(100% - 50px);
  background-color: #f8f8f8;
}

>>> tr:nth-child(even) {
  background-color: #f8f8f8;
}

>>> td {
  overflow: scroll;
}

>>> tr {
  width: calc(100% - 50px);
  line-height: 1.6;
}

>>> td,
>>> th {
  padding: 6px;

  border: 1px solid lightgrey;
}

/*>>>code:not(pre code){*/
/*  display: inline;*/
/*  margin: 4px 0;*/
/*  background-color: rgba(184, 128, 3, 0.07);*/
/*}*/
>>> .hljs {
  border-radius: 5px;
}

>>> li {
  padding: 4px 0;
}

>>> blockquote {
  background-color: rgba(178, 184, 155, 0.07);
  border-radius: 6px;
  width: calc(100% - 50px);
  margin: 14px 0;
  padding: 5px 25px;
}

>>> blockquote p {
  font-size: 14px;
  padding-left: 26px;
  border-left: 5px solid rgba(211, 211, 211, 0.4);
}

>>> pre {
  font-family: Monaco;
}

>>> pre {
  margin: 0;
  position: relative;
  border-radius: 15px;
  color: white;
}

>>> pre:before {
  content: '\2022 \2022 \2022';
  position: absolute;
  top: 0px;
  left: 0;
  height: 0;
  background: rgb(55, 55, 55);
  color: #c2c3c4;
  width: 100%;
  font-size: 18px;
  margin: 0;
  line-height: 0;
  padding: 14px 5px;
  text-indent: 4px;
  letter-spacing: 4px;
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

>>> pre code {
  box-shadow: 0 5px 14px #cbcbcb;
  padding: 45px 25px 15px 25px;
  display: inline-block;
  /*width: calc(100% - 50px);*/
  width: calc(100% - 50px);
  font-size: 14px;
}

code {
  display: inline;
}

li {
  display: inline;
}

.htmlBlock >>> img {
  text-align: center;
}

.htmlBlock {
  padding-bottom: 50px;
}

.imgLogo2 {
  width: 18%;
  border-radius: 50%;
}

.end {
  margin: 160px 0 120px 0;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 720px) {
  .title {
    font-size: 30px;
  }

  >>> .htmlBlock h1:not(.title) {
    font-size: 23px;
  }

  >>> .htmlBlock h2:not(.title) {
    font-size: 20px;
  }

  >>> .htmlBlock h3:not(.title) {
    font-size: 18px;
  }

  >>> pre code {
    font-size: 12px;
    margin: 4px 0 4px 0;
  }

  .main {
    width: 90%;
    padding-top: 90px;
  }

  .imgLogo {
    width: 120px;
    padding: 15px 15px 15px 0;
  }

  .htmlBlock >>> img {
    text-align: center;
    width: 100%;
  }

  .imgLogo2 {
  }

  .end {
    padding: 0 10px;
  }

  .end .pl25 {
    padding-left: 10px;
  }

  >>> ul {
    padding-left: 12px;
  }

  >>> blockquote {
    padding-left: 12px;
  }

  >>> blockquote p {
    padding-left: 10px;
  }

  .htmlBlock >>> p,
  >>> li,
  >>> table {
    font-size: 14px;
  }
}
</style>
