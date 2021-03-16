<template>
  <div :class="['iconfont', name.startsWith('icon') ? name : `icon${name}`]" :style="{ color, fontSize: size + 'px' }"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    size: {
      type: [ String, Number ],
      default: 12
    }
  },
}
</script>

<style lang="less" scoped>
</style>