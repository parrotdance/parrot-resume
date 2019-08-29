<template>
  <div class="home">
    <textarea
      class="input"
      v-model="markdown"
      placeholder="在这里输入 markdown"
      spellcheck="false"
      @input="onMarkdownInput"
      @keydown.tab.prevent="onTab"
    />
    <div class="preview" v-html="result"></div>
  </div>
</template>

<script>
  import MarkdownIt from 'markdown-it';
  const MD = new MarkdownIt();

  export default {
    data() {
      return {
        markdown: '',
        result: '',
        canParse: true
      };
    },
    computed: {
      placeholder() {
        return this.markdown ? '' : '在这里写 Markdown';
      }
    },
    methods: {
      onTab(e) {
        this.markdown += '    ';
        this.parseMarkdown();
      },
      onMarkdownInput(e) {
        this.markdown = e.target.value;
        this.parseMarkdown();
      },
      parseMarkdown() {
        if (!this.canParse) return;
        this.canParse = false;
        setTimeout(() => {
          this.result = MD.render(this.markdown);
          this.canParse = true;
        }, 500);
      }
    }
  };
</script>
<style scoped>
  .home {
    display: flex;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: #201f21;
  }
  .input,
  .preview {
    flex: 0 0 44%;
    width: 0;
    margin: 24px 1%;
    height: 80%;
    background-color: white;
    padding: 12px 24px;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 0 8px white;
    overflow: scroll;
  }
  .input {
    border: none;
    font-size: 14px;
    line-height: 2;
  }
</style>
