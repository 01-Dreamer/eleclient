<template>
  <HeaderBase>
    商家列表
  </HeaderBase>

  <ul class="business-list">
    <li v-for="business in businesses" :key="business.id" @click="clickBusiness(business.id)">
      <div class="business-img">
        <img :src="business.store_cover">
        <div class="business-img-quantity" v-if="getMsgCount(business.id) > 0">
          {{ getMsgCount(business.id) }}
        </div>
      </div>
      <div class="business-info">
        <h3>{{ business.store_name }}</h3>
        <p>&#165;15起送 | &#165;3配送</p>
        <p>{{ business.store_description }}</p>
      </div>
    </li>
  </ul>

</template>


<script>
import HeaderBase from '@/components/HeaderBase.vue';
import router from '@/router';
import { ref, computed } from 'vue';
import store from '@/store';
import $ from 'jquery';

export default {
  name: "FoundView",

  components: {
    HeaderBase,
  },

  setup() {
    const businesses = ref([]);
    const msg_count = computed(() => store.state.msg_count);
    const getMsgCount = (id) => {
      return msg_count.value.get(parseInt(id)) || 0;
    };
    

    // 获取所有商家信息
    $.ajax({
      url: 'https://data.zxylearn.top/getAllEleBusiness',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${store.state.access_token}`
      },
      success: (data) => {
        if (data === "" || data === null) {
          return;
        }
        businesses.value = [];
        data.forEach(business => {
          businesses.value.push({
            id: business.id,
            store_name: business.storeName,
            store_description: business.storeDescription,
            store_cover: business.storeCover || 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultStoreCover.png',
          })
        });
      },
      error: (error) => {
        console.error('failed to get business info:', error);
      }
    });

    // 处理点击商家事件
    const clickBusiness = (id) => {
      store.dispatch("clearMsgCount", parseInt(id));
      router.push({
        name: "business",
        params: {
          id
        }
      })
    };

    
    return {
      businesses,

      getMsgCount,
      clickBusiness,
    }

  }
}
</script>


<style scoped>
.business-list {
  width: 100%;
  margin-top: 12vw;
  margin-bottom: 14vw;

  padding: 0;
}

.business-list li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  border-bottom: solid 1px #DDD;
  user-select: none;
  cursor: pointer;

  display: flex;
  align-items: center;
}

.business-list li .business-img {
  position: relative;
}

.business-list li .business-img img {
  width: 20vw;
  height: 20vw;
}

.business-list li .business-img .business-img-quantity {
  width: 5vw;
  height: 5vw;
  background-color: red;
  color: #FFF;
  font-size: 3.6vw;
  border-radius: 2.5vw;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}

.business-list li .business-info {
  margin-left: 3vw;
}

.business-list li .business-info h3 {
  font-size: 3.8vw;
  color: #555;

  margin-bottom: 0;
}

.business-list li .business-info p {
  font-size: 3vw;
  color: #888;

  margin-top: 2vw;
}
</style>