<template>
  <div class="add">
    <h2>新增</h2>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户">
              <el-input v-model="form.user2" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="地点">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="留言内容">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="confirm">确定</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'add',
    data(){
      return{
        form:{
          user2:"",
          name:"",
          pwd:"",
          content:""
        }
      }
    },
    methods:{
      goBack(){
        this.$router.back(-1);
      },
      confirm(){
        // 获取当前输入姓名
        var name = this.form.name;
        this.$axios.post('/api/selectStudent',{
          studentName:name
        },{}).then((response)=>{
          // 判断输入用户名是否存在

            // 执行添加操作
            console.log('执行添加操作')
            this.add();

        })
      },
      add(){
        // 定义变量接收获取到的 姓名，密码，内容
        var user2 = this.form.user2;
        var name = this.form.name;
        var pwd = this.form.pwd;
        var content = this.form.content;
        this.$axios.post('/api/addStudent', {
          //需要传入所有信息
          user1: user2,
          studentName: name,
          studentPwd: pwd,
          Content:content
        },{}).then((data) => {
          // 添加成功更改为 element-ui 的 massage
          this.$message({
            showClose: true,
            message: '恭喜你，添加成功!',
            type: 'success'
          });
          this.goBack();
        })
      }
    },
    mounted() {
      this.form.user2=this.$route.query.username;
      console.log('test',this.$route)

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .add{
    background:url("../assets/2.jpg") no-repeat center;
    position: fixed;
    height: 100%;
    width: 100%;
    background-size: cover;
    margin-top: -280px;
  }

</style>
