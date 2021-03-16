<template>
  <a-layout>
    <!-- 侧边栏 一级目录 -->
    <a-layout-sider class="main-sider" :class="[ `${ theme }-bcg-imp` ]" :style="{ borderRight: theme === 'dark' ? 'none' : '1px solid #f0f0f0' }" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <!-- logo图标 -->
      <div class="logo">
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="logo" />
        </div>
        <span :class="[ `logo-text-${ collapsed ? 'hide' : 'show' }`, `${ theme }-color` ]">Website Library</span>
      </div>
      <a-menu :theme="theme" mode="inline" v-model:selectedKeys="activeMain">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 顶栏 -->
      <a-layout-header class="main-header">
        <!-- 展开图标 -->
        <menu-unfold-outlined :class="[ 'trigger', `${ theme }-color-imp`, `${ theme }-bcg` ]" v-if="collapsed" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined :class="[ 'trigger', `${ theme }-color-imp`, `${ theme }-bcg` ]" v-else @click="() => (collapsed = !collapsed)" />
        <!-- 二级目录 -->
        <a-menu :theme="theme" mode="horizontal" v-model:selectedKeys="activeSecondary">
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const state = reactive({
      activeMain: '1',
      activeSecondary: '1',
      collapsed: false,
      theme: 'light',
    })
    const changeTheme = (checked) => {
      state.theme = checked ? 'light' : 'dark'
    }
    return {
      ...toRefs(state),
      changeTheme,
    }
  },
})
</script>
<style lang="less" scoped>
.main-sider {
  border-right: 1px solid #f0f0f0;
  /deep/ .ant-menu {
    border-right: none;
    .ant-menu-item {
      &:first-child {
        margin-top: 0;
      }
    }
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
  }
  .trigger:hover {
    color: #1890ff;
  }
}
.main-content {
  padding: 24px;
  background: rgb(255, 255, 255);
  min-height: calc(100vh - 64px);
}
</style>
