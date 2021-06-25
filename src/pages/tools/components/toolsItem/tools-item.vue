<template>
  <div class="tools-item-container">
    <div class="tools-item">{{ detail.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'tools-item',
  props: {
    detail: {
      type: Object,
      default: () => {},
    }
  }
}
</script>

<style scoped lang="less">
.tools-item-container {
  .tools-item {
    background: wheat;
    width: 400px;
    height: 300px;
    margin-bottom: 16px;
  }
}
</style>