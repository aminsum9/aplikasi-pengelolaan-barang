import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({children}: PageLayoutProps) {
  return (
    <div className="flex flex-col flex-1 bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-row items-center justify-between bg-white dark:bg-black sm:items-start">
        <Sidebar />
        <div className="flex flex-1 flex-col" >
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  )
}