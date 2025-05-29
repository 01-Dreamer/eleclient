<template>
  <HeaderBase>
    我的信息
  </HeaderBase>
  <div class="mine-info">
    <div class="mine-info-item">
      <el-button type="primary" circle @click="changeAvatar">
        <el-icon>
          <Camera />
        </el-icon>
      </el-button>
      <img class="profile-image" :src="avatar" />
    </div>

    <div class="mine-info-item location-item">
      <el-button type="primary" circle @click="changeLocation">
        <el-icon>
          <Location />
        </el-icon>
      </el-button>
      <div class="location-text-wrapper">
        <span class="location-text">
          {{ location }}
        </span>
      </div>
    </div>

    <div class="mine-info-item">
      <el-icon class="sales-icon">
        <Shop />
      </el-icon>
      <div class="sales-text">
        <span>店铺销量：<strong>1200</strong> 单</span>
      </div>
    </div>

    <div class="mine-info-item full-width">
      <el-button type="primary" @click="goToMyStore" class="action-btn">
        <el-icon>
          <Shop />
        </el-icon>
        <span>我的店铺</span>
      </el-button>
    </div>

    <div class="footer">
      <el-button type="warning" @click="changeUser" class="action-btn">
        <el-icon>
          <RefreshRight />
        </el-icon>
        <span>切换账号</span>
      </el-button>
      <div class="mine-info-item full-width">
        <el-button type="danger" @click="logout" class="action-btn">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>退出登录</span>
        </el-button>
      </div>
    </div>


  </div>
</template>

<script>
import { computed } from 'vue';
import HeaderBase from "@/components/HeaderBase.vue";
import $ from "jquery";
import { showInfoToUser } from '@/utils/notice';
import router from '@/router';
import store from '@/store';
import { ElMessageBox } from 'element-plus';
import {
  Camera,
  Location,
  Shop,
  RefreshRight,
  SwitchButton
} from '@element-plus/icons-vue';

export default {
  name: "MineView",

  components: {
    HeaderBase,
    Camera,
    Location,
    Shop,
    RefreshRight,
    SwitchButton
  },

  setup() {
    const avatar = computed(() => store.state.avatar);
    const location = computed(() => store.state.location_text);

    const changeAvatar = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png, image/jpeg';
      input.style.display = 'none';

      input.onchange = () => {
        const file = input.files[0];
        if (!file) return;
        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
          showInfoToUser("只支持上传 PNG 或 JPG 格式的图片", "warning");
          return;
        }
        const formData = new FormData();
        formData.append('file', file);

        $.ajax({
          url: 'http://localhost:12345/uploadAvatar',
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${store.state.access_token}`
          },
          data: formData,
          processData: false,
          contentType: false,
          success: (data) => {
            if (data === "") {
              showInfoToUser("头像上传失败", "error");
            } else {
              showInfoToUser("头像上传成功", "success");
              store.dispatch("updateAvatar", data);
              console.log("avatar url: ", data);
            }
          },
          error: (error) => {
            showInfoToUser("头像上传失败", "error");
            console.error("failed to upload: ", error);
          }
        });
      };
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    };


    const changeLocation = () => {
      ElMessageBox.prompt('请输入您的位置', '位置设置', {
        confirmButtonText: '定位',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        inputErrorMessage: '请输入有效位置信息',
      }).then(({ value }) => {
        $.ajax({
          url: 'http://localhost:12345/getPosition?address=' + value.trim(),
          type: 'GET',
          headers: {
            'Authorization': `Bearer ${store.state.access_token}`
          },
          success: (data) => {
            if (data === "") {
              showInfoToUser("定位失败", "error");
            } else {
              showInfoToUser("定位成功", "success");
              store.dispatch("updateLocation", {
                longitude: data.longitude,
                latitude: data.latitude,
                location_text: value.trim()
              });
              console.log("position: ", data);
            }
          },
          error: (error) => {
            showInfoToUser("定位失败", "error");
            console.error("failed to get location: ", error);
          }
        });
      });

    };

    const goToMyStore = () => {
      console.log('前往我的店铺');
    };

    const changeUser = () => {
      store.dispatch("logout", false);
      router.push({
        name: "login",
      })
    };

    const logout = () => {
      store.dispatch("logout", true);
      localStorage.removeItem('refresh_token');
      router.push({
        name: "login",
      })
    };

    return {
      avatar,
      location,

      changeAvatar,
      changeLocation,
      goToMyStore,
      changeUser,
      logout
    };
  }
}
</script>

<style scoped>
.mine-info {
  font-family: Arial, sans-serif;
  padding: 4vw;
  margin-top: 14vw;
  height: 78vh;
  background: linear-gradient(45deg, #F06, #FF8);
}

.mine-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 4vw;
  gap: 4vw;
}

.location-item {
  align-items: center;
}

.full-width {
  display: block;
}

.profile-image {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  object-fit: cover;
  border: 0.2vw solid #e0e0e0;
}

.location-text-wrapper {
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.location-text {
  font-size: 4vw;
  color: #333;
  line-height: 1.5;
  white-space: normal;
}

.sales-icon {
  font-size: 5vw;
  color: #007BFF;
  margin-left: 2vw;
}

.sales-text {
  font-size: 4vw;
  color: #333;
}

.action-btn {
  width: 100%;
  margin-top: 2vw;
}

.footer {
  margin-top: 60vw;
}
</style>
