import Tiptap from "root/components/Tiptap";

export default function Page({ params }: { params: { noteId: string } }) {
  return (
    <div className="container mx-auto px-4 py-2 space-y-4">
      <p className="text-3xl font-bold">Note {params.noteId}</p>
      <Tiptap content="" />
    </div>
  );
}
