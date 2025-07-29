// 'use client';

// import './globals.css';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { CartProvider } from '@/lib/CartContext';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabaseClient';
// import type { Session, User } from '@supabase/supabase-js';

// // Create AuthContext
// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
// }
// const AuthContext = createContext<AuthContextType>({ user: null, session: null });

// // Custom hook to access auth context
// export const useAuth = () => useContext(AuthContext);

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     // Initial session check
//     const checkSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setSession(session);
//       setUser(session?.user ?? null);
//     };
//     checkSession();

//     // Listen for auth state changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log('Auth state changed:', event, session);
//       setSession(session);
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <html lang="en">
//       <body>
//         <AuthContext.Provider value={{ user, session }}>
//           <Header />
//           <CartProvider>{children}</CartProvider>
//           <Footer />
//         </AuthContext.Provider>
//       </body>
//     </html>
//   );
// }




// 'use client';

// import './globals.css';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { CartProvider } from '@/lib/CartContext';
// import { AuthProvider } from '@/lib/auth';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-[#d7cdbc]">
//         <AuthProvider>
//           <CartProvider>
//             <Header />
//             {children}
//             <Footer />
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shedooby - Support for Shedooby iOS App',
  description: 'Official support and marketing site for the Shedooby iOS app, featuring blog posts, merch, and app tips.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#d7cdbc]">
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}