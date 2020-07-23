import React        from 'react';
import IntroNav     from '../components/intro-nav';
import IntroFooter  from '../components/intro-footer';
import { Carousel } from 'react-bootstrap';


function intro() {
    return (
        <div>
            <IntroNav/>
            
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/persia/image/upload/v1587085628/toolshare/Layout/intro1_t1h8rp.png"
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
                    src="https://res.cloudinary.com/persia/image/upload/v1587085635/toolshare/Layout/intro2_enwhtj.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                    <h3>Right Person</h3>
                    <p>Share your projects, make new friends, and save money!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/persia/image/upload/v1587085645/toolshare/Layout/intro3_ycbm9q.jpg"
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
