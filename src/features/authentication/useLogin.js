import { login as loginApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export function useLogin() {
    const navigate = useNavigate();
    const queryclient = useQueryClient();
    const { mutate: login, isLoading: isLogingin } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSettled: (user) => {
            navigate('/dashboard');
        },
        onError: (err) => {
            console.log(err);
            toast.error('Provider email or password incorrect');
        },
    });

    return {
        login,
        isLogingin,
    };
}
