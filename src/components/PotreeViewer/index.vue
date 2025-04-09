<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePointCloudStore } from '@/stores/pointCloudStore'

const Potree = window.Potree
const THREE = window.THREE

const props = defineProps({
  areaId: {
    type: String,
    default: 'default'
  }
})

const viewerContainer = ref(null)
const viewer = ref(null)
const sidebar = ref(null)
const pointCloudStore = usePointCloudStore()

// 初始化查看器
const initViewer = () => {
  if (!Potree || viewer.value) return

  viewer.value = new Potree.Viewer(viewerContainer.value, {
    noDragAndDrop: true
  })

  // 基本配置
  viewer.value.setClipTask(Potree.ClipTask.SHOW_INSIDE)
  viewer.value.setEDLEnabled(false)
  viewer.value.setFOV(60)
  viewer.value.setPointBudget(50 * 1000 * 1000)
  viewer.value.setBackground('black')
  viewer.value.setDescription('')
  viewer.value.setMinNodeSize(0)
  viewer.value.setControls(viewer.value.earthControls)

  // 初始化侧边栏
  sidebar.value = new Sidebar(viewer.value)
  sidebar.value.init()

  console.log('Potree viewer initialized')
}

// 加载点云
const loadPointCloud = async (path) => {
  if (!viewer.value) return

  try {
    const result = await Potree.loadPointCloud(
        path,
        path.split('/').pop().split('.')[0]
    )

    const pointcloud = result.pointcloud
    const material = pointcloud.material

    // 检查颜色属性
    const hasRGBA = pointcloud.getAttributes().attributes.find(a => a.name === 'rgba') !== undefined
    material.activeAttributeName = hasRGBA ? 'rgba' : 'color'

    // 设置材质
    material.size = 1
    material.minSize = 1
    material.maxSize = 16
    material.pointSizeType = Potree.PointSizeType.FIXED
    material.gradient = Potree.Gradients.TURBO

    // 添加到场景
    viewer.value.scene.addPointCloud(pointcloud)
    viewer.value.fitToScreen()

    return pointcloud
  } catch (error) {
    console.error('Failed to load point cloud:', error)
    return null
  }
}

// 监听当前点云变化
watch(() => pointCloudStore.currentPointCloud, async (newVal) => {
  if (newVal && viewer.value) {
    await loadPointCloud(newVal.url)
  }
})

onMounted(() => {
  initViewer()

  // 初始加载点云
  if (pointCloudStore.currentPointCloud) {
    loadPointCloud(pointCloudStore.currentPointCloud.url)
  }
})

onUnmounted(() => {
  if (viewer.value) {
    viewer.value.dispose()
  }
})
</script>

<template>
  <div
      ref="viewerContainer"
      class="potree-viewer"
      :id="`potree_render_area${areaId}`"
  ></div>
</template>

<style scoped>
.potree-viewer {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>