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

## 登陆模块

### 1-1 模块路由
> `#/login`

### 1-2 消息提示功能(Message)
```javascript
<el-button :plain="true" @click="open4">错误</el-button>

open4() {
this.$message.error('错了哦，这是一条错误消息');
}
```
### 1-3 提交请求互斥
给`<button>`绑定属性 loading,通过控制loading的值来实现互斥。
```javascript
<el-button
          type="primary"
          class="login-btn"
          @click="onLogin()"
*         :loading="loading"
        >登陆</el-button>
```

### 1-4 表单验证
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

## 首页
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
### 2-3 配置嵌套路由
如果有默认子路由，就不需要给它起名
```javascript
 {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeIndex
      }
    ]
  }
```

### 2-4 页面布局
```javascript
<el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
    </el-container>
</el-container>
```
### 2-5侧边导航栏
```javascript
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
```
侧边导航栏和路由对应：
在menu加上router属性，item的index改为路由

### 2-6获取用户数据
根据API文档，需要在axios中添加请求头
```javascript
headers: {
    Authorization: 'Bearer token'
}
```
#### 2-6-1 token本地存储
```javascript
// 存
this.window.localStorage.setItem('key',value)
//取
window.localStorage.getItem('key')
```

#### 2-6-2 axios拦截器
```javascript
request.interceptors.request.use(
  function (config) {
      // 这里不return config请求就发不出去了
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
```
#### 2-6-3 使用拦截器统一处理token
```javascript
request.interceptors.request.use(
  function (config) {
    // 这里不return config请求就发不出去了
*   const user = window.localStorage.getItem('user')
*   config.headers.Authoraziton = `Bearer ${user}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
```