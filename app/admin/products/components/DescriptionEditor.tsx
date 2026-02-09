"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Type,
  Heading1,
  Heading2,
  Code,
  Quote,
  Redo,
  Undo,
  RemoveFormatting,
} from "lucide-react";
import LinkDialog from "./LinkDialog";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxCharacters?: number;
}

export default function DescriptionEditor({
  value,
  onChange,
  placeholder = "Start typing here...",
  minHeight = "200px",
  maxCharacters = 10000,
}: Props) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    // extensions: [
    //   StarterKit.configure({
    //     heading: {
    //       levels: [1, 2, 3],
    //     },
    //     bulletList: {
    //       keepMarks: true,
    //       keepAttributes: false,
    //     },
    //     orderedList: {
    //       keepMarks: true,
    //       keepAttributes: false,
    //     },
    //   }),
    //   Placeholder.configure({
    //     placeholder,
    //   }),
    //   Underline,
    //   TextAlign.configure({
    //     types: ["heading", "paragraph"],
    //   }),
    //   Link.configure({
    //     openOnClick: true,
    //     HTMLAttributes: {
    //       class: "text-blue-600 underline hover:text-blue-800",
    //     },
    //   }),
    //   CharacterCount.configure({
    //     limit: maxCharacters,
    //   }),
    // ],
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "listItem"],
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      CharacterCount.configure({
        limit: maxCharacters,
      }),
    ],

    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[150px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleAddLink = () => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes("link").href;
    setLinkUrl(previousUrl || "https://");
    setShowLinkDialog(true);
  };

  const handleConfirmLink = (url: string) => {
    if (!editor) return;
    
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: "_blank" })
        .run();
    }
    setShowLinkDialog(false);
  };

  if (!editor) {
    return (
      <div className="border rounded-lg p-4 min-h-50 animate-pulse bg-gray-50" />
    );
  }


  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-colors
        ${active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-6 bg-gray-300 mx-1" />
  );

  // Character count progress
  const characters = editor.storage.characterCount?.characters() || 0;
  const words = editor.storage.characterCount?.words() || 0;
  const characterPercentage = maxCharacters ? (characters / maxCharacters) * 100 : 0;

  return (
    <div className="space-y-3">
     
      
      <div className="border rounded-lg overflow-hidden">
        {/* Main Toolbar */}
        <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={18} />
            </ToolbarButton>
          </div>

          <ToolbarSeparator />

          {/* Headings */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              active={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              <Heading1 size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <Heading2 size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              active={editor.isActive("paragraph")}
              title="Normal Text"
            >
              <Type size={18} />
            </ToolbarButton>
          </div>

          <ToolbarSeparator />

          {/* Lists */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </ToolbarButton>
          </div>

          <ToolbarSeparator />

          {/* Alignment */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              active={editor.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              <AlignLeft size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              active={editor.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              <AlignCenter size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              active={editor.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              <AlignRight size={18} />
            </ToolbarButton>
          </div>

          <ToolbarSeparator />

          {/* Special Formatting */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <Quote size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive("codeBlock")}
              title="Code Block"
            >
              <Code size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={handleAddLink}
              active={editor.isActive("link")}
              title="Add Link"
            >
              <LinkIcon size={18} />
            </ToolbarButton>
          </div>

          <div className="flex-1" />

          {/* Additional Tools */}
          <div className="flex items-center">
            <ToolbarButton
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              title="Clear Formatting"
            >
              <RemoveFormatting size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={18} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo (Ctrl+Y)"
            >
              <Redo size={18} />
            </ToolbarButton>
          </div>
        </div>

        {/* Editor Content */}
        <EditorContent
          editor={editor}
          style={{ minHeight }}
          className="bg-white"
        />

        {/* Status Bar */}
        <div className="bg-gray-50 border-t">
          {/* Character Limit Progress Bar */}
          {maxCharacters && (
            <div className="px-4 pt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    characterPercentage > 90 
                      ? "bg-red-500" 
                      : characterPercentage > 70 
                      ? "bg-yellow-500" 
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(characterPercentage, 100)}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="px-4 py-2 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              {editor.isActive("heading", { level: 1 }) && "Heading 1"}
              {editor.isActive("heading", { level: 2 }) && "Heading 2"}
              {editor.isActive("heading", { level: 3 }) && "Heading 3"}
              {editor.isActive("paragraph") && "Paragraph"}
              {editor.isActive("bold") && " • Bold"}
              {editor.isActive("italic") && " • Italic"}
              {editor.isActive("underline") && " • Underline"}
            </div>
            <div className="flex items-center gap-4">
              <span>
                {characters} characters • {words} words
              </span>
              {maxCharacters && (
                <span className={`font-medium ${
                  characters > maxCharacters * 0.9 
                    ? "text-red-600" 
                    : characters > maxCharacters * 0.7 
                    ? "text-yellow-600" 
                    : "text-gray-600"
                }`}>
                  {maxCharacters - characters} remaining
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Link Dialog */}
      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        onConfirm={handleConfirmLink}
        initialUrl={linkUrl}
      />
    </div>
  );
}

