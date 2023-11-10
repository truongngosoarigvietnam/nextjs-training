<template>
    <md-editor language="en-US"
      v-model="text"
      @input="$emit('update:modelValue', $event.target.value)"

    />
  </template>
  
  <script setup lang="ts">
  import { reactive , ref } from 'vue'
  import MdEditor from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  const text = ref('')
  const emit = defineEmits(['updateValue'])
  MdEditor.config({
    editorConfig: {
      languageUserDefined: {
        'my-lang': {
          toolbarTips: {
            bold: 'bold',
            underline: 'underline',
            italic: 'italic',
            strikeThrough: 'strikeThrough',
            title: 'title',
            sub: 'subscript',
            sup: 'superscript',
            quote: 'quote',
            unorderedList: 'unordered list',
            orderedList: 'ordered list',
            task: 'task list',
            codeRow: 'inline code',
            code: 'block-level code',
            link: 'link',
            image: 'image',
            table: 'table',
            mermaid: 'mermaid',
            katex: 'formula',
            revoke: 'revoke',
            next: 'undo revoke',
            save: 'save',
            prettier: 'prettier',
            pageFullscreen: 'fullscreen in page',
            fullscreen: 'fullscreen',
            preview: 'preview',
            htmlPreview: 'html preview',
            catalog: 'catalog',
            github: 'source code',
          },
          titleItem: {
            h1: 'Lv1 Heading',
            h2: 'Lv2 Heading',
            h3: 'Lv3 Heading',
            h4: 'Lv4 Heading',
            h5: 'Lv5 Heading',
            h6: 'Lv6 Heading',
          },
          imgTitleItem: {
            link: 'Add Img Link',
            upload: 'Upload Img',
            clip2upload: 'Clip Upload',
          },
          linkModalTips: {
            linkTitle: 'Add Link',
            imageTitle: 'Add Image',
            descLabel: 'Desc:',
            descLabelPlaceHolder: 'Enter a description...',
            urlLabel: 'Link:',
            urlLabelPlaceHolder: 'Enter a link...',
            buttonOK: 'OK',
          },
          clipModalTips: {
            title: 'Crop Image',
            buttonUpload: 'Upload',
          },
          copyCode: {
            text: 'Copy',
            successTips: 'Copied!',
            failTips: 'Copy failed!',
          },
          mermaid: {
            flow: 'flow',
            sequence: 'sequence',
            gantt: 'gantt',
            class: 'class',
            state: 'state',
            pie: 'pie',
            relationship: 'relationship',
            journey: 'journey',
          },
          katex: {
            inline: 'inline',
            block: 'block',
          },
          footer: {
            markdownTotal: 'Word Count',
            scrollAuto: 'Scroll Auto',
          },
        },
      },
    },
  })
  </script>
  