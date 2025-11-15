import React, { useState } from "react";
import { MetaData } from "../components/MetaData";
import { BsFacebook } from "react-icons/bs";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiTwotoneMail,
} from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import Card from "../components/Card"; // New Card component
import Accordion from "../components/Accordion";// New Accordion component

export const Contact = () => {
  const [que1, setQue1] = useState(false);
  const [que2, setQue2] = useState(false);
  const [que3, setQue3] = useState(false);

  return (
    <>
      <MetaData title="Contact" />
      <div className="bg-gray-100 min-h-screen pt-14 md:px-20 px-3 text-black">
        <div className="flex flex-col gap-5 md:px-0 px-2 md:pt-8 pt-4 pb-20">
          <div>
            <p className="text-4xl pb-3  underPur font-bold text-center">
              Contact Us
            </p>

            <p>
              We're excited to hear from you! If you have any questions,
              inquiries, or feedback, feel free to reach out to us using the
              contact information provided below. Your satisfaction and
              engagement with our platform are our top priorities, and we're
              here to assist you in any way we can.
            </p>
          </div>

          <div>
            <p className="text-3xl text-blue-700">Contact Information</p>

            <Card
              title="Address"
              content="JobVerse, Wall Street, New York, 123, United States"
            />
            <Card
              title="Email"
              content={[
                "General Inquiries: info@jobverse.com",
                "Support: support@jobverse.com",
                "Job Applications: jobs@jobverse.com",
              ]}
            />
            <Card
              title="Phone"
              content={[
                "Customer Support: +123-456-7890",
                "HR & Job Inquiries: +123-456-7891",
              ]}
            />

            <p className="text-xl pt-3 pb-1">Social Media:</p>
            <ul>
              <div className="flex gap-5 pt-1 items-center">
                <BsFacebook className="hover:text-blue-600" size={26} />
                <AiFillInstagram className="hover:text-pink-500" size={30} />
                <AiOutlineTwitter className="hover:text-blue-400" size={30} />
                <AiTwotoneMail className="hover:text-red-600" size={28} />
              </div>
            </ul>
          </div>


          <div>
            <p className="text-3xl pb-4 text-blue-500">
              Frequently Asked Questions (FAQs):
            </p>

            <Accordion
              question="How do I create an account on your job application platform?"
              answer="To create an account, click on the 'Register' button located at the top right corner of the homepage. Fill in your personal information, including your name, email address, and a secure password. Once your account is created, you can start exploring jobs."
            />
            <Accordion
              question="What should I include in my job application?"
              answer="Crafting an effective job application is crucial to stand out to potential employers. Make sure to include a tailored resume that highlights your relevant experience and skills. Additionally, write a resume that showcases how your qualifications align with the job requirements."
            />
            <Accordion
              question="How can I check the status of my job application?"
              answer="After submitting your applications, you can log in to your account dashboard. Here, you'll find a section that lists your submitted applications along with their current statuses.The statuses may include accepted, rejected or pending."
            />
            <Accordion
              question="How do I search for jobs on the platform?"
              answer="To search for jobs, use the highlighted talent on the homepage. You can filter jobs by category, location, employment type, or required skills to find opportunities that best match your preferences."
            />
            <Accordion
              question="Can I save job postings to review later?"
              answer="Yes, you can save job postings by clicking on the 'Save Job' button on the job details page. These saved jobs can be accessed later from your account dashboard under the 'Saved Jobs' section."
            />

          </div>
        </div>
      </div>
    </>
  );
};
