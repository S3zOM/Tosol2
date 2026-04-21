"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const classes = [
  "1A",
  "2A",
  "3A",
  "4A",
  "5A",
  "6A",
  "7A",
  "8A",
  "9A",
  "10A",
  "11A",
  "12A",
];

export default function Home() {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [students, setStudents] = useState<
    { name: string; class: string; time: string }[]
  >([]);
  const [showList, setShowList] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const SECRET_CODE = "1234";

  const handleCheckIn = () => {
    if (!name.trim() || !selectedClass) return;

    const newStudent = {
      name,
      class: selectedClass,
      time: new Date().toLocaleTimeString(),
    };

    setStudents([...students, newStudent]);
    setCheckedIn(true);

    alert("✅ Added to attendance list!");
  };

  const handleAccess = () => {
    if (accessCode === SECRET_CODE) {
      setShowList(true);
    } else {
      alert("❌ Wrong code");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-6 gap-8">
      {/* Header */}
      <Header
        accessCode={accessCode}
        setAccessCode={setAccessCode}
        handleAccess={handleAccess}
      />

      {/* Attendance Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="flex flex-col gap-4 p-6">
            <h2 className="text-2xl font-bold text-center">Check In</h2>

            {!checkedIn ? (
              <>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select your class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>

                <Button onClick={handleCheckIn} className="w-full">
                  I&apos;m Here ✅
                </Button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold">
                  You&apos;re marked present 🎉
                </p>
                <p className="text-sm text-zinc-300">
                  {name} - {selectedClass}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Arrivals List */}
      {showList && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20">
            <CardContent className="p-4">
              <h2 className="font-bold mb-2">Arrived Students</h2>

              {students.length === 0 ? (
                <p className="text-sm text-zinc-400">No students yet</p>
              ) : (
                <ul className="text-sm space-y-1">
                  {students.map((s, i) => (
                    <li key={i}>
                      {s.name} ({s.class}) - {s.time}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
