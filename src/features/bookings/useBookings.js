import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import SortBy from '../../ui/SortBy';
import { Page_Size } from '../../utils/constance';

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
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
    //query
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

    const pageCount = count / Page_Size;

    // pre - fetching;
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });
    return { isLoading, bookings, error, count };
}
