import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";
import { NodeViewProps } from "@tiptap/core";
import { Editor } from "@tiptap/core";

interface ImageAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
}

export const ResizableImage = Image.extend({
  name: "resizableImage",

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: (attributes: ImageAttributes) => ({
          width: attributes.width,
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: "auto",
        renderHTML: (attributes: ImageAttributes) => ({
          height: attributes.height,
          style: `height: ${attributes.height}`,
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: ImageAttributes }) {
    const { width, height } = HTMLAttributes;
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, {
        ...HTMLAttributes,
        style: `width: ${width}; height: ${height}; cursor: pointer; display: block; margin: 0 auto;`,
        draggable: "true",
      }),
    ];
  },

  addNodeView() {
    return ({
      node,
      HTMLAttributes,
      getPos,
      editor,
    }: NodeViewProps & { editor: Editor }) => {
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "inline-block";
      container.style.margin = "0 auto";

      const img = document.createElement("img");
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        img.setAttribute(key, value as string);
      });

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = `${entry.contentRect.width}px`;
          const height = `${entry.contentRect.height}px`;

          if (typeof getPos === "function") {
            editor.commands.updateAttributes("resizableImage", {
              width,
              height,
            });
          }
        }
      });

      resizeObserver.observe(img);

      img.addEventListener("mousedown", (event) => {
        event.preventDefault();
      });

      container.append(img);
      return {
        dom: container,
        contentDOM: container,
        destroy: () => {
          resizeObserver.disconnect();
        },
      };
    };
  },
});
