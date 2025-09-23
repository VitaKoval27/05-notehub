import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '../Modal/Modal';


export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

   const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes({ search: query, page }),
    placeholderData: (previousData) => previousData,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleDebouncedSearch = useDebouncedCallback(handleSearch, 1000);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleDebouncedSearch} value={query} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            forcePage={page - 1}
			
          />
        )}
		<button type="button" className={css.button} onClick={() => setIsFormOpen(true)}>Create Note +</button>
      </header>

     
      {isLoading && <Loader />}
      
      {isError && (
        <ErrorMessage
          message={error?.message || 'Something went wrong...'}
        />
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.notes.length === 0 && !isLoading && !isError && (
        <p>Notes is not found, may you change the request.</p>
      )}
	  {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <NoteForm onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}
		<Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
