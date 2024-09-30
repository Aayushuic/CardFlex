import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import LoadingMain from "./LoadingMain.jsx";
import { Toaster } from "sonner";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </RouterProvider>
      <Toaster />
    </Provider>
  </StrictMode>
);
