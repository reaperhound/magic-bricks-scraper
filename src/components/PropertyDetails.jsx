"use client";

const propertyData = {
  name: "Cybercity Oriana",
  location: "Moosapet, Hyderabad",
  builder: "Cybercity Builders and Developers Pvt. Ltd.",
  priceRange: "₹ 1.22 Cr - ₹ 2.33 Cr",
  bhk: "2,3,4 BHK Flats",
  possession: "Dec'25",
  emi: "₹1.06 Lac EMI",
  images: [
    "https://placehold.co/1080x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ],
};

export default function PropertyDetails() {
  return (
    <div className='p-6'>
      {/* Main Container */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Images */}
        <div className='lg:col-span-2 space-y-4'>
          <div className='relative'>
            <img
              src='https://placehold.co/600x400'
              alt='Main'
              className='w-full h-[400px] object-cover rounded-xl'
            />
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {propertyData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                className='h-24 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-red-500'
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Details & Contact */}
        <div className='space-y-6 text-black'>
          {/* Property Details */}
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h1 className='text-2xl font-bold'>{propertyData.name}</h1>
            <p className='text-gray-500'>{propertyData.location}</p>
            <p className='text-gray-500'>By {propertyData.builder}</p>
            <div className='mt-4 space-y-1'>
              <p className='text-lg font-semibold'>{propertyData.priceRange}</p>
              <p>{propertyData.bhk}</p>
              <p>Possession: {propertyData.possession}</p>
              <p className='text-red-600'>{propertyData.emi}</p>
            </div>
            <div className='mt-4 flex gap-4'>
              <button className='flex-1 bg-white border border-red-500 text-red-500 rounded-md py-2 font-semibold hover:bg-red-50'>
                Download Brochure
              </button>
              <button className='flex-1 bg-red-500 text-white rounded-md py-2 font-semibold hover:bg-red-600'>
                Contact Builder
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white p-6 rounded-xl shadow-md space-y-4'>
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
          </div>
        </div>
      </div>
    </div>
  );
}
