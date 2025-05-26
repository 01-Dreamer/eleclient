<template>
  <HeaderBase>
    商家信息:{{ other_id }}
  </HeaderBase>

  <div class="business-logo">
    <img src="../img/sj01.png">
  </div>

  <div class="business-info">
    <h1>万家饺子（软件园E18店）</h1>
    <p>&#165;15起送 &#165;3配送</p>
    <p>各种饺子炒菜</p>
    <el-button type="primary" size="small" @click="clickContact" v-show="self_id !== other_id" class="contact-btn">
      联系商家
    </el-button>
  </div>

  <ul class="food">
    <li>
      <div class="food-left">
        <img src="../img/sp01.png">
        <div class="food-left-info">
          <h3>纯肉鲜肉（水饺）</h3>
          <p>新鲜猪肉</p>
          <p>&#165;15</p>
        </div>
      </div>
      <div class="food-right">
        <div>
          <i class="fa fa-minus-circle"></i>
        </div>
        <p><span>3</span></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp02.png">
        <div class="food-left-info">
          <h3>玉米鲜肉（水饺）</h3>
          <p>玉米鲜肉</p>
          <p>&#165;16</p>
        </div>
      </div>
      <div class="food-right">
        <div>
          <i class="fa fa-minus-circle"></i>
        </div>
        <p><span>2</span></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp03.png">
        <div class="food-left-info">
          <h3>虾仁三鲜（蒸饺）</h3>
          <p>虾仁三鲜</p>
          <p>&#165;22</p>
        </div>
      </div>
      <div class="food-right">
        <div>
        </div>
        <p></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp04.png">
        <div class="food-left-info">
          <h3>素三鲜（蒸饺）</h3>
          <p>素三鲜</p>
          <p>&#165;15</p>
        </div>
      </div>
      <div class="food-right">
        <div>
        </div>
        <p></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp05.png">
        <div class="food-left-info">
          <h3>角瓜鸡蛋（蒸饺）</h3>
          <p>角瓜鸡蛋</p>
          <p>&#165;16</p>
        </div>
      </div>
      <div class="food-right">
        <div>
        </div>
        <p></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp06.png">
        <div class="food-left-info">
          <h3>小白菜肉（水饺）</h3>
          <p>小白菜肉</p>
          <p>&#165;18</p>
        </div>
      </div>
      <div class="food-right">
        <div>
        </div>
        <p></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
    <li>
      <div class="food-left">
        <img src="../img/sp07.png">
        <div class="food-left-info">
          <h3>芹菜牛肉（水饺）</h3>
          <p>芹菜牛肉</p>
          <p>&#165;18</p>
        </div>
      </div>
      <div class="food-right">
        <div>
        </div>
        <p></p>
        <div>
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </li>
  </ul>

  <div class="cart">
    <div class="cart-left">
      <div class="cart-left-icon">
        <i class="fa fa-shopping-cart"></i>
        <div class="cart-left-icon-quantity">3</div>
      </div>
      <div class="cart-left-info">
        <p>&#165;12.88</p>
        <p>另需配送费3元</p>
      </div>
    </div>
    <div class="cart-right">
      <div class="cart-right-item" onclick="location.href='order.html'">
        去结算
      </div>
    </div>
  </div>




</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { useRoute } from 'vue-router';
import store from '@/store';
import router from '@/router';
import { ref } from 'vue';

export default {
  name: "BusinessView",

  components: {
    HeaderBase,
  },

  setup() {
    const route = useRoute();
    const self_id = String(store.state.id);
    const other_id = ref(String(route.params.id));

    const clickContact = () => {
      router.push({
        name: "chat",
        params: {
          other_id
        }
      })
    };

    return {
      self_id,
      other_id,

      clickContact,
    }
  }
}
</script>


<style scoped>
.business-logo {
  width: 100%;
  height: 35vw;

  margin-top: 12vw;

  display: flex;
  justify-content: center;
  align-items: center;
}

.business-logo img {
  width: 40vw;
  height: 30vw;
  border-radius: 5px;
}

.business-info {
  width: 100%;
  height: 20vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.business-info h1 {
  font-size: 5vw;

  margin: 0 auto;
}

.business-info p {
  font-size: 3vw;
  color: #666;

  margin: 0 auto;
}

.business-info .contact-btn {
  margin-top: 2vw;
  font-size: 3.5vw;
  padding: 1.5vw 3vw;
}

.food {
  width: 100%;
  margin-top: 0;
  margin-bottom: 28vw;

  padding-left: 0;
}

.food li {
  width: 100%;
  box-sizing: border-box;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 2.5vw 0 2.5vw;
}

.food li .food-left {
  display: flex;
  align-items: center;
}

.food li .food-left img {
  width: 20vw;
  height: 20vw;
}

.food li .food-left .food-left-info {
  margin-left: 3vw;
}

.food li .food-left .food-left-info h3 {
  font-size: 3.8vw;
  color: #555;
}

.food li .food-left .food-left-info p {
  font-size: 3vw;
  color: #888;
  margin-top: 2vw;
}

.food li .food-right {
  width: 16vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.food li .food-right .fa-minus-circle {
  font-size: 5.5vw;
  color: #999;
  cursor: pointer;
}

.food li .food-right p {
  font-size: 3.6vw;
  color: #333;
}

.food li .food-right .fa-plus-circle {
  font-size: 5.5vw;
  color: #0097EF;
  cursor: pointer;
}

.cart {
  width: 100%;
  height: 14vw;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;

  margin-bottom: 13vw;
  z-index: 1000;
}

.cart .cart-left {
  flex: 2;
  background-color: #505051;
  display: flex;
}

.cart .cart-left .cart-left-icon {
  width: 16vw;
  height: 16vw;
  box-sizing: border-box;
  border: solid 1.6vw #444;
  border-radius: 8vw;
  background-color: #3190E8;
  font-size: 7vw;
  color: #FFF;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: -4vw;
  margin-left: 3vw;

  position: relative;
}

.cart .cart-left .cart-left-icon-quantity {
  width: 5vw;
  height: 5vw;
  border-radius: 2.5vw;
  background-color: red;
  color: #FFF;
  font-size: 3.6vw;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}

.cart .cart-left .cart-left-info p:first-child {
  font-size: 4.5vw;
  color: #FFF;
  margin-top: 1vw;
}

.cart .cart-left .cart-left-info p:last-child {
  font-size: 2.8vw;
  color: #AAA;
}

.cart .cart-right {
  flex: 1;
}

.cart .cart-right .cart-right-item {
  width: 100%;
  height: 100%;
  background-color: #38CA73;
  color: #FFF;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>