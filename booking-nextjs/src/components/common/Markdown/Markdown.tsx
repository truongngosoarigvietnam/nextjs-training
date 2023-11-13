import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

type Props = {};

export default function Markdown({}: Props) {
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }: any) {
        console.log('handleEditorChange', html, text);
    }
    return (
        <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
        />
    );
}
