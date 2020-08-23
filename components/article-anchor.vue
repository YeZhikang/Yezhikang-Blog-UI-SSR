<template>
  <div @click="handleScrollToTop" class="article-anchor article-anchor__alpha">
    <div class="article-anchor__button">
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-anchor",
  methods: {
    handleScrollToTop(){
      let heightOffset = document.documentElement.scrollTop;
      const intv = setInterval(() => {
        if(heightOffset <= 0){
          clearInterval(intv);
        };
        document.documentElement.scrollTop = heightOffset - 150;
        heightOffset = heightOffset - 150;
      }, 8)
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-anchor{
    position: fixed;
    right: 80px;
    bottom: 50px;
    padding: 12px;
    border-radius: 50%;
    background: #3a8ee6;
    box-shadow: 0 0 12px rgba(0,0,0,0.2);
    color: white;
    transition: 0.2s;
    cursor: pointer;
    .article-anchor__button{
    }
  }

  .article-anchor__alpha {
    opacity: 0;
  }

  @media screen and (max-width: 700px){
    .article-anchor{
      position: fixed;
      right: 30px;
      bottom: 30px;
      padding: 12px;
      border-radius: 50%;
      background: #3a8ee6;
      box-shadow: 0 0 12px rgba(0,0,0,0.2);
      .article-anchor__button{
      }
    }
  }
</style>
