<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import dbManager from '@/util/dbManager'
import tLoading from '@template/tLoading.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useSceneStore } from './store/scene'
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  useLayoutStore.isLoading = true
  const { ok, data } = await dbManager.getScene('#1')
  if (ok) {
    useSceneStore.scene = JSON.parse(data)
    console.log(useSceneStore.scene)
  } else {
    useSceneStore.scene = []
    toast.error('씬 데이터가 없습니다.')
  }
  useLayoutStore.isLoading = false
})
</script>

<template>
  <div class="relative bg-[#485572] min-w-[320px]">
    <t-loading v-if="useLayoutStore.isLoading" />
    <div class="bg-gray-100 h-[20px] fixed top-0 left-0 w-full z-20 flex text-xs">
      <button
        class="px-2 border"
        :class="
          router.currentRoute.value.path == '/' || router.currentRoute.value.path == '/home'
            ? 'bg-red-200'
            : ''
        "
        @click="router.push('/')"
      >
        HOME
      </button>
      <button
        class="px-2 border"
        :class="router.currentRoute.value.path == '/admin' ? 'bg-red-200' : ''"
        @click="router.push('/admin')"
      >
        ADMIN
      </button>
    </div>
    <div class="relative overflow-hidden flex w-full h-screen bg-[#485572] z-10 pt-[20px]">
      <div class="w-full h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>
