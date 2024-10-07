import { CircleX, Search } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchKey } from "@/features/productSlice";

const SearchDialog = ({ setSearchDialog }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    navigate("/search-result");
    dispatch(setSearchKey(input));
    setSearchDialog(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-24 right-12 cursor-pointer">
          <CircleX size={30} onClick={() => setSearchDialog(false)} />
        </div>
        <motion.div
          className="w-full md:w-5/6 lg:w-2/3 max-w-3xl mx-auto p-4 flex"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
        >
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded rounded-r-none focus:outline-none"
            placeholder="Search..."
            onChange={handleInputChange}
            value={input}
          />
          <div
            className="flex justify-center items-center p-3 bg-[#1B3C73] hover:bg-[#40679E] rounded-r-sm cursor-pointer"
            onClick={handleSubmit}
          >
            <Search />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDialog;
