import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
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

// Dữ liệu sản phẩm áo thun
const products = [
  { id: 1, name: "Void Tee", collection: "SS24", img: "https://cdn.hstatic.net/products/1000306633/v_q00068_eb92df24aff647ad8da5c781450dabb7.jpg" },
  { id: 2, name: "Chrome Hoodie", collection: "FW23", img: "https://placehold.co/1000x1200/bbbbbb/000000?text=Chrome+Hoodie" },
  { id: 3, name: "Structure Longsleeve", collection: "SS24", img: "https://placehold.co/1000x1200/d1d1d1/000000?text=Structure+LS" },
  { id: 4, name: "Glitch Tee", collection: "FW23", img: "https://placehold.co/1000x1200/c2c2c2/000000?text=Glitch+Tee" },
  { id: 5, name: "Urban Cargo", collection: "SS24", img: "https://placehold.co/1000x1200/e8e8e8/000000?text=Urban+Cargo" },
  { id: 6, name: "Reflect Jacket", collection: "FW23", img: "https://placehold.co/1000x1200/b0b0b0/000000?text=Reflect+Jacket" },
  { id: 7, name: "Mono Tee", collection: "SS24", img: "https://placehold.co/1000x1200/f0f0f0/000000?text=Mono+Tee" },
  { id: 8, name: "System Cap", collection: "FW23", img: "https://placehold.co/1000x1200/cccccc/000000?text=System+Cap" },
];

const skills = ["Figma", "Adobe XD", "Prototyping", "User Research", "Interaction Design", "React", "JavaScript", "HTML/CSS", "Design System", "Branding", "Problem Solving", "Agile"];

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
// CUSTOM CURSOR CONTEXT & COMPONENT
//==================================================================
const CursorContext = createContext();

const CustomCursor = () => {
    const { cursorType } = useContext(CursorContext);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const isView = cursorType === 'view';

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "white",
        },
        view: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 20,
            height: 40,
            width: 80,
            backgroundColor: "white",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
            style={{ 
                zIndex: 9999, 
                mixBlendMode: isView ? 'normal' : 'difference' 
            }}
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
            {isView && <span className="text-black font-bold text-sm uppercase">VIEW</span>}
        </motion.div>
    );
};

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
const IconLayoutSingle = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
);
const IconLayoutGrid = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/></svg>
);
const IconLayoutDense = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h4v4H3zM9 3h4v4H9zM15 3h4v4h-4zM3 9h4v4H3zM9 9h4v4H9zM15 9h4v4h-4zM3 15h4v4H3zM9 15h4v4H9zM15 15h4v4h-4z"/></svg>
);
const IconChevronLeft = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
);
const IconChevronRight = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
);


//==================================================================
// COMPONENT 1: PRELOADER (Màn hình tải trang)
//==================================================================
const Preloader = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onComplete, 500);
        return 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: percentage === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: percentage === 100 ? 0.5 : 0 }}
    >
      <div className="text-center font-['Anton'] tracking-widest">
        <span className="text-9xl font-black">
          {percentage}
        </span>
        <span className="text-5xl font-black">%</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900">
        <motion.div
          className="h-full bg-white"
          initial={{ width: `${percentage}%` }}
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
  const { setCursorType } = useContext(CursorContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center text-white mix-blend-difference">
      <div className="text-lg font-bold uppercase tracking-widest">{YOUR_NAME}</div>
      <nav className="hidden md:flex items-center gap-4 uppercase text-sm">
        <a href="#work" className="relative group px-4 py-2 font-bold text-white no-underline" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
          <span className="relative z-10">Work</span>
          <span className="absolute inset-0 rounded-full border border-white scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
        </a>
        <a href="#about" className="relative group px-4 py-2 font-bold text-white no-underline" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
          <span className="relative z-10">About</span>
          <span className="absolute inset-0 rounded-full border border-white scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
        </a>
        <a href="#skills" className="relative group px-4 py-2 font-bold text-white no-underline" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
          <span className="relative z-10">Skills</span>
          <span className="absolute inset-0 rounded-full border border-white scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
        </a>
        <a href="#contact" className="relative group px-4 py-2 font-bold text-white no-underline" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
          <span className="relative z-10">Contact</span>
          <span className="absolute inset-0 rounded-full border border-white scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
        </a>
      </nav>
      <a href={`mailto:${YOUR_EMAIL}`} className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors text-sm uppercase" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
        Let's Talk
      </a>
    </header>
  );
};


