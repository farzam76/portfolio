import { useMemo } from "react";
import { NewsGridStoreContext } from "./modules/newsGrid/store";
import { NewsGridStore } from "./modules/newsGrid/store/store";
import NewsGrid from "./modules/newsGrid";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const NewsGridStoreValue = useMemo(() => {
    return NewsGridStore.create({});
  }, []);
  return (
    <NewsGridStoreContext.Provider value={NewsGridStoreValue}>
      <Routes>
        <Route path="/"  element={<NewsGrid />} />
      </Routes>
    </NewsGridStoreContext.Provider>
  );
}
