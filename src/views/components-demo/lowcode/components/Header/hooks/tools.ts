import { localKey, initVisualData } from '@/utils/visual-editor/hooks/useVisualData'
import { reactive } from 'vue'

export const useTools = () => {
  const { jsonData, updatePage, currentPage, overrideProject } = initVisualData()

  const state = reactive({
    coverRadio: 'current',
    importJsonValue: ''
  })

  const importJsonChange = (value: any) => state.importJsonValue = value


  return [
    {
      title: '导入JSON',
      icon: 'Upload',
      onClick: () => {
        console.log('todo 导入JSON')
      }
    },
    {
      title: '导出JSON',
      icon: 'Download',
      onClick: () => {
        console.log('todo 导出JSON')
      }
    },
    {
      title: '预览',
      icon: 'Position',
      onClick: () => {
        console.log('todo,preview')
        console.log('data=>', JSON.stringify(jsonData))
      }
    }
  ]

}