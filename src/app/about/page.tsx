"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Flame, Heart, Sparkles, Leaf, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
      {/* Sección de encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center justify-center mb-4">
          <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
            Nuestra Historia
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Creando ambientes que inspiran momentos inolvidables</h1>
        <p className="text-xl text-muted-foreground">
          Conoce la pasión y dedicación detrás de cada producto que creamos en AromaFlame.
        </p>
      </motion.div>

      {/* Historia y propósito */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden aspect-[4/3]"
        >
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Fundadores de AromaFlame"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-white/90 text-sm">Nuestros fundadores, María y Carlos, 2018</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center">
            <Flame className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Nuestra Historia
            </h2>
          </div>
          <p className="text-lg">
            AromaFlame nació en 2018 de la pasión de María y Carlos por crear ambientes que evocaran emociones y
            recuerdos. Lo que comenzó como un pequeño taller en casa, experimentando con ceras naturales y esencias,
            pronto se convirtió en una marca reconocida por la calidad y originalidad de sus productos aromáticos.
          </p>
          <p className="text-lg">
            En un mundo donde el ritmo acelerado nos aleja de los momentos de paz y conexión, queríamos crear productos
            que invitaran a las personas a detenerse, respirar y disfrutar del presente a través de experiencias
            sensoriales únicas.
          </p>
          <p className="text-lg font-medium italic border-l-4 border-orange-500 pl-4">
            "Creemos que cada aroma cuenta una historia y tiene el poder de transformar un espacio ordinario en un lugar
            extraordinario."
          </p>
        </motion.div>
      </div>

      {/* Misión y valores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center">
              <Sparkles className="h-6 w-6 text-orange-500 mr-2" />
              <h2 className="text-2xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-lg">
              Crear productos aromáticos de la más alta calidad que transformen espacios cotidianos en ambientes
              inspiradores, utilizando ingredientes naturales y procesos sostenibles que respeten nuestro planeta.
            </p>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center">
              <Heart className="h-6 w-6 text-orange-500 mr-2" />
              <h2 className="text-2xl font-bold">Nuestra Visión</h2>
            </div>
            <p className="text-lg">
              Ser reconocidos como la marca líder en productos aromáticos artesanales, llevando bienestar y momentos
              memorables a hogares de todo el país, mientras promovemos prácticas comerciales éticas y sostenibles.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="inline-flex items-center mb-6">
            <Award className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold">Nuestros Valores</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Calidad",
                description:
                  "Utilizamos los mejores ingredientes y procesos artesanales para crear productos excepcionales.",
                icon: <Award className="h-10 w-10 text-orange-500 mb-4" />,
              },
              {
                title: "Sostenibilidad",
                description:
                  "Nos comprometemos con prácticas respetuosas con el medio ambiente en cada paso de nuestro proceso.",
                icon: <Leaf className="h-10 w-10 text-green-500 mb-4" />,
              },
              {
                title: "Creatividad",
                description: "Innovamos constantemente para ofrecer experiencias aromáticas únicas y memorables.",
                icon: <Sparkles className="h-10 w-10 text-amber-500 mb-4" />,
              },
              {
                title: "Autenticidad",
                description: "Creamos productos que reflejan nuestra pasión y compromiso con la excelencia.",
                icon: <Heart className="h-10 w-10 text-red-500 mb-4" />,
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                {value.icon}
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Qué nos hace únicos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Flame className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-3xl font-bold">Lo que nos hace únicos</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Descubre por qué nuestros clientes eligen AromaFlame para crear ambientes especiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Ingredientes 100% Naturales",
              description:
                "Utilizamos ceras de soja, aceites esenciales puros y mechas de algodón orgánico para crear productos que son buenos para ti y para el planeta.",
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              title: "Diseños Exclusivos",
              description:
                "Cada producto es diseñado cuidadosamente para complementar cualquier espacio, combinando estética y funcionalidad en piezas únicas.",
              image: "/placeholder.svg?height=300&width=400",
            },
            {
              title: "Aromas Desarrollados por Expertos",
              description:
                "Nuestro equipo de perfumistas trabaja para crear combinaciones aromáticas únicas que evocan emociones y transforman ambientes.",
              image: "/placeholder.svg?height=300&width=400",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative h-64 overflow-hidden rounded-t-xl">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 bg-white border border-t-0 rounded-b-xl">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Equipo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-24"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-3xl font-bold">Nuestro Equipo</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Conoce a las personas apasionadas que hacen posible AromaFlame.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "María Rodríguez",
              role: "Fundadora y Directora Creativa",
              bio: "Apasionada por los aromas y el diseño, María lidera el desarrollo de nuevos productos.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Carlos Méndez",
              role: "Co-fundador y Director de Operaciones",
              bio: "Con experiencia en procesos sostenibles, Carlos asegura la calidad de cada producto.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Laura Sánchez",
              role: "Perfumista Principal",
              bio: "Con un talento innato para crear combinaciones aromáticas únicas y memorables.",
              image: "/placeholder.svg?height=400&width=400",
            },
            {
              name: "Daniel Torres",
              role: "Diseñador de Producto",
              bio: "Combina funcionalidad y estética para crear piezas que complementan cualquier espacio.",
              image: "/placeholder.svg?height=400&width=400",
            },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-orange-600 mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Llamado a la acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 md:p-12 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tus espacios?</h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Descubre nuestra colección de productos aromáticos artesanales y crea ambientes que inspiren momentos
          inolvidables.
        </p>
        <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
          <Link href="/products">
            Explorar productos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
