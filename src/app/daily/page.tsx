import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NoteCard } from "root/components/NoteCard";
import { db, validateRequest } from "root/db";
import * as schema from "root/schema";

export default async function Page() {
  // const notes = [
  //   {
  //     id: 1,
  //     title: "Note 1",
  //     date: "2021-09-01",
  //     preview: "This is a preview of note 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Note 2",
  //     date: "2021-09-02",
  //     preview: "This is a preview of note 2",
  //   },
  //   {
  //     id: 3,
  //     title: "Note 3",
  //     date: "2021-09-03",
  //     preview: "This is a preview of note 3",
  //   },
  // ];
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const notes = await db.query.note.findMany({
    where: eq(schema.note.userId, user.id),
  });

  return (
    // this page is a before to note page
    // should consists of one button at the to to create new note
    // and a list of card render for each note (this should fetch from the database and will be implemented later. For now it'll be a hardcoded array)
    // each card should have a title, date, and a preview of the note
    // when clicked, it should redirect to the note page

    // this page should also have a search bar to search for notes (this will be implemented later)

    <div className="container px-4 py-4 mx-auto space-y-4">
      <p className="text-3xl font-bold">Welcome to Daily notes!</p>
      <button className="btn btn-primary">Create new note</button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note.id} // Add the key prop with a unique value
            id={note.id}
            title={note.createdAt.toDateString()}
            date={note.createdAt.toDateString()}
            preview={"This is a preview of note 1"}
          />
        ))}
      </div>
    </div>
  );
}
