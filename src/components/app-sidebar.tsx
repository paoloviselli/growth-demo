import * as React from 'react';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Tag,
  FileText,
  Users,
  Calendar,
  MessageCircle,
  Settings,
  Building2,
  User2,
  CreditCard,
  PlugZap,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SpaceSwitcher } from '@/components/space-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Separator } from './ui/separator';

// This is sample data.
const data = {
  user: {
    name: 'Paolo',
    email: 'viselli.paolo@outlook.com',
    avatar: 'https://github.com/shadcn.png',
  },
  teams: [
    {
      name: "Paolo's Space",
      logo: GalleryVerticalEnd,
      plan: 'PRO',
    },
    {
      name: "Mario's Space",
      logo: AudioWaveform,
      plan: 'PRO',
    },
    {
      name: "Giovanni's Space",
      logo: Command,
      plan: 'PRO',
    },
  ],
  navMain: [
    {
      title: 'Categorization',
      url: '/',
      icon: Tag,
      items: [{ title: 'Settings', url: '/' }],
    },
    {
      title: 'Drafts',
      url: '/',
      icon: FileText,
      items: [{ title: 'Settings', url: '/' }],
    },
    {
      title: 'Meetings',
      url: '/',
      icon: Users,
      items: [
        { title: 'Recordings', url: '/' },
        { title: 'Upcoming', url: '/' },
        { title: 'Meeting Prep', url: '/meeting-prep' },
        { title: 'Settings', url: '/' },
      ],
    },
    {
      title: 'Scheduling',
      url: '/',
      icon: Calendar,
      items: [{ title: 'Settings', url: '/' }],
    },
    {
      title: 'Chat',
      url: '/',
      icon: MessageCircle,
      badge: 'Beta',
      items: [{ title: 'Settings', url: '/' }],
    },
    {
      title: 'Settings',
      url: '/',
      icon: Settings,
      items: [
        { title: 'Organization', url: '/', icon: Building2 },
        { title: 'Team', url: '/', icon: User2 },
        { title: 'Billing', url: '/', icon: CreditCard },
        { title: 'Integrations', url: '/', icon: PlugZap },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSwitcher />
        <Separator />
        <SpaceSwitcher teams={data.teams} />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function LogoSwitcher() {
  const { state } = useSidebar();
  return (
    <div
      className={`flex items-center ${state === 'collapsed' ? 'p-0' : 'px-2 py-4'}`}
    >
      <img
        src={state === 'collapsed' ? '/fyxer-logo-sm.png' : '/fyxer-logo.png'}
        alt="Fyxer Logo"
        className={state === 'collapsed' ? 'h-8' : 'h-6 w-auto'}
      />
    </div>
  );
}
