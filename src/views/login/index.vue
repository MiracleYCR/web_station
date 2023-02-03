<template>
  <div class="login-container">
    <canvas id="canvas" />

    <template v-if="isLogin">
      <el-form
        class="login-form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
      >
        <div class="title-container">
          <h2 class="title">用户登陆</h2>
          <el-button link class="public-visitor">
            <el-icon><Avatar /></el-icon>
            &nbsp;游客登陆
          </el-button>
        </div>

        <el-form-item prop="username">
          <el-icon class="svg-container"><User /></el-icon>
          <el-input
            type="text"
            name="username"
            placeholder="请输入用户名"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-icon class="svg-container"><Lock /></el-icon>
          <el-input
            name="password"
            placeholder="请输入用户密码"
            :type="passwordType"
            v-model="loginForm.password"
          ></el-input>
          <span class="show-pwd" @click="onChangePasswordType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </el-form-item>
        <div style="float: right; margin-bottom: 20px">
          <span class="signup-link" @click="triggleSignup">
            用户注册
            <el-icon><ArrowRight /></el-icon>
          </span>
        </div>
        <el-button
          size="large"
          type="primary"
          :style="{
            width: '100%',
            marginBottom: '30px'
          }"
        >
          登陆
        </el-button>
      </el-form>
    </template>

    <template v-else>
      <el-form
        class="signup-form"
        ref="signupFormRef"
        :model="signupForm"
        :rules="signupRules"
      >
        <div class="title-container">
          <h2 class="title">用户注册</h2>
        </div>

        <el-form-item prop="username">
          <el-icon class="svg-container"><User /></el-icon>
          <el-input
            type="text"
            name="username"
            placeholder="请输入用户名"
            v-model="signupForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-icon class="svg-container"><Lock /></el-icon>
          <el-input
            name="password"
            placeholder="请输入用户密码"
            :type="passwordType"
            v-model="signupForm.password"
          ></el-input>
          <span class="show-pwd" @click="onChangePasswordType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AnimationBg from './animation'

const isLogin = ref(true)

// 登陆
const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

// 注册
const signupFormRef = ref(null)
const signupForm = ref({
  username: '',
  password: '',
  repassword: ''
})

// 密码状态切换
const passwordType = ref('password')
const onChangePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

// 触发注册
const triggleSignup = () => {
  isLogin.value = false
}

onMounted(() => {
  AnimationBg()
  window.onresize = () => {
    AnimationBg()
  }
})
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  #canvas {
    display: block;
  }

  .login-form {
    position: absolute;
    width: 520px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 30px auto;
        text-align: center;
        font-weight: bold;
      }

      :deep(.public-visitor) {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 15px;
        cursor: pointer;
        color: #ffffff;
        &:hover {
          color: #409eff;
        }
      }
    }

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      background-color: none;

      input {
        width: 100%;
        border: 0px;
        height: 47px;
        border-radius: 0px;
        color: $light_gray;
        caret-color: $cursor;
        background: transparent;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 10px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .signup-link {
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      text-align: right;
      color: #ffffff;
      &:hover {
        color: #409eff;
      }
    }
  }

  .signup-form {
    position: absolute;
    width: 520px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 30px auto;
        text-align: center;
        font-weight: bold;
      }

      :deep(.public-visitor) {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 15px;
        cursor: pointer;
        color: #ffffff;
        &:hover {
          color: #409eff;
        }
      }
    }

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      background-color: none;

      input {
        width: 100%;
        border: 0px;
        height: 47px;
        border-radius: 0px;
        color: $light_gray;
        caret-color: $cursor;
        background: transparent;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 10px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .signup-link {
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      text-align: right;
      color: #ffffff;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
