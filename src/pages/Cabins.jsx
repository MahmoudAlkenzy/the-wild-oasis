import Heading from '../ui/Heading';
import Row from '../ui/Row';

import CabinsTable from '../features/cabins/CabinTable';

import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperation from '../features/cabins/CabinTableOperation';

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperation />
            </Row>
            <Row>
                <CabinsTable />
                <AddCabin />
            </Row>
        </>
    );
}

export default Cabins;
