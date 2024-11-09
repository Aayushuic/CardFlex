import React from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
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
      <h2
        id="latest-design-heading"
        className="text-xl font-bold mb-6 text-center text-[#1B3C73]"
      >
        Customer's Reviews
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }} // Start with opacity 0 and slightly below
            whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
            transition={{ duration: 1.3, ease: "easeOut" }} // Smooth transition
            viewport={{ once: true }} // Trigger once when entering the viewport
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
