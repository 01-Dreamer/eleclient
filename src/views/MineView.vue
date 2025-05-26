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
      <img class="profile-image" :src="avatar_url" alt="未发现头像" />
    </div>

    <div class="mine-info-item location-item">
      <el-button type="primary" circle @click="changeLocation">
        <el-icon>
          <Location />
        </el-icon>
      </el-button>
      <div class="location-text-wrapper">
        <span class="location-text">
          云南大学软件学院
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
      <el-button type="primary" @click="goToStore" class="action-btn">
        <el-icon>
          <Shop />
        </el-icon>
        <span>我的店铺</span>
      </el-button>
    </div>

    <div class="mine-info-item full-width">
      <el-button type="danger" @click="logout" class="action-btn">
        <el-icon>
          <SwitchButton />
        </el-icon>
        <span>退出登录</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import HeaderBase from "@/components/HeaderBase.vue";
import $ from "jquery";
import { showInfoToUser } from '@/utils/notice';
import {
  Camera,
  Location,
  Shop,
  SwitchButton
} from '@element-plus/icons-vue';

export default {
  name: "MineView",

  components: {
    HeaderBase,
    Camera,
    Location,
    Shop,
    SwitchButton
  },

  setup() {
    const avatar_url = ref("https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/0db0c107-c9c3-4aa2-a6dc-e67c5ebd3868.jpg");

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
          url: 'http://localhost:12345/upload',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: (data) => {
            if(data === null) {
              showInfoToUser("头像上传失败", "error");
            } else {
              avatar_url.value = data;
              showInfoToUser("头像上传成功", "success");
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
      console.log('更换位置');
    };

    const goToStore = () => {
      console.log('前往我的店铺');
    };

    const logout = () => {
      console.log('退出登录');
    };

    return {
      avatar_url,

      changeAvatar,
      changeLocation,
      goToStore,
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
</style>
