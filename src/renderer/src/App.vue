<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import { useRscDataStore } from '@/store/rscData'
import tLoading from '@template/tLoading.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getInventory, getItemList } from './util'
import jsonApi from './util/jsonApi'
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  useLayoutStore.isLoading = true
  window.openDevTool.openDevTools()
  await jsonApi.connect()

  await getItemList()
  await getInventory()
  const { itemList, inventory } = useRscDataStore
  console.log({ itemList, inventory })

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
      <div class="w-full h-full min-w-[1280px]">
        <router-view />
      </div>
    </div>
  </div>
</template>
./util
