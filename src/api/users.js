import axios from './api.request'
const PRE_FIX = 'users/'
export default {
  User_List: function (payload, pagingInfo) {
    return axios.post$(`${PRE_FIX}list`).then(res => res).catch(err => err)
  }
}