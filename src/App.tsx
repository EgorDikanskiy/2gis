import RootLayout from "./components/RootLayout";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routerUrls } from "./config/routerUrls";
import HomePage from "./pages/HomePage";

function AppContent() {
  return (
    <RootLayout>
      <Routes>
        <Route path={routerUrls.root} element={<HomePage />} />
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