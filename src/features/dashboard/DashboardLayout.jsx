import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;
function DashboardLayout() {
    const { bookings, isLoading: isLoading1 } = useRecentBookings();
    const {
        stays,
        confermStays,
        isLoading: isLoading2,
        numDays,
    } = useRecentStays();
    const { cabins, isLoading: isLoading3 } = useCabins();
    console.log(bookings, stays);
    if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
    return (
        <StyledDashboardLayout>
            <Stats
                cabinCount={cabins.length}
                numDays={numDays}
                bookings={bookings}
                confermStays={confermStays}
            />
            <div>today&#39;s activity</div>
            <div>chart stay duration</div>
            <div>chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
