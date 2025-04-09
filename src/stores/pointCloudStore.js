import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePointCloudStore = defineStore('pointCloud', () => {
    const pointClouds = ref([
        {
            id: 'lion_takanawa',
            name: 'Lion Takanawa',
            url: '/converted_pointclouds/metadata.json', // 指向转换后的metadata.json
            metadata: {}
        }
    ])

    const currentPointCloud = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    const setCurrentPointCloud = (id) => {
        const cloud = pointClouds.value.find(pc => pc.id === id)
        if (cloud) {
            currentPointCloud.value = cloud
        }
    }

    // 初始化设置默认点云
    if (pointClouds.value.length > 0 && !currentPointCloud.value) {
        currentPointCloud.value = pointClouds.value[0]
    }

    return {
        pointClouds,
        currentPointCloud,
        isLoading,
        error,
        setCurrentPointCloud
    }
})