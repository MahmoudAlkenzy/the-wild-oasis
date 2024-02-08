import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { register, formState, getValues, handleSubmit } = useForm();
    const { signUp, isLoading } = useSignUp();
    const { errors } = formState;
    function onSuccess({ fullName, email, password }) {
        signUp({ fullName, email, password });
    }

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register('fullName', {
                        required: 'this field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'this field is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'please provide valid email',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'this field is required',
                        minLength: {
                            value: 8,
                            message: 'Password need a minimum of 8 charctar',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'this field is required',

                        validate: (value) =>
                            value === getValues().password ||
                            'The passwords need to be match',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
