import { Play } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({ projectData }) => {
  const {
    imageUrl,
    psmName,
    lmtDName,
    maxPriceDesc,
    minPriceDesc,
    reviewDataYt,
    sblink,
    prjPossYear,
    lt,
    psmid,
    pdpUrl,
    image,
  } = projectData;
  console.log("🚀 ~ ProjectCard ~ pdpUrl:", pdpUrl);
  console.log("🚀 ~ ProjectCard ~ pdpUrl:", image);
  return (
    <div className='flex bg-white shadow-md rounded-xl overflow-hidden border w-[60%] h-[30vh]'>
      {/* Left - Project Info */}
      <div className='w-1/3 relative'>
        <Link
          href={`/project/${encodeURIComponent(
            psmName
          )}?lt=${lt}&psmid=${psmid}&pdpUrl=${pdpUrl}&image=${image}`}
        >
          <img
            src={imageUrl}
            alt={psmName}
            className='w-full h-full object-cover'
          />
          <div className='absolute bottom-3 left-3 text-white'>
            <h2 className='text-xl font-bold'>{psmName}</h2>
            <p className='text-sm'>{lmtDName}</p>
            <p className='font-semibold'>{`${minPriceDesc} - ${maxPriceDesc}`}</p>
            <p className='text-xs'>{`Possession in ${prjPossYear}`}</p>
          </div>
        </Link>
      </div>

      {/* Middle - Videos, RERA, Amenities */}
      <div className='w-1/3 flex flex-col p-4 justify-between text-black'>
        {/* Videos */}
        <div>
          <p className='font-semibold mb-2'>Expert Reviews & Advice</p>
          <div className='flex gap-3'>
            {reviewDataYt?.map((v, idx) => (
              <div key={idx} className='relative'>
                <img src={v.ytThumbNail} alt='video' className='rounded-md' />
                <Play
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1'
                  size={20}
                />
                <p className='text-xs mt-1'>{v.ytTotalViews}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RERA & Amenities */}
        <div className='flex gap-2 mt-4'>
          <div className='bg-yellow-100 px-3 py-2 rounded-md text-xs'>
            <p className='font-semibold text-yellow-800'>RERA Reports</p>
            <p>"project.rera.text"</p>
            <a href='' className='text-red-600 font-semibold'>
              View Certificates →
            </a>
          </div>
          <div className='bg-blue-100 px-3 py-2 rounded-md text-xs'>
            <p className='font-semibold text-blue-800'>Amenities</p>
            <p>project.amenities.text</p>
            <a href='' className='text-blue-600 font-semibold'>
              View Now →
            </a>
          </div>
        </div>
      </div>

      {/* Right - Buttons */}
      <div className='w-1/3 flex flex-col justify-center items-center gap-4 p-4'>
        <a
          href=''
          className='bg-red-600 text-white px-4 py-2 rounded-full font-semibold'
        >
          Contact Builder
        </a>
        <a
          href={sblink}
          className='border border-red-600 text-red-600 px-4 py-2 rounded-full font-semibold flex items-center gap-2'
        >
          <span>⬇</span> Download Brochure
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
