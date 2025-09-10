import { notFound } from 'next/navigation';
import { getProductById } from '../../../data/products';
import Image from 'next/image';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 bg-white/10 rounded-3xl backdrop-blur-sm p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-5xl font-bold mb-6">{product.name}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the latest technology with our premium {product.name.toLowerCase()}. 
                Designed for performance, built for the future.
              </p>
              
              <div className="space-y-4">
                <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 font-medium text-lg shadow-lg">
                  Get Started
                </button>
                <button className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 ml-0 md:ml-4 mt-4 md:mt-0">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Premium Quality', desc: 'Built with the finest materials and attention to detail.' },
                { title: 'Advanced Technology', desc: 'Cutting-edge features that enhance your experience.' },
                { title: 'User Friendly', desc: 'Intuitive design that makes everything simple and accessible.' }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { id: 'tablet' },
    { id: 'headphones' },
    { id: 'phone' },
    { id: 'laptop' },
    { id: 'watch' },
    { id: 'vr-headset' },
    { id: 'controller' },
    { id: 'speaker' },
  ];
}