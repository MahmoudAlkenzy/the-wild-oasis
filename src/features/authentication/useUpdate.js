import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdate() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            toast.success('user account successfully updated');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (err) => toast.error(err.message),
    });
    return { updateUser, isUpdating };
}
