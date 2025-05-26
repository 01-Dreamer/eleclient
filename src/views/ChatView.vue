<template>
  <HeaderBase>
    聊天: {{ other_id }}
  </HeaderBase>

  <div class="chat-wrapper">
    <div class="chat-messages" ref="chat_container">
      <div v-for="(msg, index) in messages" :key="index"
        :class="['chat-message', msg.type === 'me' ? 'from-me' : 'from-other']">
        <div class="avatar">
          <img src="../img/avatar.jpg" alt="avatar" />
        </div>

        <div class="message-content">
          <div class="timestamp">{{ msg.create_time }}</div>
          <div class="bubble">{{ msg.content }}</div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <el-input v-model="input" placeholder="请输入内容.." @keyup.enter="handleSend" clearable style="flex: 1;" />
      <el-button type="primary" @click="handleSend">发送</el-button>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import HeaderBase from '@/components/HeaderBase.vue';
import { ElInput, ElButton } from 'element-plus';
import { showInfoToUser } from '@/utils/notice';
import store from '@/store';
import $ from 'jquery';

export default {
  name: 'ChatView',
  components: {
    HeaderBase,
    ElInput,
    ElButton,
  },
  setup() {
    const route = useRoute();
    const self_id = store.state.id;
    const other_id = ref(route.params.id);

    const input = ref('');
    const messages = ref([]);
    const chat_container = ref(null);

    let socket = store.state.socket;



    const addMessage = (message) => {
      const sender_id = message.senderId;
      const content = message.content;
      const create_time = message.createTime;

      let type = null;
      if (String(sender_id) === String(self_id)) {
        type = "me";
      } else if (String(sender_id) === String(other_id.value)) {
        type = "other";
      } else {
        console.log("failed to parse message: ", message);
        return;
      }
      messages.value.push({ content, create_time, type });
      scrollToBottom();
    };

    const scrollToBottom = () => {
      nextTick(() => {
        const container = chat_container.value;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    };

    // websocket 连接相关
    const createWebsocket = () => {
      $(document).ready(function () {
        socket = new WebSocket('ws://localhost:12345/chat?id=' + self_id);

        socket.onopen = function () {
          console.log("websocket connect");
          store.dispatch("updateSocket", socket);
        };

        socket.onmessage = function (event) {
          const message = JSON.parse(event.data);
          addMessage(message);
        };

        socket.onclose = function () {
          console.log("websocket close");
          store.dispatch("updateSocket", null);
          socket = null;
        };

        socket.onerror = function (error) {
          console.error("websocket error:", error);
          store.dispatch("updateSocket", null);
          socket = null;
        };
      });
    };

    if (socket == null) {
      createWebsocket();
    }

    const handleSend = () => {
      if (!input.value.trim()) return;
      if (self_id === other_id.value) {
        const content = input.value.trim();

        // 自己和自己聊天，获取本地时间即可
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const create_time = `${year}-${month}-${day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        const type = "me";
        messages.value.push({ content, create_time, type });

        scrollToBottom();
        input.value = '';
        return;
      }

      if (socket === null) {
        createWebsocket();
      }

      if (socket === null) {
        showInfoToUser("连接未建立", "error");
        return;
      }

      const message = {
        senderId: store.state.id,
        receiverId: other_id.value,
        content: input.value,
      };
      socket.send(JSON.stringify(message));

      input.value = '';
    };

    if (String(self_id) !== String(other_id)) {
      $.ajax({
        url: 'http://localhost:12345/getChatMessage?id1=' + self_id + '&id2=' + other_id.value,
        type: 'GET',
        success: (data) => {
          data.forEach(msg => {
            addMessage({
              senderId: msg.senderId,
              content: msg.content,
              createTime: msg.createTime.replace('T', ' ').slice(0, 16),
            })
          });

          scrollToBottom();
        },
        error: (error) => {
          console.error('failed to get chat message:', error);
        }
      });
    }


    return {
      other_id,
      input,
      messages,
      chat_container,

      handleSend,
    };
  },
};
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding-top: 12vw;
  box-sizing: border-box;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1vw;
  background: #F5F5F5;
  border-radius: 1vw;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 4vw;
}

.from-me {
  flex-direction: row-reverse;
}

.from-other {
  flex-direction: row;
}

.avatar {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  margin-top: 3vw;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  max-width: 70vw;
  margin: 0 2vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.from-me .message-content {
  align-items: flex-end;
}

.timestamp {
  font-size: 2.5vw;
  color: #888;
  margin-bottom: 1vw;
}

.bubble {
  padding: 2vw 3vw;
  border-radius: 3vw;
  background: #E6F7FF;
  word-break: break-word;
  font-size: 3.5vw;
}

.from-other .bubble {
  background: #FFF;
  border: 1px solid #E0E0E0;
}

.chat-input {
  display: flex;
  gap: 2vw;
  padding: 2vw;
  box-sizing: border-box;
  background: white;
  border-top: 1px solid #DDD;
}
</style>
