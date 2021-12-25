import { useEffect, useState } from "react";

export const useMediaQuery = (queryString: string, defaultValue: any) => {
  const [isQuery, setIsQuery] = useState(defaultValue); // default light mode

  useEffect(() => {
    const query = window.matchMedia(queryString);
    setIsQuery(query.matches);
    try {
      // Chrome, Firefox
      query.addEventListener("change", (event) => {
        setIsQuery(event.matches);
      });
    } catch {
      try {
        // Safari
        query.addListener((event) => {
          setIsQuery(event.matches);
        });
      } catch {
        console.error(`ERROR: Media query for "${queryString}"`);
      }
    }
  }, [queryString]);

  return isQuery
}