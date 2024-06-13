import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      <div className="slide-container">
        <Link to="/diagnosisSkin">
          <img src="/banner-01.png" />
        </Link>
      </div>
      <div className="slide-container">
        <Link to="/diagnosisScalp">
          <img src="/banner-02.png" />
        </Link>
      </div>
      <div className="slide-container">
        <Link to="/newproduct">
          <img src="/banner-03.png" />
        </Link>
      </div>
    </Slider>
  );
};

export default Banner;
