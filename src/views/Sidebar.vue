<template>
  <div class="sidebar" :style="{'flex-basis': expand ? '300px' : '0'}">
    <div class="operator-wrapper">
      <button class="operator" @click="exportFile">导出</button>
    </div>
    <div
      :class="['switch', { hover: hoverSwitch }]"
      @click="toggleSidebar"
      ref="switch"
      @mouseover="mouseOverSwitch"
      @mouseleave="hoverSwitch = false"
    >
      <arrow-icon class="icon" size="14" />
    </div>
  </div>
</template>
<script>
  import { EventBus } from "@/plugins/eventbus.js";
  import ArrowIcon from "@/components/arrow.vue";

  export default {
    components: {
      ArrowIcon
    },
    data() {
      return {
        expand: true,
        hoverSwitch: false
      };
    },
    methods: {
      mouseOverSwitch() {
        if (this.expand) {
          this.hoverSwitch = true;
        }
      },
      exportFile() {
        EventBus.$emit("EXPORT_PDF_FILE");
      },
      toggleSidebar() {
        this.expand = !this.expand;
      }
    }
  };
</script>
<style scoped>
  .sidebar {
    position: relative;
    align-items: stretch;
    background-color: white;
    box-shadow: 0 0 8px white;
    transition: flex-basis 0.2s ease;
  }
  .operator-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
  }
  .operator {
    font-size: 18px;
    line-height: 48px;
    border: none;
    white-space: nowrap;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .operator:hover {
    background-color: #cccccc;
  }
  .switch {
    position: absolute;
    top: 50%;
    right: -16px;
    transform: translateY(-50%);
    display: flex;
    width: 16px;
    height: 88px;
    justify-content: center;
    align-items: center;
    border-radius: 0 4px 4px 0;
    box-sizing: 0 0 8px white;
    background-color: white;
    cursor: pointer;
    color: white;
    z-index: 1;
    transition: transform 0.2s ease;
  }
  .switch .icon {
    transition: transform 0.2s ease;
  }
  .switch.hover .icon {
    transform: rotate(180deg);
  }
</style>