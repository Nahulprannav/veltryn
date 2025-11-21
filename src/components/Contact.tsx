import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SpotlightCard } from './shared/SpotlightCard';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend/database
    // persist message to localStorage messages array
    try {
      const newMsg = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toISOString(),
      };
      // write via realtime helper (Firestore if configured, otherwise localStorage + events)
      // use dynamic import without top-level await to avoid transform issues
      // Prefer a Socket.IO server if configured, then Firebase, then localStorage fallback
      await import('../utils/socket')
        .then((s) => s.addDoc('messages', newMsg))
        .catch(() =>
          import('../utils/firebase')
            .then((fb) => fb.addRealtimeDoc('messages', newMsg))
            .catch(() => {
              const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
              msgs.push(newMsg);
              localStorage.setItem('messages', JSON.stringify(msgs));
            })
        );
    } catch (err) {
      // fallback: overwrite
      localStorage.setItem('messages', JSON.stringify([{ ...formData, createdAt: new Date().toISOString(), id: Math.random().toString(36).substr(2,9) }]));
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'nahulprannav@gmail.com',
      link: 'mailto:nahulprannav@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 6382147517',
      link: 'tel:+916382147517',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info) => {
          const Icon = info.icon;
          return (
            <SpotlightCard key={info.title}>
              <a href={info.link} className="block p-6 text-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-yellow-900/20 w-fit mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-yellow-600" />
                </div>
                <h3 className="text-lg mb-2">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{info.details}</p>
              </a>
            </SpotlightCard>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto">
        <SpotlightCard>
          <div className="p-8">
            <h2 className="text-2xl mb-6">Send us a Message</h2>
            {submitted && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}