<template>
    <el-container>
      <el-main>
        <AllProduct></AllProduct>
      </el-main>
    </el-container>
</template>

<script>
import AllProduct from '../pages/product/AllProduct.vue'
export default {
    name: "dashboard",
    data() {
        return {
            user: this.$store.state.auth.user,
        };
    },
    components: { AllProduct }
}
</script>