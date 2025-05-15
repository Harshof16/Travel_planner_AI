import React, { useState } from 'react';
import { MapPin, Download, Share2 } from 'lucide-react';
import Filters from './Filters';

interface TripHeaderProps {
  tripTitle: string;
  tripDescription?: string;
}

const TripHeader: React.FC<TripHeaderProps> = ({ tripTitle, tripDescription }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleDownload = () => {
    const content = document.getElementById('trip-details-content');
    if (!content) return;
    const theme = localStorage.getItem('theme');
    const bodyClass = theme === 'dark' ? 'class="dark bg-gray-900"' : 'class="bg-gray-100"';
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.outerHTML).join('\n');
    const styleTags = Array.from(document.querySelectorAll('style')).map(style => style.outerHTML).join('\n');
    const tailwindScriptTag = Array.from(document.querySelectorAll('script[src*="tailwind"]')).map(script => script.outerHTML).join('\n');
    const html = `<!DOCTYPE html><html lang="en" ${theme === 'dark' ? 'class="dark"' : ''}><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Trip Details</title>${linkTags}${styleTags}${tailwindScriptTag}</head><body ${bodyClass}>${content.outerHTML}</body></html>`.trim();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trip-details.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //   const handleDownloadPDF = async () => {
  //   const content = document.getElementById('trip-details-content');
  //   if (!content) return;
  //   // Use html2canvas to render the content as an image
  //   const theme = localStorage.getItem('theme');
  //   const backgroundColor = theme === 'dark' ? '#111827' : '#f3f4f6';
  //   const canvas = await html2canvas(content, { useCORS: true, backgroundColor: backgroundColor });
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
  //   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  //   pdf.save('trip-details.pdf');
  // };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow px-8 py-6 mb-8">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-4" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{tripTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded transition-colors" onClick={handleDownload}>
              <Download className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400" />
            </button>
            <button className="p-2 rounded transition-colors">
              <Share2 className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400" />
            </button>
            <button
              className="ml-4 px-6 py-2 border border-teal-500 dark:border-teal-400 rounded-lg text-teal-700 dark:text-teal-300 font-semibold bg-white dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors"
              onClick={() => setShowFilters(true)}
            >
              Advance Search
            </button>
          </div>
        </div>
        {tripDescription && (
          <div className="mt-3 w-full">
            <p className="text-gray-500 dark:text-gray-400 text-sm w-full">{tripDescription}</p>
          </div>
        )}
      </div>
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
              onClick={() => setShowFilters(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <Filters closeModal={() => setShowFilters(false)}/>
          </div>
        </div>
      )}
    </>
  );
};

export default TripHeader;