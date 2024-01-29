/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy');

    function changeHandler(e) {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }
    return (
        <Select
            options={options}
            value={sortBy}
            onChange={changeHandler}
            type="white"
        />
    );
}

export default SortBy;
