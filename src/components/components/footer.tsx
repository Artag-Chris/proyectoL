import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-[var(--color-comfort)]/30 backdrop-blur-md mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">AromaFlame</h3>
            <p className="text-sm text-[var(--color-text)]/80">Tu tienda en línea para productos aromáticos y energéticos.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2 text-[var(--color-text)]">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-[var(--color-text)]/80">Inicio</a></li>
              <li><a href="#" className="hover:underline text-[var(--color-text)]/80">Productos</a></li>
              <li><a href="#" className="hover:underline text-[var(--color-text)]/80">Sobre nosotros</a></li>
              <li><a href="#" className="hover:underline text-[var(--color-text)]/80">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2 text-[var(--color-text)]">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl text-[var(--color-text)] hover:text-[var(--color-energy)]"><FaFacebook /></a>
              <a href="#" className="text-2xl text-[var(--color-text)] hover:text-[var(--color-energy)]"><FaTwitter /></a>
              <a href="#" className="text-2xl text-[var(--color-text)] hover:text-[var(--color-energy)]"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--color-text)]/20 mt-8 pt-8 text-center">
          <p className="text-sm text-[var(--color-text)]/60">&copy; 2023 AromaFlame. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

