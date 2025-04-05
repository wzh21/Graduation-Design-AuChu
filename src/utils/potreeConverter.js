import { exec } from 'child_process'
import path from 'path'

/**
 * 使用PotreeConverter转换点云格式
 * @param {string} inputPath 输入文件路径(.las/.laz/.ply)
 * @param {string} outputDir 输出目录
 */
export const convertPointCloud = (inputPath, outputDir) => {
    return new Promise((resolve, reject) => {
        const converterPath = '/path/to/PotreeConverter' // 替换为实际路径
        const cmd = `${converterPath} ${inputPath} -o ${outputDir} --generate-page false`

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`转换失败: ${stderr}`)
                reject(error)
            } else {
                console.log(`转换成功: ${stdout}`)
                resolve(path.join(outputDir, 'metadata.json'))
            }
        })
    })
}

// 使用示例
// convertPointCloud('input.las', 'public/converted_pointclouds')