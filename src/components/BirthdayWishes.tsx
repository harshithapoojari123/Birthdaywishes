import { motion } from 'framer-motion';

export default function BirthdayWishes() {
  const wishes = [
    "I wish you endless joy,",
    "Boundless love,",
    "Success in everything you do,",
    "And a lifetime of beautiful moments."
  ];

  return (
    <section className="py-40 bg-transparent flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-soft-pink/10 via-[#050510] to-transparent pointer-events-none" />
      
      <div className="z-10 text-center px-4">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90">
              {wish}
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
