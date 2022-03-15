<template>
  <div class="login-container">
    <el-form :model="user" ref="login-form" class="login-form" :rules="formRules">
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="onLogin()"
          :loading="loading"
        >登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    const checkRead = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请阅读用户协议'))
      }
    }
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      loading: false,
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        agree: [
          {
            validator: checkRead,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      const user = this.data

      this.loading = true
      Login(user).then(res => {
        console.log(res)
        this.loading = false
        window.localStorage.setItem('token', 3)
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        this.$message.error('手机号或验证码错误')
        console.log(err)
        this.loading = false
        window.localStorage.setItem('token', 3)
        this.$router.push({
          name: 'home'
        })
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./bg.jpeg") no-repeat;
  background-size: contain;
}
.login-form {
  background-color: white;
  padding: 20px 50px;
  min-width: 300px;
}
.login-btn {
  width: 100%;
}
.login-head {
  background-color: #4aa2ff;
  -webkit-mask: url(./favicon.svg) no-repeat left center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
</style>
