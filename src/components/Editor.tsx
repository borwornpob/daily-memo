"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  InsertCodeBlock,
  InsertSandpack,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { FC } from "react";
import "@mdxeditor/editor/style.css";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="prose"
      onChange={(e) => console.log(e)}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <CodeToggle />
              <ListsToggle />
              <BlockTypeSelect />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              />
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        quotePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
      ]}
    />
  );
};

export default Editor;
