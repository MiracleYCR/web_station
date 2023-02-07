<template>
  <div class="profile-setting-container">
    <div class="profile-header">
      <h3 class="profile-title">用户设置</h3>
    </div>

    <el-form class="profile-form" label-position="right" label-width="120px">
      <el-form-item label="用户昵称">
        <el-input v-model="profileForm.nickname" />
      </el-form-item>

      <el-form-item label="旧密码">
        <el-input v-model="profileForm.password" />
      </el-form-item>

      <el-form-item label="新密码">
        <el-input v-model="profileForm.password" />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="profileForm.gender" class="ml-4">
          <el-radio label="1">男性</el-radio>
          <el-radio label="2">女性</el-radio>
          <el-radio label="3">保密</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像">
        <div class="profile-avatar">
          <el-avatar shape="square" :size="100" :src="curProfilePicture" />
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

      <el-form-item label="">
        <div class="btn-group">
          <el-button class="resetBtn">重置</el-button>
          <el-button class="saveBtn" type="primary">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const store = useStore()

// 用户信息表单
const profileForm = ref({})

// 用户头像
const curProfilePicture = ref('')
const uploadPictureRef = ref(null)
const changeAvatar = () => {
  uploadPictureRef.value.click()
}
const uploadFileChange = (e) => {
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  store.dispatch('user/changeUserAvatar', formData).then((resp) => {
    curProfilePicture.value = `http://localhost:3000${resp.url}`
  })
}

watch(
  () => store.getters.userProfile,
  (n) => {
    profileForm.value = n
    curProfilePicture.value = n.picture
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
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  .profile-header {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: center;
  }

  .profile-form {
    width: 500px;
    max-width: 800px;

    :deep(.el-input__wrapper) {
      border: 1px solid #e4e7ed;
    }

    :deep(.el-form-item__label) {
      margin-right: 10px;
    }

    .profile-avatar {
      display: flex;
      flex-direction: column;
      .avatar-change {
        display: flex;
        margin-top: 2px;
        justify-content: flex-start;
      }
    }

    .btn-group {
      margin-top: 15px;

      .saveBtn {
        // width: 80px;
      }

      .resetBtn {
        // width: 80px;
        // margin-right: 20px;
      }
    }
  }
}
</style>
