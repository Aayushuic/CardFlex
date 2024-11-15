import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "@/features/authslice";
import { Mosaic } from "react-loading-indicators";
import TicketChatModal from "./TicketChatModal";


const TicketDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const filteredTickets = tickets?.filter((ticket) =>
    ticket?.issue?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("please login");
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        setIsRotating(true);
        const res = await fetch(
          "/api/user/order/support/ticket",
          {
            method: "GET",
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
              "X-CSRF-Token": localStorage.getItem("csrfToken"),
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          // Check if the response status is OK
          if (res.status === 401) {
            navigate("/login");
            toast.info("Session Expired, Please login again");
            dispatch(logout());
          } else {
            toast.info("Something broke, Please try again later.");
          }
          return; // Return early if there was an error
        }

        const resData = await res.json();

        if (resData.success) {
          setTickets(resData.ticket);
        } else {
          toast.info("Something went wrong, Please try later.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred.");
      } finally {
        setIsRotating(false);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [dispatch, navigate, refresh]);

  useEffect(() => {
    if (selectedTicket) {
      const updatedTicket = tickets.find(
        (ticket) => ticket._id === selectedTicket._id
      );
      if (updatedTicket) setSelectedTicket(updatedTicket);
    }
  }, [tickets, selectedTicket]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    setSearchQuery("");
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Mosaic
  //         color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} // Custom color (Green color in this case)
  //         size="large" // Size can be "small", "medium", or "large"
  //         text="Loading..." // Optional: Text to display
  //         textColor="#000000" // Optional: Color of the text
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-extrabold text-center text-[#1B3C73] mb-8">
        Your Tickets
      </h2>

      {/* Search and Filter */}
      <div className="flex flex-row gap-4 items-center mb-8 bg-white  p-4 rounded-lg">
        <div className="flex items-center space-x-2  rounded-lg px-3 py-2 bg-gray-100 w-full md:w-auto">
          <AiOutlineSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="bg-transparent focus:outline-none text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <BiRefresh
            className={`text-xl cursor-pointer text-gray-500 hover:text-gray-700 rotate-180 ${
              isRotating ? "animate-spin" : ""
            }`}
            title="Refresh"
            onClick={handleRefresh}
            size={26}
          />
        </div>
      </div>

      {/* Ticket Summary using ShadCN Cards */}
      <div className="flex justify-center space-x-4 mb-8">
        <Card className="bg-white text-green-600 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-green-200">
          <AiOutlineCheckCircle className="text-3xl" />
          <div>
            <h3 className="text-sm font-medium">Open Tickets</h3>
            <p className="text-lg font-bold">
              {
                filteredTickets?.filter((ticket) => ticket.status == "Open")
                  .length
              }
            </p>
          </div>
        </Card>
        <Card className="bg-white text-red-600 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-red-200">
          <AiOutlineCloseCircle className="text-3xl" />
          <div>
            <h3 className="text-sm font-medium">Closed Tickets</h3>
            <p className="text-lg font-bold">
              {
                filteredTickets?.filter((ticket) => ticket.status === "Closed")
                  .length
              }
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs for Open and Closed Tickets */}
      <Tabs defaultValue="Open" className="mb-8">
        <TabsList className="flex justify-center space-x-4 border-b bg-white shadow-sm rounded-lg">
          <TabsTrigger
            className="pb-2 px-4 text-md font-semibold cursor-pointer text-gray-700 hover:text-blue-600"
            value="Open"
          >
            Open Tickets
          </TabsTrigger>
          <TabsTrigger
            className="pb-2 px-4 text-md font-semibold cursor-pointer text-gray-700 hover:text-blue-600"
            value="Closed"
          >
            Closed Tickets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Open">
          {filteredTickets?.filter((ticket) => ticket.status === "Open")
            .length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets
                ?.filter((ticket) => ticket.status === "Open")
                .map((ticket) => (
                  <Card
                    key={ticket.ticketNumber}
                    className="border rounded-lg p-4 shadow-sm transition-transform transform"
                  >
                    <h4 className="font-semibold text-sm text-gray-800">
                      {ticket.issue}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3 text-green-500 text-xs hover:text-green-500"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </Button>
                  </Card>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No open tickets found.
            </p>
          )}
        </TabsContent>

        <TabsContent value="Closed">
          {filteredTickets?.filter((ticket) => ticket.status === "Closed")
            .length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTickets
                ?.filter((ticket) => ticket.status === "Closed")
                .map((ticket) => (
                  <Card
                    key={ticket.ticketNumber}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <h4 className="font-semibold text-sm text-gray-800">
                      {ticket.issue}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Created: {ticket.createdAt}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3 text-red-500 text-xs hover:text-red-500"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </Button>
                  </Card>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No closed tickets found.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal */}
      {selectedTicket && (
        <TicketChatModal
          isOpen={isModalOpen}
          onClose={closeModal}
          ticket={selectedTicket}
          setTickets={setTickets}
        />
      )}
    </div>
  );
};

export default TicketDashboard;
