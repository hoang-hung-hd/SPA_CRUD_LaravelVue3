<template>
  <h2 class="text-center">Products List</h2>
  <el-button text @click="addProduct">Create Product</el-button>
        <!-- <el-button text @click="centerDialogVisible = true">Create Product</el-button> -->
        <el-table :data="products" style="width: 100%">
            
                <el-table-column prop="id" label="Id" width="100" />
                <el-table-column prop="name" label="Name" width="250" />
                <el-table-column prop="detail" label="Detail" width="450" />
                <el-table-column label="Product Image" width="150" prop="imagePath" >
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="`/storage/`+scope.row.imagePath"/>
                    </div>
                  </template>
                </el-table-column>     
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="item">
                        <el-button link type="primary" size="small" @click="editProduct(item.row)">Edit</el-button>
                        <el-button link type="danger" size="small" @click="deleteProduct(item.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
                
        </el-table>
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="sizes, prev, pager, next"
            :total="totalRow"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

  <el-dialog
    v-model="dialogVisible"
    title="Add/Edit Product"
    width="35%"
    center
    :on-remove="handleRemove"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    
  >
    <el-form
        label-width="100px"
        style="max-width: 100%"
        :model="product"
    >
        <el-form-item label="Name">
            <el-input v-model="product.name" />
        </el-form-item>
        <el-form-item label="Detail">
            <el-input v-model="product.detail" />
        </el-form-item>
        <!-- <el-form-item label="Curren Image">
            <template #default="scope">
                <div style="display: flex; align-items: center; width: 150px;height: auto;">
                    <el-image :src="`/storage/`+product.imagePath"/>
                </div>
            </template>
        </el-form-item> -->
        <el-form-item label="New Image">
          <el-upload
          v-model="product.imagePath"
          action="http://127.0.0.1:8000/products"
          list-type="picture-card"
          :auto-upload="false" 
          multiple
          :limit="3"
          id="productImage"
          accept="image/jpeg,image/gif,image/png"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
           
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        </el-form-item>
        


    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveProduct"
          >Save Product</el-button
        >
      </span>
    </template>
    
  </el-dialog>
  
</template>

<script>
import { ref } from 'vue'
// import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
// import { UploadProps, UploadUserFile } from 'element-plus'
// import { UploadFile } from 'element-plus'
import axios from 'axios';

/*
let dialogImageUrl = ref('')
let dialogVisible = ref(false)
let disabled = ref(false)
let currentPage = 1
let pageSize = 5
let product = {id: 0,name: "", detail: "", imagePath: ""}
let products = []
let dialogDetail = false
let totalRow = ref(0)


const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const getAllProduct = () => {
          axios
              .get('/api/products', {params: {page : currentPage, limit:pageSize}})
              .then(response => {
                  console.log(response.data.data)
                  products = response.data.data.data;
                  totalRow = response.data.data.total
              });
}
const addProduct =() =>{
  // product = {id : 0}
  dialogVisible.value = true
}
const editProduct = (data) =>{
  product = JSON.parse(JSON.stringify(data));
  dialogVisible.value = true
}
const saveProduct= () => {
  console.log("aaa");
}
const deleteProduct =(id)=>{
  if(confirm("Do you really want to delete this product?")){
      axios
        .delete(`/api/products/${id}`)
        .then(response => {
          getAllProduct();
        });
    }
}
*/
    
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 5,
                products: [],
                product: {},
                dialogVisible: false,
                dialogImageUrl:"",
                dialogDetail: false,
                message: "Hello Element Plus",
                //property của data khi gọi api
                totalRow:0,
                disabled: ref(false),
            }
        },
        created() {
            this.getAllProduct();
        },
        methods: {
            getAllProduct(){               
                axios
                    .get('/api/products', {params: {page : this.currentPage, limit: this.pageSize}})
                    .then(response => {
                        this.products = response.data.data.data;
                        this.totalRow = response.data.data.total
                    });
            },
            addProduct() {
                this.product = {id : 0,imagePath: ""}
                this.dialogVisible = true
            },
            saveProduct() {
              console.log("dataFromForm",this.product)
                axios({
                    url: '/api/products' +(this.product.id > 0 ? '/' + this.product.id: ''),
                    method: this.product.id > 0 ? 'put':'post',
                    data: this.product
                })
                    .then(response => (
                        this.dialogVisible = false,
                        this.getAllProduct()
                    ))
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            },
            
            editProduct(data) {
                console.log(data)
                // Nếu muốn product và data đồng bộ ( không cần ấn nút update thì dữ liệu vẫn thay đổi) với nhau thì viết như sau
                //this.product = data
                //Nếu không muốn đồng bộ thì viết như sau
                this.product = JSON.parse(JSON.stringify(data));
                this.dialogVisible = true
            },
            deleteProduct(id) { 
                if(confirm("Do you really want to delete this product?")){
                axios
                    .delete(`/api/products/${id}`)
                    .then(response => {
                        this.getAllProduct();
                    });
                }
            },
            handleSizeChange (number) {
                this.getAllProduct()
                console.log(`${number} items per page`)
            },
            handleCurrentChange(number){
                this.getAllProduct()
                console.log(`current page: ${number}`)
            },
            handleRemove (file) {
              console.log(file)
            },
            handlePictureCardPreview(uploadFile) {
              dialogImageUrl.value = uploadFile.url
              dialogVisible.value = true
            },
            handleDownload(file){
              console.log(file)
            }
        }
    }
    

</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
