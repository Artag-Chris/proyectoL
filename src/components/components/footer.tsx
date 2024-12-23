import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur-md mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">VibrantShop</h3>
            <p className="text-sm">Tu tienda en línea para productos vibrantes y energéticos.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Inicio</a></li>
              <li><a href="#" className="hover:underline">Productos</a></li>
              <li><a href="#" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="#" className="hover:underline">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-orange-500"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-orange-500"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-orange-500"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2023 VibrantShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
