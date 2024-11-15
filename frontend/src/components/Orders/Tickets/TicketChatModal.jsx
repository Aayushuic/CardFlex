import { Button } from "@/components/ui/button";
import { Loader2, SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TicketChatModal = ({ isOpen, onClose, ticket, setTickets }) => {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSendMessage = async () => {
    if (!ticket) {
      setError("Ticket data is missing.");
      return;
    }

    if (ticket.status === "Closed") {
      setError("This ticket is closed. You cannot send messages.");
      return;
    }

    if (!newMessage.trim() || newMessage.trim().length < 10) {
      setError("Your message is too short. Please add more details.");
      return;
    }

    if(newMessage.trim().length>300){
      setError("your message is too long");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "/api/user/order/support/ticket/Chat",
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            newMessage: newMessage.trim(),
            ticketId: ticket._id,
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          navigate("/login");
          toast.info("Session expired. Please log in again.");
          dispatch(logout());
        } else if (res.status === 429) {
          toast.info("Too many requests. Please try again later.");
        } else {
          toast.error("Server error. Please try again later.");
        }
        return;
      }

      const resData = await res.json();

      if (resData.success) {
        setTickets(resData.userTicket);
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (error) {
      setError("server error, try again later")
    } finally {
      setLoading(false);
      setNewMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto"
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl p-6 rounded-lg shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div>
            <h3 id="modal-title" className="text-lg font-semibold text-gray-800">
              Ticket - {ticket?.ticketNumber || "Unknown"}
            </h3>
            <h2
              className={`${
                ticket?.status === "Open" ? "text-green-500" : "text-red-500"
              } text-sm sm:text-base`}
            >
              {ticket?.status || "Status Unknown"}
            </h2>
          </div>

          <button
            aria-label="Close Modal"
            className="text-2xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 mb-1">
            Issue: {ticket?.issue || "No issue provided"}
          </h4>
          <p className="text-sm text-gray-500">
            Order ID: {ticket?.order?.razorpay_order_id || "Unknown"}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">
            Additional Detail: {ticket?.additionalDetails || "N/A"}
          </p>
        </div>

        {error && (
          <div className="bg-red-400 border-l-8 border-red-600 p-2 mb-4 rounded-md shadow-lg">
            <p className="text-white text-sm font-semibold">{error}</p>
          </div>
        )}

        <div
          id="modal-description"
          className="border p-3 rounded-lg h-64 md:h-60 overflow-y-auto scrollbar mb-4 bg-gray-50"
        >
          {ticket?.messages?.length > 0 ? (
            ticket.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.isAdmin === false ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block px-2 py-1 rounded-md ${
                    msg?.isAdmin === false
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg?.message}
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg?.sentAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No messages available.</p>
          )}
        </div>

        {ticket?.status !== "Closed" ? (
          <div className="flex items-center border-t pt-3 space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              aria-label="Message Input"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              aria-label="Send Message"
              disabled={loading}
              className="text-blue-500 px-4 py-2 rounded-md text-sm"
              variant="outline"
              onClick={handleSendMessage}
            >
              {loading ? <Loader2 className="animate-spin text-[#1B3C73]" size={28}/> : <SendHorizonal />}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center mt-3">
            This ticket is closed. You can no longer send messages.
          </p>
        )}
      </div>
    </div>
  );
};

export default TicketChatModal;
