<template>
  <div class="header-fixed-top">
    <header>
      <el-icon class="location-icon" @click="is_loading ? null : getPosition()">
        <Loading v-if="is_loading" />
        <Location v-else />
      </el-icon>
      <div class="location-text">
        {{ location }}
        <i class="fa fa-caret-down"></i>
      </div>
    </header>
    <div class="search">
      <div class="search-fixed-top">
        <el-input v-model="search_input" @keyup.enter="searchFunction" style="width: 90%;" :prefix-icon="Search"
          placeholder="搜索饿了么商家、商品名称" />
      </div>
    </div>
  </div>

  <ul class="foodtype">
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl01.png">
      <p>美食</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl02.png">
      <p>早餐</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl03.png">
      <p>跑腿代购</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl04.png">
      <p>汉堡披萨</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl05.png">
      <p>甜品饮品</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl06.png">
      <p>速食简餐</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl07.png">
      <p>地方小吃</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl08.png">
      <p>米粉面馆</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl09.png">
      <p>包子粥铺</p>
    </li>
    <li>
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/dcfl10.png">
      <p>炸鸡炸串</p>
    </li>
  </ul>

  <div class="banner">
    <h3>品质套餐</h3>
    <p>搭配齐全吃得好</p>
    <a>立即抢购 &gt;</a>
  </div>

  <div class="supermember">
    <div class="left">
      <img src="https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/super_member.png">
      <h3>超级会员</h3>
      <p>&#8226; 每月享超值权益</p>
    </div>
    <div class="right">
      立即开通 &gt;
    </div>
  </div>

  <div class="recommend">
    <div class="recommend-line"></div>
    <p>推荐商家</p>
    <div class="recommend-line"></div>
  </div>

  <ul class="recommendtype">
    <li @click="handleSort('overall')">综合排序<i class="fa fa-caret-down"></i></li>
    <li @click="handleSort('distance')">距离最近</li>
    <li @click="handleSort('sales')">销量最高</li>
    <li @click="handleSort('default')">筛选<i class="fa fa-filter"></i></li>
  </ul>


  <ul class="business">
    <li v-for="business in businesses" :key="business.id" @click="clickBusiness(business.id)">
      <img :src="business.store_cover">
      <div class="business-info">
        <div class="business-info-h">
          <h3>{{ business.store_name }}</h3>
          <div class="business-info-like">&#8226;</div>
        </div>
        <div class="business-info-star">
          <div class="business-info-star-left">
            <i v-for="i in 5" :key="i" :class="i <= Math.floor(business.store_review)
              ? 'fa fa-star'
              : (i - 0.5 <= business.store_review
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o')">
            </i>
            <span>{{ business.store_review.toFixed(1) }}&nbsp;&nbsp;销量{{ business.store_volume }}单</span>
          </div>
          <div class="business-info-star-right">
            蜂鸟专送
          </div>
        </div>
        <div class="business-info-delivery">
          <span>&#165;15起送 | &#165;3配送</span>
          <span>{{ business.distance }}km | {{ business.duration }}分钟</span>
        </div>
        <div class="business-info-explain">
          <div>{{ business.store_description }}</div>
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
</template>


<script>
import { Location, Loading } from '@element-plus/icons-vue';
import { Search } from '@element-plus/icons-vue';
import { ElInput, ElIcon } from 'element-plus';
import { showInfoToUser } from '@/utils/notice';
import { getDistance } from 'geolib';
import store from '@/store';
import router from '@/router';
import { ref } from 'vue';
import $ from 'jquery';


export default {
  name: "HomeView",

  components: {
    Location,
    Loading,
    ElInput,
    ElIcon,
  },


  setup() {
    const search_input = ref('');
    const businesses = ref([]);
    const location = ref(store.state.location_text);
    const is_loading = ref(false);


    // 处理点击商家事件
    const clickBusiness = (id) => {
      store.dispatch("clearMsgCount", id);
      router.push({
        name: "business",
        params: {
          id
        }
      })
    };

    // 排序前端直接处理
    const handleSort = (type) => {
      if (type === "overall") {
        businesses.value.sort((a, b) => b.store_review - a.store_review);
      } else if (type === "distance") {
        businesses.value.sort((a, b) => a.distance - b.distance);
      } else if (type === "sales") {
        businesses.value.sort((a, b) => b.store_volume - a.store_volume);
      } else if(type === "default") {
        businesses.value.sort((a, b) => a.id - b.id);
      } else {
        console.error("sort error");
      }
    };

    // 获取所有商家信息
    const getAllEleBusinessInfo = () => {
      $.ajax({
        url: 'https://data.zxylearn.top/getAllEleBusiness',
        type: 'GET',
        headers: {
          'Authorization': `Bearer ${store.state.access_token}`
        },
        success: (data) => {
          if (data === "" || data === null) {
            return;
          }
          businesses.value = [];
          data.forEach(business => {
            const distance = (getDistance(
              { longitude: store.state.longitude, latitude: store.state.latitude },
              { longitude: business.location.x, latitude: business.location.y }
            ) / 1000).toFixed(2);
            const duration = Math.round(parseFloat(distance) / 0.50);

            businesses.value.push({
              id: business.id,
              store_name: business.storeName,
              store_description: business.storeDescription,
              store_cover: business.storeCover || 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultStoreCover.png',
              store_volume: business.storeVolume,
              store_review: business.storeReview,
              store_items: business.storeItems,
              distance: distance,
              duration: duration
            })
          });
        },
        error: (error) => {
          console.error('failed to get business info:', error);
        }
      });
    };

    if (store.state.access_token === null || store.state.access_token === '' || store.state.access_token === undefined) {
      setTimeout(() => {
        if (store.state.access_token !== null && store.state.access_token !== '' && store.state.access_token !== undefined) {
          getAllEleBusinessInfo();
        } else {
          console.log("failed to get business info: timeout");
        }
      }, 1000);
    } else {
      getAllEleBusinessInfo();
    }

    // 向后端服务器发起搜索请求
    const searchFunction = () => {
      if (search_input.value.trim() === '') return;

      $.ajax({
        url: 'https://data.zxylearn.top/getEleBusinessByWord?keyword=' + search_input.value.trim(),
        type: 'GET',
        headers: {
          'Authorization': `Bearer ${store.state.access_token}`
        },
        success: (data) => {
          if (data === "" || data === null) {
            return;
          }

          showInfoToUser("查询成功", "success");

          // 更新数据前清空数组
          businesses.value = [];
          data.forEach(business => {

            const distance = (getDistance(
              { longitude: store.state.longitude, latitude: store.state.latitude },
              { longitude: business.location.x, latitude: business.location.y }
            ) / 1000).toFixed(2);
            const duration = Math.round(parseFloat(distance) / 0.50);

            businesses.value.push({
              id: business.id,
              store_name: business.storeName,
              store_description: business.storeDescription,
              store_cover: business.storeCover || 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultStoreCover.png',
              store_volume: business.storeVolume,
              store_review: business.storeReview,
              store_items: business.storeItems,
              distance: distance,
              duration: duration
            });
          });
        },
        error: (error) => {
          console.error('failed to search business:', error);
        }
      });

      search_input.value = '';
    };

    // 获取用户位置
    const getPosition = () => {
      is_loading.value = true;

      // 定位前检查
      if (!navigator.geolocation) {
        showInfoToUser("浏览器不支持定位", "error");
        is_loading.value = false;
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("longitude:", position.coords.longitude);
          console.log("latitude:", position.coords.latitude);

          $.ajax({
            url: 'https://data.zxylearn.top/getFormattedAddress',
            type: 'GET',
            headers: {
              'Authorization': `Bearer ${store.state.access_token}`
            },
            data: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
            success: (response) => {
              if (response === '') {
                showInfoToUser("解析位置失败", "error");
                console.error('error: response is null');
                is_loading.value = false;
                return;
              }
              showInfoToUser("获取位置成功", "success");
              console.log('address:', response);
              location.value = response;
              is_loading.value = false;
              store.dispatch("updateLocation", {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                location_text: response,
              });
            },
            error: (error) => {
              showInfoToUser("解析位置失败", "error");
              console.error('error:', error);
              is_loading.value = false;
            },
          });
        },
        (error) => {
          showInfoToUser("获取位置失败", "error");
          console.error("failed to get position:", error)
          is_loading.value = false;
        },
      );
    };


    return {
      businesses,
      location,
      is_loading,
      Search,
      search_input,

      clickBusiness,
      searchFunction,
      handleSort,
      getPosition,
    }

  }
}
</script>


