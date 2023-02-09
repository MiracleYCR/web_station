<template>
  <div class="editor-container" id="editor-box"></div>
</template>

<script setup>
import Eidtor from 'wangeditor'
import { onMounted, nextTick, defineProps, watch, defineExpose } from 'vue'

const props = defineProps({
  content: {
    type: String
  }
})

let editor
let editorDom
const initEditor = () => {
  editor = new Eidtor(editorDom)
  editor.config.zIndex = 1
  editor.config.height = editorDom.clientHeight - 42
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.create()
}

onMounted(() => {
  nextTick(() => {
    editorDom = document.querySelector('#editor-box')
    initEditor()
  })
})

watch(
  () => props.content,
  (val) => {
    if (val) {
      editor.txt.html(val)
    }
  },
  {
    immediate: true
  }
)

defineExpose({
  getContent: () => {
    return editor.txt.html()
  }
})
</script>

<style lang="scss" scoped>
.editor-container {
  height: 100%;
}
</style>
