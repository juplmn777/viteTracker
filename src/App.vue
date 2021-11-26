<template>
  <el-container class="mainContainer">
    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      <el-header height="60px">
        <TheTopTask ref="TheTopTask" @newTask="addTask($event)" />
      </el-header>

      <el-main>
        <TaskList
          :tasks="tasks"
          :areTasksLoading="areTasksLoading"
          v-on="{
            restart: sendRestartTask,
            delete: deleteTask,
          }"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { v4 as uuid } from '@lukeed/uuid';
import * as TaskService from './services/TaskService';

import TheMenu from './components/TheMenu.vue';
import TheTopTask from './components/TheTopTask.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TheMenu,
    TheTopTask,
    TaskList,
  },
  data() {
    return {
      tasks: [],
      areTasksLoading: true,
    };
  },
  watch: {
    tasks: {
      deep: true,
      async handler(newVal, oldVal) {
        if (newVal !== null && oldVal !== null) {
          try {
            await TaskService.updateAll(this.tasks);
          } catch (e) {
            console.error(e);
            this.$notify({
              title: 'Mode offline',
              message: 'Sunchronisation des tâches impossible...',
              type: 'error',
              offset: 50,
              duration: 2000,
            });
          }
        }
      },
    },
  },
  methods: {
    async addTask({ name, startTime }) {
      // Ajout de la tâche en local
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now(),
      });

      // MAJ des tâches sur l'API
      try {
        await TaskService.updateAll(this.tasks);
      } catch (e) {
        console.error(e);
      }
    },
    sendRestartTask(taskID) {
      // Récupération du nom de l'ancienne tâche
      let newTaskname = null;
      this.tasks.forEach((task) => {
        if (task.id === taskID) {
          newTaskname = task.name;
        }
      });

      //Relance de la tâche
      this.$refs.TheTopTask.restartTask(newTaskname);
    },
    async deleteTask(taskID) {
      // Récupération index de la tâche
      let taskIndex = null;
      this.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index;
        }
      });

      // Suppression tâche en local
      this.tasks.splice(taskIndex, 1);

      // MAJ des tâches sur l'API
      try {
        await TaskService.updateAll(this.tasks);
      } catch (e) {
        console.error(e);
      }
    },
  },
  async created() {
    // Récupération de toutes les tâches
    try {
      this.tasks = await TaskService.getAll();
    } catch (e) {
      console.error(e);
      this.tasks = [];
      this.$notify({
        title: 'Mode offline',
        message: 'Récupération des tçaches impossible',
        type: 'error',
        offset: 50,
        duration: 2000,
      });
    }
    this.areTasksLoading = false;
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mainContainer {
  height: 100%;
}

.el-aside {
  height: 100%;
  color: #fff;
  border-right: solid 1px #ff5353;
  background: #ff5353;
  text-transform: uppercase;
}

.el-header {
  padding: 0 !important;
  border-bottom: solid 1px #333;
  background: #333;
  line-height: 60px;
  .el-input .el-input__inner {
    border: none !important;
  }
}
</style>
