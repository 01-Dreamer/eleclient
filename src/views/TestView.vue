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
        console.log("纬度:", position.coords.latitude);
        console.log("经度:", position.coords.longitude);
      },
      (error) => console.error("获取位置失败:", error)
    );


    return {

    }
  },
}
</script>

<style scoped></style>
