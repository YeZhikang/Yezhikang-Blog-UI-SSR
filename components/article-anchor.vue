<template>
  <div @click="handleScrollToTop" class="article-anchor">
    <img :src="imgUrl" alt="">
    <div class="board">
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import Avatar from '../static/images/WechatIMG440.jpeg';

const rollUpFn = () => {
  let pre = null;
  const fn = () => {
    const sTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (sTop > 0) {
      if (pre && pre < sTop) {
        return;
      }
      pre = sTop;
      window.requestAnimationFrame(fn);
      window.scrollTo(0, sTop - sTop / 8);
    }
  };

  return fn;
};

export default {
  name: 'article-anchor',
  methods: {
    handleScrollToTop() {
      window.requestAnimationFrame(rollUpFn());
    },
  },
  data() {
    return {
      imgUrl: Avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.article-anchor {
  position: fixed;
  right: 80px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  color: white;
  transition: 0.2s;
  cursor: pointer;
  background: white;
  opacity: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .board{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    background: transparent;
    opacity: 0;
    .el-icon-arrow-up{
      color: black;
      font-weight: 800;
      font-size: 28px;
    }
  }
}

.article-anchor__not-alpha {
  opacity: 1;
  animation-delay: 1.5s;
  animation-name: go-to-opacity;
  animation-fill-mode: forwards;
  animation-duration: 0.2s;
  animation-timing-function: linear;

  .board{
    animation-timing-function: linear;
    animation-delay: 1.5s;
    animation-name: go-to-gray;
    animation-fill-mode: forwards;
    animation-duration: 0.2s;
  }
}

@keyframes go-to-gray {
  0% {
    background: transparent;
  }
  100% {
    background: rgba(255,255,255, .65);
    opacity: 1;
  }
}

@keyframes go-to-opacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}


@media screen and (max-width: 700px) {
  .article-anchor {
    position: fixed;
    right: 30px;
    bottom: 30px;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);

    .article-anchor__button {
    }
  }
}
</style>
