import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryProducts,
  sortProductsByPrice,
} from "@/features/productSlice";
import Category from "@/components/Category/Category";
import filterCategory from "@/components/Category/CategoryUtil/filterValidCategory";
import CardSkeleton from "@/components/Card/cardSkeleton";
import Footer from "@/components/utils/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { normalizeString } from "@/components/Category/CategoryUtil/filterValidCategory";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ShadCN UI select components

const CategoryPage = () => {
  const { categoryName, itemName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.categoryProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Memoize normalized strings
  const normalizeCategoryName = useMemo(
    () => normalizeString(categoryName),
    [categoryName]
  );
  const normalizeItemName = useMemo(
    () => normalizeString(itemName),
    [itemName]
  );

  // Fetch product data
  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/user/product/fetchproducts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
        body: JSON.stringify({
          categoryName: normalizeCategoryName,
          itemName: normalizeItemName,
          page: currentPage,
          limit: 15,
        }),
      });

      const responseData = await response.json();
      if (responseData.success === true) {
        dispatch(setCategoryProducts(responseData.products));
        setTotalPages(responseData.totalPages);
      } else {
        toast.error("Oops! Server didn't respond");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle component mounting and page updates
  useEffect(() => {
    const isValidCategory = filterCategory(categoryName, itemName);
    if (!isValidCategory) {
      navigate("/page-not-found");
      return;
    }
    fetchProduct();
  }, [categoryName, itemName, currentPage, navigate]);

  // Handle pagination change
  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle sorting
  const handleSortChange = (value) => {
    dispatch(sortProductsByPrice({ direction: value }));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center sm:text-left text-[#1B3C73]">
          {categoryName?.replace(/-/g, " ")} - {itemName?.replace(/-/g, " ")}
        </h1>
        {/* ShadCN Select for Sorting */}
        <div className="w-full px-5 sm:w-auto">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {products === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-5">
          {[1, 2, 3, 4, 5, 6, 7, 9].map((el, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div>
          <Category
            categoryName={categoryName}
            itemName={itemName}
            products={products}
          />
          {/* Pagination */}
          <div className="mt-4 mb-4 mx-auto">
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
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryPage;
