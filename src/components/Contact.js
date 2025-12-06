'use client';
import React from 'react';
import { Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          I&apos;m currently looking for new opportunities, my inbox is always open. 
          Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        
        <div className="bg-zinc-900/80 rounded-2xl p-8 border border-zinc-800 shadow-xl text-left max-w-2xl mx-auto">
           <form className="space-y-6" onSubmit={(e) => {
             e.preventDefault();
             const name = e.target.name.value;
             const message = e.target.message.value;
             window.location.href = `mailto:phiwarkhede05@gmail.com?subject=Portfolio Contact from ${name}&body=${message}`;
           }}>
             <div className="grid md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                 <input 
                   name="name"
                   suppressHydrationWarning={true} 
                   type="text" 
                   required
                   className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" 
                   placeholder="Rahul Sharma" 
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                 <input 
                   name="email"
                   suppressHydrationWarning={true} 
                   type="email" 
                   required
                   className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" 
                   placeholder="rahul@example.com" 
                 />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
               <textarea 
                 name="message"
                 suppressHydrationWarning={true} 
                 rows="4" 
                 required
                 className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" 
                 placeholder="Hello, I'd like to talk about..."
               ></textarea>
             </div>
             <button suppressHydrationWarning={true} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 invert-hover">
               <Send size={20} /> Send Message
             </button>
           </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
