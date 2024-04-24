<script setup lang="ts" scoped>
const props = withDefaults(defineProps<{ actor: string; chat: string }>(), { actor: '', chat: '' })
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <div class="absolute bottom-0 w-full h-[200px] text-white flex flex-col text-xl">
    <!-- <p class="z-10 h-10">{{ props.actor ? `${props.actor}:` : '' }}</p> -->
    <!-- <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" /> -->
    <input class="z-10 h-10 !bg-none" type="text" :input="props.actor" />
    <textarea class="z-10 flex-1 px-10 bg-none" type="text" :value="chat">
<span class="ml-2 animate-pulse">_</span></textarea
    >
  </div>
</template>
