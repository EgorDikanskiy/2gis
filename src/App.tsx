import RootLayout from "./components/RootLayout";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routerUrls } from "./config/routerUrls";
import Catalog from "./pages/Catalog";
import Map from "./pages/Map";

function AppContent() {
  return (
    <RootLayout>
      <Routes>
        <Route path={routerUrls.root} element={<Catalog />} />
        <Route path={routerUrls.map} element={<Map />} />
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