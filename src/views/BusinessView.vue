<template>
  <HeaderBase>
    商家信息
  </HeaderBase>

  <div class="business-logo" @click="self_id === other_id ? updateStoreCover() : null"
    :style="{ 'cursor': self_id === other_id ? 'pointer' : 'default' }">
    <img :src="store_cover">
  </div>

  <div class="business-info" @click="self_id === other_id ? updateStoreText() : null"
    :style="{ 'cursor': self_id === other_id ? 'pointer' : 'default' }">
    <h1>{{ store_name }}</h1>
    <p>&#165;15起送 &#165;3配送&nbsp;&nbsp;{{ distance }}km&nbsp;|&nbsp;{{ duration }}分钟</p>
    <p>{{ store_description }}</p>
    <el-button type="primary" size="small" class="contact-btn" :disabled="self_id === other_id" @click="clickContact">
      联系商家
    </el-button>
  </div>

  <ul class="food" ref="item_container" :style="{ 'margin-bottom': self_id === other_id ? '15vw' : '28vw' }">
    <li v-for="item in items" :key="item.id">
      <div class="food-left">
        <img :src="item.cover" @click="self_id === other_id ? updateItemCover(item.id) : null"
          :style="{ 'cursor': self_id === other_id ? 'pointer' : 'default' }">
        <div class="food-left-info" @click="self_id === other_id ? updateItemText(item.id) : null"
          :style="{ 'cursor': self_id === other_id ? 'pointer' : 'default' }">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>&#165;{{ item.price }}</p>
        </div>
      </div>

      <el-button type="danger" circle size="small" class="del-item-btn" v-show="self_id === other_id"
        @click="delItem(item.id)">
        <el-icon>
          <delete />
        </el-icon>
      </el-button>

      <div class="food-right" v-show="self_id !== other_id">
        <div>
          <i class="fa fa-minus-circle" v-show="getItemCount(item.id) > 0" @click="dropItem(item.id, item.price)"></i>
        </div>
        <p><span>{{ getItemCount(item.id) }}</span></p>
        <div>
          <i class="fa fa-plus-circle" @click="selectItem(item.id, item.price, item.cover)"></i>
        </div>
      </div>
    </li>

    <el-button type="success" class="add-item-btn" v-show="self_id === other_id" @click="addItem">
      <el-icon>
        <plus />
      </el-icon>
    </el-button>

  </ul>

  <div class="cart" v-show="self_id !== other_id">
    <div class="cart-left">
      <div class="cart-left-icon">
        <i class="fa fa-shopping-cart"></i>
        <div class="cart-left-icon-quantity" v-show="select_item_sum > 0">{{ select_item_sum }}</div>
      </div>
      <div class="cart-left-info">
        <p>&#165;{{ total_price }}</p>
        <p>另需配送费3元</p>
      </div>
    </div>
    <div class="cart-right" :style="{ 'background-color': total_price >= 15 ? '#38CA73' : '#87CEFA' }">
      <div class="cart-right-item" @click="goToPay">
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
import { reactive, ref, nextTick, computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import { showInfoToUser } from '@/utils/notice';
import { Delete, Plus } from '@element-plus/icons-vue';
import $ from 'jquery';


export default {
  name: "BusinessView",

  components: {
    HeaderBase,
    Delete,
    Plus
  },

  setup() {
    const route = useRoute();
    const self_id = String(store.state.id);
    const other_id = String(route.params.id);

    const store_cover = ref('');
    const store_name = ref('');
    const store_description = ref('');
    const distance = ref(0.00);
    const duration = ref(0);

    const items = ref([]);
    const item_container = ref(null);

    const select_item = computed(() => new Map()); // item_id -> 数量
    const select_item_cover = new Map(); // 将图片传给'确认订单'界面, item_id --> item_cover
    const select_item_sum = ref(0);
    const total_price = ref(3.00);

    ///////////////////////////////////////////////////
    /// 和页面有关的工具函数
    ///////////////////////////////////////////////////
    const scrollToBottom = () => {
      nextTick(() => {
        const container = item_container.value;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    };

    const getItemCount = (item_id) => {
      return select_item.value.get(item_id) || 0;
    };

    const selectItem = (item_id, item_price, item_cover) => {
      select_item_sum.value++;
      total_price.value = Math.round((total_price.value + item_price) * 100) / 100;

      select_item_cover.set(item_id, item_cover)

      const new_count = (select_item.value.get(item_id) || 0) + 1;
      select_item.value.set(item_id, new_count);
    };

    const dropItem = (item_id, item_price) => {
      select_item_sum.value--;
      total_price.value = Math.round((total_price.value - item_price) * 100) / 100;

      const new_count = (select_item.value.get(item_id) || 1) - 1;
      if (new_count === 0) {
        select_item.value.delete(item_id);
      } else {
        select_item.value.set(item_id, new_count);
      }
    };

    const getItem = (item_id) => {
      return items.value.find(i => String(i.id) === String(item_id));
    };

    const modifyItemCover = (item_id, cover) => {
      const item = getItem(item_id);
      if (item) {
        item.cover = cover;
      }
    };

    const modifyItemText = (item_id, name, description, price) => {
      const item = getItem(item_id);
      if (item) {
        item.name = name;
        item.description = description;
        item.price = price;
      }
    };

    const clickContact = () => {
      router.push({
        name: "chat",
        params: {
          other_id
        },
        query: {
          store_name: store_name.value
        },
      })
    };

    ///////////////////////////////////////////////////
    /// 向后端提交订单
    ///////////////////////////////////////////////////
    const goToPay = () => {
      if (total_price.value < 15) {
        showInfoToUser("15元起送", "warning");
        return;
      }

      const obj1 = Object.fromEntries(select_item.value);
      const order_json = JSON.stringify(obj1);

      const obj2 = Object.fromEntries(select_item_cover);
      const cover_json = JSON.stringify(obj2);

      $.ajax({
        url: 'http://localhost:12345/createOrder?id=' + other_id,
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${store.state.access_token}`
        },
        contentType: 'application/json',
        data: order_json,
        success: (data) => {
          if (data !== null && data !== '') {
            showInfoToUser("订单创建成功", "success");
            router.push({
              name: "confirm_order",
              query: {
                order_json: data,
                cover_json: cover_json
              },
            })
          } else {
            showInfoToUser("订单创建失败", "error");
          }
        },
        error: (error) => {
          showInfoToUser("订单创建失败", "error");
          console.error("failed to create order: ", error);
        }
      });
    };

    ///////////////////////////////////////////////////
    /// 获取商家信息
    ///////////////////////////////////////////////////
    $.ajax({
      url: 'http://localhost:12345/getOneEleBusiness?id=' + other_id,
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${store.state.access_token}`
      },
      success: (data) => {
        if (data === "" || data === null) {
          return;
        }

        store_cover.value = data.storeCover || 'https://zxydata.oss-cn-chengdu.aliyuncs.com/ele/DefaultStoreCover.png';
        store_name.value = data.storeName;
        store_description.value = data.storeDescription;

        data.storeItems.forEach(item => {
          items.value.push(reactive({
            id: item.itemId,
            name: item.itemName,
            description: item.itemDescription,
            cover: item.itemCover,
            price: item.itemPrice
          }));
          scrollToBottom();
        })

        // 计算距离和时间
        if (self_id == other_id) return;
        const request_url = 'http://localhost:12345/getDistance?' +
          'longitude1=' + store.state.longitude +
          '&latitude1=' + store.state.latitude +
          '&longitude2=' + data.location.x +
          '&latitude2=' + data.location.y;
        $.ajax({
          url: request_url,
          type: 'GET',
          headers: {
            'Authorization': `Bearer ${store.state.access_token}`
          },
          success: (data) => {
            if (data === "" || data === null) {
              return;
            }
            distance.value = (data.distance / 1000.00).toFixed(2);
            duration.value = Math.round(data.duration / 60.00);
          },
          error: (error) => {
            console.error('failed to get distance:', error);
          }
        });
      },
      error: (error) => {
        console.error('failed to get business info:', error);
      }
    });

    ///////////////////////////////////////////////////
    /// 更新店铺封面
    ///////////////////////////////////////////////////
    const updateStoreCover = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png, image/jpeg';
      input.style.display = 'none';

      input.onchange = () => {
        const file = input.files[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
          showInfoToUser("只支持上传 PNG 或 JPG 格式的图片", "warning");
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        $.ajax({
          url: 'http://localhost:12345/updateStoreCover',
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${store.state.access_token}`
          },
          data: formData,
          processData: false,
          contentType: false,
          success: (data) => {
            if (data !== null && data !== '') {
              showInfoToUser("图片上传成功", "success");
              store_cover.value = data;
              console.log("img url: ", data);
            } else {
              showInfoToUser("图片上传失败", "error");
            }
          },
          error: (error) => {
            showInfoToUser("图片上传失败", "error");
            console.error("failed to update img: ", error);
          }
        });
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    }

    ///////////////////////////////////////////////////
    /// 更新店铺描述
    ///////////////////////////////////////////////////
    const updateStoreText = () => {
      ElMessageBox({
        title: '编辑商家信息',
        customClass: 'custom-message-box',
        message: `
      <div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">商家名称</label>
          <input id="editStoreName" value="${store_name.value}" 
                 style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px;"
                 placeholder="请输入商家名称">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">商家描述</label>
          <textarea id="editStoreDesc" 
                    style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px; min-height: 60px;"
                    placeholder="请输入商家描述">${store_description.value}</textarea>
        </div>
      </div>
    `,
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            const name = document.getElementById('editStoreName').value.trim();
            const description = document.getElementById('editStoreDesc').value.trim();
            if (!name) {
              showInfoToUser("商家名称不能为空", "error");
              instance.confirmButtonLoading = false;
              return false;
            }
            if (!description) {
              showInfoToUser("商家描述不能为空", "error");
              instance.confirmButtonLoading = false;
              return false;
            }

            $.ajax({
              url: 'http://localhost:12345/updateStoreText?storeName=' + name + '&storeDescription=' + description,
              type: 'POST',
              headers: {
                'Authorization': `Bearer ${store.state.access_token}`
              },
              success: (data) => {
                if (data) {
                  showInfoToUser("信息修改成功", "success");
                } else {
                  showInfoToUser("信息修改失败", "error");
                }
                store_name.value = name;
                store_description.value = description;
              },
              error: (error) => {
                showInfoToUser("信息修改失败", "error");
                console.error("failed to update store text: ", error);
              }
            });
            done();
          } else {
            done();
          }
        }
      }).catch(() => {
        console.log('store text update cancelled');
      });
    };

    ///////////////////////////////////////////////////
    /// 更新商品封面
    ///////////////////////////////////////////////////
    const updateItemCover = (item_id) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png, image/jpeg';
      input.style.display = 'none';

      input.onchange = () => {
        const file = input.files[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
          showInfoToUser("只支持上传 PNG 或 JPG 格式的图片", "warning");
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        $.ajax({
          url: 'http://localhost:12345/updateStoreItemCover?itemId=' + item_id,
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${store.state.access_token}`
          },
          data: formData,
          processData: false,
          contentType: false,
          success: (data) => {
            if (data !== null && data !== '') {
              showInfoToUser("图片上传成功", "success");
              modifyItemCover(item_id, data);
              console.log("img url: ", data);
            } else {
              showInfoToUser("图片上传失败", "error");
            }
          },
          error: (error) => {
            showInfoToUser("图片上传失败", "error");
            console.error("failed to update img: ", error);
          }
        });
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    };

    ///////////////////////////////////////////////////
    /// 更新商品描述
    ///////////////////////////////////////////////////
    const updateItemText = (item_id) => {
      const item = getItem(item_id);
      if (!item) return;

      ElMessageBox({
        title: '编辑商品信息',
        customClass: 'custom-message-box',
        message: `
      <div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">商品名称</label>
          <input id="editName" value="${item.name}" style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">商品描述</label>
          <textarea id="editDesc" style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px; min-height: 60px;">${item.description}</textarea>
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px;">商品价格</label>
          <input id="editPrice" type="number" step="0.01" min="0" value="${item.price}" 
                style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
        </div>
      </div>
    `,
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            const name = document.getElementById('editName').value;
            const description = document.getElementById('editDesc').value;
            const priceStr = document.getElementById('editPrice').value;
            const price = parseFloat(priceStr);
            if (!name) {
              showInfoToUser("商品名称不能为空", "error");
              instance.confirmButtonLoading = false;
              return false;
            }
            if (!description) {
              showInfoToUser("商品描述不能为空", "error");
              instance.confirmButtonLoading = false;
              return false;
            }
            if (isNaN(price) || price < 0 || !/^\d+(\.\d{1,2})?$/.test(priceStr)) {
              showInfoToUser("非法价格", "error");
              instance.confirmButtonLoading = false;
              return false;
            }

            const request_url = 'http://localhost:12345/updateStoreItemText?' +
              'itemId=' + item_id +
              '&itemName=' + name +
              '&itemDescription=' + description +
              '&itemPrice=' + price;
            $.ajax({
              url: request_url,
              type: 'POST',
              headers: {
                'Authorization': `Bearer ${store.state.access_token}`
              },
              success: (data) => {
                if (data) {
                  modifyItemText(item_id, name, description, price);
                  showInfoToUser("信息修改成功", "success");
                } else {
                  showInfoToUser("信息修改失败", "error");
                }
              },
              error: (error) => {
                showInfoToUser("信息修改失败", "error");
                console.error("failed to update item text: ", error);
              }
            });
            done();
          } else {
            done();
          }
        }
      }).catch(() => {
        console.log('item text update cancelled');
      });
    };

    ///////////////////////////////////////////////////
    /// 增加商品
    ///////////////////////////////////////////////////
    const addItem = () => {
      $.ajax({
        url: 'http://localhost:12345/addStoreItem',
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${store.state.access_token}`
        },
        success: (data) => {
          if (Number(data) !== -1) {
            items.value.push(reactive({
              id: Number(data),
              name: "请编辑商品名称",
              description: "请编辑商品描述",
              cover: "",
              price: 0.00
            }));
            scrollToBottom();

            showInfoToUser("商品添加成功", "success");
            console.log("item id: ", data);
          } else {
            showInfoToUser("商品添加失败", "error");
          }
        },
        error: (error) => {
          showInfoToUser("商品添加失败", "error");
          console.error("failed to add item: ", error);
        }
      });
    };

    ///////////////////////////////////////////////////
    /// 删除商品
    ///////////////////////////////////////////////////
    const delItem = (item_id) => {
      ElMessageBox.confirm(
        '确定要删除该商品吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          $.ajax({
            url: 'http://localhost:12345/delStoreItem?itemId=' + item_id,
            type: 'DELETE',
            headers: {
              'Authorization': `Bearer ${store.state.access_token}`
            },
            success: (data) => {
              if (data) {
                const index = items.value.findIndex(i => i.id === item_id);
                if (index !== -1) {
                  items.value.splice(index, 1);
                }
                showInfoToUser("商品删除成功", "success");
              } else {
                showInfoToUser("商品删除", "error");
              }
            },
            error: (error) => {
              showInfoToUser("商品删除失败", "error");
              console.error("failed to delete item: ", error);
            }
          });
        })
        .catch(() => {
          console.log('item delete cancelled')
        })
    };

    return {
      self_id,
      other_id,
      store_cover,
      store_name,
      store_description,
      select_item_sum,
      item_container,
      items,
      total_price,
      distance,
      duration,

      clickContact,
      updateStoreCover,
      updateStoreText,
      updateItemCover,
      updateItemText,
      getItemCount,
      selectItem,
      dropItem,
      goToPay,
      addItem,
      delItem
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
  padding-left: 0;

  overflow-y: auto;
  max-height: 60vh;
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
  margin-bottom: 0;
}

.cart .cart-left .cart-left-info p:last-child {
  font-size: 2.8vw;
  color: #AAA;

  margin-top: 0;
}

.cart .cart-right {
  flex: 1;
}

.cart .cart-right .cart-right-item {
  width: 100%;
  height: 100%;
  color: #FFF;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.del-item-btn {
  font-size: 4vw;
}

.add-item-btn {
  width: 100%;
  height: 3vw;
  font-size: 4vw;
  text-align: center;
  border-radius: 4px;

  margin-top: 2vw;
}
</style>