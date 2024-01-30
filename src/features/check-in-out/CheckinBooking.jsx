import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { useChecking } from './useCheckin';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { booking, isLoading } = useBooking();
    const moveBack = useMoveBack();
    const { Checkin, isCheckingIn } = useChecking();
    useEffect(() => {
        setConfirmPaid(booking?.isPaid || false);
    }, [booking]);
    if (isLoading) return <Spinner />;
    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    function handleCheckin() {
        if (!confirmPaid) return;
        Checkin(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            <Box>
                <Checkbox
                    id="breakfast"
                    value={addBreakfast}
                    onChange={() => {
                        setAddBreakfast((state) => !state);
                        setConfirmPaid(false);
                    }}
                >
                    You want add breakfast by X
                </Checkbox>
            </Box>
            <Box>
                <Checkbox
                    id="confirm"
                    disabled={confirmPaid || isCheckingIn}
                    value={confirmPaid}
                    onChange={() => setConfirmPaid((state) => !state)}
                >
                    {' '}
                    I confirm that {booking.fullName} has paid the total amount
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button
                    disable={!confirmPaid || isCheckingIn}
                    onClick={handleCheckin}
                >
                    Check in booking #{bookingId}
                </Button>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
