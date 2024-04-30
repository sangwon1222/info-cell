<script setup lang="ts" scoped>
import aInteractionBtn from '@/components/atoms/aInteractionBtn.vue'
import aBg from '@/components/atoms/screen/aBg.vue'
import aChat from '@/components/atoms/screen/aChat.vue'
import aImgList from '@/components/atoms/screen/aImgList.vue'
import { useSceneStore } from '@/store/scene'
import { next } from '@/util/common'
import { map } from 'lodash-es'
import { computed, reactive } from 'vue'

const state = reactive({
  imgPos: computed(() =>
    map(useSceneStore.gameScreen.actor, (e) => {
      if (e.x == 0 && e.y == 0) return { x: 1280 / 2, y: 720 / 2 }
      return {
        x: e.x,
        y: e.y
      }
    })
  )
})
const onClick = async () => {
  if (useSceneStore.editMode) return
  await next()
}
</script>

<template>
  <div
    class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
    :class="useSceneStore.editMode ? 'cursor-default' : 'cursor-pointer'"
    @click="onClick"
  >
    <a-interaction-btn
      :class="
        useSceneStore.editMode &&
        useSceneStore?.eventList[useSceneStore.eventIndex]?.type == 'interaction'
          ? ''
          : 'hidden'
      "
    />
    <a-bg />
    <a-img-list :img-pos="state.imgPos" />
    <a-chat />
  </div>
</template>
