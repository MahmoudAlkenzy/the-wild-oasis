import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

function CheckoutButton({ bookingId }) {
    const { Checkout, isCheckingOut } = useCheckout();
    return (
        <Button
            variation="primary"
            size="small"
            disabled={isCheckingOut}
            onClick={() => Checkout(bookingId)}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
