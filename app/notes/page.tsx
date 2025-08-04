import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const Notes = async () => {
  const response = await getNotes({ search: "", page: 1, perPage: 12 });

  return <section>{response?.notes?.length > 0 && <NotesClient />}</section>;
};

export default Notes;
