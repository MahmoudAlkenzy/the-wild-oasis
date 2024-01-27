import Heading from '../ui/Heading';
import Row from '../ui/Row';

import CabinsTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useState } from 'react';

function Cabins() {
    const [displayForm, setDisplayForm] = useState(false);
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>TEST</p>
            </Row>
            <Row>
                <CabinsTable />
                <Button
                    onClick={() => setDisplayForm((state) => !state)}
                    variation="primary"
                    size="medium"
                >
                    Add new cabin
                </Button>

                {displayForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
