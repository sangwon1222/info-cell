<script setup lang="ts" scoped>
import aActor from '@/components/atoms/screen/aActor.vue'
import aBg from '@/components/atoms/screen/aBg.vue'
import aChat from '@/components/atoms/screen/aChat.vue'
interface TypeProps {
  actor: string
  chat: string
}

defineEmits(['next'])
const props = withDefaults(defineProps<TypeProps>(), {
  actor: '',
  chat: ''
})
</script>

<!-- 부모 컴포넌트 => page/admin.vue -->
<template>
  <div
    class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
  >
    <a-bg />
    <a-actor
      v-for="(v, i) in props.rscList"
      :key="`${i}-${v.name}`"
      :index="i"
      :name="v.name"
      :x="v.x"
      :y="v.y"
      :src="v.src"
    />

    <a-chat :actor="props.actor" :chat="props.chat" @next="$emit('next')" />
  </div>
</template>
