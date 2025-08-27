import { Play } from "lucide-react";

const ProjectCard = () => {
  // Dummy Data
  const project = {
    name: "Gowra Greendale",
    location: "Medchal, Hyderabad",
    price: "₹1.06 Cr - ₹1.29 Cr",
    possession: "Possession in 2026",
    image: "https://placehold.co/400x200/png",
    videos: [
      {
        thumbnail: "https://placehold.co/120x70/png",
        views: "3.2k views",
        channel: "Gowra Ventures",
        followers: "20k Followers",
      },
      {
        thumbnail: "https://placehold.co/120x70/png",
        views: "749 views",
        channel: "Gowra Ventures",
        followers: "20k Followers",
      },
    ],
    rera: {
      text: "Project certificates & legal approvals",
      link: "#",
    },
    amenities: {
      text: "All 22 Amenities in the Project",
      link: "#",
    },
    brochure: "#",
    contact: "#",
  };

  return (
    <div className='flex bg-white shadow-md rounded-xl overflow-hidden border'>
      {/* Left - Project Info */}
      <div className='w-1/3 relative'>
        <img
          src={project.image}
          alt={project.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute bottom-3 left-3 text-white'>
          <h2 className='text-xl font-bold'>{project.name}</h2>
          <p className='text-sm'>{project.location}</p>
          <p className='font-semibold'>{project.price}</p>
          <p className='text-xs'>{project.possession}</p>
        </div>
      </div>

      {/* Middle - Videos, RERA, Amenities */}
      <div className='w-1/3 flex flex-col p-4 justify-between'>
        {/* Videos */}
        <div>
          <p className='font-semibold mb-2'>Expert Reviews & Advice</p>
          <div className='flex gap-3'>
            {project.videos.map((v, idx) => (
              <div key={idx} className='relative'>
                <img src={v.thumbnail} alt='video' className='rounded-md' />
                <Play
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1'
                  size={20}
                />
                <p className='text-xs mt-1'>{v.views}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RERA & Amenities */}
        <div className='flex gap-2 mt-4'>
          <div className='bg-yellow-100 px-3 py-2 rounded-md text-xs'>
            <p className='font-semibold text-yellow-800'>RERA Reports</p>
            <p>{project.rera.text}</p>
            <a href={project.rera.link} className='text-red-600 font-semibold'>
              View Certificates →
            </a>
          </div>
          <div className='bg-blue-100 px-3 py-2 rounded-md text-xs'>
            <p className='font-semibold text-blue-800'>Amenities</p>
            <p>{project.amenities.text}</p>
            <a
              href={project.amenities.link}
              className='text-blue-600 font-semibold'
            >
              View Now →
            </a>
          </div>
        </div>
      </div>

      {/* Right - Buttons */}
      <div className='w-1/3 flex flex-col justify-center items-center gap-4 p-4'>
        <a
          href={project.contact}
          className='bg-red-600 text-white px-4 py-2 rounded-full font-semibold'
        >
          Contact Builder
        </a>
        <a
          href={project.brochure}
          className='border border-red-600 text-red-600 px-4 py-2 rounded-full font-semibold flex items-center gap-2'
        >
          <span>⬇</span> Download Brochure
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
