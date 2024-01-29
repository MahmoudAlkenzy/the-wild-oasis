import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get('discount') || 'all';
    if (isLoading) return <Spinner />;
    //Filter
    let filterCabins;
    if (filterValue === 'all') filterCabins = cabins;
    if (filterValue === 'with-discount')
        filterCabins = cabins?.filter((cabin) => cabin.discount > 0);
    if (filterValue === 'no-discount')
        filterCabins = cabins?.filter((cabin) => cabin.discount === 0);

    // Sort

    const sortBy = searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = sortBy.split('-');
    const modefier = direction === 'desc' ? -1 : 1;
    const sortedCabin = filterCabins.sort(
        (a, b) => (a[field] - b[field]) * modefier
    );
    return (
        <Menus>
            <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>cabin</div>
                    <div>capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabin}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
