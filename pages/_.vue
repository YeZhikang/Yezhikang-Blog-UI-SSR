<template>
  <div class="container" style="position: relative">
    <div style="position:absolute;font-size: 62px;top: 80px;right: 15px;opacity: 0.2;transform: rotate(10deg)">Ooops!</div>
    <div>
      <p style="text-align: center">Sorry...页面丢失了</p>
      <div @click="handlePush" class="return-button">Back To Index</div>
    </div>
  </div>
</template>

<script>
export default {
    name: "_",
    data() {

    },
    methods:{
        handlePush(){
            this.$router.push({
                name: 'index'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    .return-button{
      margin: 20px auto;
      width: 100px;
      border: 2px dashed;
      padding: 12px 20px;
      border-radius: 3px;
    }
  }
</style>
