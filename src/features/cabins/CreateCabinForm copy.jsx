import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabins } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabins,
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

    const { register, handleSubmit, getValues, formState } = useForm();
    const { errors } = formState;

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
        console.log(data);
    }
    function onError(err) {
        // console.log(err);
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: 'This faild is required',
                        minLength: {
                            value: 3,
                            message: 'the name must be at least 3 characters',
                        },
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register('maxCapacity', {
                        required: 'This faild is required',
                        min: {
                            value: 1,
                            message: 'the capacity must be at least 1',
                        },
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register('regularPrice', {
                        required: 'This faild is required',
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    {...register('discount', {
                        required: 'This faild is required',
                        validate: (value) =>
                            value < getValues().regularPrice ||
                            'The discount must be less than the price',
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register('description', {
                        required: 'This faild is required',
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    disabled={isCreating}
                    accept="image/*"
                    {...register('image', {
                        required: 'This faild is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
