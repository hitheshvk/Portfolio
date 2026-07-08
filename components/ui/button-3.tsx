import { ArrowRight } from "lucide-react";

export interface Button3Props {
  label?: string;
  href?: string;
  className?: string;
}

export const Button3 = ({ label = "About", href = "#", className = "" }: Button3Props) => {
  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-[46px] min-w-[12rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black bg-transparent px-7 py-3 text-center font-semibold text-white no-underline ${className}`}
    >
      <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
        {label}
      </span>
      <div className="absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{label}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </div>
      <div
        className="absolute inset-0 z-0 rounded-full bg-black transition-colors duration-300 group-hover:bg-[#263381]"
        aria-hidden="true"
      />
    </a>
  );
};

/** @deprecated Use named export `Button3` */
export const Component = Button3;
