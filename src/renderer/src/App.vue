<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import dbManager from '@/util/dbManager'
import tLoading from '@template/tLoading.vue'
import { map } from 'lodash-es'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useSceneStore } from './store/scene'
const router = useRouter()
const toast = useToast()
onMounted(async () => {
  useLayoutStore.isLoading = true
  await dbManager.connectDB()

  const { ok, data } = await dbManager.getData()
  if (ok) {
    useSceneStore.scene = map(data, (e) => {
      e.contents = JSON.parse(e.contents)
      return e
    })
    console.log(useSceneStore.scene)
  } else toast.error('DB 조회 실패')
  useLayoutStore.isLoading = false
})
</script>

<template>
  <div class="relative bg-[#485572] min-w-[320px]">
    <t-loading v-if="useLayoutStore.isLoading" />
    <div class="bg-gray-100 h-[20px] fixed top-0 left-0 w-full z-20 flex text-xs">
      <button class="px-2 border hover:bg-black hover:text-white" @click="router.push('/')">
        HOME
      </button>
      <button class="px-2 border hover:bg-black hover:text-white" @click="router.push('/admin')">
        ADMIN
      </button>
    </div>
    <div class="relative overflow-hidden flex w-full min-h-screen bg-[#485572] z-10 pt-[20px]">
      <div class="w-full h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>
