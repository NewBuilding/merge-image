<style lang="less" scoped>
.merge-image {
  // width: 900px;
  height: 700px;
  display: flex;
  &_edit-panel {
    flex: 1;
    height: 100%;
  }
}
</style>
<template>
  <div class="merge-image">
    <ImageList :files="files" @onItemClick="onItemClick" />
    <EditPanel class="merge-image_edit-panel" v-model="images" />
    <ControlPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ImageList from './ImageList.vue'
import EditPanel from './EditPanel/index.vue'
import ControlPanel from './ControlPanel/index.vue'
// import { mergeImage } from '../merger/index'

export default defineComponent({
  name: 'merge-image',
  props: {},
  components: {
    ImageList,
    EditPanel,
    ControlPanel,
  },
  setup(props) {
    const files = ref<Array<File>>([])
    const images = ref<Array<IImageInfo>>([])
    const onItemClick = (image: IItem) => {
      images.value.push({ url: image.url, top: 0, left: 0 })
    }
    return {
      files,
      onItemClick,
      images,
    }
  },
})
</script>
