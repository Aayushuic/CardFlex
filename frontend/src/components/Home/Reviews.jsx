import React, { useEffect } from "react";
import { Helmet } from "react-helmet"; // This helps to manage the head of the page dynamically
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = () => {
  useEffect(() => {
    document.title = "Home | Card Flex"; // Custom title for SEO
  }, []);

  const reviews = [
    {
      userName: "Ravi Sharma",
      text: "Bahut acchi seva! Is website par maine jo CDR files mangayi, unki quality bahut achhi thi. Daam bhi theek thaak hain. Main zaroor phir se kharidari karunga.",
      rating: 5,
    },
    {
      userName: "Vikram Kumar",
      text: "Achhi quality aur sasti keemat. Maine pehle kai jagah se CDR files mangayi thi, lekin yahan ki quality aur daam kaafi behtareen hain. Main khush hoon.",
      rating: 4,
    },
    {
      userName: "Amit Patel",
      text: "Bahut accha anubhav! CDR files ki quality zabardast thi, aur daam bhi kaafi sahi the. Main phir se zaroor kharidunga.",
      rating: 5,
    },
    {
      userName: "Rajesh Yadav",
      text: "Bahut accha moolya! Mujhe turant CDR files chahiye thi, aur yeh site ne achhe daam par diya. Main khush hoon aur sabko sujhaunga.",
      rating: 5,
    },
    {
      userName: "Neha Mehra",
      text: "Shandar seva! CDR files ki quality acchi thi aur daam bhi theek thaak. Main phir se kharidari karungi.",
      rating: 4,
    },
    {
      userName: "Kunal Deshmukh",
      text: "Acchi keemat par acchi quality wali CDR files! Main bahut khush hoon aur doosron ko bhi sujhaunga.",
      rating: 5,
    },
    {
      userName: "Simran Kaur",
      text: "Bahut accha anubhav! CDR files jaldi mil gayi aur quality bhi acchi thi. Main zaroor phir se kharidunga.",
      rating: 5,
    },
    {
      userName: "Raghav Singh",
      text: "Acchi keemat par acchi CDR files. Maine kai jagah se kharidi hain, lekin yahan ki quality aur daam sabse behtareen hain.",
      rating: 5,
    },
    {
      userName: "Brijesh Gupta",
      text: "Acchi keemat par zaroori CDR files mili. Main khush hoon aur dobara kharidari karunga.",
      rating: 4,
    },
    {
      userName: "Rohit Verma",
      text: "CDR files kaafi acchi quality ki thi. Daam bhi sahi the. Main zaroor doosron ko sujhaunga.",
      rating: 5,
    },
    {
      userName: "Pooja Agarwal",
      text: "Mujhe yeh site bahut pasand aayi. CDR files kaafi sahi quality ki thi. Price bhi reasonable tha. Main zaroor phir se yeh site use karunga.",
      rating: 5,
    },
    {
      userName: "Arvind Joshi",
      text: "Sabse acchi baat toh yeh thi ki yahan ka customer service bhi kaafi accha tha. Muje jo files chahiye thi, woh mil gayi, aur unka quality bhi best tha. Main yeh site sabko suggest karunga.",
      rating: 4,
    },
  ];

  return (
    <section aria-labelledby="latest-design-heading" className="p-6">
      {/* SEO: Helmet tags for meta data */}
      <Helmet>
        <meta
          name="description"
          content="Read what our customers say about their experience with our high-quality CDR files. Customer satisfaction is our priority!"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cardflex.in" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Customer Reviews | CardFlex" />
        <meta
          property="og:description"
          content="Check out customer reviews for our high-quality CDR files. We prioritize customer satisfaction!"
        />
      </Helmet>

      {/* Heading Section */}
      <h2 id="latest-design-heading" className="text-center mb-6 relative">
        <span className="block text-4xl md:text-5xl font-bold text-[#1B3C73] leading-snug">
          <span className="block">
            Hear
            <span className="text-5xl md:text-6xl text-[#FF6347] inline-block transform rotate-2 ml-2">
              from
            </span>
          </span>
          <span className="block mt-2 md:mt-0">
            Our
            <span className="text-4xl md:text-5xl text-[#FFD700] inline-block transform -rotate-2 ml-4">
              Happy
            </span>
            <span className="ml-4">Customers</span>
          </span>
        </span>
      </h2>

      {/* Swiper Carousel for Reviews */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1, // For screens smaller than 640px, show 1 slide
          },
          870: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
        className="review-carousel"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
