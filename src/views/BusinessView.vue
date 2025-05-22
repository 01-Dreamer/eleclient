<template>
  <HeaderBase>
    商家信息:{{ id }}
  </HeaderBase>
</template>


<script>
import HeaderBase from "@/components/HeaderBase.vue";
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  name: "BusinessView",

  components: {
    HeaderBase,
  },

  setup() {
    const route = useRoute();
    const id = ref(route.params.id);

    return {
      id,
    }
  }
}
</script>


<style scoped></style>