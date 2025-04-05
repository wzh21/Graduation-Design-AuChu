<template>
  <div class="potree-container">
    <div :id="`potree_render_area${areaIdIndex}`" ref="container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from './Sidebar'

// 全局引用
const Potree = window.Potree
const THREE = window.THREE

const props = defineProps({
  areaIdIndex: {
    type: String,
    default: ''
  }
})

const viewer = ref(null)
let sidebar = null

// 初始化Viewer
const initViewer = () => {
  viewer.value = new Potree.Viewer(
      document.getElementById(`potree_render_area${props.areaIdIndex}`),
      {
        noDragAndDrop: true,
        language: 'zh'
      }
  )

  const rawViewer = viewer.value
  rawViewer.setClipTask(Potree.ClipTask.SHOW_INSIDE)
  rawViewer.setEDLEnabled(false)
  rawViewer.setFOV(60)
  rawViewer.setPointBudget(50 * 1000 * 1000)
  rawViewer.setBackground('black')
  rawViewer.setDescription('')
  rawViewer.setMinNodeSize(0)
  rawViewer.setControls(rawViewer.earthControls)

  // 初始化侧边栏
  sidebar = new Sidebar(rawViewer)
  sidebar.init()

  console.log('Potree Viewer initialized')
}

// 加载点云
const loadPointCloud = (path) => {
  return new Promise((resolve) => {
    Potree.loadPointCloud(path).then((e) => {
      const pointcloud = e.pointcloud
      const material = pointcloud.material

      // 检查颜色属性
      const hasRGBA = pointcloud.getAttributes().attributes.some(a => a.name === 'rgba')
      material.activeAttributeName = hasRGBA ? 'rgba' : 'color'

      // 材质设置
      material.size = 1
      material.minSize = 1
      material.maxSize = 16
      material.pointSizeType = Potree.PointSizeType.FIXED
      material.gradient = Potree.Gradients.TURBO

      // 添加到场景
      viewer.value.scene.addPointCloud(pointcloud)
      viewer.value.zoomTo(pointcloud)

      // 加载元数据
      fetch(path)
          .then(res => res.json())
          .then(metadata => {
            pointcloud.name = metadata.name
            pointcloud.pointBudget = metadata.points
            viewer.value.scene.view.setView(
                new THREE.Vector3(6.44, -6.70, 5.52),
                new THREE.Vector3(-0.53, 0.55, -0.63)
            )
          })

      resolve(pointcloud)
    })
  })
}

onMounted(() => {
  initViewer()
})

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.dispose()
  }
})

defineExpose({ loadPointCloud })
</script>

<style scoped>
.potree-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>