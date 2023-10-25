import { ResultType } from "../utils/types";

type ResultsContainerProps = {
  hasSearched: boolean;
  isLoading: boolean;
  isError: boolean;
  results: ResultType[];
};

export default function ResultsContainer({ hasSearched, isLoading, isError, results }: ResultsContainerProps) {
  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto my-8">
      {!hasSearched && <p>Search for something!</p>}
      {hasSearched && isLoading && <p>Loading...</p>}
      {hasSearched && !isLoading && !isError && results.length === 0 && (
        <p className="text-center">
          No results found. <span className="block">(Probably because the requested website does not allow scraping)</span>
        </p>
      )}
      {hasSearched && !isLoading && isError && <p>There was some error connecting to the server.</p>}
      {!isLoading && results.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 items-center justify-center">
          {results.map((item, i) => (
            <li key={i} className="bg-lime-100 rounded-md h-64 min-h-full flex items-center justify-center overflow-hidden group">
              <a href={item["src"]} className="h-fit w-fit" target="_blank">
                <img src={item["src"]} alt={item["alt"]} className="h-fit w-fit group-hover:scale-110 transition" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
