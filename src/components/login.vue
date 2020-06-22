<template>
  <div class="login_container">
      <div class="login_box">
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>
        <el-form ref="loginFormRef" label-width="0px" class="login_form" :model = "loginForm" :rules="loginFormRules">
          <!-- username -->
          <el-form-item prop="username">
            <el-input  prefix-icon="el-icon-user" v-model = "loginForm.username"></el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model = "loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">login</el-button>
            <el-button type="info" @click="resetLoginForm">reset</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      loginFormRules:{
        //username check
        username:[ { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        //password check
        password:[ { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
      },

    }
  },
  methods:{
    resetLoginForm (){
      this.$refs.loginFormRef.resetFields();
    },
    login (){
      this.$refs.loginFormRef.validate( async valid=>{
        if(!valid)
          return;
        const {data:res} = await this.$http.post('login',this.loginForm);
        if(res.meta.status != 200)
          return this.$message.error('登陆失败!');
        this.$message.success('登陆成功');
        window.sessionStorage.setItem('token',res.data.token);
        this.$router.push('home');
          
      })
    },

  },

}
</script>

<style lang="less" scoped>
.login_container{
    background-color:#2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    padding: 0 20px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}
</style>
