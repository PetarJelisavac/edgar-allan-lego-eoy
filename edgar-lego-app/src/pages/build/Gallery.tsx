import { useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import logoLego from '../../assets/images/Logo.Lego.svg';

function Gallery() {
  const navigate = useNavigate();
  const { galleryPhotos } = useBuildStore();

  return (
    <div className="min-h-screen bg-[#fefff8] flex flex-col p-4 gap-10">
      {/* LEGO Logo and Title */}
      <div className="flex items-center w-full gap-10">
        <img
          src={logoLego}
          alt="Edgar Allan LEGO Logo"
          className="w-[120px] h-[120px]"
        />
        <h1 className="font-['Epilogue'] font-semibold text-[40px] lg:text-[60px] leading-[1.1] text-black m-0">
          Lego Gallery
        </h1>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 flex items-start justify-center w-full">
        {galleryPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="text-6xl">📸</div>
            <p className="font-['Epilogue'] text-xl text-gray-600 text-center max-w-md">
              No photos yet. Complete your build and take a photo to add it here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full max-w-[1136px]">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative w-full h-[400px] overflow-hidden"
              >
                <img
                  src={photo.imageUrl}
                  alt={`LEGO Edgar ${new Date(photo.timestamp).toLocaleDateString()}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Take me home Button */}
      <div className="flex justify-center w-full">
        <button
          onClick={() => navigate('/build')}
          className="bg-black text-[#fefff8] flex h-[68px] items-center justify-center px-[30px] py-[13.5px] rounded-[100px] w-full max-w-[399px] border-none cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <p className="font-['Petrona'] font-medium italic text-[24px] text-nowrap">
            Take me home
          </p>
        </button>
      </div>
    </div>
  );
}

export default Gallery;

