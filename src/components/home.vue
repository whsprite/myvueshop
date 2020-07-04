<template>
  <el-container>
    <el-header>
      <div class="header-box">
        <img src="../assets/heima.png" alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="menutoggle" @click="toggle">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EEF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="menuname">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="/users" @click="saveName('/users')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="/roles" @click="saveName('/roles')">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/rights" @click="saveName('/rights')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
             <el-menu-item index="/categories" @click="saveName('/categories')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/params" @click="saveName('/params')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
               <el-menu-item index="/list" @click="saveName('/list')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
             <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
               <el-menu-item index="/order" @click="saveName('/order')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
             <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getmenu();
    this.menuname = window.sessionStorage.getItem('menuName');
  },
  data() {
    return {
      menulist: [],
      isCollapse:false,
      menuname:'',
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("login");
    },
    async getmenu() {
      const { data: res } = await this.$http.get("menus");
      this.menulist = res.data;
    },
    toggle(){
      this.isCollapse = ! this.isCollapse; 
    },
    saveName(name){
      window.sessionStorage.setItem('saveName',name);
      this.menuname = name;
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.header-box {
  color: #fff;
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
  }
}
.el-menu{
  border-right: none;
}
.menutoggle{
  color: #fff;
  line-height: 24px;
  text-align: center;
  background-color: #333333;
  letter-spacing: 2px;
  cursor: pointer;
}
</style>