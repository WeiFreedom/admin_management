<template>
  <div class="top">
    <i class="el-icon-eleme"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in sidebarMenu" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          administrator
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
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
import { mapState } from 'vuex'
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
  }
}
</script>
