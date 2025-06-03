<template>
  <HeaderBase>
    在线支付
  </HeaderBase>

  <h3>订单信息：</h3>
  <div class="order-info">
    <span>
      {{ store_name }}
      <i class="fa fa-caret-down" style="cursor: pointer;" @click="is_show_detail = !is_show_detail"></i>
    </span>
    <span>&#165;{{ total_price }}</span>
  </div>

  <ul class="order-detailet" v-show="is_show_detail">
    <li v-for="(item, index) in items" :key="index">
      <span>{{ item.name }}</span>
      <span>&#165;{{ item.price }}</span>
    </li>
    <li>
      <span>配送费</span>
      <span>&#165;3</span>
    </li>
  </ul>

  <ul class="payment-type">
    <li @click="is_wechat_pay = false">
      <div class="payment-info">
        <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/alipay.png" />
        <span class="payment-text">支付宝</span>
      </div>
      <i class="fa fa-check-circle" v-show="!is_wechat_pay"></i>
    </li>
    <li @click="is_wechat_pay = true">
      <div class="payment-info">
        <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/wechatpay.png" />
        <span class="payment-text">微信支付</span>
      </div>
      <i class="fa fa-check-circle" v-show="is_wechat_pay"></i>
    </li>
  </ul>

  <div class="payment-button">
    <el-button type="success" @click="goToPay">
      <span>确认支付</span>
    </el-button>
  </div>

</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { showInfoToUser } from '@/utils/notice';
import { useRoute } from 'vue-router';
import router from '@/router';
import store from '@/store';
import { ref } from 'vue';
import $ from 'jquery';

export default {
  name: "PayView",
  components: {
    HeaderBase,
  },

  setup() {
    const route = useRoute();
    const order = JSON.parse(route.query.order_json);

    const order_id = order["orderId"] || route.query.order_id;
    console.log("order id:", order_id);

    const item = JSON.parse(order["items"]);
    const store_name = order["storeName"];
    const total_price = order["totalPrice"];
    const items = ref([]);
    const is_show_detail = ref(false);
    const is_wechat_pay = ref(false);

    Object.keys(item).forEach(key => {
      const index = key.lastIndexOf("@");
      const id = key.slice(index + 1);
      const name = key.slice(0, index);
      items.value.push({
        id: id,
        name: name,
        price: item[key],
      })
    });
    items.value.sort((a, b) => a.id.localeCompare(b.id));

    // 处理支付
    const goToPay = () => {
      $.ajax({
        url: 'https://data.zxylearn.top/submitPayOrder?orderId=' + order_id,
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${store.state.access_token}`
        },
        success: (data) => {
          if (data !== null && data !== '' && data) {
            showInfoToUser("支付成功", "success");
            router.push({
              name: "order",
            })
          } else {
            showInfoToUser("支付失败", "error");
          }
        },
        error: (error) => {
          showInfoToUser("支付失败", "error");
          console.error("failed to pay order: ", error);
        }
      });
    };


    return {
      store_name,
      total_price,
      items,
      is_show_detail,
      is_wechat_pay,

      goToPay,
    }
  }
}
</script>


<style scoped>
h3 {
  margin-top: 12vw;
  margin-bottom: 2vw;
  box-sizing: border-box;
  padding: 4vw 4vw 0;

  font-size: 4vw;
  font-weight: 300;
  color: #999;
}

.order-info {
  box-sizing: border-box;
  padding: 0 0 0 4vw;
  font-size: 4vw;
  color: #666;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0;
}

.order-info span:last-child {
  color: orangered;
  padding-right: 4vw;
}


.order-detailet {
  width: 100%;

  margin-top: 1.5vw;
  margin-bottom: 0;
  padding: 0;
}

.order-detailet li {
  width: 100%;
  box-sizing: border-box;
  padding: 0 4vw 0 4vw;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 0.5vw;
}

.order-detailet li span {
  font-size: 3vw;
  color: #666;
}

.payment-type {
  width: 100%;

  margin: 2vw 0 0 0;
  padding: 0;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.payment-text {
  font-size: 4vw;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;

  margin-left: 2vw;
}

.payment-type li {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
}

.payment-type li img {
  width: 12vw;
  height: 12vw;
}

.payment-type li .fa-check-circle {
  font-size: 5vw;
  color: #38CA73;
}

.payment-button {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;
}

.payment-button button {
  width: 100%;
  height: 10vw;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #38CA73;
  color: #fff;
}
</style>