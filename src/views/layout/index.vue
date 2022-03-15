<template>
  <div>
    <el-container class="layout-container">
      <el-aside class="aside" width="auto">
        <app-aside class="aside-menu" :is-collapsed="isCollapsed"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div>
            <i :class="isCollapsed?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapsed = !isCollapsed"></i>
            <span>ASF</span>
          </div>
          <el-dropdown>
            <div class="user-wrap">
              <img src="@/assets/photo.jpeg" alt="" class="avatar">
              <span class="el-dropdown-link">
                {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'layOut',
  data () {
    return {
      user: {
        name: null,
        avatar: null
      },
      isCollapsed: true
    }
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then((res) => {
        this.user = {
          name: 'mingluo',
          avatar: '@/assets/photo.jpeg'
        }
      }, (err) => {
        this.user = {
          name: 'mingluo',
          avatar: '@/assets/photo.jpeg'
        }
        console.log(err)
      })
    },
    onLogOut () {
      this.$confirm('确定要退出登陆吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.loadUserProfile()
  },
  components: {
    AppAside
  }
}
</script>

<style scoped lang="less">
.aside {
  background-color: #d9e1eb;
  .aside-menu {
    height: 100%;
  }
}
.header {
  background-color: #bdc9d7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  background-color: #ebf0f6;
}
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.user-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
