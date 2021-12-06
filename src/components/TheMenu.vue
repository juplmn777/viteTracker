<template>
  <el-menu
    :router="true"
    :default-active="
      ($route.matched[0] && $route.matched[0].path == '/') ||
      $route.path == '/home'
        ? '/'
        : $route.path
    "
  >
    <h3>Vite Tracker</h3>

    <el-menu-item index="/">
      <el-icon>
        <timer />
      </el-icon>
      <span>Tracker</span>
    </el-menu-item>

    <el-sub-menu index="/settings">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>Paramètres</span>
      </template>
      <el-menu-item index="/settings/app">Application</el-menu-item>
      <el-menu-item index="/settings/user">Utilisateur</el-menu-item>
    </el-sub-menu>
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
  text-align: center;
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

  .el-sub-menu {
    background: #ff5353;

    .el-icon {
      color: #fff;
    }

    span {
      color: #fff;
    }

    .el-menu-item {
      background: #ff5353;
      text-transform: lowercase;
    }
  }
}
</style>
