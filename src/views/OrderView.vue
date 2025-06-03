<template>
  <HeaderBase>我的订单</HeaderBase>

  <el-main class="order-container">
    <el-card class="order-section" v-if="unpair_orders.length">
      <template #header>
        <div class="order-header">
          <span class="section-title">未支付订单</span>
        </div>
      </template>

      <el-collapse>
        <el-collapse-item v-for="order in unpair_orders" :key="order.id">
          <template #title>
            <div class="order-title">
              <span>{{ order.store_name }}</span>
              <span class="order-price">¥{{ order.total_price }}</span>
            </div>
          </template>

          <div class="order-content">
            <div class="order-item" v-for="(item, index) in order.items" :key="index">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">¥{{ item.price }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">配送费</span>
              <span class="item-price">¥3</span>
            </div>
            <el-button type="warning" size="small" class="pay-btn"
              @click="goToPay(order.order_json, order.id)">去支付</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card class="order-section" v-if="pair_orders.length">
      <template #header>
        <div class="order-header">
          <span class="section-title">已支付订单</span>
        </div>
      </template>

      <el-collapse>
        <el-collapse-item v-for="order in pair_orders" :key="order.id">
          <template #title>
            <div class="order-title">
              <span>{{ order.store_name }}</span>
              <span class="order-price">¥{{ order.total_price }}</span>
            </div>
          </template>

          <div class="order-content">
            <div class="order-item" v-for="(item, index) in order.items" :key="index">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">¥{{ item.price }}</span>
            </div>
            <div class="order-item">
              <span class="item-name">配送费</span>
              <span class="item-price">¥3</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </el-main>
</template>

<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { ref } from 'vue';
import store from '@/store';
import router from '@/router';
import $ from 'jquery';


export default {
  name: "OrderView",
  components: {
    HeaderBase
  },

  setup() {
    const unpair_orders = ref([]);
    const pair_orders = ref([]);

    // 获取我的所有订单信息
    $.ajax({
      url: 'https://data.zxylearn.top/getMyPayOrder',
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${store.state.access_token}`
      },
      success: (data) => {
        if (data !== null && data !== '') {
          data.forEach(i => {

            const order = JSON.parse(i.orderInfo);
            const store_name = order["storeName"];
            const total_price = order["totalPrice"];
            const item = JSON.parse(order["items"]);
            const items = [];
            Object.keys(item).forEach(key => {
              const index = key.lastIndexOf("@");
              const id = key.slice(index + 1);
              const name = key.slice(0, index);
              items.push({
                id: id,
                name: name,
                price: item[key],
              })
            });
            items.sort((a, b) => a.id.localeCompare(b.id));

            if (i.pay) {
              pair_orders.value.push({
                id: i.orderId,
                store_name: store_name,
                total_price: total_price,
                order_json: i.orderInfo,
                items: items
              });
            } else {
              unpair_orders.value.push({
                id: i.orderId,
                store_name: store_name,
                total_price: total_price,
                order_json: i.orderInfo,
                items: items
              });
            }
          });
        }
      },
      error: (error) => {
        console.error("failed to my order: ", error);
      }
    });


    const goToPay = (order_json, order_id) => {
      router.push({
        name: "pay",
        query: {
          order_json: order_json,
          order_id: order_id
        },
      })
    };


    return {
      unpair_orders,
      pair_orders,

      goToPay
    }
  }
}
</script>

<style scoped>
.order-container {
  padding: 0;
  margin-top: 14vw;
}

.order-section {
  margin-bottom: 3vw;
  border-radius: 1.5vw;
}

.order-header {
  padding: 0 3vw;
}

.section-title {
  font-size: 3.8vw;
  color: #666;
}

.order-title {
  display: flex;
  justify-content: space-between;
  padding: 0 3vw;
  font-size: 3.6vw;
}

.order-price {
  color: #FF6700;
  font-weight: bold;
}

.order-content {
  padding: 0 3vw;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 2.5vw 0;
  font-size: 3.4vw;
  border-bottom: 0.2vw solid #F5F5F5;
}

.item-price {
  color: #FF6700;
}

.pay-btn {
  margin: 3vw 0 2vw;
  width: 20vw;
  font-size: 3.2vw;
}

:deep(.el-collapse-item__header) {
  padding: 0 3vw;
  height: 12vw;
  font-size: 3.6vw;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}
</style>