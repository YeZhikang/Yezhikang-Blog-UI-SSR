<template>
  <div :class="{ container: true, 'is-large-content': isLarge }">
    <div class="container__head">
      <h1 class="container__title">{{ title }}</h1>
      <slot name="description"></slot>
    </div>
    <div class="container__body">
      <slot></slot>
    </div>
    <the-footer style="padding-bottom: 20px;"/>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter';

export default {
  name: 'StandardPage',
  components: { TheFooter },
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: calc(52% + (1440px - 100%) / 3);
  padding-top: 200px;
  /*height: 100%;*/
  box-sizing: border-box;
  &__head h1 {
    margin: 0;
  }

  &__head p {
    margin: 0;
    font-weight: 300;
  }

  &__body {
    margin-top: 38px;
  }
}

@media screen and (max-width: 600px) {
  .container {
    width: 90% !important;
    padding-top: 84px;
  }
}
</style>
