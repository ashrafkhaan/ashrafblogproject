import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "11462a03-c54a-423c-a95e-0fb43609d887",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      setLoading(true);

      await axios.post("https://api.web3forms.com/submit", userInfo);

      toast.success("Message sent successfully");

      reset(); // 👈 form clear
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* LEFT FORM */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-4xl font-bold text-gray-900">
              Get In <span className="text-blue-600">Touch</span>
            </h2>

            <p className="text-gray-500 mt-3 mb-8">
              Send your message and I will reply soon.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">Name required</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email required</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">Message required</p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-2xl font-semibold text-white transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="w-full md:w-1/2 bg-linear-to-br from-blue-600 to-purple-700 p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-8">Contact Info</h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl">
                <FaPhone className="text-yellow-300 text-2xl" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+91 6389212013</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl">
                <FaEnvelope className="text-pink-300 text-2xl" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>ashrafkhan71363@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl">
                <FaMapMarkerAlt className="text-green-300 text-2xl" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p>Kanpur, Uttar Pradesh</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;