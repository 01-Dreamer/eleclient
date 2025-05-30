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
    <p>&#165;15起送 &#165;3配送&nbsp;&nbsp;16km&nbsp;|&nbsp;10分钟</p>
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
          <i class="fa fa-minus-circle"></i>
        </div>
        <p><span>3</span></p>
        <div>
          <i class="fa fa-plus-circle"></i>
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
        <div class="cart-left-icon-quantity">3</div>
      </div>
      <div class="cart-left-info">
        <p>&#165;12.88</p>
        <p>另需配送费3元</p>
      </div>
    </div>
    <div class="cart-right">
      <div class="cart-right-item">
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
import { reactive, ref, nextTick } from 'vue';
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

    const store_cover = ref(require('../img/sj01.png'));
    const store_name = ref("万家饺子（软件园E18店）");
    const store_description = ref("各种饺子炒菜");

    const items = ref([]);
    const item_container = ref(null);
    const scrollToBottom = () => {
      nextTick(() => {
        const container = item_container.value;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    };

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
    }





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


    return {
      self_id,
      other_id,
      store_cover,
      store_name,
      store_description,
      item_container,
      items,

      updateStoreCover,
      updateStoreText,
      updateItemCover,
      updateItemText,
      addItem,
      delItem,
      clickContact
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