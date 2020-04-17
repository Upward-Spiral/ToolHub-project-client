import React from 'react';
import IntroNav from '../components/intro-nav';
import IntroFooter from '../components/intro-footer';
import {Container,Carousel,Jumbotron,Row,Col,Media,Button} from 'react-bootstrap';


function intro() {
    return (
        <div>
            <IntroNav/>
            {/* <Jumbotron fluid>
                <Container>
                    <h1>Fluid jumbotron</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
            </Jumbotron> */}
            
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/persia/image/upload/v1587085628/toolshare/Layout/intro1_t1h8rp.png"
                    alt="First slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/persia/image/upload/v1587085635/toolshare/Layout/intro2_enwhtj.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://res.cloudinary.com/persia/image/upload/v1587085645/toolshare/Layout/intro3_ycbm9q.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

           
            <IntroFooter/>
        </div>
    )
}

export default intro;
