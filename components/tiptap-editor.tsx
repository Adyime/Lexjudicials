"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useCallback, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Plus,
  Link as LinkIcon,
  Code,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto my-4",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
      },
    },
  });

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.url && editor) {
          editor.chain().focus().setImage({ src: data.url }).run();
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [editor]
  );

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer?.files[0];
      if (file?.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const file = event.clipboardData?.files[0];
      if (file?.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  if (!editor) {
    return null;
  }

  return (
    <div
      className="relative border rounded-lg bg-background"
      onDrop={handleDrop as any}
      onPaste={handlePaste as any}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Floating Menu for New Block */}
      <div className="absolute left-0 ml-4 top-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full w-8 h-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1 className="h-4 w-4 mr-2" />
                Heading 1
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 className="h-4 w-4 mr-2" />
                Heading 2
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <Code className="h-4 w-4 mr-2" />
                Code Block
              </Button>
              <Label className="px-2 py-1 text-sm">Image</Label>
              <Input
                type="file"
                className="w-full"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu
          className="flex items-center gap-1 p-1 rounded-lg border bg-background shadow-lg"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-muted" : ""}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-muted" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}

      {/* Main Editor */}
      <div className="px-12 py-8">
        <EditorContent editor={editor} />
      </div>

      {/* Bottom Toolbar */}
      <div className="border-t p-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Upload Overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
