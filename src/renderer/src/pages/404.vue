<script setup lang="ts" scoped>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => router.push('/')
</script>

<template>
  <div class="relative flex flex-col gap-[10px] w-full">
    <div class="flex flex-col items-center gap-[10px] py-[10px]">
      <p>없는 페이지 이거나 준비중인 페이지 입니다.</p>
      <button class="border-2 p-[20px] rounded-xl" @click="goHome">Go Home</button>
    </div>
  </div>
</template>
