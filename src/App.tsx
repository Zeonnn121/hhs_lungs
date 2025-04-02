import React, { useState, useRef, useEffect } from 'react';

interface LungPart {
  name: string;
  description: string;
  learnMoreLink: string;
  videoLink: string;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

function App() {
  const [selectedPart, setSelectedPart] = useState<LungPart | null>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  // Close the info box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoBoxRef.current && !infoBoxRef.current.contains(event.target as Node)) {
        setSelectedPart(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const lungParts: LungPart[] = [
    {
      name: "Right Upper Lobe",
      description: "The superior lobe of the right lung, containing 3 segments. It's involved in upper chest breathing.",
      learnMoreLink: "https://www.physio-pedia.com/Lung_Anatomy",
      videoLink: "https://youtu.be/bak30LFY3r8?feature=shared",
      position: { left: '30%', top: '20%', width: '15%', height: '20%' }
    },
    {
      name: "Right Middle Lobe",
      description: "Located between upper and lower lobes of the right lung, containing 2 segments.",
      learnMoreLink: "https://www.physio-pedia.com/Lung_Anatomy",
      videoLink: "https://youtu.be/bak30LFY3r8?feature=shared",
      position: { left: '26%', top: '43%', width: '15%', height: '19%' }
    },
    {
      name: "Right Lower Lobe",
      description: "The inferior lobe of the right lung, containing 5 segments. Important for deep breathing.",
      learnMoreLink:"https://www.physio-pedia.com/Lung_Anatomy",
      videoLink: "https://youtu.be/bak30LFY3r8?feature=shared",
      position: { left: '25%', top: '62%', width: '15%', height: '20%' }
    },
    {
      name: "Left Upper Lobe",
      description: "The superior lobe of the left lung, slightly smaller due to heart position.",
      learnMoreLink: "https://radiopaedia.org/articles/left-lung",
      videoLink: "https://youtu.be/bak30LFY3r8?feature=shared",
      position: { left: '55%', top: '20%', width: '15%', height: '20%' }
    },
    {
      name: "Left Lower Lobe",
      description: "The inferior lobe of the left lung, essential for deep breathing exercises.",
      learnMoreLink: "https://radiopaedia.org/articles/left-lung",
      videoLink: "https://youtu.be/bak30LFY3r8?feature=shared",
      position: { left: '55%', top: '65%', width: '15%', height: '17%' }
    },
    {
      name: "Trachea",
      description: "The windpipe, connecting the larynx to the bronchi of the lungs.",
      learnMoreLink: "https://en.wikipedia.org/wiki/Trachea",
      videoLink: "https://youtu.be/RiKIC5of8qM?feature=shared",
      position: { left: '45%', top: '5%', width: '10%', height: '40%' }
    },
    {
      name: "Primary Bronchi",
      description: "Main airways that branch from the trachea into each lung.",
      learnMoreLink: "https://my.clevelandclinic.org/health/body/21607-bronchi",
      videoLink: "https://youtu.be/WbmCi-yo-44?feature=shared",
      position: { left: '45%', top: '45%', width: '5%', height: '5%' }
    },
    {
      name: "Bronchioles",
      description: "Smaller branches of the bronchial airways that lack cartilage. Terminal bronchioles lead to respiratory bronchioles and ultimately to alveoli. They control airflow through smooth muscle contraction.",
      learnMoreLink: "https://en.wikipedia.org/wiki/Bronchiole",
      videoLink: "https://youtu.be/WbmCi-yo-44?feature=shared",
      position: { left: '50%', top: '55%', width: '5%', height: '10%' }
    },
    {
      name: "Alveoli",
      description: "Tiny, grape-like air sacs (about 300 million in adult lungs) where gas exchange occurs. Their thin walls (one cell thick) and large surface area (70-100 m²) allow oxygen to enter the blood and carbon dioxide to be expelled. Surfactant reduces surface tension to prevent collapse.",
      learnMoreLink: "https://www.verywellhealth.com/what-are-alveoli-2249043",
      videoLink: "https://youtu.be/DujNzsM6VLs?feature=sharedI",
      position: { left: '60%', top: '55%', width: '10%', height: '10%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Interactive Lung Anatomy
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
          <div className="relative flex-1">
            <img 
              src="/Lung.png"
              alt="Lung Diagram"
              className="w-full"
            />
            
            {/* Clickable areas */}
            <div className="absolute inset-0">
              {lungParts.map((part, index) => (
                <div
                  key={index}
                  className="absolute border border-transparent hover:border-blue-400 hover:bg-blue-100 hover:bg-opacity-20 transition-all cursor-pointer"
                  style={{
                    left: part.position.left,
                    top: part.position.top,
                    width: part.position.width,
                    height: part.position.height,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPart(part);
                  }}
                />
              ))}
            </div>
          </div>

          <div 
            ref={infoBoxRef}
            className="flex-1 bg-white p-6 rounded-lg shadow-lg min-h-[200px] transition-all duration-300"
          >
            {selectedPart ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {selectedPart.name}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedPart.description}
                </p>
                <div className="flex flex-col space-y-3">
                  <a 
                    href={selectedPart.learnMoreLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
                  >
                    Learn More
                  </a>
                  <a 
                    href={selectedPart.videoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-center"
                  >
                    Watch Video
                  </a>
                </div>
              </>
            ) : (
              <div className="text-gray-500 italic h-full flex items-center justify-center">
                Click on different parts of the lung diagram to learn more.
              </div>
            )}
          </div>
        </div>

        {/* Additional Resources Section with reduced gap (mt-2) */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://www.canva.com/design/DAGeD8gpiGA/SA7ZZi9GSBZnJdJXQlw_1w/edit?utm_content=DAGeD8gpiGA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Educational Presentation</h3>
                <p className="text-gray-600 mt-1">View our comprehensive Canva presentation on lung anatomy</p>
              </div>
            </div>
          </a>

          <a 
            href="/Lungs_resarch_ppr.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Research Paper</h3>
                <p className="text-gray-600 mt-1">Check the latest research on pulmonary anatomy and function</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
