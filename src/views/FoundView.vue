<template>
  <HeaderBase>
    商家列表
  </HeaderBase>

  <ul class="business-list">
    <li v-for="business in businesses" :key="business.id" @click="clickBusiness(business.id)">
      <div class="business-img">
        <img :src="business.img_url">
        <div class="business-img-quantity" v-if="business.chat_quantity.value > 0">{{ business.chat_quantity }}</div>
      </div>
      <div class="business-info">
        <h3>{{ business.business_name }}</h3>
        <p>&#165;15起送 | &#165;3配送</p>
        <p>{{ business.business_description }}</p>
      </div>
    </li>
  </ul>

</template>


<script>
import HeaderBase from '@/components/HeaderBase.vue';
import router from '@/router'
import {ref} from 'vue'

export default {
  name: "FoundView",

  components: {
    HeaderBase,
  },

  setup() {

    const businesses = [
      {
        id: 1,
        chat_quantity: ref(3),
        img_url: require('../img/sj01.png'),
        business_name: '万家饺子（软件园E18店）',
        business_description: '各种饺子炒菜',
      },
      {
        id: 2,
        chat_quantity: ref(2),
        img_url: require('../img/sj02.png'),
        business_name: '小锅饭豆腐馆（全运店）',
        business_description: '特色美食',
      },
      {
        id: 3,
        chat_quantity: ref(1),
        img_url: require('../img/sj03.png'),
        business_name: '麦当劳麦乐送（全运路店）',
        business_description: '汉堡薯条',
      },
      {
        id: 4,
        chat_quantity: ref(0),
        img_url: require('../img/sj04.png'),
        business_name: '米村拌饭（浑南店）',
        business_description: '各种炒菜拌饭',
      },
      {
        id: 5,
        chat_quantity: ref(0),
        img_url: require('../img/sj05.png'),
        business_name: '申记串道（中海康城店）',
        business_description: '烤串炸串',
      },
      {
        id: 6,
        chat_quantity: ref(0),
        img_url: require('../img/sj06.png'),
        business_name: '半亩良田排骨米饭',
        business_description: '排骨米饭套餐',
      },
      {
        id: 7,
        chat_quantity: ref(0),
        img_url: require('../img/sj07.png'),
        business_name: '茶兮鲜果饮品（国际软件园店）',
        business_description: '甜品饮品',
      },
      {
        id: 8,
        chat_quantity: ref(0),
        img_url: require('../img/sj08.png'),
        business_name: '唯一水果捞（软件园E18店）',
        business_description: '新鲜水果',
      },
      {
        id: 9,
        chat_quantity: ref(0),
        img_url: require('../img/sj09.png'),
        business_name: '满园春饼（全运路店）',
        business_description: '各种春饼',
      },
    ]

    const updateChatQuantity = (id, newChatQuantity) => {
      const business = businesses.find(item => item.id === id)
      if (business) {
        business.chat_quantity.value = newChatQuantity;
      } else {
        console.warn(`not found business:${id}`);
      }
    };

    const clickBusiness = (id) => {
      updateChatQuantity(id, 0);

      router.push({
        name: "chat",
        params: {
          id
        }
      })

    };


    return {
      businesses,
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