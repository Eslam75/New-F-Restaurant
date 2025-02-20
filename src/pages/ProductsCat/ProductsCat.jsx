import React from 'react';
import { useParams } from 'react-router-dom';
import GetByCateogry from '../GetByCategory/GetByCateogry';

export default function ProductsCat() {
    const { category } = useParams();

    return (
        <>
            {category && <GetByCateogry heading={category} category={category} />}
        </>
    );
}
