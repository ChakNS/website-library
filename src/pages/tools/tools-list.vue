<template>
  <div class="common-container tools-list-container">
    <a-row :gutter="16">
      <a-col class="gutter-row" v-for="item in ToolsList" :key="item.title" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="8">
        <tools-item :detail="item" @click="$router.push({ name: item.name })" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Users from '@/api/users'
import { ToolsList } from './config'
import ToolsItem from './components/toolsItem'
export default {
  name: 'home',
  components: {
    ToolsItem
  },
  data() {
    return {
      ToolsList
    }
  },
  async created() {
    await this.getList()
  },
  methods: {
    getList() {
      return Users.User_List().then(res => res)
    }
  }
}
</script>

<style scoped lang="less">
.tools-list-container {
  .tools-item {
    background: wheat;
    width: 400px;
    height: 300px;
    margin-bottom: 16px;
  }
}
</style>
