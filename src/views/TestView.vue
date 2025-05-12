<template>
  <div style="margin-top: 100px;">
    <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

export default {
  name: "TestView",
  components: {
    ElInput,
  },
  setup() {

    const inputValue = ref('')

    return {
      inputValue,
    }
  },
}
</script>

<style scoped>

</style>
