import React from 'react';
import Hero from '../components/Hero';
import OurService from '../components/OurService';
import Categories from '../components/Categories';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Categories></Categories>
            <OurService></OurService>
        </div>
    );
};

export default Home;