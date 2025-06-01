<template>
  <HeaderBase>
    测试
  </HeaderBase>

  <div class="test">
  </div>


</template>

<script>
import HeaderBase from "@/components/HeaderBase.vue";

export default {
  name: 'TestView',
  components: {
    HeaderBase,
  },

  setup() {

    return {

    };
  },
};
</script>

<style scoped>
.test {
  width: 100%;
  height: 50px;

  background-color: red;
}
</style>
