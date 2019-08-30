<template>
  <div class="sidebar" :style="{'flex-basis': expand ? '300px' : '0'}">
    <div class="operator-wrapper">
      <button class="operator" @click="exportFile">导出</button>
    </div>
    <div class="switch" @click="toggleSidebar">
      <i class="icon el-icon-caret-right"></i>
    </div>
  </div>
</template>
<script>
import { EventBus } from '@/plugins/eventbus.js'
export default {
  data() {
    return {
      expand: true
    }
  },
  methods: {
    exportFile() {
      EventBus.$emit('EXPORT_PDF_FILE')
    },
    toggleSidebar() {
      this.expand = !this.expand;
    }
  }
}
</script>
<style scoped>
  .sidebar {
    position: relative;
    align-items: stretch;
    background-color: white;
    box-shadow: 0 0 8px white;
    transition: flex-basis .2s ease;
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
    transition: all .2s ease;
  }
  .operator:hover {
    background-color: #cccccc;
  }
  .switch {
    position: absolute;
    top: 50%;
    right: -16px;
    transform: translateY(-50%);
    display: inline-block;
    width: 16px;
    height: 88px;
    border-radius: 0 4px 4px 0;
    box-sizing: 0 0 8px white;
    background-color: white;
    cursor: pointer;
    color: white;
    z-index: 1;
  }
  .switch .icon {
    padding: 35px 0;
    font-size: 18px;
    color: #666666;
  }
</style>