<template>
  <div class="arrow-icon"></div>
</template>

<script>
  export default {
    prop: ["size"]
  };
</script>
<style scoped>
  .arrow-icon {
    display: inline-block;
    border-width: 8px 0 6px 8px;
    border-color: transparent transparent transparent black;
    border-style: solid;
  }
</style>