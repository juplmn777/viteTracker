<template>
  <h3>Vite Tracker</h3>
  <el-menu>
    <el-menu-item index="1">
      <el-icon>
        <timer />
      </el-icon>
      <span>Tracker</span>
    </el-menu-item>
    <el-menu-item index="2" disabled>
      <el-icon>
        <folder-opened />
      </el-icon>
      <span>Catégories</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <setting />
      </el-icon>
      <span>Paramètres</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { Timer, FolderOpened, Setting } from '@element-plus/icons';

export default {
  components: {
    Timer,
    FolderOpened,
    Setting,
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  text-align: left;
  background: #ff5353;
  border: none;

  li {
    color: #fff;
    font-weight: 600;
    transition: 0.5s ease;

    &:hover {
      color: #333;
    }
  }
}
</style>
