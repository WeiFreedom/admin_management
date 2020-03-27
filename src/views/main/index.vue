<template>
  <el-container>
    <el-aside width="200px">
      <titleLoge/>
      <sidebarNav/>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <topAside/>
      </el-header>
      <el-main>
        <tab/>
        <mainContent/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mainContent from './components/content'
import sidebarNav from './components/sidebar-nav'
import topAside from './components/top-aside'
import titleLoge from './components/title'
import tab from './components/tab'

export default {
  data () {
    return {}
  },
  methods: {
  },
  components: {
    mainContent,
    sidebarNav,
    topAside,
    titleLoge,
    tab
  }
}
</script>

<style lang="scss">
  /*只有加上这一段才能实现高度自适应*/
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .el-aside {
    height: 100%;
    background-color: rgb(84,92,100);
  }
  .el-header {
    background-color: rgb(240,240,240);
  }
  .el-main {
    padding: 0;
    background-color: rgb(249,249,249);
  }
</style>
