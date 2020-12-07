<style lang="less" scoped>
.image-element {
  position: absolute;
  box-sizing: border-box;
  display: inline-block;
  &-selected {
    border: 2px solid #6ccfff;
  }
  img {
    user-select: none;
    cursor: pointer;
    width: 100%;
  }
}
</style>
<template>
  <div
    :class="{
      'image-element': true,
      'image-element-selected': selected,
    }"
    :style="posStyle"
    @click.stop="onClick"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
    @mousemove="onMousemove"
  >
    <img :src="url" alt="" draggable="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType, ref } from 'vue'

const pointFromEvent = (e: MouseEvent) => {
  const canvas = document.querySelector('.edit-panel-canvas')
  const box = canvas?.getBoundingClientRect() || { left: 0, top: 0 }
  return {
    left: e.clientX - box.left,
    top: e.clientY - box.top,
  }
}

export default defineComponent({
  props: {
    selected: Boolean,
    url: String,
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    image: Object as PropType<IImageInfo>,
  },
  setup(props, context) {
    const { top, left, width = 200 } = props

    const posStyle = computed(() => ({
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
    }))
    const isDraging = ref<boolean>(false)

    const onClick = () => {
      context.emit('onSelect')
    }
    const onMousedown = (e: MouseEvent) => {
      if (!props.selected) return
      isDraging.value = true
      e.stopPropagation()
    }
    const onMousemove = (e: MouseEvent) => {
      if (!isDraging.value) return
      console.log('onMousemove', e)
      const point = pointFromEvent(e)
      props.image.left = point.left
      props.image.top = point.top
    }
    const onMouseup = (e: MouseEvent) => {
      isDraging.value = false
    }
    return {
      ...toRefs({
        posStyle,
      }),
      onClick,
      onMousedown,
      onMouseup,
      onMousemove,
    }
  },
})
</script>
