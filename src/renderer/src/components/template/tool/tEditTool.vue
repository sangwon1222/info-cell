<script setup lang="ts" scoped>
import aSelectScene from '@/components/atoms/tool/aSelectScene.vue'
import aUploadRsc from '@/components/atoms/tool/aUploadRsc.vue'

const emit = defineEmits(['upload-bg', 'upload-actor', 'select-scene'])
</script>

<!-- 부모 컴포넌트 => page/admin.vue -->
<template>
  <div class="relative flex flex-col w-full">
    <!-- 편집 툴 -->
    <a-upload-rsc />
    <a-select-scene />
  </div>
</template>
