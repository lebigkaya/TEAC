import { motion } from 'motion/react';

const galleryImages = [
  {
    src: "https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/1000172609-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800",
    alt: "Activité poterie",
    title: "Activité poterie"
  },
  {
    src: "https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3036-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800",
    alt: "À la découverte du monde",
    title: "À la découverte du monde"
  },
  {
    src: "https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_1854-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800",
    alt: "Petite pause après une randonnée",
    title: "Petite pause après une randonnée"
  },
  {
    src: "https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_0514-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800",
    alt: "Sortie vélo pour profiter du soleil",
    title: "Sortie vélo pour profiter du soleil"
  }
];

export default function Gallery() {
  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            En Images
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600"
          >
            Quelques moments partagés lors de nos activités et sorties.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[3/4]"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
