import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
import { useDeleteBookin } from './useDeleteBookin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const { booking, isLoading } = useBooking();
    const { Checkout, isCheckingOut } = useCheckout();
    const { deleteBookings, isDeleteing } = useDeleteBookin();

    const moveBack = useMoveBack();
    if (isLoading) return <Spinner />;
    const { status, id: bookingId } = booking;
    console.log(booking);
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };
    console.log(status === 'unconfirmed', status);
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {' '}
                <Modal>
                    <Modal.Open opens="confDelete">
                        <Button
                            variation="danger"
                            disabled={isDeleteing}
                            icon={<HiTrash />}
                        >
                            Delete booking
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="confDelete">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={() => {
                                deleteBookings(bookingId);

                                moveBack();
                            }}
                        />
                    </Modal.Window>
                </Modal>
                {status === 'unconfirmed' ? (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check In
                    </Button>
                ) : (
                    ''
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
                {status === 'checked-in' && (
                    <Button
                        disbled={isCheckingOut}
                        onClick={() => {
                            Checkout(bookingId);
                        }}
                        icon={<HiArrowUpOnSquare />}
                    >
                        Check Out
                    </Button>
                )}
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
