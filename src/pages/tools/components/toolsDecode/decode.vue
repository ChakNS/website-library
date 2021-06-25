<template>
  <div class="tools-decode-container">
    <a-form>
      <a-row>
        <a-col :span="10">
          <a-form-item>
            <a-textarea
              :value="encodeStr"
              :autoSize="{ minRows: 35, maxRows: 35 }"
              style="width: 100%;"
              placeholder="encode"
              allow-clear
              @change="handleEncodeChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="4" style="display: flex;align-items: center;justify-content: center;text-align: center;">
          <div class="switch-buttons">
            <a-button type="primary" style="margin-bottom: 20px;" @click="handleDecode">decode<a-icon type="right"/></a-button>
            <a-button type="primary" @click="handleEncode"><a-icon type="left" />encode</a-button>
            <a-select :default-value="filterOption" style="width: 120px; margin-top: 20px" @change="handleChange">
              <a-select-option value="content">content</a-select-option>
              <a-select-option value="action">action</a-select-option>
              <a-select-option value="token">token</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="10">
          <a-form-item>
            <a-textarea
              :value="decodeStr"
              :autoSize="{ minRows: 35, maxRows: 35 }"
              style="width: 100%;"
              placeholder="decode"
              allow-clear
              @change="e => (decodeStr = e.target.value)"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import _ from 'lodash'
export default defineComponent({
  name: 'ToolsDecode',
  setup() {
    const state = reactive({
      encodeStr: '',
      decodeStr: '',
      filterOption: 'content'
    })
    const methods = reactive({
      handleDecode: _.debounce(function() {
        const decodeData = decodeURIComponent(state.encodeStr)
        if (!state.filterOption) {
          state.decodeStr = decodeData
          return
        }
        let [action, ct] = decodeData.split('&content=')
        action = action.split('=')[1]
        const [content, token] = ct.split('&token=')
        const dataMap = { action, content, token }
        console.log(dataMap)
        // const target = decodeData.split('&').find(item => item.startsWith(state.filterOption))
        try {
          state.decodeStr = JSON.stringify(JSON.parse(dataMap[state.filterOption]), null, 2)
        } catch (error) {
          console.log(error)
        }
      }, 500),
      handleEncode() {
        state.encodeStr = encodeURIComponent(state.decodeStr)
      },
      handleChange(value) {
        state.filterOption = value
        methods.handleDecode()
      },
      handleEncodeChange(e) {
        state.encodeStr = e.target.value
        methods.handleDecode()
      }
    })
    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="less" scoped>
.tools-decode-container {
  .switch-buttons {
    display: flex;
    flex-direction: column;
    width: 120px;
  }
  /deep/ .ant-col {
    width: 100%;
  }
  /deep/ .ant-form-item {
    margin-bottom: 0;
  }
}
</style>
