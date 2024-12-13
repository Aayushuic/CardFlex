import { setCurrentOrder, setPaymentStatus } from '@/features/paymentSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { setCurrentOrder, setPaymentStatus } from './pathToActions'; // Adjust according to your action file

const useCancelOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelOrder = async ({ orderId, email, razorpay_order_id, setLoading }) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/order/cancel`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            _id: orderId,
            email: email,
            razorpay_order_id: razorpay_order_id,
          }),
        }
      );

      if(response.status==404){
        navigate("/checkout");
        dispatch(setCurrentOrder(null)); // Dispatch action to reset current order
        dispatch(setPaymentStatus(null));
      }

      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setCurrentOrder(null)); // Dispatch action to reset current order
        dispatch(setPaymentStatus(null)); // Dispatch action to reset payment status
        navigate('/checkout', { replace: true }); // Navigate to checkout page
        toast.success(responseData.message); // Show success toast
      } else {
        toast.error(responseData.message); // Show error toast
      }
    } catch (error) {
      toast.error('Server error'); // Handle server error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { cancelOrder };
};

export default useCancelOrder;
