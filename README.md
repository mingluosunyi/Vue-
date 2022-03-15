# toutiao-publish-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##登陆模块

### 1-1 模块路由
> `#/login`

###1-2 消息提示功能(Message)
```javascript
<el-button :plain="true" @click="open4">错误</el-button>

open4() {
this.$message.error('错了哦，这是一条错误消息');
}
```
###1-3 提交请求互斥
给`<button>`绑定属性 loading,通过控制loading的值来实现互斥。
```javascript
<el-button
          type="primary"
          class="login-btn"
          @click="onLogin()"
*         :loading="loading"
        >登陆</el-button>
```

###1-4 表单验证
#### 1-4-1 自动验证
1. 给el-form绑定model属性为数据对象
2. 给el-form绑定rules属性
3. 给要验证的el-form-item绑定prop属性
4. 编写规则

#### 1-4-2 自定义验证
1. 给el-form绑定model属性为数据对象
2. 给el-form绑定rules属性
3. 给要验证的el-form-item绑定prop属性，值是规则的key
4. 编写规则，注意*：prop和规则的名称必须一致，在规则中使用validator属性自定义。
```javascript
const checkRead = (rule, value, callback) => {
    if (value) {
        callback()
    } else {
        callback(new Error('请阅读用户协议'))
    }
}
formRules: {
    mobile: [
        agree: [
        {
            validator: checkRead,
            trigger: 'change'
        }
    ]
}
```
#### 1-4-3 手动触发验证
1. 给el-form起ref
2. 在触发事件的回调函数中用`this.$refs['ref'].validate()`

### 1-4 将请求封装为api
封装后：
```javascript
// user.js
import request from '@/utils/request'

const Login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: data
  })
}
export { Login }
```

```javascript
// @/views/login/index.vue -app-data
login () {
    const user = this.data

    this.loading = true
*   Login(user).then(res => {
        console.log(res)
        this.loading = false
    }).catch(err => {
        this.$message.error('手机号或验证码错误')
        console.log(err)
        this.loading = false
    })
}
```

##首页
### 2-1 组件的name和路由的name
+ 组件：便于使用vue-devtools调试
+ 路由：可以使用路由的name来push路由
### 2-2 配置主页的路由
```javascript
{
    path: '/',
    name: 'home',
    component: HomeIndex
}
```
```javascript
this.$router.push({
    name: 'home'
})
```

