import { useSearchParams } from 'react-router-dom';

const useQueryParam = (key) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = (value) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(key, value); // Set the query parameter
      } else {
        prev.delete(key); // Remove the query parameter if value is falsy
      }
      return prev;
    });
  };

  return [searchParams.get(key) || '', setQueryParam]; // Return the current value and setter function
};

export default useQueryParam;
