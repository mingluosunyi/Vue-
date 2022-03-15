import request from '@/utils/request'

const Login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: data
  })
}

const getUserProfile = () => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/profile'
  })
}
export { Login, getUserProfile }
