"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useState, useEffect, useRef } from "react";
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
  Plus,
  Code as CodeIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline as UnderlineIcon,
  Strikethrough,
  Table as TableIcon,
  Image as ImageIcon,
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
import { Editor } from "@tiptap/core";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// Create a node view for images with resizing handles
const createImageNodeView = (editor) => {
  return ({ node, getPos, HTMLAttributes, editor }) => {
    const dom = document.createElement('div');
    dom.classList.add('image-resizer-container');
    dom.style.position = 'relative';
    dom.style.display = 'inline-block';
    dom.style.margin = '0.5rem 0';

    const img = document.createElement('img');
    img.src = node.attrs.src;
    img.className = HTMLAttributes.class || 'rounded-lg max-w-full mx-auto my-4';
    if (node.attrs.width) {
      img.style.width = `${node.attrs.width}px`;
    }
    dom.appendChild(img);

    // Add resize handles
    const handles = ['se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w'];
    const handlePositions = {
      se: { bottom: '-4px', right: '-4px', cursor: 'nwse-resize' },
      sw: { bottom: '-4px', left: '-4px', cursor: 'nesw-resize' },
      ne: { top: '-4px', right: '-4px', cursor: 'nesw-resize' },
      nw: { top: '-4px', left: '-4px', cursor: 'nwse-resize' },
      n: { top: '-4px', left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
      s: { bottom: '-4px', left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
      e: { right: '-4px', top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
      w: { left: '-4px', top: '50%', transform: 'translateY(-50%)', cursor: 'ew-resize' },
    };

    const resizeHandles = {};

    handles.forEach(handlePos => {
      const handle = document.createElement('div');
      handle.classList.add('resize-handle', `resize-${handlePos}`);
      handle.style.position = 'absolute';
      handle.style.width = '10px';
      handle.style.height = '10px';
      handle.style.backgroundColor = '#0284c7'; // sky-600
      handle.style.borderRadius = '50%';
      handle.style.zIndex = '2';
      handle.style.opacity = '0';
      handle.style.border = '2px solid white';

      // Apply position based on handle type
      Object.entries(handlePositions[handlePos]).forEach(([prop, value]) => {
        handle.style[prop] = value;
      });

      dom.appendChild(handle);
      resizeHandles[handlePos] = handle;

      // Setup resize logic
      handle.addEventListener('mousedown', startResize);
    });

    // Show handles on hover
    dom.addEventListener('mouseenter', () => {
      Object.values(resizeHandles).forEach(handle => {
        handle.style.opacity = '1';
      });
    });

    dom.addEventListener('mouseleave', () => {
      if (!isResizing) {
        Object.values(resizeHandles).forEach(handle => {
          handle.style.opacity = '0';
        });
      }
    });

    // Resize functionality
    let isResizing = false;
    let startX, startY, startWidth, startHeight, activeHandle;

    function startResize(e) {
      e.preventDefault();
      isResizing = true;
      activeHandle = e.target.className.split(' ')[1].split('-')[1];
      startX = e.clientX;
      startY = e.clientY;
      startWidth = img.offsetWidth;
      startHeight = img.offsetHeight;

      // Add resize events
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);

      // Add active state
      dom.classList.add('resizing');
    }

    function resize(e) {
      if (!isResizing) return;

      let newWidth = startWidth;
      let deltaX = e.clientX - startX;
      let deltaY = e.clientY - startY;

      // Calculate new width based on the active handle
      if (['se', 'ne', 'e'].includes(activeHandle)) {
        newWidth = startWidth + deltaX;
      } else if (['sw', 'nw', 'w'].includes(activeHandle)) {
        newWidth = startWidth - deltaX;
      } else if (['n', 's'].includes(activeHandle)) {
        // For top and bottom handles, maintain aspect ratio
        // based on vertical movement
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        newWidth = startWidth + deltaY * aspectRatio * (activeHandle === 'n' ? -1 : 1);
      }

      // Ensure minimum and maximum width
      newWidth = Math.max(100, Math.min(800, newWidth));

      // Apply new width maintaining aspect ratio
      img.style.width = `${newWidth}px`;
    }

    function stopResize() {
      if (isResizing) {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);

        // Update the node attributes with the new width
        const newWidth = Math.round(img.offsetWidth);
        editor.chain().focus().setNodeSelection(getPos()).updateAttributes('image', {
          width: newWidth
        }).run();

        // Remove active state
        dom.classList.remove('resizing');

        // Hide handles if mouse is not over the image
        const rect = dom.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
          Object.values(resizeHandles).forEach(handle => {
            handle.style.opacity = '0';
          });
        }
      }
    }

    // Add a reset button
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path><path d="M14 8H9v6l5-3z"></path></svg>';
    resetBtn.style.position = 'absolute';
    resetBtn.style.top = '-1.75rem';
    resetBtn.style.right = '0';
    resetBtn.style.background = 'white';
    resetBtn.style.border = '1px solid #e2e8f0';
    resetBtn.style.borderRadius = '0.375rem';
    resetBtn.style.padding = '0.25rem';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    resetBtn.style.opacity = '0';
    resetBtn.style.transition = 'opacity 0.2s';
    resetBtn.title = 'Reset to original size';
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      editor.chain().focus().setNodeSelection(getPos()).updateAttributes('image', { width: null }).run();
    });
    dom.appendChild(resetBtn);

    dom.addEventListener('mouseenter', () => {
      resetBtn.style.opacity = '1';
    });

    dom.addEventListener('mouseleave', () => {
      if (!isResizing) {
        resetBtn.style.opacity = '0';
      }
    });

    // This is important for tiptap
    return {
      dom,
      contentDOM: null,
      update(node) {
        if (node.type.name !== 'image') return false;
        img.src = node.attrs.src;
        if (node.attrs.width) {
          img.style.width = `${node.attrs.width}px`;
        } else {
          img.style.width = '';
        }
        return true;
      },
      destroy() {
        // Clean up event listeners
        handles.forEach(handle => {
          resizeHandles[handle]?.removeEventListener('mousedown', startResize);
        });
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      },
    };
  };
};

