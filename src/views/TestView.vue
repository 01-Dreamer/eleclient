<template>

  <ul class="business">
    <li>
      <img src="../img/sj01.png">
      <div class="business-info">
        <div class="business-info-h">
          <h3>万家饺子（软件园E18店）</h3>
          <div class="business-info-like">&#8226;</div>
        </div>
        <div class="business-info-star">
          <div class="business-info-star-left">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <span>4.9&nbsp;&nbsp;月售345单</span>
          </div>
          <div class="business-info-star-right">
            蜂鸟专送
          </div>
        </div>
        <div class="business-info-delivery">
          <span>&#165;15起送 | &#165;3配送</span>
          <span>3.22km | 30分钟</span>
        </div>
        <div class="business-info-explain">
          <div>各种饺子</div>
        </div>
        <div class="business-info-promotion">
          <div class="business-info-promotion-left">
            <div class="business-info-promotion-left-incon">新</div>
            <span>饿了么新用户首单立减9元</span>
          </div>
          <div class="business-info-promotion-right">
            <span>2个活动</span>
            <i class="fa fa-caret-down"></i>
          </div>
        </div>
        <div class="business-info-promotion">
          <div class="business-info-promotion-left">
            <div class="business-info-promotion-left-incon" style="background-color: #F1884F;">特</div>
            <span>特价商品5元起</span>
          </div>
        </div>
      </div>
    </li>
  </ul>


  <div class="A"
       style="background-color: red;">
    <div class="A1">
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <span>4.9&nbsp;&nbsp;月售345单</span>
    </div>
    <div class="A2">
      蜂鸟专送
    </div>
  </div>


</template>


<style scoped>
.A {
  display: flex;
  justify-content: space-between;
}

.A .A1 {


}

.A .A2 {

}




.business {
  width: 100%;
  margin-bottom: 14vw;

  padding-left: 0;
}

.business li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  user-select: none;
  border-bottom: solid 1px #DDD;

  display: flex;
}

.business li img {
  width: 18vw;
  height: 18vw;
}

.business li .business-info {
  width: 100%;
  box-sizing: border-box;
  padding-left: 3vw;
}

.business li .business-info .business-info-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}

.business li .business-info .business-info-h h3 {
  font-size: 4vw;
  color: #333;

  margin: 0;
}

.business li .business-info .business-info-h .business-info-like {
  width: 1.6vw;
  height: 3.4vw;
  background-color: #666;
  color: #FFF;
  font-size: 4vw;
  margin-right: 4vw;

  display: flex;
  justify-content: center;
  align-items: center;
}

.business li .business-info .business-info-star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  font-size: 3.1vw;
}

.business li .business-info .business-info-star .business-info-star-left {
  display: flex;
  align-items: center;
}

.business li .business-info .business-info-star .business-info-star-left .fa-star {
  color: #FEC80E;
  margin-right: 0.5vw;
}

.business li .business-info .business-info-star .business-info-star-left span {
  color: #666;
  margin-left: 1vw;
}

.business li .business-info .business-info-star .business-info-star-right {
  background-color: #0097FF;
  color: #FFF;
  font-size: 2.4vw;
  border-radius: 2px;
  padding: 0 0.6vw;
}

.business li .business-info .business-info-delivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;

  color: #666;
  font-size: 3.1vw;
}

.business li .business-info .business-info-explain {
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
}

.business li .business-info .business-info-explain div {
  border: solid 1px #DDD;
  font-size: 2.8vw;
  color: #666;
  border-radius: 3px;
  padding: 0 0.1vw;
}

.business li .business-info .business-info-promotion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}

.business li .business-info .business-info-promotion .business-info-promotion-left {
  display: flex;
  align-items: center;
}

.business li .business-info .business-info-promotion .business-info-promotion-left .business-info-promotion-left-incon {
  width: 4vw;
  height: 4vw;
  background-color: #70BC46;
  border-radius: 3px;
  font-size: 3vw;
  color: #FFF;

  display: flex;
  justify-content: center;
  align-items: center;
}

.business li .business-info .business-info-promotion .business-info-promotion-left span {
  color: #666;
  font-size: 3vw;
  margin-left: 2vw;
}

.business li .business-info .business-info-promotion .business-info-promotion-right {
  display: flex;
  align-items: center;
  font-size: 2.5vw;
  color: #999;
}

.business li .business-info .business-info-promotion .business-info-promotion-right span {
  margin-right: 2vw;
}
</style>


<script>
export default {
  name: "TestView",
}
</script>