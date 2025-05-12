<template>

  business:{{ id }}

</template>


<script>
import {useRoute} from 'vue-router';
import {ref} from 'vue';

export default {
  name: "BusinessView",

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