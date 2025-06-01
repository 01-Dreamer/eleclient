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
            <el-button type="warning" size="small" class="pay-btn">去支付</el-button>
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


export default {
  name: "OrderView",
  components: {
    HeaderBase
  },

  setup() {
    const unpair_orders = ref([
      {
        id: 1,
        store_name: "万家饺子（软件园E18店）",
        total_price: 49,
        items: [
          { name: "纯肉鲜肉（水饺） x 2", price: 15 },
          { name: "玉米鲜肉（水饺） x 1", price: 16 }
        ]
      }
    ]);

    const pair_orders = ref([
      {
        id: 2,
        store_name: "万家饺子（软件园E18店）",
        total_price: 49,
        items: [
          { name: "纯肉鲜肉（水饺） x 2", price: 15 },
          { name: "玉米鲜肉（水饺） x 1", price: 16 }
        ]
      },
      {
        id: 3,
        store_name: "肯德基（中山路店）",
        total_price: 68,
        items: [
          { name: "香辣鸡腿堡 x 1", price: 18 },
          { name: "薯条（大） x 1", price: 12 },
          { name: "可乐（大） x 1", price: 10 }
        ]
      }
    ]);

    return {
      unpair_orders,
      pair_orders
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