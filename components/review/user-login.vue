<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
  >
    名字：<el-input :value="user" @input="val => $emit('update:user', val)"></el-input>
    标识符：<el-input :value="identify" @input="val => $emit('update:identify', val)" type="password"></el-input>
    <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="$emit('update:dialogVisible', false)">取 消</el-button>
        <el-button :loading="loading" @click="handleSign" type="primary">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'user-login',
  props: {
    user: {
      type: String
    },
    identify: {
      type: String
    },
    dialogVisible: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  methods: {
    handleSign(){
      this.$emit('handle-sign')
    }
  }
};
</script>

<style scoped>

</style>
