import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SpotlightCard } from '../shared/SpotlightCard';

export function SoftwareDevelopment() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/services" className="inline-flex items-center gap-2 text-blue-600 dark:text-yellow-600 mb-8 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>
      <h1 className="text-4xl mb-4">Software Development</h1>
      <SpotlightCard><div className="p-8"><p>Custom software solutions tailored to your business needs. Contact us for more details.</p></div></SpotlightCard>
    </div>
  );
}
