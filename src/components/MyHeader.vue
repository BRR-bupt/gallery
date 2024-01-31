<script setup lang='ts'>

</script>

<template>
  <div id="my-header" class="z-10">
    <div style="cursor: default;">
      PHOTOGRAPHE
    </div>
    <div class="flex gap-6">
      <div>
        <router-link to="/">
          主页
        </router-link>
      </div>
      <div>
        <router-link to="/gallery">
          摄影集
        </router-link>
      </div>
      <div>
        <router-link to="/about">
          关于我
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#my-header {
  position: fixed;
  top: 20px;
  width: 100vw;
  /* border: 1px solid; */
  font-size: 24px;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
