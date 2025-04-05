import { onMounted, ref } from 'vue'

export default function usePotree(containerRef) {
  const viewer = ref(null)

  onMounted(() => {
    viewer.value = new Potree.Viewer(containerRef.value)
    viewer.value.setEDLEnabled(true)
  })

  const loadPointCloud = (url) => {
    Potree.loadPointCloud(url, 'PointCloud', (e) => {
      viewer.value.scene.addPointCloud(e.pointcloud)
      viewer.value.fitToScreen()
    })
  }

  return { viewer, loadPointCloud }
}
