"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const AccordionItem: React.FC<{ title: string, date: string, content: string }> = ({ title, date, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest w-24 m-0">{date}</p>
          <h4 className="text-black group-hover:text-gray-600 transition-colors">{title}</h4>
        </div>
        <div className="text-gray-400 group-hover:text-black transition-colors ml-4 shrink-0">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="md:pl-32 text-gray-600 leading-relaxed max-w-3xl m-0">{content}</p>
      </div>
    </div>
  );
};
