import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
function CabinRow({ cabin }) {
    const { deleteCabin, isDeleteing } = useDeleteCabin();
    const { createCabin, isCreating } = useCreateCabin();
    const {
        image,
        maxCapacity,
        discount,
        regularPrice,
        name,
        id: cabinId,
        description,
    } = cabin;
    function duplicateHandler() {
        createCabin({
            name: `copy of ${name}`,
            maxCapacity,
            discount,
            regularPrice,
            image,
            description,
        });
    }
    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up {maxCapacity}</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>
                {discount !== 0 ? (
                    formatCurrency(discount)
                ) : (
                    <span>&mdash;</span>
                )}
            </Discount>
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />
                        <Menus.List id={cabinId}>
                            <Menus.Button
                                onClick={duplicateHandler}
                                icon={<HiSquare2Stack />}
                            >
                                Dublicate
                            </Menus.Button>

                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Window name="edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="Cabin"
                            disabled={isDeleteing}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
