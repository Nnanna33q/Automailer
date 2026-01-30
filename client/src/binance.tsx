import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BinanceDepositFieldInput, BinanceWithdrawalFieldInput } from "./components/field-input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"


export default function Binance() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-lg font-bold">Binance</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4 w-full">
          <h2>
            Send Binance Deposit and Withdrawal Confirmed emails
          </h2>
          <Tabs defaultValue="deposit" className="py-4">
            <TabsList variant="line">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit" className="py-4">
              <div>
                <BinanceDepositFieldInput urlEndpoint="binance/deposit" />
              </div>
            </TabsContent>
            <TabsContent value="withdrawal" className="py-4">
              <div>
                <BinanceWithdrawalFieldInput urlEndpoint="binance/withdrawal" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Binance />
  </StrictMode>,
)