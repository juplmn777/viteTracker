<template>
  <el-button @click="sendCopyTaskname" type="info" circle>
    <el-icon>
      <document-copy />
    </el-icon>
  </el-button>
  <el-button @click="sendRestart" type="warning" circle>
    <el-icon>
      <refresh-right />
    </el-icon>
  </el-button>
  <el-button @click="sendDelete" type="danger" circle
    ><el-icon>
      <delete-filled />
    </el-icon>
  </el-button>
</template>

<script>
import { DocumentCopy, RefreshRight, DeleteFilled } from '@element-plus/icons';
export default {
  components: {
    DocumentCopy,
    RefreshRight,
    DeleteFilled,
  },
  props: {
    taskID: {
      type: String,
      required: true,
    },
  },
  emits: ['restart', 'delete', 'copyTaskname'],
  methods: {
    sendRestart() {
      this.$emit('restart', this.taskID);
    },
    sendDelete() {
      this.$emit('delete', this.taskID);
    },
    sendCopyTaskname() {
      this.$emit('copyTaskname');
    },
  },
};
</script>

<style lang="scss" scoped></style>
