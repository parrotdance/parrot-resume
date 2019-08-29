<template>
  <div class="home">
    <textarea v-model="markdown" @input="parseMarkdown" id="markdown" cols="30" rows="10"></textarea>
    <div v-html="result"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
const MD = new MarkdownIt();
function throttle(fn, timeout, context) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn().apply(context, ...arguments);
      canrun = true;
    }, timeout);
  }
}

export default {
  data() {
    return {
      markdown: '',
      result: '',
      canParse: true
    }
  },
  methods: {
    parseMarkdown() {
      if (!this.canParse) return;
      this.canParse = false;
      setTimeout(() => {
        this.result = MD.render(this.markdown);      
        this.canParse = true;  
      }, 500);
    }
  }
}
</script>
<style scoped>
  .home {
    
  }
</style>
