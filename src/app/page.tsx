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
    setShowContent(false); // Lancer la sortie animée
    setTimeout(() => signOut(), 300); // SignOut après animation
  };

  const handleSignIn = (provider: string) => {
    setShowContent(false); // Lancer la sortie animée
    setTimeout(() => signIn(provider), 300); // SignIn après animation
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.div
            key={session ? "authenticated" : "unauthenticated"}
            className="text-center space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {session ? (
              <>
                <h1 className="text-2xl font-bold">Bienvenue, {session.user?.name} 👋</h1>
                <p className="text-sm text-gray-500">
                  Connecté avec {session.user?.email?.includes('@github.com') ? "GitHub" : "Google"}
                </p>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow hover:shadow-lg active:scale-95"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Bienvenue sur Auth App</h1>
                <p className="text-sm text-gray-500">Tu n’es pas connecté</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSignIn("github")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 shadow hover:shadow-lg active:scale-95"
                  >
                    <FaGithub size={18} />
                    Se connecter avec GitHub
                  </button>
                  <button
                    onClick={() => handleSignIn("google")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow hover:shadow-lg active:scale-95"
                  >
                    <FaGoogle size={18} />
                    Se connecter avec Google
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
