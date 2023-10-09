import { useMemo } from "react";
import { LandingStoreContext } from "./modules/landing/store";
import { LandingStore } from "./modules/landing/store/store";
import Landing from "./modules/landing";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const LandingStoreValue = useMemo(() => {
    return LandingStore.create({});
  }, []);
  return (
    <LandingStoreContext.Provider value={LandingStoreValue}>
      <Routes>
        <Route path="/"  element={<Landing />} />
      </Routes>
    </LandingStoreContext.Provider>
  );
}
