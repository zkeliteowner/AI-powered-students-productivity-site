import React, { useRef, useState } from "react";
import { motion } from "motion/react";

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  href: string;
}

const Tab = ({ children, setPosition, href }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);
  
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-sm font-bold"
    >
      <a href={href} className="w-full h-full block">
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-lg bg-indigo-600 md:h-9"
    />
  );
};

export default function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative flex w-fit rounded-xl border border-slate-200 bg-white/50 backdrop-blur-md p-1 shadow-sm"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="#">Home</Tab>
      <Tab setPosition={setPosition} href="#features">Features</Tab>
      <Tab setPosition={setPosition} href="#ai">AI Assistant</Tab>
      <Tab setPosition={setPosition} href="#testimonials">Reviews</Tab>
      <Tab setPosition={setPosition} href="#pricing">Pricing</Tab>

      <Cursor position={position} />
    </ul>
  );
}
