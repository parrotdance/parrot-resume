<template>
  <div class="home">
    <div class="field-wrapper">
      <div :class="['markdown-input__tools', { show: showInputTool }]">
        <button 
          v-for="tool in templateList" 
          :key="tool.label" 
          :style="tool.style"
          @click.stop="insertTemplate(tool.template)">{{ tool.label }}</button>
      </div>
      <textarea
        class="markdown-input"
        ref="input"
        :value="markdown"
        placeholder="在这里输入 markdown"
        spellcheck="false"
        @input="onMarkdownInput"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keydown.tab.prevent="insertTemplate('    ')"
      />
    </div>
    <div class="field-wrapper">
    <div ref="preview" class="markdown-preview" v-html="result"></div>
      </div>
  </div>
</template>

<script>
  import MarkdownIt from 'markdown-it';
  import { markdownTemplateList } from '@/utils/markdownTemplate';
  import content2md from '@/utils/mdParser';
  import getMdFileContent from '@/utils/mdReader';
  import element2pdf from '@/utils/pdfParser';
  import { EventBus } from '@/plugins/eventbus';

  const MD = new MarkdownIt();

  export default {
    data() {
      return {
        markdown: '',
        result: '',
        canParse: true,
        showInputTool: false,
        leaveFocusTimeout: null,
        templateList: markdownTemplateList
      };
    },
    computed: {
      placeholder() {
        return this.markdown ? '' : '在这里写 Markdown';
      },
    },
    mounted() {
      const cachedMarkdown = localStorage.getItem('markdown');
      if (cachedMarkdown) {
        this.markdown = cachedMarkdown;
        this.parseMarkdown();
      }
      EventBus.$on('IMPORT_MD_FILE', this.importMdFile);
      EventBus.$on('EXPORT_MD_FILE', this.exportMdFile);
      EventBus.$on('EXPORT_PDF_FILE', this.exportPdfFile);
    },
    beforeDestroy() {
      EventBus.$off('IMPORT_MD_FILE');
      EventBus.$off('EXPORT_MD_FILE');
      EventBus.$off('EXPORT_PDF_FILE');
    },
    methods: {
      onInputFocus() {
        if (this.leaveFocusTimeout) {
          clearTimeout(this.leaveFocusTimeout);
        }
        this.showInputTool = true;
      },
      onInputBlur() {
        this.leaveFocusTimeout = setTimeout(() => {
          this.showInputTool = false;          
        }, 500);
      },
      insertTemplate(template) {
        const startPos = this.$refs.input.selectionStart;
        const EndPos = this.$refs.input.selectionEnd;
        const prev = this.markdown.substring(0, startPos);
        const after = this.markdown.substring(EndPos, this.markdown.length);
        if (startPos === 0 && EndPos === 0) {
          // 如果光标位置在最开头, 则替换 template 开头的换行符
          this.markdown = prev + template.replace(/^\n/, '') + after;
        } else {
          this.markdown = prev + template + after;
        }
        this.$nextTick(() => {
          this.$refs.input.selectionStart = startPos + template.length;
          this.$refs.input.selectionEnd = startPos + template.length;
          this.$refs.input.focus();
        })
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
          localStorage.setItem('markdown', this.markdown);
          this.canParse = true;
        }, 500);
      },
      async importMdFile() {
        this.markdown = await getMdFileContent();
        this.parseMarkdown();
      },
      exportMdFile() {
        content2md(this.markdown, 'file.md');
      },
      exportPdfFile() {
        const target = this.$refs.preview;
        element2pdf(target, 'a4', 'resume.pdf');
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
    background-color: #333333;
  }
  .field-wrapper {
    position: relative;
    flex: 0 0 44%;
    width: 0;
    margin: 24px 1%;
    height: 80%;
    border-radius: 4px;
  }
  .markdown-input,
  .markdown-preview {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 12px 24px;
    border-radius: 4px;
    outline: none;
    overflow: scroll;
  }
  .markdown-input {
    border: none;
    font-size: 14px;
    line-height: 2;
    resize: none;
  }
  .markdown-input__tools {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 4px;
    border-radius: 4px;
    border-bottom: 1px dashed #cccccc;
    background-color: white;
    z-index: 1;
    transition: transform .3s ease;
    transform: translateY(0);
  }
  .markdown-input__tools.show {
    transform: translateY(-100%);
  }
  .markdown-input__tools > button {
    display: inline-block;
    margin-left: 8px;
    padding: 0 4px;
    text-align: center;
    min-width: 28px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    background-color: transparent;
    transition: all .3s ease;
    font-size: 14px;
    line-height: 28px;
    outline: none;
    cursor: pointer;
  }
  .markdown-input__tools > button:hover {
    border-color: #cccccc;
    background-color: #eeeeee;
  }
</style>
