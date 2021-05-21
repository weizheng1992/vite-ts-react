import React, { useEffect, useRef, useMemo, useState, useImperativeHandle } from 'react';

import tinymce from 'tinymce/tinymce';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/themes/silver';

import 'tinymce/icons/default/icons';
import 'tinymce/themes/mobile';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/tabfocus';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

import { EditorProps } from './editotTypes';
import plugins from './plugins';
import toolbar from './toolbar';

import { buildShortUUID } from '/@/utils/uuid';
import { useWatch } from '/@/hooks/core/useWatch';

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const editorRef = useRef<any>(null);
  const tinymceId = useRef<string>(buildShortUUID('tiny-vue'));
  const elRef = useRef<HTMLTextAreaElement | null>(null);
  const [visibi, setVisibi] = useState<boolean>(false);
  const initOptions = useMemo(() => {
    const { plugins: plu = plugins, height = 400, options, toolbar: tool = toolbar } = props;
    return {
      selector: `textarea#${tinymceId.current}`,
      height,
      toolbar: tool,
      menubar: 'file edit insert view format table',
      plugins: plu,
      language_url: 'pubilc/resource/tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      branding: false,
      default_link_target: '_blank',
      link_title: false,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      object_resizing: false,
      skin: 'oxide',
      skin_url: 'pubilc/resource/tinymce/skins/ui/oxide',
      content_css: 'pubilc/resource/tinymce/skins/content/default/content.css',
      ...options,
      setup: (editor: any) => {
        editorRef.current = editor;
        editor.on('init', () => initSetup());
      },
    };
  }, [props]);
  useEffect(() => {
    setTimeout(() => {
      const el = elRef;
      if (el) {
        setVisibi(true);
      }
      tinymce.init(initOptions);
    }, 20);
    return () => {
      destory();
    };
  }, []);

  useWatch(props.value, (pre) => {
    console.log(pre);
    console.log(props.value);
  });

  function destory() {
    if (tinymce !== null) {
      tinymce?.remove?.(editorRef.current);
    }
  }

  const initSetup = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const value = props.modelValue || '';
    editor.setContent(value);
    editor.on('change keyup undo redo', () => {
      const content = editor.getContent();
      props.onChange(content);
    });
  };

  useImperativeHandle(props.ediRef, () => ({
    getValue: () => {
      const editor = editorRef.current;
      if (!editor) return;
      return editor.getContent();
    },
  }));
  return (
    <textarea
      id={tinymceId.current}
      ref={elRef}
      style={{ visibility: visibi ? 'visible' : 'hidden' }}
    ></textarea>
  );
};
export default Editor;
