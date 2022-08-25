<template>
  <div class="common-layout">
    <el-container style="display:block">
      <Navbar />
      <el-container style="display:flex">
       <Sidebar />
        <el-container  style="display:block">
          <AppMain />
          <Footer />
        </el-container>
      </el-container >

    </el-container>
  </div>
</template>
<script setup>
import { Footer, Navbar, Sidebar, AppMain } from './components'
// export default{
//   component:{
//     Footer,
//     Navbar, 
//     Sidebar,
//     AppMain,
//   },
//   setup(){
//     return{};
//   }
// };

</script>
