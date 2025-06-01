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
    <h3>万家饺子（软件园E18店）</h3>
    <ul class="order-detailed">
      <li>
        <div class="order-detailed-left">
          <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultAvatar.png">
          <p>纯肉鲜肉（水饺） x 2</p>
        </div>
        <p>&#165;15</p>
      </li>
    </ul>
    <div class="order-deliveryfee">
      <p>配送费</p>
      <p>&#165;3</p>
    </div>
  </div>


  <div class="total">
    <div class="total-left">
      &#165;49
    </div>
    <div class="total-right">
      去支付
    </div>
  </div>



</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { computed } from 'vue';
import store from '@/store';

export default {
  name: "ConfirmPayView",
  components: {
    HeaderBase,
  },

  setup() {
    const location = computed(() => store.state.location_text);

    return {
      location,
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