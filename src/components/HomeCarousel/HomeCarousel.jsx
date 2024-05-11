import Carousel from 'react-bootstrap/Carousel';
import "./HomeCarousel.css";

export const HomeCarousel = () => {
  return (
    <div className="container" id="HomeCarousel">
    <Carousel fade>
      <Carousel.Item>
      <img src='./src/assets/img/home/carousel/photo_1.jpg' className="d-block w-100 img-fluid" ></img>
        <Carousel.Caption>
          
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='./src/assets/img/home/carousel/photo_1.jpg' className="d-block w-100 img-fluid"></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='./src/assets/img/home/carousel/photo_1.jpg' className="d-block w-100 img-fluid"></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
