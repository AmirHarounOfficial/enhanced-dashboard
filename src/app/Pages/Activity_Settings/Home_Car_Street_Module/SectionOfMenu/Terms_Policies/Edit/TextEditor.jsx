import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

const TextEditor = forwardRef(({ value, onChange }, ref) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }],
      ['link', 'image'],
      ['clean'],
      ['code-block']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'align', 'list',
    'direction',
    'link', 'image', 'code-block'
  ];

  return (
    <div className="mt-1.5 arabic-editor" dir="rtl">
      <style>{`
        .arabic-editor .ql-editor {
          text-align: right;
          direction: rtl;
          font-family: inherit;
        }
        .arabic-editor .ql-editor.ql-blank::before {
          right: 15px;
          left: auto;
          text-align: right;
          font-style: normal;
        }
        .arabic-editor .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
          right: 0;
          left: auto;
        }
      `}</style>
      <ReactQuill 
        ref={ref}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ direction: 'rtl', textAlign: 'right' }}
      />
    </div>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;