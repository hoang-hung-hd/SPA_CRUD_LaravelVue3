<!-- <template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="https://techvblogs.com/?ref=project" target="_blank" class="navbar-brand">TechvBlogs</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link :to="{name:'dashboard'}" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
                    </li>
                </ul>
                <div class="ml-auto">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user.name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main class="mt-3">
            
        </main>
    </div>
</template> -->

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">
                    <el-link :icon="Edit" href="/products">Product List</el-link>
              </el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>
                    <a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{ user.name }}</span>
        </div>
      </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
export default {
    name:"dashboard-layout",
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    methods:{
        ...mapActions({
            signOut:"auth/logout"
        }),
        async logout(){
            await axios.post('api/logout').then(({data})=>{
                this.signOut()
                this.$router.push({name:"login"})
            })
        }
    }
}
</script>

<style scoped >
.el-header {
    background-color : rgb(153, 153, 233);
    margin: center
}
</style>