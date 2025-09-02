'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ListChecks,
  LogOut,
  PlusCircle,
  Locate,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LogoIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

const baseMenuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/report', label: 'Report Pothole', icon: PlusCircle },
  { href: '/reports', label: 'My Reports', icon: ListChecks },
];

const operatorMenuItem = { href: '/rover-tracking', label: 'Rover Tracking', icon: Locate };


export function AppSidebar() {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  const menuItems = role === 'operator' ? [...baseMenuItems, operatorMenuItem] : baseMenuItems;

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="group-data-[variant=sidebar]:border-r-0"
    >
      <SidebarHeader className="h-14 items-center justify-center p-2 group-data-[collapsible=icon]:h-16 sm:justify-start">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LogoIcon className="h-6 w-6 text-primary" />
          <span className="truncate group-data-[collapsible=icon]:hidden">
            CRW
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={{ children: item.label }}
                  className={cn(
                    'justify-start',
                    !isActive && 'text-sidebar-foreground/80'
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="justify-start text-sidebar-foreground/80"
              tooltip={{ children: 'Logout' }}
            >
                <LogOut className="h-5 w-5" />
                <span className="truncate">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
