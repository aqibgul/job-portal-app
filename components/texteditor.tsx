"use client";
// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  EditorContext,
  Editor,
  useEditorState,
} from "@tiptap/react";

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
import { BubbleMenu as TiptapBubblemenu } from "@tiptap/react/menus";
const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })], // define your extension array

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none  ", // add Tailwind CSS classes for styling
      },
    },
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },

    immediatelyRender: false, // disable immediate rendering
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <div className="">
      <EditorContext.Provider value={providerValue}>
        <div className="bg-amber-100">
          {editor && (
            <>
              <ToolBar editor={editor} />
              <BubbleMenu editor={editor} />
            </>
          )}
        </div>

        <EditorContent
          editor={editor}
          className="min-h-[300px] px-3 py-4  border"
        />

        {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      </EditorContext.Provider>
    </div>
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
        isUndo: editor.can().undo(),

        isRedo: editor.can().redo(),
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

const BubbleMenu = ({ editor }: { editor: Editor }) => {
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
        isUndo: editor.can().undo(),

        isRedo: editor.can().redo(),
      };
    },
  });

  return (
    <TiptapBubblemenu editor={editor}>
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
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <Redo2Icon className="size-4" />
      </button>
    </TiptapBubblemenu>
  );
};
