import { useState, useEffect } from 'react'
import { PlaceholdersAndVanishInput } from '../../components/ui/placeholders-and-vanish-input'
import { IconMapPin, IconPhone, IconMail, IconMessageCircle, IconSend, IconAlertCircle } from '@tabler/icons-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    // Suppress Google Maps API errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' &&
          (args[0].includes('maps.googleapis.com') ||
           args[0].includes('google.maps') ||
           args[0].includes('ERR_BLOCKED_BY_CLIENT'))) {
        return; // Suppress Google Maps related errors
      }
      originalError.apply(console, args);
    };

    // Try to detect if Google Maps will load
    const timer = setTimeout(() => {
      // If we haven't errored by now, assume map loaded successfully
      if (!mapError) {
        setMapError(false);
      }
    }, 5000);

    return () => {
      console.error = originalError;
      clearTimeout(timer);
    };
  }, [mapError]);

  function handleSubmit(e) {
    e.preventDefault()
    const composed = `Hello, my name is ${name}. My phone number is ${phone}. My message is: ${message}`
    const encoded = encodeURIComponent(composed)
    const whatsappNumber = '+919395215125'
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md p-8 sm:p-12 shadow-2xl shadow-black/20">
            <IconMessageCircle className="mx-auto h-16 w-16 text-white mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Ready to get your device fixed? Contact us today for expert laptop and PC repair services in Guwahati.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <IconMapPin className="h-5 w-5 mr-3 text-blue-400" />
                Our Location
              </h3>
              <div className="text-slate-300 space-y-2">
                <p className="font-medium text-white">AK Laptop</p>
                <p>Goswami Complex, Manipuri Rajbari</p>
                <p>Paltan Bazaar, Guwahati</p>
                <p>Assam 781008</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg shadow-black/20">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <IconPhone className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <a href="tel:+919395215125" className="text-white hover:text-blue-400 transition-colors">
                      +91 93952 15125
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <IconMail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href="mailto:info@aklaptop.in" className="text-white hover:text-blue-400 transition-colors">
                      info@aklaptop.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-lg shadow-black/20">
              <div className="text-center mb-8">
                <IconSend className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-2">Message us on WhatsApp</h2>
                <p className="text-slate-300">Get instant help and quotes for your device repair needs</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <PlaceholdersAndVanishInput
                      placeholders={["Your name", "John Doe"]}
                      hideButton
                      hideForm
                      onChange={(e) => setName(e.target.value)}
                      onSubmit={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <PlaceholdersAndVanishInput
                      placeholders={["Your phone", "+91 98765 43210"]}
                      hideButton
                      hideForm
                      onChange={(e) => setPhone(e.target.value)}
                      onSubmit={() => {}}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <PlaceholdersAndVanishInput
                    placeholders={["Describe your issue", "My laptop won't turn on..."]}
                    hideButton
                    hideForm
                    onChange={(e) => setMessage(e.target.value)}
                    onSubmit={() => {}}
                  />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600/20 backdrop-blur-md border border-green-400/30 py-3 px-6 text-sm font-semibold text-green-400 shadow-sm hover:bg-green-600/30 hover:border-green-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400/50 transition-all duration-200 shadow-lg shadow-black/10">
                  <IconSend className="h-4 w-4" />
                  Send WhatsApp Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg shadow-black/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <IconMapPin className="h-5 w-5 mr-3 text-blue-400" />
              Find Us
            </h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-white/5">
              {mapError || window.navigator.onLine === false ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                  <IconAlertCircle className="h-12 w-12 text-yellow-400 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Map Unavailable</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    The interactive map couldn't be loaded. This may be due to browser extensions or network restrictions.
                  </p>
                  <div className="text-left text-slate-200 text-sm space-y-1">
                    <p><strong>Address:</strong></p>
                    <p>Goswami Complex, Manipuri Rajbari</p>
                    <p>Paltan Bazaar, Guwahati</p>
                    <p>Assam 781008</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Goswami+Complex+Manipuri+Rajbari+Paltan+Bazaar+Guwahati"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors duration-200"
                  >
                    <IconMapPin className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                </div>
              ) : (
                <iframe
                  title="AKLaptop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.573998258661!2d91.74762908530981!3d26.17799991802808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a2a23b24445%3A0x5bad66d5fb582bd8!2sGoswami%20Complex!5e0!3m2!1sen!2sus!4v1761591929459!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  onError={() => {
                    console.warn('Google Maps iframe failed to load');
                    setMapError(true);
                  }}
                  onLoad={() => {
                    // Small delay to check if content actually loaded
                    setTimeout(() => {
                      if (!mapError) {
                        setMapError(false); // Confirm successful load
                      }
                    }, 1000);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