<style scoped>
.header-fixed-top {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}

header {
  width: 100%;
  height: 8vw;
  background-color: #0097FF;

  display: flex;
  align-items: center;
}

.location-icon {
  font-size: 10vw;
  color: #FFF;

  margin-left: 4vw;
  margin-top: 1vw;

  cursor: pointer;
}

.location-text {
  font-size: 4.5vw;
  font-weight: 700;
  color: #FFF;

  margin-left: 0.5vw;
  margin-top: 2vw;
}

.search {
  width: 100%;
  height: 13vw;
}

.search .search-fixed-top {
  width: 100%;
  height: 13vw;
  background-color: #0097FF;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 2vw;
}

.foodtype {
  width: 100%;
  height: 48vw;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;

  padding-left: 0;

  margin-bottom: 0;
}

.foodtype li {

  width: 18vw;
  height: 20vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  user-select: none;
  cursor: pointer;
}

.foodtype li img {
  width: 12vw;
  height: 10.3vw;
}

.foodtype li p {
  font-size: 3.2vw;
  color: #666;
}

.banner {
  width: 95%;
  margin: 0 auto;
  height: 29vw;

  background-image: url("https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/index_banner.png");
  background-repeat: no-repeat;
  background-size: cover;

  box-sizing: border-box;
  padding: 2vw 6vw;
}

