<style lang="less" scoped>
.image-list {
  width: 240px;
  border-left: 1px solid #eef2f8;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.02);
  position: relative;
  display: flex;
  flex-direction: column;
  &-header {
    height: 64px;
    &-btn {
      border: none;
      border-radius: 2px;
      background: #ebf3ff;
      font-size: 14px;
      color: #2254f4;
      height: 36px;
      width: 68px;
      position: absolute;
      left: 16px;
      top: 16px;
      cursor: pointer;
      outline: none;
    }
  }
  &-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    &-scroll {
      padding: 0 24px;
    }
    &-item {
      width: 100%;
      position: relative;
      &:hover&::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.1;
      }
    }
    img {
      width: 100%;
      cursor: pointer;
    }
  }

  .display-none {
    display: none;
  }
}
</style>
<template>
  <div class="image-list">
    <div class="image-list-header">
      <button @click="onClick" class="image-list-header-btn">上传</button>
    </div>
    <div class="image-list-list">
      <div class="image-list-list-scroll">
        <template v-for="(image, index) in images" :key="index">
          <div class="image-list-list-item" @click="onItemClick(image)">
            <img :src="image.url" alt="" />
          </div>
        </template>
      </div>
    </div>
    <input
      class="display-none"
      ref="inputRef"
      type="file"
      multiple
      accept="image/*"
      @change="onInputChange"
    />
  </div>
</template>

<script lang="ts">
import mPromise from 'bluebird'
import { defineComponent, PropType, ref } from 'vue'
import { readFile } from '../utils/read-file'

export default defineComponent({
  props: {
    files: {
      type: Array as PropType<File[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    const files = ref<Array<File>>([])
    const images = ref<IItem[]>([])
    const inputRef = ref<HTMLInputElement | null>(null)
    const onClick = () => {
      inputRef.value?.click()
    }
    const onInputChange = async (e: any) => {
      files.value =
        (e.dataTransfer && e.dataTransfer.files) || e.srcElement.files
      images.value = await mPromise.mapSeries(files.value, (file, index) =>
        readFile(file, 'readAsDataURL').then((content) => ({
          id: new Date().getMilliseconds() + index,
          file,
          url: content,
        }))
      )
    }

    const onItemClick = (image: IItem) => {
      context.emit('onItemClick', image)
    }
    return {
      files,
      images,
      inputRef,
      onInputChange,
      onClick,
      onItemClick,
    }
  },
})
</script>
