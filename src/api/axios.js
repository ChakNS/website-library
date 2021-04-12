import axios from 'axios'
// eslint-disable-next-line no-undef
// const config = globalConfig
// import { getRouterDomain } from '@/libs/tools'
// import { Toast } from 'vant'
// import router from "@/router"
// import store from '../store'

// app.use(Toast);

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截 003183110002
    instance.interceptors.response.use(response => {
      // 关闭请求
      this.destroy(url)
      const { data, status } = response
      return { data, status }
      // return Promise.resolve(res)
    }, error => {
      // Error: Network Error
      let response = ''
      if (error && error.response) {
        const { data, status, headers } = error.response
        response = {
          headers: headers,
          data: data,
          code: status,
          status: 'FAIL'
        }
      } else {
        response = {
          headers: null,
          data: null,
          code: 502,
          message: '服务器网络错误！😅',
          status: 'FAIL'
        }
      }
      this.exceptionHandler(response)
      this.destroy(url)
      return response
    })
  }

  exceptionHandler(error) {
    if (error) {
      switch (error.code) {
        case 404:
          // Toast('居然有服务挂了，需要找程序小哥！-- 404')
          break
        case 502:
          // Toast(error.message)
          break
        case 400:
          if (error.data) {
            let message = '提示：' + error.data.errors[0].message + '!'
            const accessTokenErrorCodes = ['E2100002', 'E2100004', 'E2100005']
            if (accessTokenErrorCodes.some(item => error.data.errors[0].code === item)) {
              window.localStorage.clear()
              // window.open(getRouterDomain(), '_self')
            }
            // Toast(message)
          } else {
            // Toast('未知错误，只好联系程序小哥！')
          }
          break
        default:
          // Toast(error.data.errors.message)
      }
    }
  }

  request(options) {
    // 创建axios实例
    const instance = axios.create()
    // 处理接口拦截
    this.interceptors(instance, options.url)
    // 参数整合
    options = Object.assign(this.getInsideConfig(), options)
    // 发起请求
    return instance(options)
  }

  post$(url, data = {}, pagingInfo = {}) {
    let requestOptions = {
      'header': {
        'accessToken': '',
        'pagingInfo': {
          'pageSize': 10,
          'pageNo': 1
        }
      },
      'payload': {}
    }
    // 注入请求参数payload
    requestOptions['payload'] = data
    // 获取accessToken
    // let accessToken = store.state.user.accessToken
    // if (accessToken) {
    //   requestOptions['header']['accessToken'] = accessToken
    // }
    // 分页
    requestOptions['header']['pagingInfo'] = {
      pageNo: 1,
      pageSize: 10
    }
    if (pagingInfo) {
      if (pagingInfo.pageNo) {
        requestOptions['header']['pagingInfo']['pageNo'] = pagingInfo.pageNo
      }
      if (pagingInfo.pageSize) {
        requestOptions['header']['pagingInfo']['pageSize'] = pagingInfo.pageSize
      }
      if (pagingInfo === 'all') {
        delete requestOptions['header']['pagingInfo']
      }
    }

    let options = {
      url,
      data: requestOptions,
      method: 'post'
    }
    return this.request(options).then(res => res)
  }
}

export default HttpRequest
