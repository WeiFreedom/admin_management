<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse">
      <el-submenu v-for='(item) in permissionList.children' :key='item.name' :index="item.name">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.caption }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="handleOpen(children.path, item.meta.caption, children.meta.caption, children.name)" v-for="(children) in item.children" :key="children.name" :index="children.name">
            {{ children.meta.caption }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      permissionList: state => {
        const arr = state.permission.permissionList.filter(m => m.name === 'Home')
        const home = state.permission.permissionList.filter(m => m.name === 'Index')
        if (arr && arr.length > 0) {
          if (home && home.length > 0 && !arr[0].children.find(x => x.name === 'Index')) {
            arr[0].children.unshift(home[0])
          }
          return arr[0]
        }
        return []
      },
      isCollapse: state => state.permission.menuFold
    })
  },
  methods: {
    ...mapActions({
      FETCH_SET_MENU: 'permission/FETCH_SET_MENU',
      FETCH_CLEAR_MENU: 'permission/FETCH_CLEAR_MENU',
      FETCH_ADD_TAB_MENU: 'permission/FETCH_ADD_TAB_MENU',
      FETCH_SET_CURRENT_MENU: 'permission/FETCH_SET_CURRENT_MENU'
    }),
    handleOpen (path, title, item, name) {
      this.FETCH_CLEAR_MENU()
      const menu = []
      menu.push(title)
      menu.push(item)
      /** 设置面包屑 */
      this.FETCH_SET_MENU(menu)
      /** 增加tab页 */
      this.FETCH_ADD_TAB_MENU({ name: name, path: path, title: item })
      /** 设置当前页 */
      this.FETCH_SET_CURRENT_MENU(name)
      /** 跳转路由 */
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss">
  /*需要加上这句话 否则element UI 导航栏展开后子菜单宽度多出1px问题*/
  .el-menu {
    border-right-width: 0;
  }
  .el-menu-vertical {
    width: 200px;
    min-height: 400px;
    height: auto;
  }
</style>
