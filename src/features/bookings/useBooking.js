import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import SortBy from '../../ui/SortBy';

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get('status');
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue };
    //Sorting
    const sortValue = searchParams.get('sortBy') || 'startDate-desc';
    //pagination
    const page = Number(searchParams.get('page')) || 1;

    const [field, direction] = sortValue.split('-');
    const sortBy = { field, direction };
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });
    return { isLoading, bookings, error, count };
}
