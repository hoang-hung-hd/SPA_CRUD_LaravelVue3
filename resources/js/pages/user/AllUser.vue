<template>
  <h2 class="text-center">User List</h2>
  <el-button type="primary"  @click="addUser"  style="border:1px solid">Create User</el-button>
    <el-table :data="users" border style="width: 1200px; margin-top:10px"
    
    >
        <el-table-column prop="name" label="name" width="250" />
        <el-table-column prop="email" label="email" width="250" />
         <el-table-column prop="created_at" label="created_at" width="250" />
          <el-table-column prop="updated_at" label="updated_at" width="250" />
\        <el-table-column fixed="right" label="Operations" width="200">
            <template #default="item">
                <el-button link type="primary" size="small" @click="detailUser(item.row)">Detail</el-button>
                <el-button link type="primary" size="small" @click="editUser(item.row)">Edit</el-button>
                <el-button link type="danger" size="small" @click="deleteUser(item.row.id)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
<el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15,25]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="totalRow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
        label-width="100px"
        style="max-width: 460px"
    >
        <el-form-item label="Name">
            <el-input  v-model="user.name" />
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="user.password" />
        </el-form-item>
        
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveUser">Save User</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogDetail"
    title="Tips"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
        label-width="100px"
        style="max-width: 460px"
    >
        <el-form-item label="Name : ">  
           {{user.name}}
        </el-form-item>
        <el-form-item label="Email : "> 
            {{user.email}}
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDetail = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
  
</template>

<script>
     export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 2,
                users: [],
                user: {},
                dialogVisible: false,
                dialogDetail: false,
                message: "Hello Element Plus",
                //property của data khi gọi api
                // current_page: 1,
                data: [],
                first_page_url: '',
                form: 1,
                // last_page: 2,
                last_page_url: '',
                links: [],
                next_page_url: '',
                path:'',
                per_page : 0,
                prev_page_url:'',
                to:0,
                totalRow:0
            
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            handleSizeChange(val) {
            console.log(`${val} items per page`)
            this.getUsers();
            },
            handleCurrentChange(val) {
            console.log(`current page: ${val}`)
            this.getUsers();
            },
            getUsers(){
                axios
                    .get('/api/users', {params: {page : this.currentPage, limit: this.pageSize}})
                    .then(response => {
                        this.users = response.data.data;
                        this.totalRow = response.data.total
                    });
            },
            addUser() {
                this.user = { id: 0 }
                this.dialogVisible = true
            },
            saveUser() {
                axios({
                    url: '/api/users' + (this.user.id > 0 ? '/' + this.user.id : ''),
                    method :(this.user.id > 0) ? 'put':'post',
                    data: this.user
                })            
                .then(response => {
                    this.getUsers()
                    this.dialogVisible = false
                })
                .catch(err => console.log(err))
                .finally(() => this.loading = false)
           
            },
            editUser(data) {
                console.log(data)
                // Nếu muốn product và data đồng bộ ( không cần ấn nút update thì dữ liệu vẫn thay đổi) với nhau thì viết như sau
                //this.product = data
                //Nếu không muốn đồng bộ thì viết như sau
                this.user = JSON.parse(JSON.stringify(data));
                this.dialogVisible = true
            },
            
                
            deleteUser(id) { 
                if(confirm("Do you really want to delete this user?")){
                axios
                    .delete(`/api/users/${id}`)
                    .then(response => {
                        this.getUsers();
                    });
                }
            },
            detailUser(data){
                this.user = JSON.parse(JSON.stringify(data));
                this.dialogDetail = true
            }
        }
    }

</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
