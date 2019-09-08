<template>
  <div class="home">
    <div class="field-wrapper" :style="{'flex-basis': fieldWidth[0], 'overflow': mode === 'preview' ? 'hidden' : 'visible' }">
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
        @scroll="onInputScroll"
        @mouseenter="mouseIn = 'input'"
      />
    </div>
    <mode-switch :current-mode="mode" @change="onFocusModeChange" />
    <div class="field-wrapper" :style="{ 'flex-basis': fieldWidth[1] }">
      <div class="markdown-preview" >
        <div 
          class="markdown-preview__content"
          v-html="result"
          ref="preview" 
          @scroll="onPreviewScroll"
          @mouseenter="mouseIn = 'preview'"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { throttle } from '@/utils/index';
  import { markdownTemplateList } from '@/utils/markdownTemplate';
  import { mdDownloader, mdParser } from '@/utils/mdParser';
  import getMdFileContent from '@/utils/mdReader';
  import element2pdf from '@/utils/pdfParser';
  import { EventBus } from '@/plugins/eventbus';
  import ModeSwitch from '@/components/ModeSwitch.vue';

  const INPUT_LINEHEIGHT = 28;

  export default {
    components: {
      ModeSwitch
    },
    data() {
      return {
        markdown: '',
        result: '',
        canParse: true,
        showInputTool: false,
        leaveFocusTimeout: null,
        templateList: markdownTemplateList,
        mouseIn: 'input',
        mode: 'normal'
      };
    },
    computed: {
      placeholder() {
        return this.markdown ? '' : '在这里写 Markdown';
      },
      fieldWidth() {
        switch(this.mode) {
          case 'normal':
            return ['44%', '44%'];
          case 'zen':
            return ['60%', '0'];
          case 'preview':
            return ['0', '60%'];
        }
      }
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
      onInputScroll: throttle(function() {
        if (this.mode === 'normal' && this.mouseIn === 'input') {
          const targetLine = Math.floor(this.$refs.input.scrollTop / INPUT_LINEHEIGHT);
          for (const item of this.$refs.preview.children) {
            if (Math.abs(targetLine - item.dataset.line) < 3) {
              this.$refs.preview.scrollTop = item.offsetTop;
              break;
            }
          }
        }
      }),
      onPreviewScroll: throttle(function() {
        if (this.mode === 'normal' && this.mouseIn === 'preview') {
          const currentPos = this.$refs.preview.scrollTop;
          for (const item of this.$refs.preview.children) {
            if (currentPos > item.offsetTop && currentPos < item.offsetTop + item.offsetHeight) {
              this.$refs.input.scrollTop = item.dataset.line * INPUT_LINEHEIGHT - 1;
              break;
            }
          }
        }
      }),
      onFocusModeChange(mode) {
        const markdownBak = this.markdown;
        this.markdown = '';
        this.result = ''; // 清空内容再变更 mode, 去除重排计算导致的动画卡顿
        this.mode = mode;
        setTimeout(() => {
          this.markdown = markdownBak;
          this.parseMarkdown();
        }, 300);
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
      parseMarkdown: throttle(function() {
        this.result = mdParser.render(this.markdown);
        localStorage.setItem('markdown', this.markdown);
        this.canParse = true;
      }, 500),
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
    justify-content: center;
    align-items: center;
    background-color: #333333;
  }
  .field-wrapper {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    width: 0;
    margin: 24px 1%;
    height: 80%;
    border-radius: 4px;
    transition: flex-basis .3s ease;
    overflow: hidden;
  }
  .markdown-input,
  .markdown-preview {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 4px;
    outline: none;
  }
  .markdown-preview__content {
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    scroll-behavior: smooth;
    overflow: scroll;
  }
  .markdown-input {
    padding: 12px 24px;
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
