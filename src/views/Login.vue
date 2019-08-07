<template>
    <div
        v-loading="$store.state.isShowLoading"
        class="login"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="login-con">
            <div class="login-header">欢迎登录</div>
            <el-form label-position="left" label-width="50px" :model="formLabelAlign">
                <el-form-item label="账号">
                    <el-input v-model="formLabelAlign.username" placeholder="username">
                        <i slot="prepend" class="el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="formLabelAlign.password"
                        :show-password="true"
                        placeholder="password"
                    >
                        <i slot="prepend" class="el-icon-lock"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formLabelAlign: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        handleLogin() {
            this.$router.push({
                path: '/home'
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
        width: 300px;
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