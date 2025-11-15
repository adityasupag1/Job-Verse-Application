import { MetaData } from '../components/MetaData'

export const About = () => {
  return (
    <>
      <MetaData title="About" />
      <div className="bg-gray-100 min-h-screen pt-14 md:px-20 px-3 text-black">
        <div className="grid md:grid-cols-3 gap-5 md:px-0 px-2 md:pt-8 pt-4 pb-20">
          <div className="bg-gray-300 p-5 rounded-lg shadow-lg">
            <p className="text-4xl pb-3 font-bold text-center text-blue-500">About Us</p>
            <p className="text-lg">
              At JobVerse, we don't just connect you to jobs – we connect you to possibilities.
              Our vision is to be the bridge between your talent and the opportunities that truly matter.
              Whether you're launching your career,switching paths, or chasing your dream role,
              we’re here to inspire, empower, and support you.
              Think of JobVerse as your career companion,
              offering a seamless platform tailored to your goals, an extensive network of world-class employers,
              and resources to keep you ahead in the game. With us, finding the right job is just the beginning –
              it's about crafting a journey toward a future you’ll be proud of. Let’s redefine what’s possible, together.

            </p>
          </div>
          <div className="bg-gray-300 p-5 pb-5 rounded-lg shadow-lg">
            <p className="text-3xl text-blue-500 pb-5 text-center">What Sets Us Apart</p>
            <ul className="list-disc px-5 text-lg">
              <li>
                <span className="font-semibold text-lg ">
                  Tailored Matches:
                </span>{" "}
                We understand that each candidate and company is unique. Our
                advanced matching algorithms ensure that your skills align
                perfectly with the roles you're interested in, saving you time
                and effort
              </li>
              <li>
                <span className="font-semibold text-lg ">
                  Exceptional Support:
                </span>{" "}
                Your success is our priority. Our dedicated support team is
                always ready to assist you, from optimizing your profile to
                preparing for interviews.
              </li>
            </ul>
          </div>
          <div className="bg-gray-300 p-5 pb-5 rounded-lg shadow-lg">
            <p className="text-2xl text-blue-500">Join the JobVerse Community</p>
            <p className="pt-3">
              {" "}When you join JobVerse, you're not just signing up for a platform –
              you're becoming part of a dynamic community of professionals,
              recruiters, and mentors. Together, we're shaping the future of
              work, one opportunity at a time.
            </p>
            <p className="pt-4">
              Thank you for choosing JobVerse as your partner in career
              advancement. Here's to unlocking a world of possibilities and
              achieving greatness together!
            </p>
          </div>
        </div>
      </div>

    </>
  )
}