//==================================================================
// COMPONENT 3: HERO SECTION (Phần giới thiệu đầu trang)
//==================================================================
const HeroSection = () => {
  return (
    <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative text-white overflow-hidden bg-black">
      <img
        src="https://placehold.co/1920x1080/000000/ffffff?text=Background+Image"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="z-10 text-center px-4">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {`${YOUR_ROLE.toUpperCase()} & VISUAL STORYTELLER`}
        </motion.h1>
      </div>
    </section>
  );
};


//==================================================================
// COMPONENT 4: ABOUT SECTION (Phần giới thiệu bản thân)
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
        <section id="about" ref={ref} className="h-screen w-full flex flex-col justify-center bg-black text-white p-6 md:p-12 relative overflow-hidden">
            <motion.h1 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[25vw] leading-none font-black text-white/5 select-none z-0"
                initial={{ y: '10%' }}
                animate={isInView ? { y: '0%' } : { y: '10%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ fontFamily: "'Anton', sans-serif" }}
            >
                PRODUCT DESIGN
            </motion.h1>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
                <motion.div variants={itemVariants} className="lg:col-span-3 space-y-12 self-start">
                    <div>
                        {aboutData.roles.map((role, index) => (
                            <p key={index} className="text-lg text-gray-400">{role}</p>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-6xl font-black tracking-tighter uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>AWARDS</h2>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="lg:col-span-5">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden grayscale">
                        <img src={aboutData.mainImage} alt={YOUR_NAME} className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                           OV
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8 self-start">
                    <div>
                        {aboutData.awards.map((award, index) => (
                            <p key={index} className="text-md text-gray-300 border-b border-gray-800 py-2">{award}</p>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src={aboutData.collageImages[0]} alt="Collage 1" className="w-full h-auto rounded-lg object-cover grayscale"/>
                        <img src={aboutData.collageImages[1]} alt="Collage 2" className="w-full h-auto rounded-lg object-cover grayscale"/>
                        <img src={aboutData.collageImages[2]} alt="Collage 3" className="col-span-2 w-full h-auto rounded-lg object-cover grayscale"/>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};


//==================================================================
// COMPONENT 5: WORK SECTION (Phần dự án)
//==================================================================
const WorkSection = () => {
    const [layout, setLayout] = useState('grid');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const { setCursorType } = useContext(CursorContext);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex(prevIndex => (prevIndex + newDirection + products.length) % products.length);
    };

    const slideVariants = {
        enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    const LayoutSwitcher = () => (
        <div className="flex justify-center items-center gap-2">
            <button onClick={() => setLayout('single')} className={`p-2 rounded-md transition-colors ${layout === 'single' ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/20'}`}>
                <IconLayoutSingle className="w-6 h-6" />
            </button>
            <button onClick={() => setLayout('grid')} className={`p-2 rounded-md transition-colors ${layout === 'grid' ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/20'}`}>
                <IconLayoutGrid className="w-6 h-6" />
            </button>
            <button onClick={() => setLayout('dense')} className={`p-2 rounded-md transition-colors ${layout === 'dense' ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/20'}`}>
                <IconLayoutDense className="w-6 h-6" />
            </button>
        </div>
    );

    return (
        <section id="work" className="h-screen w-full flex flex-col bg-black text-white p-6 md:p-12">
            <div className="text-center mb-4 flex-shrink-0 pt-20">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
                    Collection
                </h2>
            </div>

            <div className="flex-grow relative overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                    {layout === 'single' ? (
                        <div key="single" className="w-full h-full relative group" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                                >
                                    <div className="w-full max-w-md aspect-[3/4] relative">
                                        <img src={products[currentIndex].img} alt={products[currentIndex].name} className="w-full h-full object-cover rounded-lg grayscale" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-2xl font-bold uppercase">{products[currentIndex].name}</h3>
                                            <p className="text-gray-300">{products[currentIndex].collection}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute top-0 left-0 w-1/3 h-full z-20 cursor-pointer flex items-center justify-start" onClick={() => paginate(-1)}>
                                <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><IconChevronLeft className="w-10 h-10 text-white" /></div>
                            </div>
                            <div className="absolute top-0 right-0 w-1/3 h-full z-20 cursor-pointer flex items-center justify-end" onClick={() => paginate(1)}>
                                <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><IconChevronRight className="w-10 h-10 text-white" /></div>
                            </div>
                        </div>
                    ) : (
                         <motion.div key={layout} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full overflow-y-auto custom-scrollbar">
                            <div className={layout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "grid grid-cols-2 md:grid-cols-4 gap-4"}>
                                {products.map((product) => (
                                    <div key={product.id} className="group relative" onMouseEnter={() => setCursorType('view')} onMouseLeave={() => setCursorType('default')}>
                                        <div className="overflow-hidden rounded-lg aspect-[3/4]">
                                            <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-xl font-bold uppercase">{product.name}</h3>
                                            <p className="text-gray-400">{product.collection}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="flex-shrink-0">
                <LayoutSwitcher />
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 6: SKILLS SECTION (Phần kỹ năng)
//==================================================================
const SkillsSection = () => {
    const [isPhysicsActive, setIsPhysicsActive] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 10 } }
    };

    const PhysicsView = () => {
        const sceneRef = useRef(null);
        useEffect(() => {
            let engine, render, runner;
            const initializeScene = () => {
                const Matter = window.Matter;
                if (!Matter || !sceneRef.current) return;
                const container = sceneRef.current;
                const { clientWidth: width, clientHeight: height } = container;
                engine = Matter.Engine.create({ gravity: { y: 0.4 } });
                render = Matter.Render.create({ element: container, engine, options: { width, height, wireframes: false, background: 'transparent' } });
                const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
                const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
                const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
                const skillBodies = skills.map(skill => {
                    const textWidth = skill.length * 10 + 40;
                    return Matter.Bodies.rectangle(
                        Math.random() * (width - textWidth) + textWidth / 2, Math.random() * -height, textWidth, 40,
                        { chamfer: { radius: 20 }, restitution: 0.6, friction: 0.1, render: { fillStyle: 'white' }, label: skill }
                    );
                });
                Matter.World.add(engine.world, [ground, leftWall, rightWall, ...skillBodies]);
                Matter.Events.on(render, 'afterRender', () => {
                    const context = render.context;
                    skillBodies.forEach(body => {
                        context.save();
                        context.translate(body.position.x, body.position.y);
                        context.rotate(body.angle);
                        context.font = 'bold 16px Inter';
                        context.fillStyle = 'black';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillText(body.label, 0, 0);
                        context.restore();
                    });
                });
                container.addEventListener('mousedown', handleMouseDown);
                Matter.Render.run(render);
                runner = Matter.Runner.create();
                Matter.Runner.run(runner, engine);
            };
            const handleMouseDown = () => {
                if (!engine) return;
                const allBodies = window.Matter.Composite.allBodies(engine.world);
                allBodies.forEach(body => {
                    if (!body.isStatic) {
                        Matter.Body.applyForce(body, body.position, { x: (Math.random() - 0.5) * 0.1, y: -0.25 });
                    }
                });
            };
            const matterScriptId = 'matter-js-script';
            if (document.getElementById(matterScriptId) && window.Matter) {
                initializeScene();
            } else {
                const script = document.createElement('script');
                script.id = matterScriptId;
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js';
                script.async = true;
                script.onload = initializeScene;
                script.onerror = () => console.error("Failed to load Matter.js script");
                document.body.appendChild(script);
            }
            return () => {
                if (sceneRef.current) sceneRef.current.removeEventListener('mousedown', handleMouseDown);
                if (render) { Matter.Render.stop(render); if (render.canvas) render.canvas.remove(); render.textures = {}; }
                if (runner) Matter.Runner.stop(runner);
                if (engine) { Matter.World.clear(engine.world); Matter.Engine.clear(engine); }
            };
        }, []);
        return <div ref={sceneRef} className="w-full h-full cursor-pointer"></div>;
    };

    return (
        <section id="skills" ref={sectionRef} className="h-screen w-full flex flex-col justify-center items-center bg-black text-white p-6 md:p-12">
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8" style={{ fontFamily: "'Anton', sans-serif" }}>
                My Skills
            </h2>
            <div className="w-full h-2/3 relative overflow-hidden">
                {isPhysicsActive ? <PhysicsView /> : (
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer" onClick={() => setIsPhysicsActive(true)}>
                        <motion.div 
                            className="flex flex-wrap justify-center items-center gap-4 max-w-2xl"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            {skills.map((skill, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white text-black font-bold text-lg px-6 py-2 rounded-full"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </motion.div>
                        <AnimatePresence>
                            {isInView && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: skills.length * 0.08 + 0.5 } }}
                                    exit={{ opacity: 0 }}
                                    className="mt-8 text-gray-400"
                                >
                                    Click to interact!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 7: SERVICES SECTION (Phần dịch vụ)
//==================================================================
const ServicesSection = () => {
    return (
        <section id="services" className="h-screen w-full flex flex-col justify-center bg-white text-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-black mb-12 text-center uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-t-2 border-black pt-4"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold">{service.title}</h3>
                                <IconArrowUpRight className="text-2xl text-black"/>
                            </div>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


//==================================================================
// COMPONENT 8: TESTIMONIALS SECTION (Phần đánh giá)
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
        <section id="testimonials" className="h-screen w-full flex flex-col justify-center bg-black text-white p-6 md:p-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-black mb-12 uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>Testimonials</h2>
                <motion.div ref={carouselRef} className="cursor-grab">
                    <motion.div 
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-8"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] border border-gray-800 p-8 rounded-lg">
                                <p className="text-lg mb-6">"{testimonial.quote}"</p>
                                <h4 className="font-bold text-xl uppercase">{testimonial.name}</h4>
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
// COMPONENT 9: CONTACT SECTION (Phần liên hệ)
//==================================================================
const ScrambleText = ({ text }) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let intervalId;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
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
            iteration += 1 / 2;
        }, 40);

        return () => clearInterval(intervalId);
    }, [text, isInView]);

    return <span ref={ref}>{displayText}</span>;
};

const ContactSection = () => {
    return (
        <section id="contact" className="h-screen w-full flex flex-col justify-center bg-white text-black p-6 md:p-12 relative">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
                    <ScrambleText text="LET'S DEVELOP YOUR IDEA" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-lg">
                    <div className="flex items-start gap-4">
                        <IconMail className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Email</h4>
                            <a href={`mailto:${YOUR_EMAIL}`} className="text-gray-600 hover:text-black transition-colors">{YOUR_EMAIL}</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <IconPhone className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Phone</h4>
                            <p className="text-gray-600">{YOUR_PHONE}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <IconMapPin className="mt-1 text-2xl"/>
                        <div>
                            <h4 className="font-bold mb-1">Address</h4>
                            <p className="text-gray-600">{YOUR_ADDRESS}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};


//==================================================================
// COMPONENT 10: FOOTER
//==================================================================
const Footer = () => {
    return (
        <footer className="absolute bottom-0 left-0 right-0 bg-white text-gray-500 py-8 px-6 md:px-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-xs uppercase">
                <p>&copy; {new Date().getFullYear()} {YOUR_NAME}. All Rights Reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-black transition-colors">Twitter</a>
                    <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-black transition-colors">Dribbble</a>
                </div>
            </div>
        </footer>
    );
}

//==================================================================
// APP COMPONENT (Component chính) - ĐÃ CẬP NHẬT
// Tái áp dụng scroll-snap và CSS cho thanh cuộn tùy chỉnh.
//==================================================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorType, setCursorType] = useState('default');
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: mainRef });

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(cursorStyle);

    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.innerHTML = `
      /* Ẩn thanh cuộn mặc định cho main container */
      main::-webkit-scrollbar {
        display: none;
      }
      main {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }

      /* CSS cho thanh cuộn tùy chỉnh bên trong Collection */
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #333;
        border-radius: 4px;
        border: 2px solid black;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
    `;
    document.head.appendChild(scrollbarStyle);


    return () => {
        if (document.head.contains(fontLink)) document.head.removeChild(fontLink);
        if (document.head.contains(cursorStyle)) document.head.removeChild(cursorStyle);
        if (document.head.contains(scrollbarStyle)) document.head.removeChild(scrollbarStyle);
        document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading]);

  const CustomScrollbar = ({ scrollProgress }) => {
    const scaleY = useTransform(scrollProgress, [0, 1], [0, 1]);
    return (
        <div className="fixed top-0 right-0 h-full w-2 flex justify-center py-2 z-50 pointer-events-none">
            <div className="relative h-full w-1 bg-gray-800 rounded-full">
                <motion.div
                    className="w-full bg-white rounded-full"
                    style={{ scaleY, transformOrigin: 'top' }}
                />
            </div>
        </div>
    );
};

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <CustomCursor />
      <div className="bg-black min-h-screen font-['Inter'] relative">
        <Header />
        <main ref={mainRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
          <section className="h-screen w-full snap-start"><HeroSection /></section>
          <section className="h-screen w-full snap-start"><AboutSection /></section>
          <section className="h-screen w-full snap-start"><WorkSection /></section>
          <section className="h-screen w-full snap-start"><SkillsSection /></section>
          <section className="h-screen w-full snap-start"><ServicesSection /></section>
          <section className="h-screen w-full snap-start"><TestimonialsSection /></section>
          <section className="h-screen w-full snap-start"><ContactSection /></section>
        </main>
        <CustomScrollbar scrollProgress={scrollYProgress} />
      </div>
    </CursorContext.Provider>
  );
}
