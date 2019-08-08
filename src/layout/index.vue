<template>
    <el-container class="el-container">
        <el-container>
            <el-aside width="200px" class="el-aside"></el-aside>
            <el-container class="container">
                <el-header class="el-header">
                    <el-button
                        type="info"
                        size="small"
                        icon="el-icon-user-solid"
                        @click="handleOut"
                    >退出</el-button>
                </el-header>
                <el-main class="el-main">
                    <el-card class="box-card">
                        <router-view></router-view>
                    </el-card>
                </el-main>
                <el-footer class="el-footer"></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods: {
        handleOut() {
            this.$store.dispatch('user/logout').then(() => {
                this.$router.push({
                    path: '/login'
                })
            })
        }
    }
};
</script>

<style scoped>
.el-container {
    height: 100%;
    color: rgba(246, 202, 157, 0.7);
}
.container {
    color: #000;
}
.el-header,
.el-footer {
    text-align: right;
    line-height: 60px;
}

.el-header >>> .el-button--info {
    background-color: #000;
    color: rgba(246, 202, 157, 0.7);
}

.el-aside {
    background-color: #000;
    text-align: center;
}

.el-main {
    background-color: #e9eef3;
    text-align: center;
    overflow: hidden;
    padding: 15px;
}
.box-card {
    height: 100%;
}
</style>