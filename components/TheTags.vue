<template>
  <div class="tags">
    <div class="tag-body">
      <div class="line" v-if="!activesArr.length"></div>
    </div>
    <div class="tag-body" v-for="(active, index) in activesArr" :key="index">
      <div class="line"></div>
      <div class="active">
        <i :class="iconType(active.type)"></i>
        <div class="active--info" v-html="active.text.replace(/\n/g, '<br>')"></div>
      </div>
      <div class="line" v-if="index === activesArr.length - 1"></div>
    </div>
    <div class="tag-body" v-if="isEnd">
      <i class="el-icon-more icon-more" style="transform: rotate(90deg);"></i>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTags',
  props: {
    idId: {
      default: 0,
      type: [String, Number],
    },

    activesArr: {
      default: () => [],
      type: Array,
    },
    isEnd: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    iconType(type) {
      switch (type) {
        case 'comment':
          return 'el-icon-chat-dot-round tag-icon';
        case 'finished':
          return 'el-icon-success tag-icon';
        case 'marked':
          return 'el-icon-price-tag tag-icon reverse';
        case 'minus':
          return 'el-icon-remove tag-icon';
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.tags {
  position: relative;
  left: 90px;
  bottom: 0;
  width: calc(100% - 90px);
}
.el-icon-price-tag {
  transform: rotate(180deg);
}

.tag-body {
  text-align: center;
  width: 20px;
}

.icon-body {
}

.line {
  height: 30px;
  width: 2px;
  background-color: #393f4c;
  margin: 0 auto;
}

.tag-icon {
  color: #2c3e50;
  z-index: 99;
  background-color: white;
  padding: 2px 0 4px 0;
  transition: 0.2s background-color, 0.2s color;
}

.active {
  position: relative;
  left: 2px;
  display: flex;
  align-items: flex-start;
  top: 2px;
  text-align: left;
  flex-wrap: wrap;
  width: 250px;
}

.active--info {
  width: 200px;
  text-overflow: clip;
  position: relative;
  left: -9px;
  border-left: 2px solid #393f4c;
  z-index: 1;
  padding-left: 20px;
  font-size: 12px;
  word-break: break-all;
}

.reverse {
  transform: rotate(180deg);
}
</style>
