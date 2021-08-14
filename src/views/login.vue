<template>
  <div class="hello">
    <div class="hello1">
      <h1>酷珑的留言板</h1>
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            suffix-icon="el-icon-user-solid"
            name="username"
            v-model="userName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            v-model="passWord"
            show-password
            name="password">
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="select">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        userName: '',
        passWord: ''
      }
    },
    methods: {
      addUser() {
        let name = this.userName;
        let pwd = this.passWord;
        this.$axios.post('/api/addUser', {
          username: name,
          password: pwd
        },{}).then((response) => {
          this.$message({
            showClose: true,
            message: '注册成功,请登录',
            type: 'success'
          })
          //alert('注册成功,请登录')
          console.log('注册请求成功',response);
        })
      },
      select(){
        let name = this.userName;
        let pwd = this.passWord;
        this.$axios.post('/api/select',{
          username:name,
          password:pwd
        },{}).then((response)=>{
          console.log(response.data);
          var len = response.data.length;
          if(len==1){
            this.$message({
              showClose: true,
              message: '用户已存在!',
              type: 'error'
            })
           // alert('用户已存在')
          }else{
            if (name==""||pwd=="") {
              this.$message({
                showClose: true,
                message: '注册失败，账号或密码不能为空!',
                type: 'error'
              })
              //alert('注册失败，账号或密码不能为空!')
            }else{
              console.log('注册成功!')
              this.addUser();
            }
          }
        })
      },
      login(){
        let name = this.userName;
        let pwd = this.passWord;
        this.$axios.post('/api/login', {
          username: name,
          password: pwd
        },{}).then((response) => {
          var content = response.data;


          if(name=='liudelong'&&pwd=='123456')
          {
            console.log('管理员登陆成功',content);
            this.$router.push({
              path:'liu',
              query:{
                username:name,
                password:pwd
              }
            })
          }else


          if(content.length != 0){
            this.$notify({
              title: 'info',
              message: '登陆成功!',
              type: 'success'
            });
            console.log('登陆请求成功',content);
            this.$router.push({
              path:'Index',
              query:{
                username:name,
                password:pwd
              }
            })
          }else{
            this.$message({
              showClose: true,
              message: '账号或密码错误!',
              type: 'error'
            });
          }
        },
        function(response){
          console.log(response);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .hello{
    background:url("../assets/1.jpg") no-repeat center;
    position: fixed;
    height: 100%;
    width: 100%;
    background-size: cover;
    margin-top: -280px;

  }
.hello1{
  margin-top: 250px;
}

  .el-input{
  width: 350px;
}
</style>
