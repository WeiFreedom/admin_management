<template>
  <div class="top">
    <i class="el-icon-eleme"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in sidebarMenu" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          administrator
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item divided command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="picture">
      <el-image
      style="width: 50px; height: 50px"
      :src="imageUrl"
      fit="fill"></el-image>
    </div>
  </div>
</template>

<style lang="scss">
  .top i {
    float: left;
    line-height: 60px;
    margin-right: 20px;
    font-size: 25px;
  }
  .top .el-breadcrumb {
    float: left;
    line-height: 60px;
  }
  .picture {
    float: right;
    margin-right: 10px;
    margin-top: 2px;
  }
  .user {
    float: right;
    line-height: 60px;
  }
</style>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      imageUrl: require('../../../assets/images/timg.gif')
    }
  },
  computed: {
    ...mapState({
      sidebarMenu: state => state.permission.sidebarMenu
    })
  },
  methods: {
    ...mapActions({
      LOGIN_OUT_HANDLE: 'user/LOGIN_OUT_HANDLE'
    }),
    handleCommand (command) {
      if (command === 'quit') {
        this.LOGIN_OUT_HANDLE() // 清空登录信息
        this.$router.push('/login') // 跳转到登录页
      }
    }
  }
}
</script>
