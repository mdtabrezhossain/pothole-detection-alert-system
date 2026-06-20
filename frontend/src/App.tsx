import { ThemeProvider } from "./contexts/theme";
import { RouterProvider } from "react-router"
import router from './routes';
import { Suspense } from "react";
import Loading from "./components/loading";
import { TopBarProvider } from "./contexts/topbar";
import { VoteCardProvider } from "./contexts/vote-card";


function App() {
  return (
    <>
      <ThemeProvider>
        <TopBarProvider>
          <VoteCardProvider>
            <Suspense fallback={<Loading />}>
              <RouterProvider router={router} />
            </Suspense>
          </VoteCardProvider>
        </TopBarProvider>
      </ThemeProvider>
    </>
  );
}

export default App
