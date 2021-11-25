<template>
  <el-row>
    <el-col :xs="12" :span="15" :lg="18">
      <el-input
        @keyup.enter="toggleTask"
        placeholder="Entrez quelque chose"
        v-model="taskname"
      ></el-input>
    </el-col>
    <el-col :xs="12" :span="9" :lg="6" class="actions">
      <el-button
        v-if="!isTaskInProgress"
        @click="startTask"
        type="primary"
        circle
      >
        <el-icon>
          <video-play />
        </el-icon>
      </el-button>
      <el-button v-else @click="stopTask" type="danger" circle>
        <el-icon>
          <video-pause />
        </el-icon>
      </el-button>
      <span>{{ currentDuration }}</span>
    </el-col>
  </el-row>
</template>

<script>
import { VideoPlay, VideoPause } from '@element-plus/icons';
export default {
  components: {
    [VideoPlay.name]: VideoPlay,
    [VideoPause.name]: VideoPause,
  },
  data() {
    return {
      taskname: '',
      isTaskInProgress: false,
      startTime: null,
      nowTime: null,
      intervalEverySecond: null,
      errorMsg: null,
    };
  },
  computed: {
    currentDuration() {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime);
      } else {
        return '00:00:00';
      }
    },
  },
  watch: {
    isTaskInProgress(isInProgress) {
      if (isInProgress) {
        this.intervalEverySecond = setInterval(() => {
          this.nowTime = Date.now();
        }, 1000);
      } else {
        clearInterval(this.intervalEverySecond);
      }
    },
  },
  methods: {
    startTask() {
      //Vérification
      if (this.taskname.length === 0) {
        this.errorMsg = "⚠ Le nom d'une tâche ne peut être vide.";
        return;
      } else if (this.isTaskInProgress) {
        this.errorMsg = '⚠ Une tâche est déjà en cours !!';
        return;
      } else {
        this.errorMsg = null;
      }

      //Début de la tâche
      this.isTaskInProgress = true;
      this.startTime = Date.now();
      this.nowTime = Date.now();
    },
    stopTask() {
      //Vérification
      if (!this.isTaskInProgress) {
        this.errorMsg = "⚠ Aucune tâche n'est en cours...";
        return;
      }

      //Envoie de la nouvelle tâche
      this.$emit('newTask', {
        name: this.taskname,
        startTime: this.startTime,
      });

      //Fin de la tâche
      this.isTaskInProgress = false;
      this.errorMsg = null;
      this.nowTime = null;
      this.taskname = '';
    },
    toggleTask() {
      if (this.isTaskInProgress) {
        this.stopTask();
      } else {
        this.startTask();
      }
    },
    restartTask(newTaskname) {
      // verification tâche en cours et si oui arrêt de celle-ci
      if (this.isTaskInProgress) {
        this.stopTask();
      }

      //Lancement de la nouvelle tâche
      this.$nextTick(function () {
        this.taskname = newTaskname;
        this.startTask();
      });
    },
    durationBetweenTimestamps(start, end) {
      let seconds = Math.floor(end / 1000 - start / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      seconds %= 60;
      minutes %= 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
      )}:${String(seconds).padStart(2, '0')}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  padding-left: 20px;
  box-sizing: border-box;
}

.actions {
  text-align: right;
  padding-right: 20px;
  span {
    padding-left: 20px;
    color: #fff;
  }
}
</style>