.banner h3 {
  font-size: 4.2vw;
  margin-bottom: 1.2vw;
  margin-top: 1vw;
}

.banner p {
  font-size: 3.4vw;
  color: #666;
  margin-bottom: 2.4vw;
}

.banner a {
  font-size: 3vw;
  color: #C79060;
  font-weight: 700;
}

.supermember {
  width: 95%;
  margin: 0 auto;
  height: 11.5vw;
  background-color: #FEEDC1;
  margin-top: 1.3vw;
  border-radius: 2px;
  color: #644F1B;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supermember .left {
  display: flex;
  align-items: center;
  margin-left: 4vw;
  user-select: none;
}

.supermember .left img {
  width: 6vw;
  height: 6vw;
  margin-right: 2vw;
}

.supermember .left h3 {
  font-size: 4vw;
  margin-right: 2vw;
}

.supermember .left p {
  font-size: 3vw;
}

.supermember .right {
  font-size: 3vw;
  margin-right: 4vw;
  cursor: pointer;
}

.recommend {
  width: 100%;
  height: 14vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommend .recommend-line {
  width: 6vw;
  height: 0.2vw;
  background-color: #888;
}

.recommend p {
  font-size: 4vw;
  margin: 0 4vw;
}

.recommendtype {
  width: 100%;
  height: 5vw;
  margin-bottom: 3vw;

  display: flex;
  justify-content: space-around;
  align-items: center;

  padding-left: 0;
  margin-top: 0;
}

.recommendtype li {
  font-size: 3.5vw;
  color: #555;

  cursor: pointer;
}

.business {
  width: 100%;
  margin-bottom: 14vw;

  padding-left: 0;
  cursor: pointer;
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

.business li .business-info .business-info-star .business-info-star-left i {
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
