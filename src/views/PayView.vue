<template>
  <HeaderBase>
    在线支付
  </HeaderBase>

  <h3>订单信息：</h3>
  <div class="order-info">
    <span>
      万家饺子（软件园E18店）
      <i class="fa fa-caret-down" id="showBtn"></i>
    </span>
    <span>&#165;49</span>
  </div>

  <ul class="order-detailet" id="detailetBox">
    <li>
      <span>纯肉鲜肉（水饺） x 2</span>
      <span>&#165;15</span>
    </li>
    <li>
      <span>配送费</span>
      <span>&#165;3</span>
    </li>
  </ul>

  <ul class="payment-type">
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/alipay.png">
      <i class="fa fa-check-circle"></i>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/wechatpay.png">
    </li>
  </ul>
  <div class="payment-button">
    <el-button type="success">
      <span>确认支付</span>
    </el-button>
  </div>
</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";

export default {
  name: "PayView",
  components: {
    HeaderBase,
  },
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

  margin: 0;
  padding: 0;
}

.payment-type li {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
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