<template>
    
    <div class="row bg-primary text-white d-flex align-items-center mx-0" style="height:40px">
        <div class="col text-center">
            我的
        </div>
    </div>

    <Content>
        我的内容
    </Content>
    
</template>
  
  
<script>
import Content from '@/components/ContentBase.vue';

export default {
    name: "MineView",
    components: {
        Content,
    }
}
</script>
  
<style scoped>
</style>
  