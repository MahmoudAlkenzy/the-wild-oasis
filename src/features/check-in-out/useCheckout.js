import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export function useCheckout() {
    const queryClint = useQueryClient();
    const Navigate = useNavigate();
    const { mutate: Checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => {
            updateBooking(bookingId, {
                status: 'checked-out',
            });
        },
        onSuccess: (data) => {
            toast.success(`Booking success check out`);
            queryClint.invalidateQueries({ active: true });
        },
        onError: () => toast.error('There was an error while checking out'),
    });
    return { Checkout, isCheckingOut };
}
