<!-- <template>
    <div>
        <h3 class="text-center">Create Product</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addProduct">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="product.name">
                    </div>
                    <div class="form-group">
                        <label>Detail</label>
                        <input type="text" class="form-control" v-model="product.detail">
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                    <el-button type="primary submit" round>Create</el-button>
                </form>
            </div>
        </div>
    </div>
</template> -->

<template>
  <!-- <el-radio-group v-model="product" label="label position">
    <el-radio-button label="left">Left</el-radio-button>
    <el-radio-button label="right">Right</el-radio-button>
    <el-radio-button label="top">Top</el-radio-button>
  </el-radio-group> -->
  <div style="margin: 20px" />
    <el-form
        label-width="100px"
        style="max-width: 460px"
    >
        <el-form-item label="Name">
            <el-input v-model="product.name" />
        </el-form-item>
        <el-form-item label="Detail">
            <el-input v-model="product.detail" />
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="addProduct">Create</el-button>
        </el-form-item>
        
    </el-form>
</template>


 
<script>
    import { reactive, ref } from 'vue'

    const formProduct = reactive({
                name: '',
                detail: ''
           })
    export default {
        data() {
            return {
                product: {}
            }
        },
        methods: {
            addProduct() {
                axios
                    .post('http://localhost:8000/api/products', this.product)
                    .then(response => (
                        this.$router.push({ name: 'home' })
                    ))
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>