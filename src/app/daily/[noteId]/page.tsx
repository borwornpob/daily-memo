const EditorComp = dynamic(() => import("root/components/Editor"), {
  ssr: false,
});
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { validateRequest } from "root/db";

export default async function Page({ params }: { params: { noteId: string } }) {
  const { user } = await validateRequest();
  console.log(user);
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-2 space-y-4">
      <p className="text-3xl font-bold">Note {params.noteId}</p>
      <Suspense fallback={null}>
        <EditorComp markdown="Hello **world**!" />
      </Suspense>
    </div>
  );
}
