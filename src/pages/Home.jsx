import React from 'react';
import Hero from '../components/Hero';
import OurService from '../components/OurService';
import Categories from '../components/Categories';
import AboutUs from '../components/AboutUs';
import Adoption from '../components/Adoption';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Categories></Categories>
            <OurService></OurService>
            <AboutUs></AboutUs>
            <Adoption></Adoption>
        </div>
    );
};

export default Home;