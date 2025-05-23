'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [showContent, setShowContent] = useState(true);

  const handleSignOut = async () => {
    setShowContent(false);
    setTimeout(() => signOut(), 300);
  };

  const handleSignIn = (provider: string) => {
    setShowContent(false);
    setTimeout(() => signIn(provider), 300);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-foreground px-4">
      {/* Fond animé */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none animate-pulse" />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300 mx-auto z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.div
            key={session ? "authenticated" : "unauthenticated"}
            className="relative z-10 text-center space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/20 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              className="text-3xl font-extrabold tracking-tight text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {session ? `Bienvenue, ${session.user?.name} 👋` : "Bienvenue sur Auth App"}
            </motion.h1>

            <p className="text-sm text-gray-300">
              {session
                ? `Connecté avec ${session.user?.email?.includes('@github.com') ? "GitHub" : "Google"}`
                : "Tu n’es pas connecté"}
            </p>

            <div className="space-y-3">
              {session ? (
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow hover:shadow-xl active:scale-95"
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleSignIn("github")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow hover:shadow-xl active:scale-95"
                  >
                    <FaGithub size={18} />
                    Se connecter avec GitHub
                  </button>
                  <button
                    onClick={() => handleSignIn("google")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow hover:shadow-xl active:scale-95"
                  >
                    <FaGoogle size={18} />
                    Se connecter avec Google
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
