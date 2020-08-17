<template>
  <div class="adv-container">
    <div class="adv-des"></div>
    <div class="adv-card">
      <div class="adv-card__unit" v-for="theme in themeArr" :key="theme.title">
        {{ theme.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcademyAdv',
  data() {
    return {
      themeArr: [
        {
          title: '师资',
        },
        {
          title: '力量',
        },
        {
          title: '本科',
        },
        {
          title: '硕士',
        },
        {
          title: '社会培训',
        },
        {
          title: 'International Education',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.adv-container {
  position: relative;
  .adv-card {
    width: 84%;
    height: 80px;
    position: absolute;
    top: 40px;
    background-color: white;
    box-shadow: 0px 3px 12px 0px rgba(183, 183, 183, 0.5);
    margin: 0 0 15px 0;
    z-index: 99;
    left: 8vw;
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 18px;
    &__unit {
      flex-grow: 1;
      border-right: 1px solid lightgrey;
    }
    &__unit:last-child {
      border-right: none;
    }
  }
  .adv-des {
    height: 120px;
    background-image: url('../../static/images/academy/academy-nav-background.png');
    background-position: center;
    background-size: cover;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
}

@media screen and (max-width: 800px) {
  .adv-card__unit {
    font-size: 16px !important;
    flex-shrink: 0;
    padding: 0 23px;
  }

  .adv-card {
    overflow: scroll;
  }

  .adv-des {
    height: 70px !important;
  }
}
</style>
