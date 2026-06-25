import { ThemeProvider } from "./contexts/theme";
import { RouterProvider } from "react-router"
import router from './routes';
import { Suspense } from "react";
import Loading from "./components/loading";
import { TopBarProvider } from "./contexts/topbar";
import { VoteCardProvider } from "./contexts/vote-card";
import { ImageCardProvider } from "./contexts/image-card";


function App() {
  return (
    <>
      <ThemeProvider>
        <ImageCardProvider>
          <TopBarProvider>
            <VoteCardProvider>
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </VoteCardProvider>
          </TopBarProvider>
        </ImageCardProvider>
      </ThemeProvider>
    </>
  );
}

export default App
