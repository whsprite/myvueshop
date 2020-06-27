<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRole">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',index === 0 ? 'bdtop' : '','vcenter']"
              v-for="(item1,index) in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[index2 === 0 ?'' : 'bdtop','vcenter']"
                  v-for="(item2,index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3,index3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteRole(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightdialog(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%" @close="resetAddForm">
      <el-form :model="addForm" :rules="addFormRules" ref="rolesForm" label-width="80px">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="addForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledesc">
          <el-input v-model="addForm.roledesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%" @close="resetEditForm">
      <el-form :model="rolesForm" :rules="addFormRules" ref="editRolesForm" label-width="80px">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="rolesForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledesc">
          <el-input v-model="rolesForm.roledesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="setRightdialogVisible"
      width="50%"
      @close="clearDefaultKyes"
    >
      <el-tree
        :data="rightsList"
        show-checkbox
        :props="rightsProps"
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultKey"
      ref="tree"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAllRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getRolesList();
  },
  data() {
    return {
      rolesList: [],
      addForm: {
        rolename: "",
        roledesc: ""
      },
      dialogVisible: false,
      editDialogVisible: false,
      setRightdialogVisible: false,
      addFormRules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //password check
        roledesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
      rolesForm: {
        roleid: "",
        rolename: "",
        roledesc: ""
      },
      rightsList: [],
      rightsProps: {
        children: "children",
        label: "authName"
      },
      defaultKey: [],
      rightKeys:[],
      roleid:'',
    };
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200)
        return this.$message.error("获取角色列表失败");
      this.rolesList = res.data;
    },
    resetAddForm() {
      this.$refs.rolesForm.resetFields();
    },
    resetEditForm() {
      this.$refs.editRolesForm.resetFields();
    },
    addRole() {
      this.dialogVisible = !this.dialogVisible;
    },

    async addRoleForm() {
      const { data: res } = await this.$http.post("roles", {
        roleName: this.addForm.rolename,
        roleDesc: this.addForm.roledesc
      });
      if (res.meta.status != 201) return this.$message.error("添加角色失败");
      this.$message.success("添加角色成功");
      this.getRolesList();
      this.dialogVisible = false;
    },
    async editRole(id) {
      this.editDialogVisible = !this.editDialogVisible;
      const { data: res } = await this.$http.get("roles/" + id);

      if (res.meta.status != 200) return this.$message.error("获取角色失败");
      this.rolesForm.rolename = res.data.roleName;
      this.rolesForm.roledesc = res.data.roleDesc;
      this.rolesForm.roleid = res.data.roleId;
    },
    async editRoleForm() {
      var id = this.rolesForm.roleid;
      const { data: res } = await this.$http.put("roles/" + id, {
        roleName: this.rolesForm.rolename,
        roleDesc: this.rolesForm.roledesc
      });
      this.getRolesList();
    },
    async deleteRole(id) {
      const { data: res } = await this.$http.delete("roles/" + id);
      this.$message.success("删除成功");
      this.getRolesList();
    },
    async removeRightById(role, id) {
      const res = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (res != "confirm") return this.$message.info("已取消");
      const { data: resp } = await this.$http.delete(
        `roles/${role.id}/rights/${id}`
      );
      if (resp.meta.status != 200) return this.$message.error("删除权限失败");
      this.$message.success("删除权限成功");
      role.children = resp.data;
    },
    async showSetRightdialog(role) {
      const { data: res } = await this.$http.get("rights/tree");
      this.roleid = role.id;
      console.log(res);
      if (res.meta.status != 200) return this.$message.error("获取权限失败");
      this.rightsList = res.data;
      this.getLeafKeys(role, this.defaultKey);
      this.setRightdialogVisible = true;
    },
    getLeafKeys(node, arry) {
      if (!node.children) return arry.push(node.id);
      node.children.forEach(item => this.getLeafKeys(item, arry));
    },
    clearDefaultKyes() {
      this.defaultKey = [];
    },
   async setAllRights(){
      this.rightKeys = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()];
      console.log(this.rightKeys);
      const idstr = this.rightKeys.join(',');
      await this.$http.post(`roles/${this.roleid}/rights`,{rids:idstr});
      this.getRolesList();
      this.setRightdialogVisible = false;
    },
  }
};
</script>
   
<style lang="less" scoped>
.el-card {
  margin-top: 15px;
}
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>