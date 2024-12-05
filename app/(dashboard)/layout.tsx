import BreadcrumbHeader from "@/components/breadcrumb-header";
import { AppProvider } from "@/components/providers/app-providers";
import DesktopSidebar from "@/components/sidebar";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="gap-2 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 px-6 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
