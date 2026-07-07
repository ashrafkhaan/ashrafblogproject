import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Full Stack Developer | MERN Stack Enthusiast
          </p>
        </div>

        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 leading-8 text-lg">
            This is{" "}
            <span className="font-bold text-blue-700">
              {profile?.user?.name || "Ashraf khan"}
            </span>
            , and I am a full stack developer. I build responsive and
            user-friendly web applications using modern technologies and
            continuously improve my skills through real-world projects.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8 hover:shadow-xl duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-600 leading-8">
            HTML, CSS, JavaScript, React.js, Tailwind CSS, Bootstrap,
            Next.js, Node.js, Express.js, MongoDB, and the MERN Stack.
          </p>
        </div>

        {/* What I Do */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8 hover:shadow-xl duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            What I Do
          </h2>
          <p className="text-gray-600 leading-8">
            I create modern websites, dashboards, blog applications, and
            full-stack web applications with clean code and responsive design.
          </p>
        </div>

        {/* Learning Journey */}
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8 hover:shadow-xl duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Learning Journey
          </h2>
          <p className="text-gray-600 leading-8">
            I continuously improve my skills by practicing daily, building
            projects, and learning new technologies.
          </p>
        </div>

        {/* Goal */}
        <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl duration-300">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            My Goal
          </h2>
          <p className="text-gray-600 leading-8">
            My goal is to become a strong Full Stack Developer and build useful
            applications that solve real-world problems.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;