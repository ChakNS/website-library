<template>
  <div>
    首页
    <a-switch checked-children="开" un-checked-children="关" v-model:checked="checked1" />
    <iconfont name="home" color="#000" size="32" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Iconfont from '_c/iconfont'
export default defineComponent({
  name: 'home',
  components: {
    Iconfont
  },
  setup() {
    return {
      checked1: ref(false),
    }
  },
})
</script>

<style scoped lang="less">
</style>