import { useState, useEffect } from "react";

const useInitialState = (API) => {
  const [noticias, setNoticias] = useState({
    noticias: [],
  });

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setNoticias(data));
  }, []);
  return noticias;
};

export default useInitialState;
