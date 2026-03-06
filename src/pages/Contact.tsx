import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <main data-page="contact" className="animate-in fade-in duration-1000 bg-white pt-32 min-h-screen">
      <section
        data-section="contact-main"
        className="px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
      >
        
        {/* Left Column */}
        <div data-block="contact-info" className="lg:col-span-5 flex flex-col">
          <p className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-widest mb-8 self-start m-0">
            Contact
          </p>
          <h1 className="tracking-tighter leading-none text-black mb-12">
            Let's Connect
          </h1>
          <p className="font-medium leading-relaxed text-gray-600 mb-16 max-w-md">
            We believe in the power of digital, and we love collaborating with brands that feel the same. Fill out the form and we'll be in touch shortly.
          </p>
          <div className="mt-auto bg-white p-4 rounded-[2rem] shadow-xl shadow-black/5 border border-black/5 group">
            <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3]">
              <img src="/images/officecontact-800x600.jpg" alt="Office Location" className="w-full h-full object-cover transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div data-block="contact-form" className="lg:col-span-7 flex flex-col justify-center">
          <form className="flex flex-col space-y-8 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-black/5 border border-black/5">
            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">01 / Name</label>
              <input type="text" placeholder="Enter your name" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none text-sm font-medium text-black placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 transition-shadow" required />
            </div>
            
            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">02 / Email</label>
              <input type="email" placeholder="Enter your email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none text-sm font-medium text-black placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 transition-shadow" required />
            </div>
            
            <div className="flex flex-col relative">
              <label className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">03 / Topic</label>
              <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none text-sm font-medium text-black appearance-none cursor-pointer focus:ring-2 focus:ring-gray-200 transition-shadow" required defaultValue="">
                <option value="" disabled className="text-gray-400">Select a topic</option>
                <option value="branding">Branding</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-6 bottom-5 pointer-events-none text-gray-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">04 / Phone (Optional)</label>
              <input type="tel" placeholder="Enter phone number" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none text-sm font-medium text-black placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 transition-shadow" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">05 / Message</label>
              <textarea placeholder="Tell us about your project..." className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none text-sm font-medium text-black resize-none placeholder:text-gray-400 h-32 focus:ring-2 focus:ring-gray-200 transition-shadow" required></textarea>
            </div>

            <div className="pt-6">
              <button type="submit" className="inline-flex items-center justify-center w-full px-8 py-5 rounded-2xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors group">
                Submit Enquiry <ArrowRight size={16} className="ml-3 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
