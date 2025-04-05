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

    initScene() {
        // 点云添加监听
        this.viewer.scene.addEventListener("pointcloud_added", (e: any) => {
            const pointcloud = e.pointcloud
            console.log('PointCloud added:', pointcloud)

            pointcloud.addEventListener("visibility_changed", () => {
                console.log(`PointCloud ${pointcloud.name} visibility:`, pointcloud.visible)
            })
        })

        // 测量工具监听
        this.viewer.scene.addEventListener("measurement_added", (e: any) => {
            console.log('Measurement added:', e.measurement)
        })

        // 初始化现有对象
        this.viewer.scene.pointclouds.forEach((pc: any) => {
            this.viewer.scene.dispatchEvent({ type: "pointcloud_added", pointcloud: pc })
        })
    }

    init() {
        this.initScene()
        this.viewer.loadGUI(() => {
            this.viewer.toggleSidebar()
        })
    }
}