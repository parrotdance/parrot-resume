<template>
  <div class="sidebar" :style="{'flex-basis': expand ? '300px' : '0'}">
    <logo />
    <div class="operator-wrapper">
      <button class="operator" @click="dispatchEvent('IMPORT_MD_FILE')">Import .md File</button>
      <button class="operator" @click="dispatchEvent('EXPORT_MD_FILE')">Export To .md</button>
      <button class="operator" @click="dispatchEvent('EXPORT_PDF_FILE')">Export To .pdf</button>
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
  import Logo from "@/components/logo.vue";

  export default {
    components: {
      ArrowIcon,
      Logo
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
      dispatchEvent(eventToken) {
        EventBus.$emit(eventToken);
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #0d9ac2;
    box-shadow: 0 0 8px white;
    transition: flex-basis 0.4s cubic-bezier(0.95, -0.26, 0.96, 0.49);
  }
  .operator-wrapper {
    flex: 1;
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
    background-color: white;
    border: 1px solid transparent;
    color: #0d9ac2;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .operator:hover {
    box-shadow: 0 0 12px white;
    color: #0d8ab2;
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
    background-color: #0d9ac2;
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