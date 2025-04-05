# Graduation-Design-AuChu

基于 **Vue3 + Potree + ROS** 的点云可视化与处理系统实现浏览器端的高效点云渲染、ROS 实时数据传输及交互操作

---

## 项目结构说明

| 路径                     | 功能说明                                                     |
| ------------------------ | ------------------------------------------------------------ |
| public/                  | 静态资源目录（直接复制到构建输出目录，不会被 Webpack 处理）  |
| ├── index.html           | 主 HTML 文件，引入 Potree/Three.js 的 CDN 并挂载 Vue 应用    |
| └── pointclouds/         | 存放点云文件（.las/.ply），示例文件 example.las 可用于测试   |
| src/                     | 核心代码目录                                                 |
| ├── assets/              | 静态资源（CSS/图片/字体等）                                  |
| ├── components/          | Vue 组件                                                     |
| │ ├── PotreeViewer.vue   | Potree 点云渲染容器，负责加载和显示点云                      |
| │ ├── RosConnection.vue  | ROS 连接管理组件，处理与 rosbridge 的 WebSocket 通信         |
| │ └── Toolbar.vue        | 操作工具栏（如点云滤波、测量、视角控制）                     |
| ├── composables/         | Vue3 组合式 API 逻辑复用                                     |
| │ ├── usePotree.js       | 封装 Potree 初始化、点云加载方法                             |
| │ └── useRos.js          | 封装 ROS 连接、Topic 订阅/发布逻辑                           |
| ├── stores/              | Pinia 状态管理                                               |
| │ └── pointCloudStore.js | 全局状态：存储点云列表、当前激活的点云、滤镜参数等           |
| ├── utils/               | 工具函数                                                     |
| │ ├── pointCloudUtils.js | 点云数据处理（降采样、法向量计算、格式转换）                 |
| │ └── rosUtils.js        | ROS 消息解析（如 sensor_msgs/PointCloud2 → Potree 可识别的格式） |
| ├── views/               | 页面级组件                                                   |
| │ └── HomeView.vue       | 主页面，整合 Potree 渲染器、ROS 连接和工具栏                 |
| ├── App.vue              | 根组件，定义全局布局                                         |
| └── main.js              | 应用入口，初始化 Vue/Pinia/ROS                               |
| .env                     | 环境变量（如 VITE_ROS_WS_URL=ws://localhost:9090）           |
| vite.config.js           | Vite 构建配置（优化 Three.js/Potree 依赖）                   |

---

## 快速开始

### 1. 安装依赖


```bash
npm install
```

### 2. 配置 ROS

确保已启动 `rosbridge_suite`：


```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```

### 3. 启动开发服务器


```bash
npm run dev
```

访问 `http://localhost:5173`

---

## 关键配置说明

### Potree 引入方式

在 `public/index.html` 中通过 CDN 引入（确保在 Vue 挂载前加载）：


```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. 引入 Potree CSS/JS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/potree@1.7/build/potree/potree.css">
  <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/potree@1.7/build/potree/potree.js"></script>
</head>
<body>
  <!-- 2. Vue 挂载点 -->
  <div id="app"></div>
  <!-- 3. 确保 Vue 在 Potree 之后加载 -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### ROS 消息解析

在 `src/utils/rosUtils.js` 中实现点云消息转换：


```javascript
export function decodePointCloud2(rosMsg) {
  // 解析 sensor_msgs/PointCloud2 消息为 Potree 可用的点数组
  const points = [];
  // ... 解析逻辑（需调用 roslibjs 的 API）
  return points; // 格式: [x1,y1,z1, x2,y2,z2, ...]
}
```

---

## 功能扩展指南

### 添加新点云处理算法

1.     在 `src/utils/pointCloudUtils.js` 中添加函数（如点云滤波）：


        ```javascript
        export function voxelGridDownsample(points, voxelSize) {
          // 实现体素网格降采样
        }
        ```

2.     在组件中调用：


        ```javascript
        import { voxelGridDownsample } from '@/utils/pointCloudUtils';
        const downsampled = voxelGridDownsample(rawPoints, 0.1);
        ```

### 自定义交互工具

在 `Toolbar.vue` 中添加按钮并调用 Potree API：


```vue
<template>
  <button @click="measureDistance">测量距离</button>
</template>

<script setup>
const measureDistance = () => {
  const viewer = window.viewer; // 全局 Potree 实例
  viewer.toggleMeasurementTool();
};
</script>
```

---

## 常见问题

**Q1: Potree 加载点云时报错 "Unsupported format"**
✅ 解决方案：

-     确保点云文件为 `.las`/`.laz`/`.ply` 格式
-     使用 CloudCompare 转换格式（如 `.pcd` → `.ply`）

**Q2: ROS 连接失败**
✅ 检查步骤：

1.     确认 `rosbridge` 已启动：`rosnode list | grep rosbridge`
2.     检查 `.env` 中的 `VITE_ROS_WS_URL` 是否匹配实际地址
3.     关闭防火墙或代理测试

---

## 依赖清单

| 包名         | 用途                  |
| ------------ | --------------------- |
| vue@3        | 前端框架              |
| pinia        | 状态管理              |
| roslib       | ROS 浏览器端通信      |
| three        | Potree 依赖的 3D 引擎 |
| potree (CDN) | 点云渲染库            |