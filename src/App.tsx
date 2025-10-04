import RootLayout from "./components/RootLayout";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routerUrls } from "./config/routerUrls";
import CatalogPage from "./pages/CatalogPage";
import MapPage from "./pages/MapPage";

function AppContent() {
  return (
    <RootLayout>
      <Routes>
        <Route path={routerUrls.root} element={<CatalogPage />} />
        <Route path={routerUrls.map} element={<MapPage />} />
      </Routes>
    </RootLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;