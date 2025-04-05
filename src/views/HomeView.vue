<template>
  <div>
    <PotreeViewer ref="potreeViewer" />
    <RosConnection @connected="handleRosConnected" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PotreeViewer from '../components/PotreeViewer.vue'
import RosConnection from '../components/RosConnection.vue'

const potreeViewer = ref(null)
const handleRosConnected = () => {
  console.log('ROS connected!')
}
</script>
