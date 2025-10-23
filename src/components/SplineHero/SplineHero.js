import React from 'react';
import Spline from '@splinetool/react-spline';
import './SplineHero.css';

const SplineHero = () => {
    return (
        <div className='spline-hero-container'>
            <Spline scene="https://prod.spline.design/SNBUHn5JMNW4DsBY/scene.splinecode" />
            <div className='welcome-overlay'>
                <div className='welcome-content'>
                    <h1 className='welcome-title'>
                        <span className='neon-purple'>Likith Vishal</span>
                    </h1>
                    <p className='welcome-message'>
                        Thanks for visiting my website, please feel free to explore my portfolio
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SplineHero;
