import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabine } from './useEditCabine';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function CreateCabinForm({ cabinToEdit = {}, isCloseModal }) {
    const { createCabin, isCreating } = useCreateCabin();
    const { editCabin, isEditing } = useEditCabine();
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    // console.log(cabinToEdit, editId, editValues, isEditSession);
    const { register, handleSubmit, getValues, formState, reset } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;
    // console.log(errors);
    const isWorking = isEditing || isCreating;
    function onSubmit(data) {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];
        console.log({ ...data, image });
        if (isEditSession) {
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: (data) => {
                        reset();
                    },
                }
            );
            isCloseModal?.();
        } else {
            createCabin(
                { ...data, image },
                {
                    onSuccess: (data) => {
                        reset();
                    },
                }
            );
            isCloseModal?.();
        }

        // console.log({ ...data, image: data.image[0] });
    }
    function onError(err) {
        // console.log(err);
    }
    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={isCloseModal ? 'modal' : 'regular'}
        >
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    {...register('discount', {
                        required: 'This faild is required',
                        validate: (value) =>
                            Number(value) < Number(getValues().regularPrice) ||
                            'The discount must be less than the price',
                    })}
                    disabled={isWorking}
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
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    disabled={isWorking}
                    accept="image/*"
                    {...register('image', {
                        required: editId ? false : 'This faild is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => isCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button>{editId ? 'Update cabin' : 'Create new cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
