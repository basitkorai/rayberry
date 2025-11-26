// /app/page.js
"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import AuthDialog from "../components/AuthDialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggleButton";
import { Send } from 'lucide-react';
import { TypewriterTextarea } from "@/components/TypewriterTeaxtarea";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);


  return (
    <div className="min-h-screen flex flex-col bg-purple-500">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow px-2 py-12">
        <h1 className="text-4xl font-extrabold mb-6 text-slate-900">Build your next app within minutes!</h1>
        <div className="w-full max-w-2xl  rounded-2xl shadow-lg p-2 border-2 bg-white/90">

          <TypewriterTextarea />
          <div className="flex gap-3 justify-end">
            <ThemeToggle />
            <Button
              variant='outline' size="icon" className="rounded-full">
              <Send />
            </Button>
          </div>
        </div>
      </main>

      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
}
