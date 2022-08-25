<template>
   <el-aside width="350px" style="height: calc(100vh - 128px)">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        style="height:100%"
      >
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><document /></el-icon>
            <span>Products List</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->

        <el-menu-item index="1">
          <el-icon><document /></el-icon>
            <span>Products List</span>
        </el-menu-item>

        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
   </el-aside>
</template>
<script lang="ts" setup>
</script>
<style scoped>
</style>