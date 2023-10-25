import { useState } from "react";
import { ResultType } from "./utils/types";

import SearchBar from "./components/SearchBar";
import ResultsContainer from "./components/ResultsContainer";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setHasSearched={setHasSearched}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
        setResults={setResults}
      />
      <ResultsContainer hasSearched={hasSearched} isLoading={isLoading} isError={isError} results={results} />
    </>
  );
}
