import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

// GIẢ LẬP DỮ LIỆU - Thay thế bằng dữ liệu thật của bạn
const YOUR_NAME = "Tên Của Bạn";
const YOUR_ROLE = "Product Designer";
const YOUR_EMAIL = "email@cuaban.com";
const YOUR_PHONE = "+84 123 456 789";
const YOUR_ADDRESS = "Thành phố Hồ Chí Minh, Việt Nam";

// Dữ liệu cho phần About mới
const aboutData = {
    mainImage: "https://placehold.co/1000x1200/1a1a1a/cccccc?text=Ảnh+Của+Bạn",
    roles: ["Art Director", "Digital Design Lead", "Expert in Visual & Ux", "AI enthusiast", "Design Mentor"],
    awards: ["CSS Winner", "Awwwards", "Marcom Awards", "DotCOMM Awards", "W3 Awards", "AVA Digital Awards", "CSS Design Awards", "Hermes Awards", "Creativity International Awards"],
    collageImages: [
        "https://placehold.co/400x300/2a2a2a/ffffff?text=Dự+án+1",
        "https://placehold.co/300x400/3a3a3a/ffffff?text=Dự+án+2",
        "https://placehold.co/300x300/4a4a4a/ffffff?text=Cá+nhân",
    ]
};

const projects = [
  { id: 1, title: "Dự Án A", category: "Thiết kế UX/UI", img: "https://placehold.co/1200x800/1a1a1a/ffffff?text=Dự+Án+A" },
  { id: 2, title: "Dự Án B", category: "Branding", img: "https://placehold.co/1200x800/2a2a2a/ffffff?text=Dự+Án+B" },
  { id: 3, title: "Dự Án C", category: "Phát triển Web", img: "https://placehold.co/1200x800/3a3a3a/ffffff?text=Dự+Án+C" },
];

const services = [
  { title: "Thiết kế Trải nghiệm Người dùng (UX)", description: "Nghiên cứu, phân tích và tối ưu hóa luồng tương tác để tạo ra sản phẩm thân thiện và hiệu quả." },
  { title: "Thiết kế Giao diện Người dùng (UI)", description: "Xây dựng hệ thống giao diện đẹp mắt, nhất quán và phù hợp với nhận diện thương hiệu." },
  { title: "Thiết kế Tương tác", description: "Tạo ra các chuyển động và hiệu ứng vi mô giúp tăng cường sự gắn kết của người dùng." },
  { title: "Branding & Identity", description: "Phát triển bộ nhận diện thương hiệu độc đáo và đáng nhớ, từ logo đến guideline." },
];

const testimonials = [
    { name: "Khách hàng A", company: "Công ty X", quote: "Một trải nghiệm hợp tác tuyệt vời. Sản phẩm cuối cùng vượt xa mong đợi của chúng tôi." },
    { name: "Khách hàng B", company: "Tổ chức Y", quote: "Sự chuyên nghiệp và sáng tạo của bạn đã giúp dự án của chúng tôi thành công rực rỡ." },
    { name: "Khách hàng C", company: "Startup Z", quote: "Rất khuyến khích! Khả năng giải quyết vấn đề và tư duy thiết kế rất ấn tượng." },
];

//==================================================================
// INLINE SVG ICONS
//==================================================================
const IconArrowUpRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const IconMail = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const IconPhone = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const IconMapPin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);


//==================================================================
// COMPONENT 1: PRELOADER (Màn hình tải trang)
//==================================================================
const Preloader = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);

  const images = [
    "https://placehold.co/400x400/1a1a1a/ffffff?text=Style",
    "https://placehold.co/400x400/2a2a2a/ffffff?text=Motion",
    "https://placehold.co/400x400/3a3a3a/ffffff?text=Design",
  ];
  
  const currentImageIndex = Math.min(Math.floor(percentage / 34), images.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onComplete, 800);
        return 100;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const text = "MEDIA CREATIVE DIGITAL PARTNER";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: percentage === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: percentage === 100 ? 0.5 : 0 }}
    >
      <div className="absolute w-48 h-48 md:w-64 md:h-64 pointer-events-none">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Loading animation"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>
      <div className="relative text-center">
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 overflow-hidden"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-4">
              {word.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>
      <span className="absolute bottom-10 left-10 text-8xl md:text-9xl font-thin tracking-tighter">
        {percentage}%
      </span>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};


//==================================================================
// COMPONENT 2: HEADER (Thanh điều hướng)
//==================================================================
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 flex justify-between items-center text-white mix-blend-difference">
      <div className="text-lg font-bold">{YOUR_NAME}</div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#work" className="hover:opacity-75 transition-opacity">Work</a>
        <a href="#about" className="hover:opacity-75 transition-opacity">About</a>
        <a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a>
      </nav>
      <a href={`mailto:${YOUR_EMAIL}`} className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
        Let's Talk
      </a>
    </header>
  );
};


//==================================================================
// COMPONENT 3: HERO SECTION (Phần giới thiệu đầu trang)
//==================================================================
const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const title = `${YOUR_ROLE.toUpperCase()} & VISUAL STORYTELLER`;
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section ref={targetRef} id="hero" className="h-screen relative flex items-center justify-center text-white overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://placehold.co/1920x1080/000000/ffffff?text=Background+Image"
          alt="Hero Background"
          className="w-full h-full object-cover brightness-50"
        />
      </motion.div>
      <div className="z-10 text-center px-4">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </section>
  );
};


