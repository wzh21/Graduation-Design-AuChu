import { ref } from 'vue'

export class Sidebar {
    viewer: any
    measuringTool: any
    profileTool: any
    volumeTool: any

    constructor(viewer: any) {
        this.viewer = viewer
        this.measuringTool = viewer.measuringTool
        this.profileTool = viewer.profileTool
        this.volumeTool = viewer.volumeTool
    }

    init() {
        this.initScene()
        this.initTools()
    }

    initScene() {
        // 点云添加事件
        this.viewer.scene.addEventListener("pointcloud_added", (e: any) => {
            const pointcloud = e.pointcloud
            console.log('Point cloud added:', pointcloud)

            pointcloud.addEventListener("visibility_changed", () => {
                console.log(`Point cloud visibility changed: ${pointcloud.visible}`)
            })
        })

        // 测量工具事件
        this.viewer.scene.addEventListener("measurement_added", (e: any) => {
            console.log('Measurement added:', e.measurement)
        })

        // 剖面工具事件
        this.viewer.scene.addEventListener("profile_added", (e: any) => {
            console.log('Profile added:', e.profile)
        })

        // 体积工具事件
        this.viewer.scene.addEventListener("volume_added", (e: any) => {
            console.log('Volume added:', e.volume)
        })
    }

    initTools() {
        // 初始化测量工具
        this.measuringTool.addEventListener("measurement_added", (e: any) => {
            const measurement = e.measurement
            measurement.addEventListener("marker_added", (e: any) => {
                console.log('Marker added:', e.marker)
            })
        })

        // 初始化剖面工具
        this.profileTool.addEventListener("profile_added", (e: any) => {
            console.log('New profile created:', e.profile)
        })

        // 初始化体积工具
        this.volumeTool.addEventListener("volume_added", (e: any) => {
            console.log('New volume created:', e.volume)
        })
    }
}