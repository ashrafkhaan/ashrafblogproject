import React from 'react'
import { useAuth } from "../context/AuthProvider";
import { Link } from 'react-router-dom'

const Hero = () => {
  const { blogs } = useAuth()
  console.log(blogs)
  return (
    <div>
      {/* start of text */}
      <div className="flex flex-col items-center justify-center text-center pt-12 pb-5 px-4">
        <p className="text-purple-600 font-semibold uppercase tracking-wider mb-3">
          Welcome to AshrafBlog
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Own
          <span className="block text-purple-700">
            Blogging Platform
          </span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-xl">
          Share your ideas and discover amazing stories.
        </p>
      </div>

      {/* end of text */}

      <div className='container mx-auto my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6'>

        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => {
            return (
              <Link to={`/blog/${element._id}`} key={element._id} className='bg-white rounded-lg hover:shadow-lg overflow-hidden  transform hover:scale-105  transition-transform duration-300'>
                <div className=' group relative'>
                  <img src={element.blogImage.url} alt="" className='w-full h-54 object-cover' />
                  <div></div>
                  <h1 className='absolute bottom-4 left-4 text-white  text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300'>{element.title}</h1>
                </div>
                <div className='p-6 flex items-center'>
                  <img src={element.adminPhoto} alt="" className='w-12 h-12 rounded-full border-2 border-yellow-400' />
                  <div className='ml-4'>
                    <p className='text-lg font-semibold text-gray-800 '>{element.adminName}</p>

                  </div>
                  <p></p>
                </div>
              </Link>
            );
          })
        ) : (<div className='flex h-screen items-center justify-center'>Loading.....</div>)}
      </div>
    </div>
  );
}

export default Hero
