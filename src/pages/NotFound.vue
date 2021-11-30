<template>
  <div class="container">
    <h1>Page introuvable</h1>
    <h2 v-if="$route.params.wrongPath">"{{ $route.params.wrongPath }}"</h2>
    <el-button @click="$router.back()" type="primary" round>
      Revenir en arrière
    </el-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2rem;
    color: #ff5353;
  }
}
</style>
