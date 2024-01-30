import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins as deleteCabinsApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings';

export function useDeleteBookin() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleteing, mutate: deleteBookings } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookings'],
            });
            toast.success('Bookin successfully deleted');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isDeleteing, deleteBookings };
}
