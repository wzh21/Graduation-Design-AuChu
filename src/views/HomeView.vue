<script setup>
import PotreeViewer from '@/components/PotreeViewer/index.vue'
import Toolbar from '@/components/Toolbar.vue'
import { usePointCloudStore } from '@/stores/pointCloudStore'

const pointCloudStore = usePointCloudStore()
</script>

<template>
  <div class="home-view">
    <PotreeViewer />
    <Toolbar />
  </div>
</template>

<style scoped>
.home-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>