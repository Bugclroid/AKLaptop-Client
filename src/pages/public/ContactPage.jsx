import { useState } from 'react'
import { PlaceholdersAndVanishInput } from '../../components/ui/placeholders-and-vanish-input'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const composed = `Hello, my name is ${name}. My phone number is ${phone}. My message is: ${message}`
    const encoded = encodeURIComponent(composed)
    const whatsappNumber = '+919395215125'
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">AK Laptop</h2>
            <p className="text-gray-600">Goswami Complex, Manipuri Rajbari, Paltan Bazaar, Guwahati, Assam 781008</p>
          </div>
          <div className="space-y-1 text-gray-700">
            <div>
              Phone: <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 93952 15125</a>
            </div>
            <div>
              Email: <a href="mailto:hello@example.com" className="text-blue-600 hover:underline">info@aklaptop.in</a>
            </div>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              title="AKLaptop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.573998258661!2d91.74762908530981!3d26.17799991802808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a2a23b24445%3A0x5bad66d5fb582bd8!2sGoswami%20Complex!5e0!3m2!1sen!2sus!4v1761591929459!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-black">Message us on WhatsApp</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <PlaceholdersAndVanishInput
                placeholders={["Your name", "John Doe"]}
                hideButton
                onChange={(e) => setName(e.target.value)}
                onSubmit={() => {}}
              />
            </div>
            <div>
              <PlaceholdersAndVanishInput
                placeholders={["Your phone", "+91 98765 43210"]}
                hideButton
                onChange={(e) => setPhone(e.target.value)}
                onSubmit={() => {}}
              />
            </div>
            <div>
              <PlaceholdersAndVanishInput
                placeholders={["Your message", "Describe the issue..."]}
                hideButton
                onChange={(e) => setMessage(e.target.value)}
                onSubmit={() => {}}
              />
            </div>
            <button type="submit" className="flex items-center justify-center inline-flex items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">Open WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  )
}

