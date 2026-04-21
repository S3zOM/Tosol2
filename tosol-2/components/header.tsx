"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header({
  accessCode,
  setAccessCode,
  handleAccess,
}: {
  accessCode: string;
  setAccessCode: (val: string) => void;
  handleAccess: () => void;
}) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-3xl flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-lg"
    >
      <h1 className="text-xl font-bold tracking-wide">
        📋 Attendance System
      </h1>

      <div className="flex gap-2 items-center">
        <Input
          placeholder="Admin code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="w-40"
        />
        <Button onClick={handleAccess}>
          View Arrivals
        </Button>
      </div>
    </motion.div>
  );
}