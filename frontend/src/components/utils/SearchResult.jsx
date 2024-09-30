import { setSearchedResult } from "@/features/productSlice";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Card } from "../Card/Card";
import { Search } from "lucide-react"; // Importing the Search icon from Lucide
import CardSkeleton from "../Card/cardSkeleton";

const SearchResult = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.searchedResult);
  const searchKey = useSelector((state) => state.product.searchKey);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const previousSearchKey = useRef(searchKey);

  useEffect(() => {
    const fetchSearchResult = async () => {
      setLoading(true);
      const response = await fetch(`/api/user/product/search`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
        body: JSON.stringify({
          search: searchKey,
          page: currentPage,
          limit: 15,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setSearchedResult(responseData.products));
        setTotalPages(responseData.totalPages);
        setLoading(false);
      } else {
        dispatch(setSearchedResult([]));
        setTotalPages(1);
        setLoading(false);
      }
    };

    if (searchKey && searchKey !== previousSearchKey.current) {
      fetchSearchResult();
      previousSearchKey.current = searchKey;
    }
  }, [searchKey, currentPage, dispatch]);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center text-lg font-semibold my-4">
        {searchKey
          ? `Search results for: "${searchKey}"`
          : "Please enter a search term."}
      </div>

      {!products && loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
            return <CardSkeleton key={idx} />;
          })}
        </div>
      )}

      {products && products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              _id={product._id}
              imageSrc={product.imageUrl}
              title={product.title}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-8 p-6 border border-gray-300 rounded-lg bg-gray-100">
          <Search className="w-16 h-16 text-gray-400 mb-4" />{" "}
          {/* Lucide Search Icon */}
          <h2 className="text-xl font-bold text-gray-700">No Results Found</h2>
          <p className="text-gray-500">
            Sorry, we couldn't find any products matching your search for "
            {searchKey}".
          </p>
          <p className="text-gray-400">
            Try adjusting your search terms or check back later.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent className="cursor-pointer">
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage > 2 && currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === currentPage - 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
