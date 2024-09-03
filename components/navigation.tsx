// 'use client';
// import type { Session } from '@supabase/auth-helpers-nextjs';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import ModalCore from './modalCore';
// import { ModalType } from './modal/modalType';

// const Navigation = ({ session }: { session: Session | null }) => {
//   const pathname = usePathname();
//   const router = useRouter();
//   if (session === null && pathname?.includes('/profile')) {
//     router.push('/');
//   }
//   return (
//     <header>
//       <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
//         <nav className="hidden md:flex space-x-4">
//           <div>
//             <Link className="text-gray-600 hover:text-blue-600" href="/">
//               Home
//             </Link>
//           </div>
//           {session ? (
//             <div>
//               <Link
//                 className="text-gray-600 hover:text-blue-600"
//                 href="/profile"
//               >
//                 Profile
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <ModalCore modalType={ModalType.SignIn}></ModalCore>
//               </div>
//               <div>
//                 <ModalCore modalType={ModalType.SignUp}></ModalCore>
//               </div>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Navigation



'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, Settings, LogOut } from 'lucide-react';
import ModalCore from './modalCore';
import { ModalType } from './modal/modalType';
import type { Session } from '@supabase/auth-helpers-nextjs';

const Navigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(!!session);

  useEffect(() => {
    if (!isLoggedIn && pathname?.includes('/profile')) {
      router.push('/');
    }
  }, [isLoggedIn, pathname, router]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // ここで実際のログアウト処理を実装します
  };
 

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 左側のロゴとホームアイコン */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="text-lg font-bold">MyApp</span>
          </Link>
        </div>
  
        {/* 真ん中のナビゲーション */}
        <nav className="hidden md:flex space-x-4 justify-center flex-grow">
          <Link href="/" className="text-muted-foreground hover:text-foreground">ホーム</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground">概要</Link>
          <Link href="/services" className="text-muted-foreground hover:text-foreground">サービス</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground">お問い合わせ</Link>
        </nav>
  
        {/* 右側のログイン/サインアップまたはドロップダウンメニュー */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="ユーザー名" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>設定</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <ModalCore modalType={ModalType.SignIn}>
                <Button onClick={handleLogin} className="mr-4">ログイン</Button>
              </ModalCore>
              <ModalCore modalType={ModalType.SignUp}>
                <Button>サインアップ</Button>
              </ModalCore>
            </>
          )}
        </div>
      </div>
    </header>
  );
  
  
};

export default Navigation;
