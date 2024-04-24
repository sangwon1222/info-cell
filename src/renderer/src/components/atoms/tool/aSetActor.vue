<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import jsonApi from '@/util/jsonApi'
import { useToast } from 'vue-toastification'
const emit = defineEmits(['upload-actor'])
const toast = useToast()

const uploadRsc = async (e) => {
  const target = e.target as HTMLInputElement
  if (target.files.length !== 1) return
  try {
    e.stopPropagation()
    e.preventDefault()
    useLayoutStore.isLoading = true
    useLayoutStore.loadingText = '이미지 업로드'

    const { path, name } = target.files[0]
    const { ok, data, rscName } = await jsonApi.uploadRsc({ path, name })
    if (ok) emit('upload-actor', { src: data, name: rscName })
    else toast.error('리소스 업로드 실패')
  } catch (e) {
    console.log(e)
  } finally {
    if (useLayoutStore.loadingText == '이미지 업로드') useLayoutStore.isLoading = false
  }
}
</script>

<!-- 부모 컴포넌트 => components/template/tool/tEditTool.vue -->
<template>
  <div class="flex items-center gap-2 text-black border">
    <label for="rscfile">캐릭터 추가: </label>
    <input
      id="file"
      type="file"
      class="border-2 border-black cursor-pointer"
      name="rscFile"
      accept="image/png"
      @change="uploadRsc"
    />
  </div>
</template>
