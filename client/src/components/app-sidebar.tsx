"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Mail
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BinanceLogo, BybitLogo, OkxLogo } from "./ui/crypto-logos"

// This is sample data.
const data = {
  teams: [
    {
      name: "Automailer",
      logo: Mail,
      plan: "",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Bybit",
      url: "bybit.html",
      icon: BybitLogo,
      isActive: true,
    },
    {
      title: "Binance",
      url: "binance.html",
      icon: BinanceLogo,
    },
    {
      title: "OKX",
      url: "okx.html",
      icon: OkxLogo,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
