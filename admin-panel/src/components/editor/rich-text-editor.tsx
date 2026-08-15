"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import {
    Bold,
    Italic,
    UnderlineIcon,
    List,
    ListOrdered,
    Undo2,
    Redo2,
    LinkIcon,
    RemoveFormatting,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";


interface Props {
    value?: string;
    onChange: (value: string) => void;
}


export default function RichTextEditor({
    value = "",
    onChange,
}: Props) {


    const editor = useEditor({

        extensions: [

            StarterKit,

            Underline,

            Link.configure({
                openOnClick: false,
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),

            Placeholder.configure({
                placeholder:
                    "Write product description...",
            }),

        ],


        content: value,


        editorProps: {

            attributes: {
                class:
                    "min-h-[220px] p-4 outline-none prose max-w-none",
            },

        },


        onUpdate({ editor }) {

            onChange(
                editor.getHTML()
            );

        },


    });



    if (!editor) {
        return null;
    }



    const tools = [

        {
            icon: Bold,
            action: () =>
                editor.chain()
                    .focus()
                    .toggleBold()
                    .run(),

            active:
                editor.isActive("bold"),
        },


        {
            icon: Italic,
            action: () =>
                editor.chain()
                    .focus()
                    .toggleItalic()
                    .run(),

            active:
                editor.isActive("italic"),
        },


        {
            icon: UnderlineIcon,
            action: () =>
                editor.chain()
                    .focus()
                    .toggleUnderline()
                    .run(),

            active:
                editor.isActive("underline"),
        },


        {
            icon: List,
            action: () =>
                editor.chain()
                    .focus()
                    .toggleBulletList()
                    .run(),

            active:
                editor.isActive("bulletList"),
        },


        {
            icon: ListOrdered,
            action: () =>
                editor.chain()
                    .focus()
                    .toggleOrderedList()
                    .run(),

            active:
                editor.isActive("orderedList"),
        },

    ];



    return (

        <div className="rounded-xl border bg-white overflow-hidden">


            <div className="flex flex-wrap gap-2 border-b bg-slate-50 p-2">


                {
                    tools.map(
                        (tool, index) => {

                            const Icon =
                                tool.icon;


                            return (

                                <Button

                                    key={index}

                                    type="button"

                                    variant={
                                        tool.active
                                            ? "secondary"
                                            : "ghost"
                                    }

                                    size="icon"

                                    onClick={
                                        tool.action
                                    }

                                >

                                    <Icon size={18} />

                                </Button>

                            );

                        }
                    )
                }



                <Button

                    type="button"

                    variant="ghost"

                    size="icon"

                    onClick={() =>
                        editor.chain()
                            .focus()
                            .undo()
                            .run()
                    }

                >

                    <Undo2 size={18} />

                </Button>



                <Button

                    type="button"

                    variant="ghost"

                    size="icon"

                    onClick={() =>
                        editor.chain()
                            .focus()
                            .redo()
                            .run()
                    }

                >

                    <Redo2 size={18} />

                </Button>



                <Button

                    type="button"

                    variant="ghost"

                    size="icon"

                    onClick={() => {

                        const url =
                            window.prompt(
                                "Enter URL"
                            );


                        if (url) {

                            editor
                                .chain()
                                .focus()
                                .setLink({
                                    href: url,
                                })
                                .run();

                        }

                    }}

                >

                    <LinkIcon size={18} />

                </Button>



                <Button

                    type="button"

                    variant="ghost"

                    size="icon"

                    onClick={() =>
                        editor.chain()
                            .focus()
                            .clearNodes()
                            .unsetAllMarks()
                            .run()
                    }

                >

                    <RemoveFormatting size={18} />

                </Button>


            </div>



            <EditorContent editor={editor} />


        </div>

    );

}