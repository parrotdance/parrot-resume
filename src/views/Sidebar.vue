<template>
  <div class="sidebar" :style="{'flex-basis': expand ? '300px' : '0'}">
    <div class="operator-wrapper">
      <button class="operator" @click="exportFile2md">导出为 Markdown</button>
      <button class="operator" @click="exportFile2pdf">导出为 PDF</button>
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
      exportFile2md() {
        EventBus.$emit("EXPORT_MD_FILE");
      },
      exportFile2pdf() {
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
    align-items: center;
    overflow: hidden;
    z-index: 2;
  }
  .operator {
    margin: 10px 0;
    width: 220px;
    font-size: 18px;
    line-height: 48px;
    border: none;
    white-space: nowrap;
    border: 1px solid transparent;
    color: #999999;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .operator:hover {
    box-shadow: 0 0 8px #666666;
    background-color: #eeeeee;
    color: black;
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