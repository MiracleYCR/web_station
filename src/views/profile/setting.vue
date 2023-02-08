<template>
  <div class="profile-setting-container">
    <el-card class="profile-setting">
      <div class="header">
        <h3>用户设置</h3>
      </div>

      <el-form class="profile-form" label-position="right" label-width="120px">
        <el-form-item label="用户昵称">
          <el-input v-model="profileForm.nickname" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="profileForm.gender" class="ml-4">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
            <el-radio label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="头像">
          <div class="profile-avatar">
            <el-avatar
              fit="cover"
              shape="square"
              :size="100"
              :src="`http://localhost:3000${profileForm.picture}`"
            />
            <el-button type="text" class="avatar-change" @click="changeAvatar">
              <el-icon><Edit /></el-icon>
              更换头像
            </el-button>
            <input
              v-show="false"
              ref="uploadPictureRef"
              type="file"
              name="file"
              accept="image/*"
              @change="uploadFileChange"
            />
          </div>
        </el-form-item>

        <el-form-item label="城市">
          <el-input v-model="profileForm.city" />
        </el-form-item>

        <el-form-item>
          <div class="btn-group">
            <el-button class="resetBtn">重置</el-button>
            <el-button
              class="saveBtn"
              type="primary"
              @click="saveProfileSetting"
            >
              保存
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="reset-password">
      <div class="header">
        <h3>重置密码</h3>
      </div>

      <el-form
        class="reset-password-form"
        label-position="right"
        label-width="120px"
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
      >
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="passwordForm.password" />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword" />
        </el-form-item>

        <el-form-item>
          <div class="btn-group">
            <el-button class="resetBtn" type="primary" @click="resetPassword">
              重置
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const store = useStore()

// 用户信息表单
const profileForm = ref({})
// 用户头像
const uploadPictureRef = ref(null)
const changeAvatar = () => {
  uploadPictureRef.value.click()
}
// 上传头像图片
const uploadFileChange = (e) => {
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  store.dispatch('user/changeUserAvatar', formData).then((resp) => {
    profileForm.value.picture = resp.url
  })
}
// 保存
const saveProfileSetting = () => {
  const { nickname, city, picture, gender } = profileForm.value
  store
    .dispatch('user/updateUserProfile', { nickname, city, picture, gender })
    .then(() => {
      store.dispatch('user/getUserProfile')
    })
}

const passwordFormRef = ref(null)
// 重置密码表单
const passwordForm = ref({
  password: '',
  newPassword: '',
  confirmPassword: ''
})
const passwordRules = ref({
  password: [{ required: true, trigger: 'blur', message: '密码必填' }],
  newPassword: [{ required: true, trigger: 'blur', message: '新密码必填' }],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '确认密码必填' }
  ]
})
// 重置密码
const resetPassword = () => {
  passwordFormRef.value.validate((valid) => {
    console.log(valid)
    if (!valid) return
    const { password, newPassword, confirmPassword } = passwordForm.value
    if (newPassword !== confirmPassword) {
      return ElMessage.error('新密码和确认密码不一致，请重新输入！')
    } else {
      store
        .dispatch('user/updateUserPassword', {
          password: password,
          newpassword: newPassword
        })
        .then((resp) => {
          console.log(resp)
          // store.dispatch('user/getUserProfile')
        })
    }
  })
}

watch(
  () => store.getters.userProfile,
  (n) => {
    profileForm.value = Object.assign({}, n)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.profile-setting-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .profile-setting {
    width: 600px;
    height: 600px;
    .header {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      justify-content: center;
    }
    .profile-form {
      box-sizing: border-box;
      padding-right: 30px;

      .profile-avatar {
        display: flex;
        flex-direction: column;
        .avatar-change {
          display: flex;
          margin-top: 2px;
          justify-content: flex-start;
        }
      }
    }
  }

  .reset-password {
    width: 600px;
    height: 600px;
    margin-left: 50px;
    .header {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      justify-content: center;
    }

    .reset-password-form {
      box-sizing: border-box;
      padding-right: 30px;
    }
  }

  .btn-group {
    margin-top: 10px;
    margin-left: 10px;
  }

  :deep(.el-input__wrapper) {
    border: 1px solid #e4e7ed;
  }

  :deep(.el-form-item__label) {
    margin-right: 10px;
  }
}
</style>
