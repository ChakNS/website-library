<template>
  <div class="common-container home-container">
    <div class="content">
      <img class="img" src="@/assets/images/logo.png" alt="" />
      <div class="text">Welcome to my Website Library</div>
    </div>
  </div>
</template>

<script>
import Users from '@/api/users'
export default {
  name: 'home',
  async created () {
    await this.getList()
  },
  methods: {
    getList () {
      return Users.User_List().then(res => res)
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  display: flex;
  justify-content: center;
  padding-top: 15%;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img {
      width: 50%;
    }
    .text {
      font-size: 28px;
      font-weight: 500;
    }
  }
}
</style>