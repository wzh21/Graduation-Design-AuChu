<script setup>
import { usePointCloudStore } from '@/stores/pointCloudStore'

const pointCloudStore = usePointCloudStore()
</script>

<template>
  <div class="toolbar">
    <div class="point-cloud-selector">
      <select
          v-model="pointCloudStore.currentPointCloud"
          @change="pointCloudStore.setCurrentPointCloud($event.target.value)"
      >
        <option
            v-for="cloud in pointCloudStore.pointClouds"
            :key="cloud.id"
            :value="cloud.id"
        >
          {{ cloud.name }}
        </option>
      </select>
    </div>

    <div class="toolbar-section">
      <button @click="viewer.toggleSidebar()">Toggle Sidebar</button>
      <button @click="viewer.setEDLEnabled(!viewer.getEDLEnabled())">
        Toggle EDL
      </button>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  gap: 15px;
}

.toolbar-section {
  display: flex;
  gap: 10px;
}

select, button {
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid #555;
  background: #333;
  color: white;
}

button {
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #444;
}
</style>