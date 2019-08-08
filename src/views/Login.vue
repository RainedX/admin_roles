<template>
    <div class="login">
        <div class="login-con">
            <div class="login-header">欢迎登录</div>
            <el-form
                ref="formLogin"
                status-icon
                label-position="left"
                label-width="50px"
                :model="formLogin"
                :rules="rules"
            >
                <el-form-item label="账号" prop="username">
                    <el-input v-model="formLogin.username" placeholder="username">
                        <i slot="prepend" class="el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="formLogin.password"
                        placeholder="password"
                    >
                        <i slot="prepend" class="el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('formLogin')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                callback()
            }
        }
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback()
            }
        }
        return {
            formLogin: {
                username: 'admin',
                password: '123'
            },
            rules: {
                username: [ { validator: validatePass, trigger: 'blur' } ],
                password: [ { validator: validatePass2, trigger: 'blur' } ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const { username, password } = this.formLogin
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('user/login', {
                        username,
                        password
                    }).then(() => {
                        this.$router.push({
                            path: this.$route.query.redirect || '/'
                        })
                    }).catch(() => {
                        this.$message.error('用户名或者密码错误，请重新登录')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url(../assets/login.jpg);
    background-size: cover;
    background-position: 50%;
    position: relative;
    .login-con {
        position: absolute;
        background-color: #fff;
        padding: 15px 20px;
        border-radius: 5px;
        right: 150px;
        top: 50%;
        width: 320px;
        transform: translateY(-50%);
        & /deep/ .el-button--primary {
            width: 100%;
        }
        & /deep/ .el-input__inner {
            height: 35px;
        }
        & /deep/ .el-input-group__prepend {
            padding: 0 10px;
        }
        .login-header {
            height: 30px;
            border-bottom: 1px solid #eee;
            text-align: center;
            line-height: 20px;
            margin-bottom: 30px;
        }
    }
}
</style>