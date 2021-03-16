<template>
  <div>
    首页
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="checked1" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'home',
  setup() {
    return {
      checked1: ref(false),
    }
  },
})
</script>

<style scoped lang="less">
</style>