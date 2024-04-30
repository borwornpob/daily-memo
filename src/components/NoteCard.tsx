// NoteCard.tsx
"use client";
import { redirect } from "next/navigation";

export const NoteCard = (props: {
  id: number;
  title: string;
  date: string;
  preview: string;
}) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.date}</p>
        <p>{props.preview}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-secondary"
            onClick={() => {
              // redirect to note page
              redirect(`/daily/${props.id}`);
            }}
          >
            Edit!
          </button>
        </div>
      </div>
    </div>
  );
};
