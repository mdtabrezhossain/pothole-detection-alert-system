import { ThemeProvider } from "./contexts/theme";
import { RouterProvider } from "react-router"
import router from './routes';
import { Suspense } from "react";
import Loading from "./components/loading";


function App() {
  return (
    <>
      <ThemeProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App
