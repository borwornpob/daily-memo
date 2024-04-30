"use client";

import { useEditor, Editor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { SwitchButton } from "./SwitchButton";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import TypographyExtension from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import EditorStyled from "./TiptapStyle";

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
    <div className="flex space-x-2">
      <SwitchButton
        checked={editor.isActive("heading", { level: 1 })}
        onChange={(checked) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        name="H1"
      />
      <SwitchButton
        checked={editor.isActive("heading", { level: 2 })}
        onChange={(checked) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        name="H2"
      />
      <SwitchButton
        checked={editor.isActive("heading", { level: 3 })}
        onChange={(checked) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        name="H3"
      />
      <div className="divider divider-horizontal ml-0 mr-0"></div>
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
      <div className="divider divider-horizontal ml-0 mr-0"></div>
      <SwitchButton
        checked={editor.isActive("bulletList")}
        onChange={(checked) => editor.chain().focus().toggleBulletList().run()}
        name="Bullet List"
      />
      <SwitchButton
        checked={editor.isActive("orderedList")}
        onChange={(checked) => editor.chain().focus().toggleOrderedList().run()}
        name="Ordered List"
      />
      <div className="divider divider-horizontal ml-0 mr-0"></div>
      <SwitchButton
        checked={editor.isActive("textStyle", { color: "#000000" })}
        onChange={(checked) => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);

          // cancelled
          if (url === null) {
            return;
          }

          // empty
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
          }

          // update link
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }}
        name="Link"
      />
    </div>
  );
};

const extensions = [
  StarterKit,
  Link.configure({
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
      class: "text-accent",
    },
  }),
  Code,
  Highlight,
  Heading,
];

const Tiptap = (props: { content: string }) => {
  const editor = useEditor({
    extensions,
    content: props.content,
    // editorProps: {
    //   attributes: {
    //     class: "p-2",
    //   },
    // },
  });
  return (
    <div className="bg-neutral-content rounded-md drop-shadow-lg p-2">
      <EditorStyled>
        <Menubar editor={editor} />
        <div className="divider divider-neutral mt-0 mb-0"></div>
        <EditorContent editor={editor} />
      </EditorStyled>
    </div>
  );
};

export default Tiptap;
