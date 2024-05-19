import 'react-slideshow-image/dist/styles.css';
import React from 'react';
import { Slide } from 'react-slideshow-image';

function SlideHome() {
    return (
        <Slide
            autoplay={true}
            autoplayInterval={3000}
            onChange={function noRefCheck() {}}
            onStartChange={function noRefCheck() {}}
            style={{ wight: '100%' }}
        >
            {/* Slide 1 */}
            <div className="each-slide-effect">
                <div
                    style={{
                        backgroundImage: 'url(/assets/images/top-banner.png)',
                    }}
                ></div>
            </div>

            {/* Slide 2 */}
            <div className="each-slide-effect">
                <div
                    style={{
                        backgroundImage: 'url(/assets/images/motorcycles-tailend-ft-1.jpg)',
                    }}
                ></div>
            </div>

            {/* Slide 3 */}
            <div className="each-slide-effect">
                <div
                    style={{
                        backgroundImage: 'url(/assets/images/banner-3.jpg)',
                    }}
                ></div>
            </div>
        </Slide>
    );
}

export default SlideHome;
