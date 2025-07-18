import React from 'react';
import PageHeading from '../components/reuseable/pageHeadinng';
import PageTitle from '../hooks/PageTitle.';

const Donate = () => {
    return (
        <div>
            <PageTitle title={'Donate - United Pets'}></PageTitle>
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