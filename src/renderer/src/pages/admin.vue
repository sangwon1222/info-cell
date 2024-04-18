<script setup lang="ts" scoped>
import tEditScene from '@/components/template/tEditScene.vue'
import tLookUp from '@/components/template/tLookUp.vue'
import { reactive } from 'vue'
const state = reactive({
  page: 'edit'
})
</script>

<template>
  <div class="relative flex flex-col gap-[10px] w-full">
    <div class="flex items-center gap-4 py-2">
      <button class="px-4 text-gray-200 bg-gray-500 rounded" @click="state.page = 'edit'">
        편집
      </button>
      <button class="px-4 text-gray-200 bg-gray-500 rounded" @click="state.page = 'lookUp'">
        조회
      </button>
    </div>
    <div>
      <tEditScene v-if="state.page == 'edit'" />
      <tLookUp v-if="state.page == 'lookUp'" />
    </div>
  </div>
</template>
