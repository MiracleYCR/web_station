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
            <el-icon class="svg-icon"><Avatar /></el-icon>
            &nbsp;游客登陆
          </el-button>
        </div>

        <el-form-item prop="username">
          <el-icon class="svg-container svg-icon"><User /></el-icon>
          <el-input
            type="text"
            name="username"
            placeholder="请输入用户名"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-icon class="svg-container svg-icon"><Lock /></el-icon>
          <el-input
            name="password"
            placeholder="请输入用户密码"
            :type="passwordType"
            v-model="loginForm.password"
          ></el-input>
          <span class="show-pwd" @click="changePasswordType">
            <el-icon
              v-show="passwordType === 'password'"
              class="svg-container svg-icon"
            >
              <View />
            </el-icon>
            <el-icon
              v-show="passwordType === 'text'"
              class="svg-container svg-icon"
            >
              <Hide />
            </el-icon>
          </span>
        </el-form-item>
        <div style="float: right; margin-bottom: 20px">
          <span class="signup-link" @click="triggleSignup">
            用户注册
            <el-icon class="svg-icon"><ArrowRight /></el-icon>
          </span>
        </div>
        <el-button
          size="large"
          type="primary"
          :style="{
            width: '100%',
            marginBottom: '30px'
          }"
          :loading="loginLoading"
          @click="handleLogin"
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
          <el-button link class="returnLogin" @click="returnLogin">
            <el-icon class="svg-icon"><ArrowLeft /></el-icon>
            返回登陆
          </el-button>
          <h2 class="title">用户注册</h2>
        </div>

        <el-form-item prop="username">
          <el-icon class="svg-container svg-icon"><User /></el-icon>
          <el-input
            type="text"
            name="username"
            placeholder="请输入用户名"
            v-model="signupForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-icon class="svg-container svg-icon"><Lock /></el-icon>
          <el-input
            name="password"
            placeholder="请输入用户密码"
            :type="passwordType"
            v-model="signupForm.password"
          ></el-input>
          <span class="show-pwd" @click="changePasswordType">
            <el-icon
              v-show="passwordType === 'password'"
              class="svg-container svg-icon"
            >
              <View />
            </el-icon>
            <el-icon
              v-show="passwordType === 'text'"
              class="svg-container svg-icon"
            >
              <Hide />
            </el-icon>
          </span>
        </el-form-item>

        <el-form-item prop="repassword">
          <el-icon class="svg-container svg-icon"><Lock /></el-icon>
          <el-input
            name="password"
            placeholder="请重复输入用户密码"
            :type="repasswordType"
            v-model="signupForm.repassword"
          ></el-input>
          <span class="show-pwd" @click="changeRepasswordType">
            <el-icon
              v-show="repasswordType === 'password'"
              class="svg-container svg-icon"
            >
              <View />
            </el-icon>
            <el-icon
              v-show="repasswordType === 'text'"
              class="svg-container svg-icon"
            >
              <Hide />
            </el-icon>
          </span>
        </el-form-item>

        <el-button
          size="large"
          type="primary"
          :style="{
            width: '100%',
            marginBottom: '30px'
          }"
          :loading="signupLoading"
          @click="handleSignup"
        >
          注册
        </el-button>
      </el-form>
    </template>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import AnimationBg from './animation'

const store = useStore()
const router = useRouter()

// 是否展示登陆
const isLogin = ref(true)

// 登陆
const loginLoading = ref(false)
const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})
const loginRules = ref({
  username: [{ required: true, trigger: 'blur', message: '用户名必填' }],
  password: [{ required: true, trigger: 'blur', message: '密码必填' }]
})

// 注册
const signupLoading = ref(null)
const signupFormRef = ref(null)
const signupForm = ref({
  username: '',
  password: '',
  repassword: ''
})
const signupRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('用户名必填'))
        } else {
          store
            .dispatch('user/checkExist', value)
            .then((data) => {
              if (data.id) {
                callback(new Error('用户名已存在'))
              } else {
                callback()
              }
            })
            .catch((error) => {
              callback(new Error(error.message))
            })
        }
      }
    }
  ],
  password: [{ required: true, trigger: 'blur', message: '密码必填' }],
  repassword: [{ required: true, trigger: 'blur', message: '重复密码必填' }]
})

// 密码状态切换
const passwordType = ref('password')
const repasswordType = ref('password')
const changePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
const changeRepasswordType = () => {
  repasswordType.value =
    repasswordType.value === 'password' ? 'text' : 'password'
}

// 触发注册
const triggleSignup = () => {
  isLogin.value = false
}
// 返回登陆
const returnLogin = () => {
  isLogin.value = true
}
// 重置表单
const resetForm = (formData) => {
  Object.keys(formData).forEach((key) => {
    formData[key] = ''
  })
}

// 登陆
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loginLoading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then((resp) => {
        loginLoading.value = false
        if (!resp.errno) {
          router.push('/')
          resetForm(loginForm.value)
        }
      })
      .catch(() => {
        loginLoading.value = false
        resetForm(loginForm.value)
      })
  })
}
// 注册
const handleSignup = () => {
  const { username, password, repassword } = signupForm.value
  if (!username || !password || !repassword)
    return ElMessage.error('请输入注册信息！')
  if (signupForm.value.password !== signupForm.value.repassword)
    return ElMessage.error('两次密码输入不一致，请重新输入！')

  signupLoading.value = true
  store
    .dispatch('user/signup', signupForm.value)
    .then((resp) => {
      signupLoading.value = false
      if (!resp.errno) {
        returnLogin()
        resetForm(signupForm.value)
      }
    })
    .catch(() => {
      signupLoading.value = false
      resetForm(signupForm.value)
    })
}

// 动画
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

@mixin common_title_container {
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

  .returnLogin {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 15px;
    cursor: pointer;
    color: #ffffff;
    &:hover {
      color: #409eff;
    }
  }
}

@mixin common_form_item {
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
}

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
      @include common_title_container;
    }
    @include common_form_item;
  }

  .signup-form {
    position: absolute;
    width: 520px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-container {
      @include common_title_container;
    }
    @include common_form_item;
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
</style>
