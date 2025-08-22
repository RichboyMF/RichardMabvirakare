import React from "react";
import { STUDENT_NAME } from "../constants";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto py-6 px-6 md:px-12 text-center text-slate-500 text-sm">
        <p className="mb-2 italic">
          "Bridging theoretical knowledge with practical solutions through
          innovative engineering."
        </p>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} {STUDENT_NAME}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
