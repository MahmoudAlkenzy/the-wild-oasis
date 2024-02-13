import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from './apiBookings';
export function useTodayActivity() {
    const { isLoading, data: activites } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity'],
    });
    return { isLoading, activites };
}
