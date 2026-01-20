"use client";

import { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, Headphones, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';
import { supportApi } from '@/utils/api';
import { useToast } from '@/contexts/ToastContext';
import { useFormValidation, COMMON_RULES } from '@/hooks/useFormValidation';

const PhoneInput = dynamic(() => import('react-phone-input-2').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white">Loading...</div>
  )
});

export default function ContactPage() {
  const toast = useToast();
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    phoneCountry: "",
    phoneCountryCode: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form validation
  const { errors, touched, validateForm, handleBlur, handleChange: handleValidationChange, clearErrors } = useFormValidation({
    name: COMMON_RULES.name,
    email: COMMON_RULES.email,
    phone: COMMON_RULES.phone,
    subject: { required: true },
    message: COMMON_RULES.message
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    handleValidationChange(name, value, { ...formData, [name]: value });
  };
  
  const handlePhoneChange = (value: string, data?: any) => {
    const newFormData = { 
      ...formData, 
      phone: value, 
      phoneCountry: data?.name || formData.phoneCountry,
      phoneCountryCode: (data?.countryCode || '').toUpperCase()
    };
    setFormData(newFormData);
    handleValidationChange('phone', value, newFormData);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(formData)) {
      toast.warning('Validation Error', 'Please check the form and fix the errors.');
      return;
    }
    
    // Prevent duplicate submission
    if (isSubmitting) {
      return;
    }
    
    // Clear any existing timeout
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneCountry: formData.phoneCountry,
        phoneCountryCode: formData.phoneCountryCode,
        phoneNumber: formData.phone,
        subjectText: formData.subject,
        message: formData.message,
        consent: true
      };
      
      const resp = await supportApi.submitTicket(payload);
      
      if (resp?.success) {
        setSubmitStatus('success');
        toast.success('Message Sent Successfully!', 'We\'ll get back to you within 2 business hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', phoneCountry: '', phoneCountryCode: '' });
        clearErrors();
        
        submitTimeoutRef.current = setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        toast.error('Failed to Send Message', 'Please try again or contact us directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      toast.error('Failed to Send Message', 'Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A1F44] to-[#1a3a6b] py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 sm:px-4 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Let's Transform Your Venue Together
            </h1>
            <p className="text-base sm:text-lg text-white/80 px-4 sm:px-0">
              Have a question or ready to discuss your sports technology needs? Our team of experts is here to help you find the perfect solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                      <p className="text-sm text-green-700 mt-1">We'll get back to you within 2 business hours.</p>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">Failed to send message. Please try again or contact us directly.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="John Smith"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          touched.name && errors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        } bg-white focus:outline-none focus:ring-1 transition-colors`}
                        required
                      />
                      {touched.name && errors.name && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          touched.email && errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        } bg-white focus:outline-none focus:ring-1 transition-colors`}
                        required
                      />
                      {touched.email && errors.email && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <PhoneInput
                        country={'us'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                          name: 'phone',
                          id: 'phone',
                          required: true,
                          onBlur: () => handleBlur('phone'),
                        }}
                        containerStyle={{width: '100%'}}
                        inputStyle={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '0.5rem',
                          border: touched.phone && errors.phone ? '1px solid #EF4444' : '1px solid #D1D5DB',
                          fontSize: '1rem',
                        }}
                      />
                      {touched.phone && errors.phone && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          touched.subject && errors.subject 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        } bg-white focus:outline-none focus:ring-1 transition-colors`}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="general">General Question</option>
                        <option value="other">Other</option>
                      </select>
                      {touched.subject && errors.subject && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.subject}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell us about your project or question..."
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        touched.message && errors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } bg-white focus:outline-none focus:ring-1 transition-colors resize-none`}
                      required
                    ></textarea>
                    {touched.message && errors.message && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.message}
                      </div>
                    )}
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {formData.message.length} / 1000 characters
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Phone size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <p className="text-gray-600 text-sm mt-1">+1 (800) 555-0100</p>
                      <p className="text-gray-500 text-xs mt-0.5">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600 text-sm mt-1">support@techsports.com</p>
                      <p className="text-gray-500 text-xs mt-0.5">24/7 Response</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Address</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        100 Technology Square<br />
                        Boston, MA 02142<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Clock size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-blue-200">
                    <div className="flex items-center text-blue-700">
                      <Headphones size={16} className="mr-2" />
                      <span className="font-medium">24/7 Emergency Support Available</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">2-hour average response time</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">99% client satisfaction rate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">500+ venues worldwide</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">15+ years of expertise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </main>
  );
}

