import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = () => {
  return (
    <div>
      <Carousel showArrows={true} showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img
            src="https://res.cloudinary.com/dpx4mvnkp/image/upload/v1730010429/memtktzlig4ofv6gbugj.jpg"
            alt="Carousel 1"
            loading="lazy"
            className="rounded-lg w-full h-auto aspect-[70/35] object-cover"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dpx4mvnkp/image/upload/v1729393308/g5h8qr49av5phif0coma.jpg"
            alt="Carousel 2"
            loading="lazy"
            className="rounded-lg w-full h-auto aspect-[70/35] object-cover"
          />
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1487414946/vector/manual-painted-of-olive-leaves-watercolor-as-wedding-invitation.jpg?s=1024x1024&w=is&k=20&c=cbRewzJ9nPwl_ibxqveX34n39qs1PyH7C5zKpYEUpus="
            alt="Carousel 3"
            loading="lazy"
            className="rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
