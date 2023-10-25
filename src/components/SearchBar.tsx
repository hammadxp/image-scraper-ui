import { FormEvent, useState } from "react";
import axios from "axios";
import { ResultType } from "../utils/types";

type SearchBarProps = {
  searchQuery: string;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<ResultType[]>>;
};

export default function SearchBar({ searchQuery, setSearchQuery, setHasSearched, setIsLoading, setIsError, setResults }: SearchBarProps) {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setHasSearched(true);
    setIsLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/scrape", { url: searchQuery });

      setResults(res.data.data);
      setIsError(false);
    } catch (e) {
      console.error("this", e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div className="max-w-7xl text-center bg-lime-200 py-4 px-12 rounded-lg flex gap-8 shadow-md text-lime-700">
        <div>
          <h2 className="text-4xl font-extrabold p-4">Image Scraper</h2>
          <p className="w-full pb-8">Quickly extract images from a webpage!</p>
        </div>

        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex gap-4 items-center h-fit">
            <input
              type="text"
              placeholder="Enter the url..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ring-2 ring-transparent py-2 px-4 focus:ring-lime-500 outline-none text-lg rounded-md text-gray-900"
            />
            <button
              type="submit"
              className={`py-2 px-4 bg-lime-700 text-white transition-all rounded-md ${!searchQuery ? "cursor-not-allowed" : "hover:bg-lime-600"}`}
            >
              Scrap It
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
