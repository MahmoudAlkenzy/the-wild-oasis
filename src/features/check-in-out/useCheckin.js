import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export function useChecking() {
    const queryClint = useQueryClient();
    const Navigate = useNavigate();
    const { mutate: Checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: 'checked-in',
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} success check in`);
            queryClint.invalidateQueries({ active: true });
            Navigate('/');
        },
        onError: () => toast.error('There was an error while checking in'),
    });
    return { Checkin, isCheckingIn };
}
