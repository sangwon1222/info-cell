<script setup lang="ts" scoped>
import { useDataStore } from '@/store/data'
import { useLayoutStore } from '@/store/loading'
import tLoading from '@template/tLoading.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { updateActorList, updateInventory, updateItemList, updateRscList } from './util/common'
import jsonApi from './util/jsonApi'
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  useLayoutStore.isLoading = true
  window.openDevTool.openDevTools()
  await jsonApi.connect()

  await updateActorList()
  await updateItemList()
  await updateRscList()
  await updateInventory()

  const rscData = await jsonApi.getRscList()
  if (rscData.ok) useDataStore.rscList = rscData.data
  const inventoryData = await jsonApi.getInventoryData()
  if (inventoryData.ok) useDataStore.inventory = inventoryData.data

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
