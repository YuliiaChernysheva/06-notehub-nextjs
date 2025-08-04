import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const Notes = async () => {
  const response = await getNotes({ search: "", page: 1, perPage: 12 });

  const notes = response?.notes ?? [];

  return (
    <section>
      <NotesClient notes={notes} />
    </section>
  );
};

export default Notes;
