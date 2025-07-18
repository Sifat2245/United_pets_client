import React from 'react';
import PageHeading from '../components/reuseable/pageHeadinng';

const Donate = () => {
    return (
        <div>
           <PageHeading
           title={'Donate'}
           breadcrumb={[
            {label: 'Home', link: '/'},
            {label: 'Donate', link: '/donate', active: true}
           ]}
           ></PageHeading> 
        </div>
    );
};

export default Donate;