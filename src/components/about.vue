<template>
  <div :class="['about', { show }]" @click.stop>
    <div class="bg" @click="onClickMask"></div>
    <div class="desc">
      <p><strong>这是一个纯前端实现的 Markdown 编辑器, 目前处于开发阶段.</strong></p>
      <p><strong>最初的设想是成为一个基于 Markdown 语法的 PDF (简历) 生成器, 于是便有了名字 ParroT-Resume.</strong></p>
      <p>相比复杂繁重的 Microsoft Office, 我更喜欢 Markdown 简洁的语法和一致的样式.</p>
      <p>=> 如果你需要更便捷更高效的工具记录思想, 整理笔记, 知识, 并将其中承载的价值传播给他人, Markdown 应该会让你满意.</p>
      <p>=> 如果你是第一次编写 Markdown 文件, 你可以通过编辑区上方展开的模板按钮来了解对应语法.</p>
      <p>=> 你可以通过侧边栏的按钮导入 .md 文件, 也可以自行将内容粘贴到编辑区. 编辑的内容会保存在浏览器缓存中, 下次回来时将会自动恢复.</p>
      <p>=> 你也可以通过侧边栏的导出按钮将你的内容保存到本地的 .md 文件或保存为 .pdf 文件.</p>
      <br />
      <p>=> 如有任何意见或建议, 期待通过以下方式联系我:</p>
      <p>Github: <a class="link" href="https://github.com/parrotdance/parrot-resume">parrot-resume</a></p>
      <p>E-mail: <span class="link">parrotdance95@gmail.com</span></p>
    </div>
    <div class="log">
      <p><strong>更新日志:</strong></p>
      <p>Sep 6: </p>
      <p>新增了专注于编辑的 Zen Mode 和专注于预览的 Preview Mode, 通过中间的开关切换显示.</p>
      <p>Sep 5: </p>
      <p>现在输入区和预览区可以同步滚动了</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean
    }
  },
  mounted() {
    if (!window.localStorage.getItem('new_user')) {
      setTimeout(() => {
        this.$emit('update:show', true);
      }, 1000);
    }
    window.addEventListener('keydown', this.closeAboutPanel);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closeAboutPanel);
  },
  methods: {
    onEsc(e) {
      if (e.key === 'Escape' && this.show) {
        this.$emit('update:show', false);
        window.localStorage.setItem('new_user', '-1');
      }
    },
    onClickMask() {
      this.$emit('update:show', false);
      window.localStorage.setItem('new_user', '-1');
    }
  }
}
</script>
<style scoped>
  .about {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    transform-origin: 0 0;
    transform: scale(0, 0);
    transition: transform .3s ease;
  }
  .about.show {
    transform: scale(1, 1);    
  }
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    z-index: -1;
  }
  .desc, .log {
    margin: 0 20px;
    padding: 14px;
    width: 80%;
    background-color: white;
    border-radius: 8px;
    overflow: scroll;
  }
  .desc {
    width: 50%;
    max-height: 80%;
  }
  .log {
    width: 30%;
    max-height: 80%;
  }
  .link {
    padding: 0 12px;
    transition: all .3s ease;
    border-radius: 4px;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    color: #0d9ac2;
  }
  .link:hover {
    background-color: #efefef;
    border-bottom: 1px solid #0d9ac2;
  }
</style>