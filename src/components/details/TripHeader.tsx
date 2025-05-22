import React, { useState } from 'react';
import { MapPin, Download, Share2 } from 'lucide-react';
import Filters from './Filters';
import Skeleton from '../ui/Skeleton';

interface TripHeaderProps {
  tripTitle: string;
  tripDescription?: string;
  loading: boolean
}

const TripHeader: React.FC<TripHeaderProps> = ({ tripTitle, tripDescription, loading }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleDownload = () => {

    return;
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

  // Add SVG icon components for social media
  const WhatsappIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.37L4 29l7.824-2.21A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.07 0-4.09-.54-5.84-1.56l-.418-.25-4.65 1.314 1.25-4.53-.27-.44A10.93 10.93 0 015.083 15C5.083 9.477 9.477 5.083 15 5.083c5.523 0 9.917 4.394 9.917 9.917 0 5.523-4.394 9.917-9.917 9.917zm5.13-7.13c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.74.09.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
  );
  const TelegramIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32" fill="currentColor"><path d="M29.919 6.746a2.13 2.13 0 00-2.19-.33L4.6 14.13c-1.13.44-1.13 2.06.01 2.5l5.13 2.01 2.01 5.13c.44 1.13 2.06 1.13 2.5-.01l7.72-23.13c.33-.99-.36-2.01-1.39-2.01-.23 0-.46.05-.68.15z"/></svg>
  );
  const InstagramIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32" fill="currentColor"><path d="M16 7.2A8.8 8.8 0 107.2 16 8.81 8.81 0 0016 7.2m0-2.2A11 11 0 115 16 11 11 0 0116 5zm0 5.6A5.4 5.4 0 1121.4 16 5.41 5.41 0 0116 10.6zm0-2.2A7.6 7.6 0 1023.6 16 7.61 7.61 0 0016 8.4zm7.2-2.2a1.6 1.6 0 11-1.6 1.6 1.6 1.6 0 011.6-1.6z"/></svg>
  );
  const EmailIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32" fill="currentColor"><path d="M27 6H5a2 2 0 00-2 2v16a2 2 0 002 2h22a2 2 0 002-2V8a2 2 0 00-2-2zm0 2v.01L16 17.13 5 8.01V8h22zM5 24V9.87l10.29 8.58a1 1 0 001.42 0L27 9.87V24H5z"/></svg>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow px-8 py-6 mb-8">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-4" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {loading ? <Skeleton height={28} width={220} className="mb-2" /> : tripTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2 relative">
            
          <button
              className={`p-2 rounded transition-colors ${true ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleDownload}
              disabled={true}
            >
              <Download className={`w-6 h-6 ${true ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400'}`} />
            </button>
            {/* <button
              className={`p-2 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700' : ''}`}
              onClick={handleDownload}
              disabled={loading}
            >
              <Download className={`w-6 h-6 ${loading ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400'}`} />
            </button> */}
            {/* <button
              className={`p-2 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700' : ''}`}
              disabled={loading}
              onClick={() => setShowShareMenu((prev) => !prev)}
              aria-label="Share"
            >
              <Share2 className={`w-6 h-6 ${loading ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400'}`} />
            </button> */}
            {showShareMenu && !loading && (
              <div className="absolute right-0 top-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[180px]">
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800"
                  onClick={() => {
                    window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank');
                    setShowShareMenu(false);
                  }}
                >
                  <WhatsappIcon /> WhatsApp
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800"
                  onClick={() => {
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, '_blank');
                    setShowShareMenu(false);
                  }}
                >
                  <TelegramIcon /> Telegram
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800"
                  onClick={() => {
                    window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                    setShowShareMenu(false);
                  }}
                >
                  <InstagramIcon /> Instagram
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-800"
                  onClick={() => {
                    window.open(`mailto:?subject=Check%20out%20this%20trip!&body=${encodeURIComponent(window.location.href)}`);
                    setShowShareMenu(false);
                  }}
                >
                  <EmailIcon /> Email
                </button>
              </div>
            )}
            <button
              className="ml-4 px-6 py-2 border border-teal-500 dark:border-teal-400 rounded-lg text-teal-700 dark:text-teal-300 font-semibold bg-white dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors"
              onClick={() => setShowFilters(true)}
              disabled={loading}
              style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
            >
              Advance Search
            </button>
          </div>
        </div>
        <div className="mt-3 w-full">
          {loading ? (
            <Skeleton height={18} width={320} className="mb-2" />
          ) : (
            tripDescription && <p className="text-gray-500 dark:text-gray-400 text-sm w-full">{tripDescription}</p>
          )}
        </div>
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