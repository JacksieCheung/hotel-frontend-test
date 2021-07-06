<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">hotel</div>
            <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="number">
                    <el-input v-model="loginForm.tel" placeholder="number">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="loginForm.pwd"
                        @keyup.enter.native="submitForm"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-on:click="submitForm">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '../api/login'
export default {
    data: function() {
      const validateNumber = (rule, value, callback) => {
        const reg = /^[0-9a-zA-Z]{4,16}$/; // 账号长度必须在4-16之间，且不能包含非法字符*&#@
      if (value === '' || value === undefined) {
        callback(new Error('请输入手机号码'))
      } else if (value.length < 4 || value.length > 18) {
        callback(new Error('号码长度必须在4-16之间'))
      } else if (value.indexOf('*') > 0 || value.indexOf('#') > 0 || value.indexOf('@') > 0 || value.indexOf('&') > 0) {
        callback(new Error('号码不能含有非法字符*#@&'))
      } else {
        if (reg.test(value)) {
          callback()
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,}$/; // 密码长度必须在6-16之间，且必须包含数字和字母
      if (value === '' || value === undefined) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('密码长度必须在6-16之间'))
      } else if (/^[a-z]+$/.test(value) || /^[0-9]+$/.test(value)) {
        callback(new Error('密码必须同时包含数字和字母'))
      } else {
        if (reg.test(value)) {
          callback()
        }
      }
    }
    return {
      loginForm: {
        tel: '',
        pwd: '',
      },
      rules: {
        tel: [{ required: true, validator: validateNumber, trigger: 'blur' }],
        pwd: [{ required: true, validator: validatePass, trigger: 'blur' }]
      },
    };
    },
    // computed: {
    //   ...mapGetters([ "number", "headImg"])
    // },
    methods: {
        submitForm() {
          console.log('say submit');
          this.$refs.login.validate(valid => {
            if (valid) {
              const para = {
                tel: this.loginForm.tel,
                pwd: this.loginForm.pwd
              };
              console.log('号码和密码',para)
              login(para).then(res => {
                console.log('登录成功之后返回的res是：',res)
                if (res.data.code === '200') {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  this.saveUserData(res);
                } else  {
                  this.$message({
                    type: 'info',
                    message: res.data.msg
                  });
                }
              })
            } else {
              this.$message.error('请输入账号和密码');
              console.log('error submit!!');
              return false;
            }
          });
        },
        saveUserData (res) {
          console.log('进入到saveUserData里面，返回数据是',res);
          this.$store.state.user.data = res.data;
          this.$store.state.user.cookie = res.data.data.sessionId;
          if (res.data.data.role === 0) {
            this.$router.push({path: '/home'});
          } else {
            this.$router.push({path: '/admin'});
          }
        },
    },
};
</script>

<style scoped>
.login-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login.jpg);
    background-size: 100% 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    width: 500px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
  padding: 50px 40px;
  background: transparent;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
