<template>
    
    <div class="row  bg-primary text-white d-flex align-items-center" style="height:40px">
        <div class="col text-center">
            消息
        </div>
    </div>

    <Content>
        消息内容
    </Content>
    
</template>
  
  
<script>
import Content from '@/components/ContentBase.vue';

export default {
    name: "ChatView",
    components: {
        Content,
    }
}
</script>
  
<style scoped>
</style>
  