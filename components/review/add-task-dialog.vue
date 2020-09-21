<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <div class="fb">
      <el-input style="width: 40%" placeholder="标识符" :value="identify"
                @input="val => $emit('update:identify', val)"></el-input>
      <el-input class="ml20" placeholder="名称" :value="title" @input="val => $emit('update:title', val)"></el-input>
    </div>
    <div class="mt20">
      <el-radio :value="type" @input="val => $emit('update:type', val)" label="contentTask">常规任务</el-radio>
      <el-radio :value="type" @input="val => $emit('update:type', val)" label="highlightTask">亮点表现</el-radio>
    </div>
    <div class="mt20">
      <el-input type="textarea" :value="taskDescription" @input="val => $emit('update:taskDescription', val)" placeholder="描述"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="$emit('update:addTaskDialogVisible', false)">取 消</el-button>
        <el-button :loading="loading" @click="handleAdd" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-task-dialog',
  props: {
    dialogVisible: {
      type: Boolean,
    },
    identify: {
      type: String,
    },
    title: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    type:{
      type: String,
      default: 'contentTask'
    },
    taskDescription: {
      type: String,
    }
  },
  methods: {
    handleAdd() {
      this.$emit('handle-add-task');
    },
  },
};
</script>

<style scoped>

</style>
