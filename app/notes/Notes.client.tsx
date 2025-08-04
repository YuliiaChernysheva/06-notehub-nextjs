"use client";

import { useState } from "react";
import css from "./page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { getNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = useDebouncedCallback((search: string) => {
    setDebouncedSearch(search);
  }, 300);

  const handleSearchChange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      getNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} total={data.totalPages} onChange={setPage} />
        )}
        <button
          className={css.button}
          type="button"
          onClick={() => setModalIsOpen(true)}
        >
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading, please wait...</p>}
      {!isLoading && isError && <p>Could not fetch the list of notes</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isSuccess && data.notes.length === 0 && <p>No notes found</p>}
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <NoteForm onClose={() => setModalIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
