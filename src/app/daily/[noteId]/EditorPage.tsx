"use client";

import dynamic from "next/dynamic";
const EditorComp = dynamic(() => import("root/components/Editor"), {
  ssr: false,
});
import { useState } from "react";

export default function EditorPage(props: { userId: string }) {
  const [content, setContent] = useState<string>("");

  const handleSave = async () => {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: props.userId, content: content }),
    });
    if (res.ok) {
      alert("Saved!");
    } else {
      alert("Failed to save");
    }
  };
  return (
    <>
      <EditorComp
        markdown={content}
        onChange={(markdown) => setContent(markdown)}
      />
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </>
  );
}
