import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/utils/Navbar";
import SearchDialog from "./components/utils/SearchDailog";
import { useEffect, useState } from "react";
import Footer from "./components/utils/Footer";
import { toast } from "sonner";

function App() {
  const [searchDailog, setSearchDialog] = useState(false);

  // useEffect(() => {
  //   const fetchCSRFToken = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/api/get-csrf-token",
  //         {
  //           method: "GET",
  //           credentials: "include",
  //           headers: {
  //             "x-api-key": "Krishna",
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       if (data?.csrfToken) {
  //         localStorage.setItem("csrfToken", data.csrfToken);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching CSRF token:", error);
  //       toast.error("Something Broken.. please retry again");
  //     }
  //   };

  //   fetchCSRFToken();
  // }, []);

  return (
    <div>
      <Navbar setSearchDialog={setSearchDialog} />
      <main>
        <Outlet />
      </main>
      {searchDailog && (
        <div className="w-full h-[100vh] z-50 bg-gray-300">
          <SearchDialog setSearchDialog={setSearchDialog} />
        </div>
      )}
    </div>
  );
}

export default App;
