// "use client";
// import { Bell } from "lucide-react";
// import { motion } from "framer-motion";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import { SidebarTrigger } from "@/components/ui/sidebar";
// import { ThemeToggle } from "@/components/theme-toggle";

// interface HeaderProps {
//   onLogout: () => void;
//   title?: string;
//   user?: {
//     name: string;
//     email: string;
//     avatar?: string;
//   };
// }

// export default function Header({
//   onLogout,
//   title = "Dashboard",
//   user = { name: "John Doe", email: "john@example.com" },
// }: HeaderProps) {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex items-center gap-2">
//         {/* {title === "Dashboard" ? <SidebarTrigger /> : <></>} */}
//         <motion.h1
//           className="text-xl font-semibold"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {title}
//         </motion.h1>
//       </div>

//       <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:px-6">
//         <div className="relative w-full bg-background pl-8 md:w-[500px] lg:w-[600px]">
//           {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
//           /> */}
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <ThemeToggle />

//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive"></span>
//           </Button>
//         </motion.div>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="cursor-pointer"
//             >
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback>
//                   {user.name.charAt(0)}
//                   {user.name.split(" ")[1]?.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>
//             </motion.div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>
//               <div className="flex flex-col space-y-1">
//                 <p className="text-sm font-medium leading-none">{user.name}</p>
//                 <p className="text-xs leading-none text-muted-foreground">
//                   {user.email}
//                 </p>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               className="text-destructive focus:text-destructive"
//               onClick={onLogout}
//             >
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  onLogout: () => void;
  title?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({
  onLogout,
  title = "Dashboard",
  user = { name: "John Doe", email: "john@example.com" },
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <motion.h1
          className="text-xl font-semibold text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Avatar className="h-8 w-8 border border-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.name.charAt(0)}
                  {user.name.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={onLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
