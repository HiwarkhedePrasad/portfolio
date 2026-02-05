'use client';
import React, { useState } from 'react';
import { Send, Loader2, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const name = e.target.name.value;
    const message = e.target.message.value;
    
    // Simulate brief loading then redirect
    setTimeout(() => {
      window.location.href = `mailto:phiwarkhede05@gmail.com?subject=Portfolio Contact from ${name}&body=${message}`;
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subheading mx-auto">
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </div>
        
        {/* Contact Form Card */}
        <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                  <User size={14} className="inline mr-2" />
                  Name
                </label>
                <input 
                  name="name"
                  suppressHydrationWarning={true} 
                  type="text" 
                  required
                  className="input-cosmic" 
                  placeholder="John Doe" 
                />
              </div>
              
              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                  <Mail size={14} className="inline mr-2" />
                  Email
                </label>
                <input 
                  name="email"
                  suppressHydrationWarning={true} 
                  type="email" 
                  required
                  className="input-cosmic" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            
            {/* Message Field */}
            <div className="relative group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-cyan-400 transition-colors">
                <MessageSquare size={14} className="inline mr-2" />
                Message
              </label>
              <textarea 
                name="message"
                suppressHydrationWarning={true} 
                rows="5" 
                required
                className="input-cosmic resize-none" 
                placeholder="Hello, I'd like to talk about..."
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              suppressHydrationWarning={true} 
              className="btn-gradient w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
          
          {/* Or Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-slate-500 text-sm">or email directly</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Direct Email */}
          <a 
            href="mailto:phiwarkhede05@gmail.com"
            className="block text-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            phiwarkhede05@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
