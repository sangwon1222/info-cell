<script setup lang="ts" scoped>
import aActor from '@/components/atoms/screen/aActor.vue'
import aBg from '@/components/atoms/screen/aBg.vue'
import aChat from '@/components/atoms/screen/aChat.vue'
const props = withDefaults(
  defineProps<{
    rscList: {
      name: string
      src: string
      x: number
      y: number
    }[]
    placeData: any
    actor: string
    chat: string
  }>(),
  {
    placeData: { name: '', src: '', x: 0, y: 0 },
    actor: '',
    chat: '',
    rscList: () => [{ name: '', src: '', x: 0, y: 0 }]
  }
)
</script>

<!-- 부모 컴포넌트 => page/admin.vue -->
<template>
  <div
    class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
  >
    <a-bg :bg-data="props.placeData" />
    <a-actor
      v-for="(v, i) in props.rscList"
      :key="`${i}-${v.name}`"
      :index="i"
      :name="v.name"
      :x="v.x"
      :y="v.y"
      :src="v.src"
    />

    <a-chat :actor="props.actor" :chat="props.chat" />
  </div>
</template>
