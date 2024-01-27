import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins as deleteCabinsApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
            toast.success('Cabin successfully deleted');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isDeleteing, deleteCabin };
}
