import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client"; // Імпорт компонента NotesClient

// Асинхронний серверний компонент, що отримує дані
const Notes = async () => {
  const response = await getNotes({ search: "", page: 1, perPage: 12 });

  // Перевіряємо чи є нотатки
  const notes = response?.notes ?? [];

  // Рендеримо компонент NotesClient і передаємо нотатки як пропс
  return (
    <section>
      <NotesClient notes={notes} />
    </section>
  );
};

export default Notes;
