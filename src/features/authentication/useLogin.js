import { login as loginApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
    const queryclient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading: isLogingin } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            navigate('/dashboard', { replace: true });
            queryclient.setQueryData(['user'], user.user);
        },
        onError: (err) => {
            console.log('ERROR', err);
            toast.error('Provider email or password incorrect');
        },
        // onSettled: () => {},
    });

    return {
        login,
        isLogingin,
    };
}