//==================================================================
// COMPONENT 4: ABOUT SECTION (Phần giới thiệu bản thân) - ĐÃ CẬP NHẬT
// Thay đổi văn bản nền và áp dụng font mới.
//==================================================================
const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section id="about" ref={ref} className="bg-black text-white py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Tiêu đề lớn ở nền */}
            <motion.h1 
                className="absolute top-0 left-0 w-full text-center text-[20vw] font-black tracking-tighter text-gray-800/50 select-none z-0"
                initial={{ y: '20%' }}
                animate={isInView ? { y: '0%' } : { y: '20%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ fontFamily: "'Anton', sans-serif" }}
            >
                PRODUCT DESIGN
            </motion.h1>

            {/* Container chính */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
                {/* Cột trái: Chức danh và AWARDS */}
                <motion.div variants={itemVariants} className="lg:col-span-3 space-y-12">
                    <div>
                        {aboutData.roles.map((role, index) => (
                            <p key={index} className="text-lg text-gray-300">{role}</p>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-6xl font-bold tracking-tighter">AWARDS</h2>
                    </div>
                </motion.div>

                {/* Cột giữa: Ảnh chính */}
                <motion.div variants={itemVariants} className="lg:col-span-5">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                        <img src={aboutData.mainImage} alt={YOUR_NAME} className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 bg-white/80 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                           OV
                        </div>
                    </div>
                </motion.div>

                {/* Cột phải: Danh sách giải thưởng và ảnh collage */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
                    <div>
                        {aboutData.awards.map((award, index) => (
                            <p key={index} className="text-md text-gray-400 border-b border-gray-700 py-1">{award}</p>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <img src={aboutData.collageImages[0]} alt="Collage 1" className="w-1/2 h-auto rounded-lg object-cover"/>
                        <img src={aboutData.collageImages[1]} alt="Collage 2" className="w-1/2 h-auto rounded-lg object-cover"/>
                    </div>
                     <img src={aboutData.collageImages[2]} alt="Collage 3" className="w-full h-auto rounded-lg object-cover"/>
                </motion.div>
            </motion.div>
        </section>
    );
};


//==================================================================
// COMPONENT 5: WORK SECTION (Phần dự án)
//==================================================================
const WorkSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const titleVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const projectVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" }
        })
    };

    return (
        <section id="work" className="bg-black text-white py-20 md:py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-hidden mb-16">
                    <motion.h2 
                        ref={ref}
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-center"
                    >
                        MASTERPIECES
                    </motion.h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div 
                            key={project.id}
                            custom={i}
                            variants={projectVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="group"
                        >
                            <div className="overflow-hidden rounded-lg mb-4">
                                <img 
                                    src={project.img} 
                                    alt={project.title} 
                                    className="w-full h-auto object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-gray-400">{project.category}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 6: SERVICES SECTION (Phần dịch vụ)
//==================================================================
const ServicesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };
    
    return (
        <section id="services" className="bg-gray-900 text-white py-20 md:py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">The Skills That Ensure Your Success</h2>
                <motion.div 
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700"
                >
                    {services.map((service, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="bg-gray-900 p-8 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold">{service.title}</h3>
                                <IconArrowUpRight className="text-2xl text-gray-500 group-hover:text-white group-hover:rotate-45 transition-all duration-300"/>
                            </div>
                            <p className="text-gray-400">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 7: TESTIMONIALS SECTION (Phần đánh giá)
//==================================================================
const TestimonialsSection = () => {
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section id="testimonials" className="bg-black text-white py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">RELIABLE CUSTOMER QUALITY</h2>
                <motion.div ref={carouselRef} className="cursor-grab">
                    <motion.div 
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] bg-gray-900 p-8 rounded-lg">
                                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                                <h4 className="font-bold text-xl">{testimonial.name}</h4>
                                <p className="text-gray-400">{testimonial.company}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 8: CONTACT SECTION (Phần liên hệ)
//==================================================================
const ScrambleText = ({ text }) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let intervalId;
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        let iteration = 0;

        intervalId = setInterval(() => {
            const newText = text
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            setDisplayText(newText);

            if (iteration >= text.length) {
                clearInterval(intervalId);
            }
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(intervalId);
    }, [text, isInView]);

    return <span ref={ref}>{displayText}</span>;
};

const ContactSection = () => {
    return (
        <section id="contact" className="bg-black text-white py-20 md:py-32 px-6 md:px-12">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12">
                    <ScrambleText text="LET'S DEVELOP YOUR IDEA" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-lg">
                    <div className="flex items-start gap-4">
                        <IconMail className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Email</h4>
                            <a href={`mailto:${YOUR_EMAIL}`} className="text-gray-400 hover:text-white transition-colors">{YOUR_EMAIL}</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <IconPhone className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Phone</h4>
                            <p className="text-gray-400">{YOUR_PHONE}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <IconMapPin className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Address</h4>
                            <p className="text-gray-400">{YOUR_ADDRESS}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 9: FOOTER
//==================================================================
const Footer = () => {
    return (
        <footer className="bg-black text-gray-500 py-8 px-6 md:px-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} {YOUR_NAME}. All Rights Reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                </div>
            </div>
        </footer>
    );
}

//==================================================================
// APP COMPONENT (Component chính)
//==================================================================
export default function App() {
  const [loading, setLoading] = useState(true);

  // Thêm một lớp vào body để ngăn cuộn khi preloader đang hoạt động
  // và thêm font từ Google Fonts
  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    // Thêm Google Font 'Anton' vào trang
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Anton&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
        // Dọn dẹp khi component unmount
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <div className="bg-black">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <WorkSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
