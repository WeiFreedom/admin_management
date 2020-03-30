<template>
  <div class="sysname">
    <span class="systitle">进销存管理系统</span>
    <div class="login_body">
      <el-avatar icon="el-icon-user-solid" src></el-avatar>
      <el-form ref="form" :model="form" label-width="60px">
        <div class="shoptype">
            <el-radio v-model="form.shoptype" label="1">长城区</el-radio>
            <el-radio v-model="form.shoptype" label="2">望江区</el-radio>
        </div>
        <div class="input_box">
            <el-form-item label="用户名">
                <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
            </el-form-item>
        </div>
        <div class="input_box">
            <el-form-item label="库别">
                <el-select v-model="form.storeid" placeholder="请选择库别" filterable>
                    <el-option
                        v-for="item in storeList"
                        :key="item.storeid"
                        :label="item.storename"
                        :value="item.storeid">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="input_box">
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
        </div>
        <div class="input_box">
            <el-button class="btn_login" type="danger" round @click="handleLogin()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: rgba(0, 146, 230, 0.185);
}
.sysname {
  .systitle {
    color: rgb(112, 113, 116);
    line-height: 60px;
    font-size: 20px;
  }
  .login_body {
    background-color: white;
    margin: 0 auto;
    height: 310px;
    width: 340px;
    padding-top: 20px;
    border-radius: 10px;
    box-shadow: darkgrey 10px 10px 30px 5px;

    .shoptype {
      padding-top: 10px;
      margin-bottom: 15px;
    }

    .input_box {
        width: 284px;
        margin: 0 auto;

        .el-form-item {
            margin-bottom: 15px;
        }

        .btn_login {
            width: 100%;
        }
    }
  }
}
</style>

<script>
import { login } from '../../api/permission'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        shoptype: '1',
        account: '',
        storeid: '',
        password: ''
      },
      storeList: [{ storeid: '1', storename: '地址1' }, { storeid: '2', storename: '地址2' }, { storeid: '3', storename: '地址3' }]
    }
  },
  methods: {
    ...mapActions({
      LOGIN_IN_HANDLE: 'user/LOGIN_IN_HANDLE'
    }),
    async handleLogin () {
      try {
        const data = await login()
        const token = data.token
        this.LOGIN_IN_HANDLE({
          token: token,
          userId: '',
          userName: '',
          deptId: '',
          deptName: ''
        })
        this.$router.replace('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
