<template>
    <el-form
    label-width="100px"
    :model="auth"
    style="max-width: 460px"
  >
    <el-form-item label="Email">
      <el-input v-model="auth.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="auth.password" />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="login" round :disabled="processing">Login</el-button>
        <el-button type="success" @click="register" round>Register now !</el-button>
    </el-form-item>   
  </el-form>

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
            <el-input v-model="user.name" />
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
        <el-button type="primary" @click="saveUser"
          >Save User</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"login",
    data(){
        return {
            dialogVisible: false,
            user: {},
            auth:{
                email:"henry@gmail.com",
                password:"anh123"
            },
            processing:false
        }
    },
    methods:{
        ...mapActions({
            signIn:'auth/login'
        }),
        async login(){
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/login',this.auth).then(({data})=>{
                this.signIn()
            }).catch(({response:{data}})=>{
                alert(data.message)
            }).finally(()=>{
                this.processing = false
            })
        },
        register() {
                this.dialogVisible = true,
                axios({
                    url: '/api/users',
                    method: 'post',
                    data: this.user
                })
                    .then(response => (
                        this.dialogVisible = false,
                        this.login()
                    ))
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            },
    }
}
</script>

<style scoped>
.el-form {
   position: absolute;
   display: block;
   margin-top: 15%;
   margin-left: 35%;
}
</style>