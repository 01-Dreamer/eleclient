<template>

  Test

</template>

<script>


export default {
  name: "TestView",
  components: {
  },


  setup() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("longitude:", position.coords.longitude);
        console.log("latitude:", position.coords.latitude);
      },
      (error) => console.error("failed to get position:", error)
    );


    return {

    }
  },
}
</script>

<style scoped></style>
