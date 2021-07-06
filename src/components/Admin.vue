<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-circle-plus" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">新增类型</el-dropdown-item>
            <el-dropdown-item command="b">新增房间</el-dropdown-item>
            <el-dropdown-item command="c">编辑vip</el-dropdown-item>
            <el-dropdown-item command="d">记录消费</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>admin服务</span>
      </el-header>

      <el-dialog
          title="新增房间类型"
          :visible.sync="dialogVisible1"
          width="50%"
          :before-close="handleClose">
        <el-form :model="roomType">
          <el-form-item label="单价" :label-width="formLabelWidth">
            <el-input v-model="roomType.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间类型" :label-width="formLabelWidth">
            <el-input v-model="roomType.info" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false;createRoomTypeAction()">确 定</el-button>
        </span>
      </el-dialog>

        <el-dialog
            title="新增房间"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose">
          <span>房间类型：</span>
          <el-select v-model="room.typeId" placeholder="请选择房间的类型">
            <el-option
              v-for="item in roomTypeList"
              :key="item.info"
              :value="item.id"
              :label="item.info"
            >
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false;createRoomAction()">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
            title="编辑vip"
            :visible.sync="dialogVisible3"
            width="50%"
            :before-close="handleClose">
          <el-form>
            <el-form-item label="用户" :label-width="formLabelWidth">
              <el-select v-model="vip.id" placeholder="请选择用户">
                <el-option
                    v-for="item in userList"
                    :key="item.tel"
                    :value="item.id"
                    :label="item.tel"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible3 = false;updateUserVip()">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
            title="记录消费"
            :visible.sync="dialogVisible4"
            width="50%"
            :before-close="handleClose">
          <el-form>
            <el-form-item label="消费收入" :label-width="formLabelWidth">
              <el-input v-model="costRecord.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="消费备注" :label-width="formLabelWidth">
              <el-input v-model="costRecord.info" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户" :label-width="formLabelWidth">
            <el-select v-model="costRecord.id" placeholder="请选择用户">
              <el-option
                  v-for="item in userList"
                  :key="item.tel"
                  :value="item.id"
                  :label="item.tel"
              >
              </el-option>
            </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible4 = false;createCostAction()">确 定</el-button>
        </span>
        </el-dialog>

      <el-main>
        <el-table :data="userList" v-loading="loading"
                  element-loading-text="拼命加载中">
          <el-table-column prop="id" label="用户id" width="140">
          </el-table-column>
          <el-table-column prop="tel" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="vip" label="会员">
          </el-table-column>
          <el-table-column prop="createAt" label="注册时间">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {createRoom, createRoomType, createUserCost, listRoomType, listUsers, updateVip} from '../api/admin'

export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,

      loading: true,

      userData: [],
      userList: [],
      roomTypeList: [],

      roomType: {
        price: 0,
        info: ''
      },
      room:{
        type: '',
        typeId: 0,
      },
      costRecord: {
        price: 0,
        info: '',
        id: 0,
      },
      vip: {
        id: 0,
      },

      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getuserList();
    this.getroomTypeList();
  },
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command);
      switch (command) {
        case "a":
          this.dialogVisible1 = true;
          break;
        case "b":
          this.dialogVisible2 = true;
          break;
        case "c":
          this.dialogVisible3 = true;
          break;
        case "d":
          this.dialogVisible4 = true;
          break;
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    getuserList() {
      const params = {
        cookie: this.$store.state.user.cookie,
      }
      console.log('cookie:' + params);
      listUsers(params).then(res => {
        console.log(res.data.code);
        if (res.data.code === "200") {
          console.log('返回的数据是', res.data);
          this.userList = res.data.data;
          this.userData = this.userList.slice();
          this.loading = false;
        } else {
          console.log(res.data.code);
          this.$message({
            message: "登陆已过期或无权限",
            type: "error",
          })
          this.$router.push({path: '/login'});
        }
      })
    },
    getroomTypeList() {
      const params = {
        cookie: this.$store.state.user.cookie,
      }
      console.log('cookie:' + params);
      listRoomType(params).then(res => {
        console.log(res.data.code);
        if (res.data.code === "200") {
          console.log('返回的数据是', res.data);
          this.roomTypeList = res.data.data;
          console.log(this.roomTypeList);
        } else {
          console.log(res.data.code);
          this.$message({
            message: "登陆已过期或无权限",
            type: "error",
          })
          this.$router.push({path: '/login'});
        }
      })
    },
    createRoomTypeAction(message) {
      let params = {
        cookie: this.$store.state.user.cookie,
        data: {
          price: this.roomType.price,
          info: this.roomType.info
        }
      }
      createRoomType(params).then(res => {
        if (res.data.code === "200") {
          this.$message({
            message: "新增房间类型成功",
            type: "success",
          })
          listRoomType(params).then(res => {
            console.log(res.data.code);
            if (res.data.code === "200") {
              console.log('返回的数据是', res.data);
              this.roomTypeList = res.data.data.slice();
              console.log(this.roomTypeList);
            } else {
              console.log(res.data.code);
            }
          })
        } else {
          this.$message({
            message: "创建失败登陆已过期或无权限",
            type: "error",
          })
        }
      })
    },
    createRoomAction() {
      let params = {
        cookie: this.$store.state.user.cookie,
        data: {
          type_id: this.room.typeId,
        }
      }
      createRoom(params).then(res => {
        if (res.data.code === "200") {
          this.$message({
            message: "新增房间成功",
            type: "success",
          })
        } else {
          this.$message({
            message: "创建失败登陆已过期或无权限",
            type: "error",
          })
        }
      })
    },
    updateUserVip() {
      let params = {
        cookie: this.$store.state.user.cookie,
        data: {
          user_id: this.vip.id
        }
      }
      updateVip(params).then(res => {
        if (res.data.code === "200") {
          this.$message({
            message: "改变 vip 成功",
            type: "success",
          })
          for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].id === this.vip.id) {
              this.userList[i].vip = this.userList[i].vip ? 0 : 1;
              break;
            }
          }
        } else {
          this.$message({
            message: "操作失败登陆已过期或无权限",
            type: "error",
          })
        }
      })
    },
    createCostAction() {
      const params = {
        cookie: this.$store.state.user.cookie,
        data: {
          info: this.costRecord.info,
          cost: this.costRecord.price,
          user_id: this.costRecord.id,
        },
      }
      createUserCost(params).then(res => {
        if (res.data.code === "200") {
          this.$message({
            message: "记录消费成功",
            type: "success",
          })
        } else {
          this.$message({
            message: "操作失败登陆已过期或无权限",
            type: "error",
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
