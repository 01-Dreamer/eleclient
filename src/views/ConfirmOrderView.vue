<template>
  <HeaderBase>
    确认订单
  </HeaderBase>


  <div class="order-info">
    <h5>订单配送至：</h5>
    <div class="order-info-address">
      <p>沈阳市浑南区智慧四街1-121号</p>
      <i class="fa fa-angle-right"></i>
    </div>
    <p>张先生 13656785432</p>
  </div>

  <h3>万家饺子（软件园E18店）</h3>
  <ul class="order-detailed">
    <li>
      <div class="order-detailed-left">
        <img src="../img/sp01.png">
        <p>纯肉鲜肉（水饺） x 2</p>
      </div>
      <p>&#165;15</p>
    </li>
    <li>
      <div class="order-detailed-left">
        <img src="../img/sp02.png">
        <p>玉米鲜肉（水饺） x 1</p>
      </div>
      <p>&#165;16</p>
    </li>
  </ul>
  <div class="order-deliveryfee">
    <p>配送费</p>
    <p>&#165;3</p>
  </div>

  <div class="total">
    <div class="total-left">
      &#165;49
    </div>
    <div class="total-right" onclick="location.href='payment.html'">
      去支付
    </div>
  </div>



</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";

export default {
  name: "ConfirmPayView",
  components: {
    HeaderBase,
  },
}
</script>


<style scoped>
.order-info {
  width: 100%;
  margin-top: 12vw;
  background-color: #0097EF;
  box-sizing: border-box;
  padding: 2vw;
  color: #fff;
}

.order-info h5 {
  font-size: 3vw;
  font-weight: 300;

  background-color: red;
}

.order-info .order-info-address {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 700;
  user-select: none;
  cursor: pointer;
  margin: 1vw 0;

  background-color: black;
}

.order-info .order-info-address p {
  width: 90%;
  font-size: 5vw;
}

.order-info .order-info-address i {
  font-size: 6vw;
}

.order-info p {
  font-size: 3vw;
}

h3 {
  box-sizing: border-box;
  padding: 3vw;
  font-size: 4vw;
  color: #666;
  border-bottom: solid 1px #DDD;
}

.order-detailed {
  width: 100%;
  padding: 0;
}

.order-detailed li {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-detailed li .order-detailed-left {
  display: flex;
  align-items: center;
}

.order-detailed li .order-detailed-left img {
  width: 10vw;
  height: 10vw;
}

.order-detailed li .order-detailed-left p {
  font-size: 3.5vw;
  margin-left: 3vw;
}

.order-detailed li p {
  font-size: 3.5vw;
}

.order-deliveryfee {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
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