<template>
  <div class="edit-panel">
    <div class="edit-panel-container">
      <div class="edit-panel-canvas">
        <template v-for="(image, index) in editImages" :key="index">
          <ImageElement
            :selected="currentImage === image"
            :image="image"
            @onChange="onChange()"
            @onSelect="onSelect(image)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import ImageElement from './ImageElement.vue'

export default defineComponent({
  name: 'EditPanel',
  components: {
    ImageElement,
  },
  props: {
    value: {
      type: Array as PropType<IImageInfo[]>,
    },
  },
  setup(props, context) {
    const currentImage = ref<IImageInfo | null>(null)
    const editImages = computed({
      get() {
        return props.value
      },
      set(value) {
        context.emit('input', value);
      }
    })

    const onSelect = (image: IImageInfo) => {
      currentImage.value = image
    }
    document.addEventListener('click', () => {
      currentImage.value = null
    })
    return {
      onSelect,
      currentImage,
      editImages
    }
  },
})
</script>

<style lang="less" scoped>
.edit-panel {
  background-color: #eef2f8;
  position: relative;
  overflow: auto;
  &-container {
    position: absolute;
    padding: 50px;
  }
  &-canvas {
    width: 500px;
    height: 500px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
    background-color: white;
    position: relative;
  }
}
</style>
