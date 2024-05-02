const EditorComp = dynamic(() => import("root/components/Editor"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

export default function Page({ params }: { params: { noteId: string } }) {
  return (
    <div className="container mx-auto px-4 py-2 space-y-4">
      <p className="text-3xl font-bold">Note {params.noteId}</p>
      <Suspense fallback={null}>
        <EditorComp markdown="Hello **world**!" />
      </Suspense>
    </div>
  );
}
