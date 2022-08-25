<template>
    <el-header style="display:block !important">
     <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">BIPVN VIETNAM</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" href="/products">   
      <el-link  href="/products">Dự án</el-link>  
    </el-menu-item>
    <el-menu-item index="2"> 
      <el-link  href="/services">Dịch vụ</el-link> 
    </el-menu-item>
    <el-menu-item index="3">Khách hàng</el-menu-item>
    <el-menu-item index="4">Blog</el-menu-item>
    <el-sub-menu index="5">
      <template #title>Về chúng tôi</template>
      <el-menu-item index="5-1">Về chúng tôi</el-menu-item>
      <el-menu-item index="5-1">Tuyển dụng</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="6">Liên hệ</el-menu-item>
    <el-menu-item index="7" @click="logout">Log out</el-menu-item>
  </el-menu>
  </el-header>
</template>
<script >
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
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

<style>
.flex-grow {
  flex-grow: 1;
}
</style>