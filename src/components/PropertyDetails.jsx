"use client";
import { useState } from "react";

export default function PropertyDetails({ prptyDetails }) {
  const [mainImage, setMainImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Use prptyDetails if available, otherwise fallback to propertyData
  const { imageUrls, prjDetails } = prptyDetails || {};
  console.log("🚀 ~ PropertyDetails ~ prjDetails:", prjDetails);

  const displayedImages = showAllImages ? imageUrls : imageUrls.slice(0, 4);
  const remainingCount = imageUrls.length - 4;

  const dateStr = "2026-12-01 00:00:00.0";

  // Convert to a Date object
  const date = new Date(prjDetails.prjPossDate.replace(" ", "T")); // replace space with 'T' for ISO format
  const month = date.toLocaleString("en-US", { month: "short" }); // "Dec"
  const year = String(date.getFullYear()).slice(-2); // "26"
  const formatted = `${month}'${year}`;

  return (
    <div className='p-6'>
      {/* Main Container */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Images */}
        <div className='lg:col-span-2 space-y-4'>
          <div className='relative'>
            <img
              src={imageUrls[mainImage]}
              alt='Main'
              className='w-full h-[400px] object-cover rounded-xl'
            />
          </div>

          <div className='grid grid-cols-4 gap-2'>
            {displayedImages.map((img, index) => {
              const isLastItem =
                index === 3 && !showAllImages && remainingCount > 0;

              return (
                <div key={index} className='relative'>
                  <img
                    src={img}
                    alt={`Thumb ${index}`}
                    className={`h-24 w-full object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-red-500 transition-all ${
                      mainImage === index ? "ring-2 ring-red-500" : ""
                    } ${isLastItem ? "brightness-50" : ""}`}
                    onClick={() => {
                      if (isLastItem) {
                        setShowAllImages(true);
                      } else {
                        setMainImage(index);
                      }
                    }}
                  />

                  {/* Plus overlay for the 4th image when there are more images */}
                  {isLastItem && (
                    <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-40'>
                      <div className='text-white text-center'>
                        <div className='text-2xl font-bold'>
                          +{remainingCount}
                        </div>
                        <div className='text-xs'>More</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show Less Button */}
          {showAllImages && remainingCount > 0 && (
            <button
              onClick={() => setShowAllImages(false)}
              className='text-red-500 hover:text-red-600 font-medium text-sm mt-2'
            >
              Show Less
            </button>
          )}
        </div>

        {/* Right Column - Details & Contact */}
        <div className='space-y-6 text-black'>
          {/* Property Details */}
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h1 className='text-2xl font-bold'>{prjDetails.psmName}</h1>
            <p className='text-gray-500'>{prjDetails.lmtDName}</p>
            <p className='text-gray-500'>By {prjDetails.devName}</p>
            <div className='mt-4 space-y-1'>
              <p className='text-lg font-semibold'>{prjDetails.priceRange}</p>
              <p>{prjDetails.bhk}</p>
              <p className='font-bold'>Possession: {formatted}</p>
              {/* <p className='text-red-600'>{prjDetails.emi[0]}</p> */}
            </div>
            <div className='mt-4 flex gap-4'>
              <button className='flex-1 bg-white border border-red-500 text-red-500 rounded-md py-2 font-semibold hover:bg-red-50'>
                <a href={prjDetails.sblink}>Download Brochure</a>
              </button>
              <button className='flex-1 bg-red-500 text-white rounded-md py-2 font-semibold hover:bg-red-600'>
                Contact Builder
              </button>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div className='bg-white p-6 rounded-xl shadow-md space-y-4'>
            <h2 className='text-xl font-bold'>Looking for a Property?</h2>
            <form className='space-y-3'>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full border border-gray-300 rounded-md p-2'
              />
              <input
                type='email'
                placeholder='Email'
                className='w-full border border-gray-300 rounded-md p-2'
              />
              <input
                type='tel'
                placeholder='Mobile Number'
                className='w-full border border-gray-300 rounded-md p-2'
              />
              <button className='w-full bg-red-500 text-white rounded-md py-2 font-semibold hover:bg-red-600'>
                Submit
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}
