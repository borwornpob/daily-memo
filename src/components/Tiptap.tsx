"use client";

import { useEditor, Editor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { SwitchButton } from "./SwitchButton";

const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  // return (
  //   <div className="menubar">
  //     <button onClick={() => editor.chain().focus().toggleBold().run()}>
  //       Bold
  //     </button>
  //     <button onClick={() => editor.chain().focus().toggleItalic().run()}>
  //       Italic
  //     </button>
  //     <button onClick={() => editor.chain().focus().toggleStrike().run()}>
  //       Strike
  //     </button>
  //   </div>
  // );
  return (
    <div className="flex-row">
      <SwitchButton
        checked={editor.isActive("bold")}
        onChange={(checked) => editor.chain().focus().toggleBold().run()}
        name="Bold"
      />
      <SwitchButton
        checked={editor.isActive("italic")}
        onChange={(checked) => editor.chain().focus().toggleItalic().run()}
        name="Italic"
      />
      <SwitchButton
        checked={editor.isActive("strike")}
        onChange={(checked) => editor.chain().focus().toggleStrike().run()}
        name="Strike"
      />
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Tiptap = (props: { content: string }) => {
  const editor = useEditor({
    extensions,
    content: props.content,
  });
  return (
    <div className="bg-neutral-content rounded-md drop-shadow-lg p-2">
      <Menubar editor={editor} />
      <div className="divider divider-neutral mt-0 mb-0"></div>
      <EditorContent editor={editor} className="bg-base-300 rounded-md" />
    </div>
  );
};

export default Tiptap;
