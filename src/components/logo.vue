<template>
  <div class="logo">
    <div class="icon-wrapper" :style="{ width: sideLength + 'px', height: sideLength + 'px' }">
      <div class="icon-inner" :style="innerStyle"></div>
      <div class="icon-outter" :style="outterStyle"></div>
    </div>
    <div class="title">ParroT-Resume</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      sideLength: 48,
      iconAngleOffset: 45
    }
  },
  computed: {
    innerStyle() {
      const innerSideLength = this.sideLength / 2;
      return {
        width: `${innerSideLength}px`,
        height: `${innerSideLength}px`,
      }
    },
    outterStyle() {
      const outterSideLength = (Math.sqrt(2) / 2) * this.sideLength;
      return {
        width: `${outterSideLength}px`,
        height: `${outterSideLength}px`,
      }
    }
  }
}
</script>
<style scoped>
@keyframes inner{
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  6% {
    transform: translate(-50%, -50%) rotate(45deg) scale(1.4);
  }
  12% {
    transform: translate(-50%, -50%) rotate(90deg) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
@keyframes outter{
  0% {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  6% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1.2);
  }
  12% {
    transform: translate(-50%, -50%) rotate(-45deg) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
.logo {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}
.icon-wrapper {
  position: relative;
  margin-right: 18px;
}
.icon-inner, 
.icon-outter {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 4px;
  transition: transform .3s ease-in;
}
.icon-inner {
  z-index: 2;
  background-color: #0d9ac2;
  animation: inner 8s infinite ease;
  animation-delay: -2s;
}
.icon-outter {
  z-index: 1;
  background-color: white;
  animation: outter 8s infinite ease;
  animation-delay: -2s;
}
.title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  user-select: none;
}
</style>