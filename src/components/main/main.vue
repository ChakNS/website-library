<template>
  <a-layout>
    <!-- 侧边栏 一级目录 -->
    <a-layout-sider
      class="main-sider"
      :class="[`${theme}-bcg-imp`]"
      :style="{ borderRight: theme === 'dark' ? 'none' : '1px solid #f0f0f0' }"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <!-- logo图标 -->
      <div class="logo">
        <div class="logo-container">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <span :class="[`logo-text-${collapsed ? 'hide' : 'show'}`, `${theme}-color`]">Website Library</span>
      </div>
      <a-menu
        :style="[!collapsed && theme === 'light' ? { borderRight: 'none' } : '']"
        :theme="theme"
        mode="inline"
        v-model:selectedKeys="activeMain"
        @select="handleNavigate('sider', $event)"
      >
        <a-menu-item v-for="item in menuList" :key="item.menuId + ''">
          <iconfont :name="item.icon" class="menu-icon" size="20" :color="theme === 'dark' ? '#fff' : '#001529'" />
          <span :class="[`menu-text-${collapsed ? 'hide' : 'show'}`]">{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 顶栏 -->
      <a-layout-header class="main-header">
        <!-- 展开图标 -->
        <div :class="['trigger', `${theme}-bcg`]" :style="{ borderColor: theme === 'dark' ? '#001529' : '#f0f0f0' }" @click="collapsed = !collapsed">
          <iconfont name="zhankai" size="24" :color="theme === 'dark' ? '#fff' : '#001529'" v-if="collapsed" />
          <iconfont name="shouqi" size="24" :color="theme === 'dark' ? '#fff' : '#001529'" v-else />
        </div>
        <!-- 二级目录 -->
        <a-menu :theme="theme" mode="horizontal" v-model:selectedKeys="activeSecondary" @select="handleNavigate('top', $event)">
          <a-menu-item v-for="item in currTopMenu" :key="item.menuId + ''">{{ item.title }}</a-menu-item>
          <a-switch checked-children="light" un-checked-children="dark" :checked="theme === 'light'" @change="changeTheme" />
        </a-menu>
      </a-layout-header>
      <!-- 路由容器 -->
      <a-layout-content class="main-content"><router-view /></a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Iconfont from '_c/iconfont'
import Menu from '@/config/menu'
export default defineComponent({
  components: {
    Iconfont
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      activeMain: ['1'],
      activeSecondary: ['1001'],
      collapsed: false,
      theme: 'light',
      menuList: Menu,
      currTopMenu: []
    })
    // 改变主题
    const changeTheme = checked => {
      state.theme = checked ? 'light' : 'dark'
    }
    // 点击菜单跳转
    const handleNavigate = (type, { key }) => {
      let target
      if (type === 'sider') {
        target = state.menuList.find(item => item.menuId == key)
        state.currTopMenu = target && target.children && target.children.length ? target.children : [target]
        state.activeSecondary = [state.currTopMenu[0].menuId + '']
        router.push({ name: state.currTopMenu[0].name })
      } else {
        target = state.currTopMenu.find(item => item.menuId == key)
        router.push(target.name)
      }
    }
    // 初始化菜单 排序
    const init = () => {
      state.menuList.sort((a, b) => a.urlOrder - b.urlOrder)
      state.menuList.forEach(parent => {
        parent.children.sort((a, b) => a.urlOrder - b.urlOrder)
      })
      state.currTopMenu = state.menuList[0].children && state.menuList[0].children.length ? state.menuList[0].children : [state.menuList[0]]
    }
    init()
    return {
      ...toRefs(state),
      changeTheme,
      handleNavigate
    }
  }
})
</script>
<style lang="less" scoped>
.main-sider {
  border-right: 1px solid #f0f0f0;
  /deep/ .ant-menu {
    .ant-menu-item {
      display: flex;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  /deep/ .ant-layout-sider-children {
    position: fixed;
  }
  .menu-text-show {
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .menu-text-hide {
    display: inline-block;
    max-width: 0;
    opacity: 0;
  }
  .menu-icon {
    margin-right: 8px;
  }
  .logo {
    height: 32px;
    margin: 16px 16px 16px 24px;
    display: flex;
    align-items: center;
    .logo-text-show {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .logo-text-hide {
      display: inline-block;
      max-width: 0;
      opacity: 0;
    }
    .logo-container {
      width: 32px;
      height: 32px;
      img {
        height: 100%;
      }
    }
    span {
      display: inline-block;
      min-width: 104px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}
.main-header {
  position: fixed;
  width: calc(100% - 215px);
  display: flex;
  background: rgb(255, 255, 255);
  padding: 0px;
  /deep/ .ant-menu {
    width: 100%;
    line-height: 64px;
    position: relative;
  }
  /deep/ .ant-switch {
    position: absolute;
    right: 10px;
    top: 21px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 1;
    border-bottom: 1px solid #f0f0f0;
  }
  .trigger:hover {
    div {
      color: #1890ff !important;
    }
  }
}
.main-content {
  padding: 16px;
  padding-top: 80px;
  background: rgb(255, 255, 255);
  min-height: calc(100vh - 64px);
}
</style>