export function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Create our resizable image extension
  const ResizableImage = Image.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        width: {
          default: null,
          renderHTML: attributes => {
            if (!attributes.width) {
              return {};
            }
            return {
              width: attributes.width,
              style: `width: ${attributes.width}px`,
            };
          },
        },
      };
    },
    addNodeView() {
      return createImageNodeView(this.editor);
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      ResizableImage.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border-b bg-gray-100 p-2 text-left font-bold",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border p-2",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "rounded-md bg-gray-100 p-4 font-mono",
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class: "rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer) {
          const text = event.dataTransfer.getData("text/plain");
          const node = view.state.schema.text(text);
          const transaction = view.state.tr.replaceSelectionWith(node);
          view.dispatch(transaction);
          return true;
        }
        return false;
      },
      parseOptions: {
        preserveWhitespace: 'full',
      },
    },
  });

  // Update content when it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Set content with a small delay to ensure proper rendering
      setTimeout(() => {
        editor.commands.setContent(content, false, {
          preserveWhitespace: 'full',
        });
      }, 0);
    }
  }, [content, editor]);

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Add custom CSS for resize handlers
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .image-resizer-container {
        display: inline-block;
        position: relative;
      }
      .resize-handle {
        opacity: 0;
        transition: opacity 0.2s;
      }
      .image-resizer-container:hover .resize-handle {
        opacity: 1;
      }
      .image-resizer-container.resizing {
        user-select: none;
      }
      .image-resizer-container.resizing img {
        pointer-events: none;
      }
      .ProseMirror img {
        max-width: 100%;
        height: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        
        // Convert file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
          if (editor) {
            const base64String = reader.result as string;
            editor.chain().focus().setImage({ src: base64String }).run();
          }
        };

        reader.onerror = () => {
          throw new Error("Failed to read file");
        };
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
      {/* Top Toolbar */}
      <div className="border-b p-2 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-muted" : ""}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
        >
          H1
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
        >
          H2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-muted" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-muted" : ""}
        >
          <CodeIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? "bg-muted" : ""}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? "bg-muted" : ""}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? "bg-muted" : ""}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => {
            const url = prompt("Enter the URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive("link") ? "bg-muted" : ""}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
      
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                handleFileUpload(file);
              }
            };
            input.click();
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Editor */}
      <div className="px-12 py-8">
        <EditorContent editor={editor} />
      </div>

      {/* Bottom Toolbar */}
      <div className="border-t p-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
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
