import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="font-bebas text-8xl text-gold mb-2">404</h1>
      <h2 className="font-bebas text-4xl mb-4 text-black uppercase tracking-widest">Page Not Found</h2>
      <p className="font-montserrat text-gray-500 mb-8 max-w-md mx-auto">
        We couldn't find the page you were looking for. It might have been removed, renamed, or did not exist in the first place.
      </p>
      <Link 
        to="/" 
        className="bg-black text-white px-10 py-4 font-bebas text-xl tracking-widest hover:bg-gold transition-colors"
      >
        RETURN TO HOME
      </Link>
    </div>
  );
}
