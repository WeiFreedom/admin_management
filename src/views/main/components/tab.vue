<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick()">
      <el-tab-pane
        v-for="item in tabMenu"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :id="item.name"
        :path="item.path"
        :ref="item.name"
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      editableTabs: [{
        title: '导航一',
        name: '1'
      }, {
        title: '导航二',
        name: '2'
      }],
      tabIndex: 1
    }
  },
  computed: {
    ...mapState({
      tabMenu: state => state.permission.tabMenu,
      currentMenu: state => state.permission.currentMenu
    }),
    editableTabsValue: {
      get () { return this.currentMenu },
      set (val) {
        this.FETCH_SET_CURRENT_MENU(val)
      }
    }
  },
  methods: {
    ...mapActions({
      FETCH_SET_CURRENT_MENU: 'permission/FETCH_SET_CURRENT_MENU',
      FETCH_SET_TAB_MENU: 'permission/FETCH_SET_TAB_MENU'
    }),
    removeTab (targetName) {
      const tabs = this.tabMenu
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              const path = nextTab.path
              this.$router.push({ path })
            } else {
            }
          }
        })
      }
      this.editableTabsValue = activeName
      const otherTabs = tabs.filter(tab => tab.name !== targetName)
      this.FETCH_SET_TAB_MENU(otherTabs)
    },
    handleClick () {
      for (const item in this.$refs) {
        /** 不知道有什么其他方式可以获取到 */
        if (this.$refs[item][0].name === this.editableTabsValue) {
          const path = document.getElementById(this.$refs[item][0].name).getAttribute('path')
          this.$router.push({ path })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-tabs__header {
    margin-bottom: 0 !important;
  }
  /deep/ .el-tabs__nav .el-tabs__item:nth-child(1) span{
     display: none;
  }
</style>
