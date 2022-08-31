<template>
  <div id="app">
    <h1>彪哥教育</h1>
    <!-- 根路由出口 -->
    <p class="text">Hello world</p>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
// @import '~@/styles/variables.scss';
.text {
  color: $warning-color;
}
</style>
