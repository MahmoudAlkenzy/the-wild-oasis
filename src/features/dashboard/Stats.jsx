/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
} from 'react-icons/hi2';

function Stats({ confermStays, bookings, numDays, cabinCount }) {
    const numOfBooking = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confermStays.length;
    const Occupancy =
        confermStays.reduce((acc, curr) => acc + curr.numNights, 0) /
        (numDays * cabinCount);
    return (
        <>
            <Stat
                title={'bookings'}
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numOfBooking}
            />
            <Stat
                title={'Sales'}
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title={'Cheack ins'}
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title={'Occupancy rate'}
                color="yellow"
                icon={<HiOutlineBriefcase />}
                value={Math.round(Occupancy * 100) + '%'}
            />
        </>
    );
}

export default Stats;
