<template>
  <div>梦想开始的地方</div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      device: {
        isDesktop: true,
        isMobile: true,
        isWechat: false
      }
    };
  },
  methods: {
  },
  async created() {
    this.device.isDesktop = this.$device.isDesktop;
    this.device.isMobile = this.$device.isMobile;
    this.device.isWechat = this.$device.isWechat;
  }
};
</script>

<style lang="less" scoped>
</style>