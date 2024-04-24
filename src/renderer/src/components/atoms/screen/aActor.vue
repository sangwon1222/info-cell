<script setup lang="ts" scoped>
import { reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{ index: number; name: string; x: number; y: number; src: string }>(),
  {
    index: -1,
    name: '',
    x: 0,
    y: 0,
    src: ''
  }
)

const refImg = ref(null)
const state = reactive({
  save: { index: -1, name: '', x: 0, y: 0, src: '' },
  drag: false
})
const onPointerDown = (e) => {
  e.stopPropagation()
  e.preventDefault()
  state.drag = true
}
const onPointerUp = (e) => {
  e.stopPropagation()
  e.preventDefault()
  state.drag = false
}

const onPointerMove = (e) => {
  e.stopPropagation()
  e.preventDefault()
  const { width, height } = refImg.value
  refImg.value.style.top = `${e.y - height / 2}px`
  refImg.value.style.left = `${e.x - width / 2}px`
}
</script>

<template>
  <img
    v-if="props.index > -1"
    :id="`${props.index}-${name}`"
    ref="refImg"
    :src="props.src"
    :alt="`${props.index}-${name}-img`"
    class="absolute top-0 left-0 h-fit w-fit"
    @pointerdown="onPointerDown($event)"
    @pointerup="onPointerUp($event)"
    @pointerleave="onPointerUp($event)"
    @pointermove="state.drag ? onPointerMove($event) : null"
  />
</template>
