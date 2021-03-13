import React        from 'react';
import IntroNav     from '../components/intro-nav';
import IntroFooter  from '../components/intro-footer';
import { Carousel } from 'react-bootstrap';
import intro1 from '../assets/images/intro1.png'
import intro2 from '../assets/images/intro2.png'
import intro3 from '../assets/images/intro3.png'

function intro() {
    return (
        <div>
            <IntroNav/>
            
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={intro1}
                    alt="First slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                    <h3>Right Tool</h3>
                    <p>Stop planning and start making. Now you have all the tools you need!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                        src={intro2}
                    alt="Second slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                    <h3>Right Person</h3>
                    <p>Share your projects, make new friends, and save money!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                        src={intro3}
                    alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                    <h3>Right Project</h3>
                    <p>Were you stuck in your projects before? With ToolHub, you never will be again!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

           
            <IntroFooter/>
        </div>
    )
}

export default intro;
