"use client";
// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  EditorContext,
  Editor,
  useEditorState,
} from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useActionState, useMemo } from "react";
import { Toggle } from "./ui/toggle";
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  List,
  ListOrdered,
  QuoteIcon,
  Redo2Icon,
  UnderlineIcon,
  Undo2,
  Undo2Icon,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })], // define your extension array

    content: "<p>Hello World!</p>", // initial content
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none border", // add Tailwind CSS classes for styling
      },
    },
    immediatelyRender: false, // disable immediate rendering
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      {editor && <ToolBar editor={editor} />}
      <EditorContent editor={editor} />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </EditorContext.Provider>
  );
};

export default Tiptap;

const ToolBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,

        isCode: ctx.editor.isActive("code") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isUndo: ctx.editor.can().undo() ?? false,
        isRedo: ctx.editor.can().redo() ?? false,
      };
    },
  });

  return (
    <div>
      <div className="toolbar  ">
        <Toggle
          pressed={editorState.isBold}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle
          pressed={editorState.isItalic}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <ItalicIcon className="size-4">I</ItalicIcon>
        </Toggle>
        <Toggle
          pressed={editorState.isUnderline}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <UnderlineIcon className="size-4">U</UnderlineIcon>
        </Toggle>
        <Toggle
          pressed={editorState.isCode}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleCode().run();
          }}
        >
          <CodeIcon className="size-4" />
        </Toggle>
        <Toggle
          pressed={editorState.isBulletList}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          pressed={editorState.isOrderedList}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="size-4" />
        </Toggle>
        <Toggle
          pressed={editorState.isBlockquote}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <QuoteIcon className="size-4" />
        </Toggle>
        <Toggle
          pressed={editorState.isHighlight}
          onPressedChange={(pressed) => {
            editor.chain().focus().toggleHighlight().run();
          }}
        >
          <HighlighterIcon className="size-4" />
        </Toggle>

        <button
          type="button"
          disabled={!editorState.isUndo}
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
        >
          <Undo2 className="size-4" />
        </button>
        <button
          type="button"
          disabled={!editorState.isRedo}
          aria-label="Redo"
          onClick={() => {
            editor.chain().focus().redo().run();
          }}
        >
          <Redo2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};
