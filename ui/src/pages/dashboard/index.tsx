import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { RecentFamilies } from './components/recent-sales'
import { Overview } from './components/overview'
import { Download, Settings, Calendar, Star, Clock, FileDown, Search, MonitorCheck, Users, Cloud } from 'lucide-react'

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='space-y-6'>
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">
                  Hello Danial 👋
                </h1>
                <p className="text-muted-foreground">
                  You have <span className="font-medium text-foreground">3 new updates</span> and <span className="font-medium text-foreground">5 tasks</span> for today
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <Button variant="outline" className="gap-2">
                  <Search size={16} /> Browse Families
                </Button>
                <Button className="gap-2">
                  <FileDown size={16} /> Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Overview */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <div>
                <CardTitle className='text-sm font-medium'>
                  Monthly Subscription
                </CardTitle>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mt-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                  Premium
                </div>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>RM29.99</div>
              <p className='text-xs text-muted-foreground'>
                Next billing on June 15, 2024
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Downloads (30 Days)
              </CardTitle>
              <Download size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>47</div>
              <p className='text-xs text-muted-foreground'>
                +12 from previous month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Storage Used
              </CardTitle>
              <Cloud size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>1.7 GB</div>
              <p className='text-xs text-muted-foreground'>
                28% of your total storage
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Devices
              </CardTitle>
              <MonitorCheck size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>1</div>
              <p className='text-xs text-muted-foreground'>
                Only 1 device allowed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Download Activity and Recently Used Families */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-7'>
          <Card className='col-span-1 lg:col-span-4'>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Download Activity</CardTitle>
                  <CardDescription>Your weekly download activity over the past 2 months</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Calendar size={14} /> Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className='pl-2'>
              <Overview />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground pt-0">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" /> Last updated: Today at 9:30 AM
              </div>
            </CardFooter>
          </Card>
          <Card className='col-span-1 lg:col-span-3'>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Used Families</CardTitle>
                  <CardDescription>
                    Your most recently used Revit families
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <Star size={14} className="mr-1" /> Favorites
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecentFamilies />
            </CardContent>
          </Card>
        </div>
        
        {/* Installed Devices and Subscription Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card className='col-span-1'>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Installed Devices</CardTitle>
                  <CardDescription>
                    Devices where the plugin is currently installed
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <Settings size={14} className="mr-1" /> Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { device: "Work Laptop", os: "Windows 11", lastActive: "Today, 11:32 AM", status: "Active" },
                  { device: "Home Desktop", os: "Windows 10", lastActive: "2 days ago", status: "Active" },
                  { device: "Office Workstation", os: "Windows 11", lastActive: "1 week ago", status: "Idle" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className={`rounded-md p-2 mt-0.5 ${
                      item.status === 'Active' 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-muted'
                    }`}>
                      {item.status === 'Active' ? (
                        <div className="relative">
                          <Users size={16} />
                          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900"></span>
                        </div>
                      ) : (
                        <Users size={16} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{item.device}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.os}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>Last active: {item.lastActive}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">3 of 5</span> allowed devices in use
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>
                  Your Premium plan details and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Plan</span>
                    <span className='font-medium'>Premium Tier</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Billing Cycle</span>
                    <span className='font-medium'>Monthly</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Next Payment</span>
                    <span className='font-medium'>June 15, 2024</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Payment Method</span>
                    <span className='font-medium'>•••• 4242</span>
                  </div>
                  <div className='pt-4'>
                    <Button variant="outline" size="sm">Manage Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
{/*             
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <AlertCircle size={18} className="text-amber-600 dark:text-amber-500 mr-2" />
                  <CardTitle className="text-amber-800 dark:text-amber-500 text-sm">Upgrade Available</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-800 dark:text-amber-500 mb-4">
                  A new plugin version (2.4.0) is available with improved performance and new features.
                </p>
                <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                  <RefreshCcw size={14} className="mr-2" /> Update Now
                </Button>
              </CardContent>
            </Card> */}
            
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Clock size={18} className="text-green-600 dark:text-green-500 mr-2" />
                  <CardTitle className="text-green-800 dark:text-green-500 text-sm">Plugin Updated</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-800 dark:text-green-500 mb-4">
                  A new plugin version (3.1.2) was released on June 12, 2024 with new families and improved load time.
                </p>
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Download size={14} className="mr-2" /> Download
                  </Button>
                  <Button size="sm" variant="ghost" className="border border-green-200 dark:border-green-800 text-green-800 dark:text-green-500">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  )
}
