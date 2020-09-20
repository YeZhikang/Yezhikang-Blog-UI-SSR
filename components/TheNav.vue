<template>
  <div class="to-a">
    <ul>
      <li>
        <nuxt-link class="index-link" :to="{ name: 'index' }"
          ><h2><i class="el-icon-ice-cream"></i> Ye Zhikang</h2>
        </nuxt-link>
      </li>
      <div class="button-group">
        <li v-if="!isMobile">
          <h3>
            <router-link :to="{ name: 'pages' }" :class="{ navActive: isActive[0], 'nav-link': true }"
              >Articles
            </router-link>
          </h3>
        </li>
        <li v-if="!isMobile">
          <h3>
            <router-link :to="{ name: 'algorithm' }" :class="{ navActive: isActive[1], 'nav-link': true }"
            >数据结构与算法
            </router-link>
          </h3>
        </li>
        <li v-if="!isMobile">
          <h3>
            <router-link :to="{ name: 'idea' }" :class="{ navActive: isActive[2], 'nav-link': true }">
              Idea
            </router-link>
          </h3>
        </li>
        <li>
          <theme-radio />
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import ThemeRadio from './ThemeRadio';

export default {
  name: 'Nav',
  components: { ThemeRadio },
  data() {
    return {
      isActive: [false, false, false],
      isMobile: false,
    };
  },
  methods: {
    triggerScroll(target){
      if(document.documentElement.clientWidth < 600){
        this.isMobile = true;
        target.classList.add('to-a__collapsed')
        return;
      }
      this.isMobile = false;
      if(document.documentElement.scrollTop < 20){
        target.classList.remove('to-a__collapsed')
      }else{
        target.classList.add('to-a__collapsed')
      }
    },
    addNavListener() {
      let toA = document.querySelector('.to-a');
      window.addEventListener('scroll', this.triggerScroll.bind(this, toA));
    },
    // haha2(){
    //     let toA = document.querySelector(".to-a")
    //     addEventListener('scroll',()=>{
    //         if(document.documentElement.scrollTop <= 50){
    //             toA.style.boxShadow = 'none';
    //         }else{
    //             toA.style.boxShadow = '0 0 10px lightgray';
    //         }
    //     },false);
    // }
  },
  watch: {
    $route: {
      handler: function (val) {
        console.log(val)
        switch (val.name){
          case 'Home':
            this.isActive = [false, false, false];
            return;
          case 'write':
            this.isActive = [false, false, false];
            return;
          case 'pages' || 'articles':
            this.isActive = [true, false, false];
            return;
          case 'algorithm':
            this.isActive = [false, true, false];
            return;
          case 'idea':
            this.isActive = [false, false, true];
            return;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (window.innerWidth <= 800) {
      this.isMobile = true;
    }
    if (!window.isMobile) {
      this.addNavListener();
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  transition: color 0.3s, border-top 0.15s;
}

a:hover {
  color: #517598;

}

.navActive {
  color: darkcyan;
}

.to-a {
  /*background-color: white;*/
  z-index: 999;
  width: 100%;
  height: 165px;
  box-shadow: none;
  position: fixed;
  transition: 0.25s ease;
  top: 0;
  box-sizing: border-box;
  background-color: white;
}

.to-a__collapsed {
  height: 58px;
  box-shadow: 0 0 6px rgba(0,0,0,.1);
}

/*.to-a:hover{*/
/*    box-shadow: none;*/
/*    height: 112px;*/
/*}*/

ul {
  display: flex;
  align-items: center;
  padding: 0;
  width: calc(52% + (1440px - 100%) / 3);
  height: 100%;
  margin: 0 auto;
  justify-content: space-between;
  list-style: none;
  transition: 0.2s ease;
}

li {
  display: inline-block;
}

h3 {
  font-weight: 400;
  font-size: 17px;
}

.button-group {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.button-group li {
  padding-left: 20px;
}

@media screen and (max-width: 800px) {
  .to-a {
    height: 58px;
    box-shadow: 0 0 5px lightgrey;
    background-color: white;
    z-index: 999;
  }

  ul {
    width: 90%;
    justify-content: space-between;
  }

  h2 {
    font-size: 18px;
  }

  .button-group li {
    padding-left: 10px;
  }

  h3 {
    font-size: 12px;
  }
}

.shadow-box {
  box-shadow: 0 0 5px lightgray;
}

.shadow-box--none {
  box-shadow: none;
}
</style>
