<template>
    <div id="room">
      <el-container>
        <el-header height="30">用户服务</el-header>
        <el-main >
          <el-row :gutter="24">
            <el-col :span="5"><h4>快速查询房间</h4></el-col>
            <el-col :span="12">
              <el-input size="mini"
                        prefix-icon="el-icon-search"
                        v-model="input1" placeholder="请输入房间号">
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" type="info" @click="searchRoomAction()" icon="el-icon-search">查询</el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" @click="returnAction()" round plain>return</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-table
          border
          height="300"
          v-bind:data="roomList"
          v-loading="loading"
          element-loading-text="拼命加载中">
          <el-table-column label="房号-id" prop="id"/>
          <el-table-column label="客房类型-info" prop="info" width="100"/>
          <el-table-column label="单价-price/小时" prop="price"/>
        <el-table-column label="客房状态-status" prop="state" />
        <el-table-column label="预订" align="center" min-width="50">
          <template slot-scope="scope">
        　 <el-button size="mini" type="primary" @click = "bookRoomAction(scope.row.id,scope.$index)" >预订</el-button>
          </template>
        </el-table-column>
        <el-table-column label="入住" align="center" min-width="50" >
          <template slot-scope="scope">
            　<el-button size="mini" type="primary" @click = "openRoomAction(scope.row.id,scope.$index)">入住</el-button>
          </template>
        </el-table-column>
        <el-table-column label="退房" align="center" min-width="50">
         <template slot-scope="scope">
            　<el-button size="mini" type="danger" @click = "returnRoomAction(scope.row.id,scope.$index)">退房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import {bookRoom, getRoomList, openRoom, returnRoom} from "../api/room";

export default {
  data() {
    return {
      loading: true,
      input1: '',
      roomData: [],
      roomList: [],
    }
  },
  mounted() {
    this.getroomList();
  },
  methods: {
    getroomList() {
      let param = {
        cookie:this.$store.state.user.cookie,
      }
      getRoomList(param).then(res => {
        console.log(res.data.code);
        if (res.data.code === "200") {
          console.log('返回的客房类型数据是', res.data);
          this.roomList = res.data.data;
          this.roomData = this.roomList.slice();
          for (let i = 0; i < this.roomList.length; i++) {
            if (this.roomList[i].status === 0) {
              this.roomList[i].state = '可预订/可入住';
            } else if (this.roomList[i].status === 1) {
              this.roomList[i].state = '已预订';
            } else {
              this.roomList[i].state = '已入住';
            }
          }
          this.loading = false;
        } else {
          console.log(res.data.code);
          this.$message({
            message: '登录已过期',
            type: 'error'
          });
          this.$router.push({path: '/login'});
        }
      })
    },
    bookRoomAction(id, index) {
      const params = {
        cookie: this.$store.state.user.cookie,
        pathVal: id,
      };
      console.log('cookie:' + params.cookie);
      bookRoom(params).then(res => {
        if (res.data.code === "200") {
          this.roomList[index].state = '已预订'
          this.roomList[index].status = 1;
          this.roomList.splice(1, 0);
          this.$message({
            message: '预订成功',
            type: 'success'
          });
        } else {
          console.log(res.data.code);
          this.$message({
            message: '登录已过期或该房间不允许预订,msg:' + res.data.msg,
            type: 'error'
          });
        }
      })
    },
    openRoomAction(id, index) {
      const cookie = this.$store.state.user.cookie;
      console.log('cookie:' + cookie);
      const params = {
        cookie: this.$store.state.user.cookie,
        pathVal: id,
      };
      console.log('cookie:' + params.cookie);
      openRoom(params).then(res => {
        if (res.data.code === "200") {
          this.roomList[index].state = '已入住'
          this.roomList[index].status = 2;
          this.roomList.splice(1, 0);
          this.$message({
            message: '入住登记成功',
            type: 'success'
          });
        } else {
          console.log(res.data.code);
          this.$message({
            message: '登陆过期或该房间不允许此刻入住,msg:' + res.data.msg,
            type: 'error'
          });
        }
      })
    },
    returnRoomAction(id, index) {
      const params = {
        cookie: this.$store.state.user.cookie,
        pathVal: id,
      };
      console.log('cookie:' + params.cookie);
      returnRoom(params).then(res => {
        if (res.data.code === "200") {
          this.roomList[index].state = '可预订/可入住'
          this.roomList[index].status = 0;
          this.roomList.splice(1, 0);
          this.$message({
            message: '退房成功',
            type: 'success'
          });
        } else {
          console.log(res.data.code);
          this.$message({
            message: '登陆过期或发生未知错误,msg:' + res.data.msg,
            type: 'error'
          });
        }
      })
    },
    searchRoomAction(){
      console.log(this.input1);
      console.log(this.roomData);
      let flag = false;
      for (let i=0;i<this.roomData.length;i++){
        if (this.roomData[i].id === parseInt(this.input1)){
          this.roomList.splice(1,this.roomList.length);
          this.roomList = this.roomData.slice(i,i+1);
          this.roomList.splice(1,0);
          flag = true;
          break;
        }
      }

      console.log(this.roomData);
      console.log(this.roomList);

      if (!flag){
        this.$message({
          message:'错误房间号',
          type:'error'
        });
      }
    },
    returnAction(){
      this.roomList = this.roomData.slice();
      this.roomList.splice(1,0);
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #e9eef3;
  color: #694d4d;
}
.el-main {
  background-color: #ffffff;
  color: #918d8d;
  text-align: left;
  line-height: 5px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
