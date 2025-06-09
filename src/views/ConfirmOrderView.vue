<template>
  <HeaderBase>
    确认订单
  </HeaderBase>


  <div class="user-info">
    <h5>订单配送至：</h5>
    <div class="user-info-address">
      <span>{{ location }}</span>
      <i class="fa fa-angle-right"></i>
    </div>
    <span>云先生 12345678900</span>
  </div>

  <div class="order-info">
    <h3>{{ store_name }}</h3>
    <ul class="order-detailed">
      <li v-for="(item, index) in items" :key="index">
        <div class="order-detailed-left">
          <img :src="item.cover">
          <p>{{ item.name }}</p>
        </div>
        <p>&#165;{{ item.price }}</p>
      </li>
    </ul>
    <div class="order-deliveryfee">
      <p>配送费</p>
      <p>&#165;3</p>
    </div>
  </div>


  <div class="total">
    <div class="total-left">
      &#165;{{ total_price }}
    </div>
    <div class="total-right" @click="goToPay">
      去支付
    </div>
  </div>
</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import store from '@/store';


export default {
  name: "ConfirmOrderView",
  components: {
    HeaderBase,
  },

  setup() {
    const location = computed(() => store.state.location_text);

    const route = useRoute();
    const order_json = route.query.order_json;
    const order = JSON.parse(order_json);
    const item = JSON.parse(order["items"]);
    const cover = JSON.parse(route.query.cover_json);

    const store_name = order["storeName"];
    const total_price = order["totalPrice"];


    const items = ref([]);
    Object.keys(item).forEach(key => {
      const index = key.lastIndexOf("@");
      const id = key.slice(index + 1);
      const name = key.slice(0, index);
      items.value.push({
        id: id,
        name: name,
        price: item[key],
        cover: cover[id]
      })
    });
    items.value.sort((a, b) => a.id.localeCompare(b.id));

    const goToPay = () => {
      router.push({
        name: "pay",
        query: {
          order_json: order_json,
        },
      })
    };

    return {
      location,
      store_name,
      total_price,
      items,

      goToPay
    }
  }
}
</script>





<style scoped>
.user-info {
  width: 100%;
  background-color: #0097EF;
  box-sizing: border-box;
  padding: 2vw;
  color: #FFF;

  position: fixed;
  left: 0;
  top: 12vw;
}

.user-info h5 {
  font-size: 3vw;
  font-weight: 300;

  margin: 0;
}

.user-info .user-info-address {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 700;
  user-select: none;
  margin: 0;
}

.user-info .user-info-address span {
  width: 90%;
  font-size: 5vw;
}

.user-info .user-info-address i {
  font-size: 6vw;
}

.user-info span {
  font-size: 3vw;

  margin: 0;
}

.order-info {
  margin-top: 35vw;
}

.order-info h3 {
  box-sizing: border-box;
  padding: 3vw;
  font-size: 4vw;
  color: #666;
  border-bottom: solid 1px #DDD;

  margin: 0;
}

.order-info .order-detailed {
  width: 100%;
  padding: 0;
  margin: 0;
}

.order-info .order-detailed li {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info .order-detailed li .order-detailed-left {
  display: flex;
  align-items: center;
}

.order-info .order-detailed li .order-detailed-left img {
  width: 10vw;
  height: 10vw;
}

.order-info .order-detailed li .order-detailed-left p {
  font-size: 3.5vw;
  margin-left: 3vw;
}

.order-info .order-detailed li p {
  font-size: 3.5vw;
}

.order-info .order-deliveryfee {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  margin: 0;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.5vw;
}

.total {
  width: 100%;
  height: 14vw;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;

  margin-bottom: 13vw;
  z-index: 1000;
}

.total .total-left {
  flex: 2;
  background-color: #505051;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

.total .total-right {
  flex: 1;
  background-color: #38CA73;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>