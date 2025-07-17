import React from 'react';
import Hero from '../components/Hero';
import OurService from '../components/OurService';
import Categories from '../components/Categories';
import AboutUs from '../components/AboutUs';
import Adoption from '../components/Adoption';
import Gallery from '../components/Gallery';
import OurFeature from '../components/OurFeature';
import OurTeam from '../components/OurTeam';
import CountBar from '../components/CountBar';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Categories></Categories>
            <OurService></OurService>
            <AboutUs></AboutUs>
            <Adoption></Adoption>
            <Gallery></Gallery>
            <OurFeature></OurFeature>
            <OurTeam></OurTeam>
            <CountBar></CountBar>
            <Contact></Contact>
        </div>
    );
};

export default Home;