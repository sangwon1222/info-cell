<script setup lang="ts" scoped>
import aSelectScene from '@/components/atoms/tool/aSelectScene.vue'
import aSetActor from '@/components/atoms/tool/aSetActor.vue'
import aSetBg from '@/components/atoms/tool/aSetBg.vue'
import { uploadActor, uploadBg } from '@/util/common'

const emit = defineEmits(['upload-bg', 'upload-actor', 'select-scene'])
</script>

<!-- 부모 컴포넌트 => page/admin.vue -->
<template>
  <div class="relative flex flex-col w-full">
    <!-- 편집 툴 -->
    <div class="flex gap-2">
      <a-set-bg @upload-bg="uploadBg" />
      <a-set-actor @upload-actor="uploadActor" />
    </div>
    <a-select-scene />
  </div>
</template>
