<script setup lang="ts" scoped>
const props = withDefaults(defineProps<{ data: any[] }>(), {
  data: () => [
    {
      label: '',
      isShow: true,
      isComplete: false,
      place: '',
      placeName: '',
      script: () => [],
      condition: false,
      next: false
    }
  ]
})

const emit = defineEmits(['add', 'close', 'save'])
</script>

<template>
  <div
    id="move-editor"
    class="fixed top-0 left-0 flex flex-col gap-10 items-center justify-center border border-red-400 w-[1280px] h-[720px] bg-black bg-opacity-40 pointer-events-none"
  >
    <div v-for="(v, i) in props.data" :key="i" class="flex gap-10">
      <div class="bg-white p-2 rounded pointer-events-auto">
        <input :id="`${i}-place-${v.placeName}`" type="text" :value="v.placeName" />
      </div>
    </div>

    <div class="flex gap-4">
      <!-- <button class="bg-white p-2 rounded pointer-events-auto" @click="$emit('save')">저장</button> -->
      <!-- <button class="bg-white p-2 rounded pointer-events-auto" @click="$emit('add')">추가</button> -->
      <button class="bg-white p-2 rounded pointer-events-auto" @click="$emit('close')">취소</button>
    </div>
  </div>
</template>
