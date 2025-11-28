import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FARMS_DATA, OWNER_DETAILS } from './services/data';
import { Farm } from './types';
import AIChat from './components/AIChat';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "bg-green-600 shadow-lg text-white" : "hover:bg-green-700/50 hover:text-green-100";

  return (
    <nav className="bg-gradient-to-r from-green-800 to-green-900 text-white shadow-xl sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold flex items-center gap-3 tracking-wide">
           <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
             <img src="/logo.png" alt="इनामदार फार्म्स" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
           </div>
           <div className="flex flex-col">
             <span className="text-white">इनामदार</span>
             <span className="text-green-300 text-lg md:text-xl">फार्म्स</span>
           </div>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2 font-medium text-lg">
          <Link to="/" className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/')}`}>मुख्यपृष्ठ</Link>
          <Link to="/buy" className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/buy')}`}>शेत घ्या</Link>
          <Link to="/sell" className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/sell')}`}>शेत विका</Link>
          <Link to="/about" className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/about')}`}>आमच्याबद्दल</Link>
          <Link to="/contact" className={`px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/contact')}`}>संपर्क</Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-800 border-t border-green-700 pb-4 px-4 pt-2 space-y-2 shadow-inner">
          <Link to="/" className="block py-3 hover:bg-green-700 px-3 rounded-lg" onClick={() => setIsOpen(false)}>मुख्यपृष्ठ</Link>
          <Link to="/buy" className="block py-3 hover:bg-green-700 px-3 rounded-lg" onClick={() => setIsOpen(false)}>शेत घ्या</Link>
          <Link to="/sell" className="block py-3 hover:bg-green-700 px-3 rounded-lg" onClick={() => setIsOpen(false)}>शेत विका</Link>
          <Link to="/about" className="block py-3 hover:bg-green-700 px-3 rounded-lg" onClick={() => setIsOpen(false)}>आमच्याबद्दल</Link>
          <Link to="/contact" className="block py-3 hover:bg-green-700 px-3 rounded-lg" onClick={() => setIsOpen(false)}>संपर्क</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-8 pb-4 mt-auto border-t-4 border-green-600">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-green-500">🌿</span> इनामदार फार्म्स
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          गेल्या २० वर्षांपासून शेतकऱ्यांच्या सेवेत. विश्वासार्ह शेत जमीन खरेदी आणि विक्रीसाठीचे एकमेव हक्काचे ठिकाण. 
          व्यवहारात पारदर्शकता हेच आमचे वैशिष्ट्य.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4 text-green-400 border-b border-gray-700 pb-2 inline-block">संपर्क माहिती</h3>
        <ul className="text-gray-300 space-y-3">
          <li className="flex items-center gap-3">
            <span className="bg-gray-800 p-2 rounded-full">👤</span> 
            {OWNER_DETAILS.name}
          </li>
          <li className="flex items-center gap-3">
            <span className="bg-gray-800 p-2 rounded-full">📱</span> 
            {OWNER_DETAILS.contact.phone}
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-gray-800 p-2 rounded-full mt-1">📍</span> 
            {OWNER_DETAILS.contact.address}
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4 text-green-400 border-b border-gray-700 pb-2 inline-block">महत्वाच्या लिंक्स</h3>
        <ul className="text-gray-400 space-y-2">
          <li><Link to="/buy" className="hover:text-green-400 hover:translate-x-1 transition-transform inline-block">➡️ शेत घ्यायचे आहे</Link></li>
          <li><Link to="/sell" className="hover:text-green-400 hover:translate-x-1 transition-transform inline-block">➡️ शेत विकायचे आहे</Link></li>
          <li><Link to="/contact" className="hover:text-green-400 hover:translate-x-1 transition-transform inline-block">➡️ थेट संपर्क साधा</Link></li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-6 pt-4 border-t border-slate-800 text-gray-500 text-sm">
      © {new Date().getFullYear()} Inamdar Farms. All rights reserved. | <span className="text-green-700">Design for Farmers</span>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-green-600/30 border border-green-500/50 backdrop-blur-md text-green-300 font-semibold mb-4 text-sm md:text-base animate-fade-in-up">
            विश्वसनीयता आणि पारदर्शकता
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight">
            तुमच्या स्वप्नातील <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">शेत जमीन</span> शोधा
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-gray-200 font-light max-w-3xl mx-auto">
            इनामदार फार्म्स - योग्य जमीन, योग्य किंमत आणि २० वर्षांचा गाढा अनुभव.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/buy')}
              className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-lg font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-green-900/50 flex items-center justify-center gap-3"
            >
              <span>शेत घ्यायचे आहे</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button 
              onClick={() => navigate('/sell')}
              className="group bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-green-900 border-2 border-white/30 text-lg font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
            >
              <span>शेत विकायचे आहे</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-gray-50" viewBox="0 0 1440 120">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats/Intro */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">२०+ वर्षे अनुभव</h3>
              <p className="text-gray-600">शेत जमिनीच्या व्यवहारात दीर्घकालीन अनुभव आणि विश्वास.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">पारदर्शक व्यवहार</h3>
              <p className="text-gray-600">प्रत्येक व्यवहार कायदेशीर आणि स्पष्ट कागदपत्रांसह.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">फक्त शेत जमीन</h3>
              <p className="text-gray-600">आम्ही फक्त ॲग्री-लँड (शेत) मध्येच तज्ञ आहोत.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const BuyPage = () => {
  const [buyerForm, setBuyerForm] = useState({
    name: '',
    mobile: '',
    budget: '',
    acres: '',
    location: ''
  });

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `इनामदार फार्म्स - शेत खरेदी चौकशी: ${buyerForm.location}`;
    const body = `नमस्कार इनामदार सर,%0D%0A%0D%0Aखालील शेत खरेदीची चौकशी आहे:%0D%0A%0D%0Aनाव: ${buyerForm.name}%0D%0Aमोबाईल: ${buyerForm.mobile}%0D%0Aपसंतीचे ठिकाण: ${buyerForm.location}%0D%0Aलागणारे एकर: ${buyerForm.acres}%0D%0Aबजेट: ${buyerForm.budget}%0D%0A%0D%0Aकृपया लवकर संपर्क करा.%0D%0A%0D%0Aधन्यवाद`;
    window.location.href = `mailto:${OWNER_DETAILS.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleBuyerWhatsApp = () => {
      if(!buyerForm.name || !buyerForm.mobile) {
        alert("कृपया आधी नाव आणि मोबाईल नंबर भरा.");
        return;
      }
      const msg = `नमस्कार, मला शेत घ्यायचे आहे.%0Aनाव: ${buyerForm.name}%0Aपसंतीचे गाव: ${buyerForm.location}%0Aबजेट: ${buyerForm.budget}%0Aक्षेत्र: ${buyerForm.acres} एकर`;
      window.open(`https://wa.me/91${OWNER_DETAILS.contact.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
       <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
           <div className="text-center mb-10">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">शेतकरी मित्र</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">शेत घ्यायचे आहे?</h1>
              <p className="text-gray-600 text-lg">
                खालील फॉर्म भरा. आम्ही तुमच्या बजेट आणि गरजेनुसार सर्वोत्तम शेत जमीन शोधून देऊ.
              </p>
           </div>
           
           <form onSubmit={handleBuyerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">तुमचे नाव</label>
                  <input 
                    required
                    type="text" 
                    value={buyerForm.name}
                    onChange={e => setBuyerForm({...buyerForm, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="उदा. अमित देशमुख"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">मोबाईल नंबर</label>
                  <input 
                    required
                    type="tel"
                    value={buyerForm.mobile}
                    onChange={e => setBuyerForm({...buyerForm, mobile: e.target.value})} 
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="उदा. 9988776655"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">कोणत्या भागात/गावी जमीन हवी आहे?</label>
                <input 
                    required
                    type="text"
                    value={buyerForm.location}
                    onChange={e => setBuyerForm({...buyerForm, location: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="उदा. संगमनेर, अकोले, नाशिक रोड..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">किती एकर हवी आहे?</label>
                  <input 
                    type="text" 
                    value={buyerForm.acres}
                    onChange={e => setBuyerForm({...buyerForm, acres: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="उदा. 5 ते 10 एकर"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">अंदाजे बजेट</label>
                  <input 
                    type="text" 
                    value={buyerForm.budget}
                    onChange={e => setBuyerForm({...buyerForm, budget: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="उदा. 50 लाख"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition mt-4 shadow-lg"
              >
                माहिती सबमिट करा (Email)
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">किंवा</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button 
                type="button" 
                onClick={handleBuyerWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition shadow-lg flex justify-center items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                WhatsApp वर पाठवा
              </button>
           </form>
       </div>
    </div>
  );
};

const FarmDetailsPage = () => {
  const { id } = useParams();
  const farm = FARMS_DATA.find(f => f.id === Number(id));

  if (!farm) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">माहिती उपलब्ध नाही</h2>
            <p className="text-gray-500 mb-6">कदाचित हे शेत विकले गेले असावे.</p>
            <Link to="/buy" className="text-green-600 font-semibold hover:underline">
                नवीन चौकशी करण्यासाठी येथे क्लिक करा
            </Link>
        </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const message = `नमस्कार, मला '${farm.title}' (ID: ${farm.id}) बद्दल अधिक माहिती हवी आहे.`;
    const url = `https://wa.me/91${OWNER_DETAILS.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/buy" className="text-green-700 font-semibold hover:text-green-900 mb-6 inline-flex items-center gap-2 transition-transform hover:-translate-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        मागे जा
      </Link>
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="h-[400px] lg:h-auto relative">
            <img 
              src={farm.image} 
              alt={farm.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-14">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">{farm.title}</h1>
            <p className="text-2xl text-green-700 font-bold mb-8 bg-green-50 inline-block px-4 py-1 rounded-lg border border-green-200">{farm.price}</p>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2 text-lg">वैशिष्ट्ये</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm mb-1">गाव / ठिकाण</span>
                    <span className="font-semibold text-gray-800 text-lg">{farm.location}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm mb-1">क्षेत्रफळ (Area)</span>
                    <span className="font-semibold text-gray-800 text-lg">{farm.size}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm mb-1">पाण्याची सोय</span>
                    <span className="font-semibold text-gray-800 text-lg">{farm.waterSource}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm mb-1">रस्ता</span>
                    <span className="font-semibold text-gray-800 text-lg">{farm.roadAccess}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">अधिक माहिती</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{farm.description}</p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                   onClick={handleWhatsAppInquiry}
                   className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg hover:shadow-green-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  WhatsApp वर विचारा
                </button>
                <a 
                   href={`tel:+91${OWNER_DETAILS.phone}`}
                   className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  कॉल करा
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="mt-10 bg-gray-200 h-80 rounded-3xl flex items-center justify-center border border-gray-300 shadow-inner">
        <div className="text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-medium">Google Map (Location Integration)</p>
        </div>
      </div>
    </div>
  );
};

const SellFarmPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    village: '',
    acres: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `इनामदार फार्म्स - शेत विक्री चौकशी: ${formData.village}`;
    const body = `नमस्कार इनामदार सर,%0D%0A%0D%0Aखालील शेत विक्रीची माहिती आहे:%0D%0A%0D%0Aनाव: ${formData.name}%0D%0Aमोबाईल: ${formData.mobile}%0D%0Aगाव: ${formData.village}%0D%0Aएकर: ${formData.acres}%0D%0Aअपेक्षित किंमत: ${formData.price}%0D%0A%0D%0Aकृपया लवकर संपर्क करा.%0D%0A%0D%0Aधन्यवाद`;
    window.location.href = `mailto:${OWNER_DETAILS.contact.email}?subject=${subject}&body=${body}`;
    alert("तुमची माहिती ईमेल वर पाठवली आहे! आम्ही लवकरच संपर्क करू.");
  };

  const handleWhatsAppSend = () => {
     if(!formData.name || !formData.mobile) {
         alert("कृपया आधी नाव आणि मोबाईल नंबर भरा.");
         return;
     }
     const message = `नमस्कार, मला माझे शेत विकायचे आहे.%0Aनाव: ${formData.name}%0Aगाव: ${formData.village}%0Aक्षेत्र: ${formData.acres} एकर%0Aअपेक्षित किंमत: ${formData.price}`;
     window.open(`https://wa.me/91${OWNER_DETAILS.contact.phone}?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
           <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">शेतकरी मित्र</span>
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">शेत विकायचे आहे?</h1>
           <p className="text-gray-600 text-lg">
             खालील फॉर्म भरा. आम्ही तुमच्या शेतासाठी योग्य आणि कायदेशीर खरेदीदार शोधून देऊ.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">पूर्ण नाव</label>
              <input 
                required
                type="text" 
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                placeholder="उदा. गणेश पाटील"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">मोबाईल नंबर</label>
              <input 
                required
                type="tel" 
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                placeholder="उदा. 9876543210"
                value={formData.mobile}
                onChange={e => setFormData({...formData, mobile: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">शेत कोणत्या गावी आहे?</label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              placeholder="उदा. संगमनेर खुर्द"
              value={formData.village}
              onChange={e => setFormData({...formData, village: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">किती एकर?</label>
              <input 
                required
                type="text" 
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                placeholder="उदा. 2.5"
                value={formData.acres}
                onChange={e => setFormData({...formData, acres: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">अपेक्षित किंमत (एकर)</label>
              <input 
                required
                type="text" 
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                placeholder="उदा. 10 लाख"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>
          
          <div className="pt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">शेताचा फोटो (असल्यास)</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 transition"/>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition mt-4 shadow-lg"
          >
            माहिती सबमिट करा (Email)
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">किंवा</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
             WhatsApp वर पाठवा
          </button>
        </form>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-12 text-white">
            <div className="text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6 border-4 border-green-400/50 flex items-center justify-center shadow-xl overflow-hidden">
                   <img src="https://ui-avatars.com/api/?name=Bhaiyya+Inamdar&background=random&size=256" alt="owner" className="w-full h-full object-cover"/>
                </div>
                <h2 className="text-3xl font-bold mb-2">{OWNER_DETAILS.name}</h2>
                <p className="text-green-200 font-medium tracking-wide uppercase text-sm">प्रोपरायटर & मुख्य एजंट</p>
            </div>
        </div>
        <div className="md:w-3/5 p-10 md:p-16">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">आमच्याबद्दल</h1>
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            नमस्कार! मी भैया इनामदार. मी <span className="font-bold text-green-700">मागील २० वर्षांपासून</span> शेत जमीन खरेदी-विक्री (Real Estate) क्षेत्रात कार्यरत आहे.
            माझा मुख्य उद्देश शेतकऱ्यांना त्यांच्या जमिनीचा योग्य मोबदला मिळवून देणे आणि गुंतवणूकदारांना कायदेशीर व
            वादातीत जमीन उपलब्ध करून देणे हा आहे.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            आम्ही प्रामुख्याने संगमनेर आणि अहमदनगर जिल्ह्यातील जमिनीचे व्यवहार करतो. आमच्याकडे बागायती, जिरायती,
            तसेच फार्महाऊससाठी योग्य अशा विविध प्रकारच्या जमिनी उपलब्ध आहेत.
          </p>
          <div className="bg-green-50 p-6 rounded-2xl border-l-8 border-green-600 shadow-sm">
            <p className="font-bold text-green-900 text-xl italic">"शेतकऱ्याचा विश्वास हेच आमचे खरे भांडवल!"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${OWNER_DETAILS.contact.email}?subject=इनामदार फार्म्स - शेत जमीन चौकशी&body=नमस्कार,%0D%0A%0D%0Aमला शेत जमीन बद्दल अधिक माहिती हवी आहे.%0D%0A%0D%0Aआपले नाव:%0D%0Aमोबाईल नंबर:%0D%0Aआपली गरज:%0D%0A%0D%0Aधन्यवाद`;
  };

  return (
    <div className="container mx-auto px-4 py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">संपर्क साधा</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">कोणत्याही चौकशीसाठी आम्हाला थेट कॉल, WhatsApp किंवा ईमेल वर संपर्क साधा</p>
        <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          १२ तास उपलब्ध
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {/* Phone Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">फोन करा</h2>
          <p className="text-gray-500 mb-2">सकाळी ९ ते सायंकाळी ७</p>
          <a href={`tel:+91${OWNER_DETAILS.contact.phone}`} className="text-3xl font-extrabold text-green-600 hover:text-green-800 transition block mb-4">
            {OWNER_DETAILS.contact.phone}
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">WhatsApp</h2>
          <p className="text-gray-500 mb-6">कधीही मेसेज करा</p>
          <button 
            onClick={() => window.open(`https://wa.me/91${OWNER_DETAILS.phone}`, '_blank')}
            className="text-2xl font-bold text-green-600 hover:text-green-800 transition flex items-center justify-center gap-2 mx-auto bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100"
          >
            चॅट करा &rarr;
          </button>
          <div className="mt-4 text-sm text-gray-400">त्वरित प्रतिसाद</div>
        </div>

        {/* Email Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">ईमेल</h2>
          <p className="text-gray-500 mb-6">तपशीलवार माहितीसाठी</p>
          <button 
            onClick={handleEmailClick}
            className="text-lg font-bold text-blue-600 hover:text-blue-800 transition flex items-center justify-center gap-2 mx-auto bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            {OWNER_DETAILS.contact.email}
          </button>
          <div className="mt-4 text-sm text-gray-400">१२ तास उपलब्ध</div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">आमच्याबद्दल अधिक माहिती</h3>
          <p className="text-gray-600 text-lg">इनामदार फार्म्स - २० वर्षांचा विश्वास आणि अनुभव</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">विश्वासार्ह सेवा</h4>
              <p className="text-gray-600 text-sm">२० वर्षांपासून शेतकऱ्यांच्या सेवेत अग्रेसर</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">त्वरित सेवा</h4>
              <p className="text-gray-600 text-sm">प्रत्येक चौकशीचा लवकर तपासणी</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Layout ---

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellFarmPage />} />
            <Route path="/farm/:id" element={<FarmDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
}

export default App;