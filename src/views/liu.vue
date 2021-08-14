<template>
  <div class="index1">
    <span><h1>{{this.$route.query.username}}</h1></span>
    <span><h1>酷珑，欢迎回来</h1></span>

    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="14">
        <!--        <router-link tag="el-button" to="add">新增留言</router-link>-->

        <div class="grid-content row-bg bg-purple-zhong">
          <el-table
            :data="content"
            style="width: 100%">
            <el-table-column
              prop="user1"
              label="用户"
              width="145">
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="日期"
              width="145">
            </el-table-column>
            <el-table-column
              prop="studentPwd"
              label="地点"
              width="145">
            </el-table-column>
            <el-table-column
              prop="Content"
              label="留言内容"
              width="145">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改留言</el-button>
                <el-button
                  size="mini"
                  @click="readyDel(scope.$index, scope.row)">删除留言</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content "></div></el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: 'liu',
    data () {
      return {
        content:[],
        username:''
      }
    },
    methods: {
      addComment(){
        this.$router.push({
          path:'Add',
          query:{
            username:this.$route.query.username
            //username:this.username
          }
        })
      },



      //修改
      handleEdit(index, row) {
        // row 能拿到你选择那一行的值
        console.log(index, row);
        this.$router.push({
          name:'Update',
          params:{
            id:row.id,
            studentName:row.studentName,
            studentPwd:row.studentPwd,
            Content:row.Content
          }
        })
      },
      readyDel(index,row){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 先调用删除方法
          this.handleDelete(index,row);
          // 在执行刷新
          this.query();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除
      handleDelete(index, row) {
        // console.log(row.id,row.studentName,row.studentPwd,row.Sex);
        let stuId = row.id;
        this.$axios.post('/api/delete',{
          id:stuId
        },{}).then((response)=>{
          //显示为未删除时状态，页面没有及时更新(改进方法，将mounted中方法抽离出去,用时调用)
          console.log('删除成功!')
        })
      },
      query(){
        this.$axios.post('/api/query',
          {}).then((response) => {
          //alert('拿到所有值')
          console.log(response.data)
          //给我定义好的content数组赋值
          this.content = response.data;
        })
      }
    },
    mounted(){
      this.query();
      this.username=this.$route.params.username;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .index1{
    background:url("../assets/3.jpg") no-repeat center;
    position: fixed;
    height: 100%;
    width: 100%;
    background-size: cover;
    margin-top: -280px;
  }

  ul li {
    list-style: none;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 10px;
    background-color: #d00d0d;
  }
</style>
