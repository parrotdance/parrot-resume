<template>
  <div class="wrapper">
    <div class="inner">
      <button 
        v-for="item in modes" 
        :key="item.name" 
        :class="['focus-mode', { disabled: currentMode === item.name }]" 
        @click="changeMode(item.name)">{{ item.label }}</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      currentMode: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        modes: [
          {
            name: 'zen',
            label: 'Z'
          },
          {
            name: 'preview',
            label: 'P'
          },
          {
            name: 'normal',
            label: 'N'
          },
        ]
      }
    },
    methods: {
      changeMode(mode) {
        if (mode !== this.currentMode) {
          this.$emit('change', mode);
        }
      }
    }
  };
</script>
<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 28px;
    overflow: hidden;
  }
  .inner {
    display: flex;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    border-color: white;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    transform: scale(0.6, 1) rotate(45deg);
    transition: transform .3s ease, border-color .3s ease;
  }
  .inner:hover {
    width: auto;
    height: 100%;
    border-width: 0;
    border-color: transparent;
    transform: rotate(0);
  }
  .focus-mode {
    margin: 12px 0;
    padding: 0;
    width: 28px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    border-color: transparent;
    background-color: transparent;
    color: white;
    outline: none;
    transition: all .3s ease;
  }
  .focus-mode.disabled {
    color: #aaaaaa;
  }
  .focus-mode.disabled:hover {
    background-color: transparent;
  }
  .focus-mode:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>