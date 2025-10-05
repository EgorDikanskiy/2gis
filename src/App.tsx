import RootLayout from "./components/RootLayout";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routerUrls } from "./config/routerUrls";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function AppContent() {
  return (
    <RootLayout>
      <Routes>
        <Route path={routerUrls.root} element={<HomePage />} />
        <Route path={routerUrls.detail.mask} element={<DetailPage />}/>
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