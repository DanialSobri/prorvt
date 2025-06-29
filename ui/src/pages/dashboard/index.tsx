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
import { Download, Settings, Calendar, Star, Clock, FileDown, Search, MonitorCheck, Users, Cloud, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

interface DashboardData {
  active_device_list: string
  collectionId: string
  collectionName: string
  email: string
  id: string
  notification: string
  plan: string
  plugin_installed_date: string
  plugin_update_notes: string
  plugin_updated_date: string
  plugin_version: string
  recent_use_families: string
  total_active_devices: number
  total_devices: number
  total_downloads: number
  total_utilize: number
  user_created: string
  user_name: string
  user_type: string
  user_updated: string
  username: string
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No authentication token found')
          setLoading(false)
          return
        }

        const response = await fetch('https://brezelbits.xyz/api/collections/view_dashboard/records/zzuavvvw73p30yi', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Parse recent families data
  const parseRecentFamilies = (familiesString: string) => {
    if (!familiesString) return []
    
    const families = familiesString.split(',').map(family => {
      const match = family.match(/(.*?)\s*\(([^)]+)\)/)
      if (match) {
        return {
          name: match[1].trim(),
          date: new Date(match[2].trim())
        }
      }
      return { name: family.trim(), date: new Date() }
    })
    
    // Sort by date in descending order (latest first) and limit to 5 most recent
    return families
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
  }

  // Parse active devices data
  const parseActiveDevices = (devicesString: string) => {
    if (!devicesString) return []
    
    // Handle the specific format: "088E90EE3171 (Login: 2025-06-08 04:26:51.714Z, Logout: 2025-06-15 02:18:53.897Z)"
    const deviceMatch = devicesString.match(/^([A-F0-9]+)\s*\(Login:\s*([^,]+),\s*Logout:\s*([^)]+)\)$/)
    
    if (deviceMatch) {
      const deviceId = deviceMatch[1]
      const loginTime = new Date(deviceMatch[2])
      const logoutTime = new Date(deviceMatch[3])
      
      // Format device ID as MAC address (add colons every 2 characters)
      const formattedDeviceId = deviceId.match(/.{1,2}/g)?.join(':').toUpperCase() || deviceId
      
      // Determine if device is active based on logout time
      const isActive = logoutTime > new Date()
      
      return [{
        device: formattedDeviceId,
        os: "Windows", // Default OS since not provided in API
        lastActive: loginTime.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: isActive ? 'Active' : 'Idle',
        loginTime: loginTime,
        logoutTime: logoutTime
      }]
    }
    
    // Fallback for other formats
    return []
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Get plan display name
  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'freemium':
        return 'Freemium'
      case 'premium':
        return 'Premium'
      default:
        return plan.charAt(0).toUpperCase() + plan.slice(1)
    }
  }

  // Get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'freemium':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
      case 'premium':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    }
  }

  // Handle plugin download
  const handleDownloadPlugin = () => {
    // Fetch the latest plugin info from the API
    fetch('https://brezelbits.xyz/api/collections/plugin/records?sort=created')
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const latestPlugin = data.items[0];
          const downloadUrl = `https://brezelbits.xyz/api/files/${latestPlugin.collectionId}/${latestPlugin.id}/${latestPlugin.installer}`;
          
          // Trigger download with the dynamically generated URL
          window.location.href = downloadUrl;
          
          // Show success toast
          toast({
            title: "Download Started",
            description: "Plugin download has begun. Check your downloads folder.",
            variant: "default"
          });
        } else {
          // Show error toast if no plugin data is available
          toast({
            title: "Download error",
            description: "Plugin installer information not found. Please try again later.",
            variant: "destructive"
          });
        }
      })
      .catch(error => {
        console.error('Error fetching plugin info:', error);
        toast({
          title: "Download failed",
          description: "Could not retrieve the plugin installer. Please try again later.",
          variant: "destructive"
        });
      });
  };

  if (loading) {
    return (
      <Layout>
        <LayoutHeader>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody className='space-y-6'>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </LayoutBody>
      </Layout>
    )
  }

  if (error || !dashboardData) {
    return (
      <Layout>
        <LayoutHeader>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody className='space-y-6'>
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle size={18} className="text-red-600 dark:text-red-500 mr-2" />
                <div>
                  <h3 className="text-red-800 dark:text-red-500 font-medium">Error Loading Dashboard</h3>
                  <p className="text-sm text-red-700 dark:text-red-400">{error || 'Failed to load dashboard data'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </LayoutBody>
      </Layout>
    )
  }

  const recentFamilies = parseRecentFamilies(dashboardData.recent_use_families)
  const activeDevices = parseActiveDevices(dashboardData.active_device_list)

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
                  Hello {dashboardData.user_name} 👋
                </h1>
                <p className="text-muted-foreground">
                  You have <span className="font-medium text-foreground">{dashboardData.total_downloads} downloads</span> and <span className="font-medium text-foreground">{dashboardData.total_utilize} families utilized</span> so far
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/apps'}>
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
                  Subscription Plan
                </CardTitle>
                <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mt-1 ${getPlanBadgeColor(dashboardData.plan)}`}>
                  {getPlanDisplayName(dashboardData.plan)}
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
              <div className='text-2xl font-bold'>{dashboardData.plan === 'freemium' ? 'Free' : 'Premium'}</div>
              <p className='text-xs text-muted-foreground'>
                Member since {formatDate(dashboardData.user_created)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Downloads
              </CardTitle>
              <Download size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.total_downloads}</div>
              <p className='text-xs text-muted-foreground'>
                {dashboardData.total_utilize} families utilized
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Plugin Version
              </CardTitle>
              <Cloud size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.plugin_version}</div>
              <p className='text-xs text-muted-foreground'>
                Updated {formatDate(dashboardData.plugin_updated_date)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Devices
              </CardTitle>
              <MonitorCheck size={16} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{dashboardData.total_active_devices}</div>
              <p className='text-xs text-muted-foreground'>
                of {dashboardData.total_devices} total devices
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
                  <CardDescription>Your download activity over time</CardDescription>
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
                <Clock size={16} className="mr-1" /> Last updated: {formatDate(dashboardData.user_updated)}
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
              <RecentFamilies families={recentFamilies} />
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
                {activeDevices.length > 0 ? (
                  activeDevices.map((item, i) => (
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
                          <p className="text-sm font-medium font-mono">{item.device}</p>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            item.status === 'Active'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.os}</p>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span>Login: {item.loginTime?.toLocaleString() || item.lastActive}</span>
                          {item.logoutTime && (
                            <span>Logout: {item.logoutTime.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No devices found</p>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{dashboardData.total_active_devices} of {dashboardData.total_devices}</span> allowed devices in use
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className='col-span-1'>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Your account information and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Username</span>
                    <span className='font-medium'>{dashboardData.username}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Email</span>
                    <span className='font-medium'>{dashboardData.email}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>User Type</span>
                    <span className='font-medium capitalize'>{dashboardData.user_type}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm'>Member Since</span>
                    <span className='font-medium'>{formatDate(dashboardData.user_created)}</span>
                  </div>
                  <div className='pt-4'>
                    <Button variant="outline" size="sm">Manage Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Clock size={18} className="text-green-600 dark:text-green-500 mr-2" />
                  <CardTitle className="text-green-800 dark:text-green-500 text-sm">Plugin Updated</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-800 dark:text-green-500 mb-4">
                  Plugin version {dashboardData.plugin_version} was updated on {formatDate(dashboardData.plugin_updated_date)}.
                  {dashboardData.plugin_update_notes && (
                    <span dangerouslySetInnerHTML={{ __html: dashboardData.plugin_update_notes }} />
                  )}
                </p>
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleDownloadPlugin}>
                    <Download size={14} className="mr-2" /> Download
                  </Button>
                  <Button size="sm" variant="ghost" className="border border-green-200 dark:border-green-800 text-green-800 dark:text-green-500" onClick={() => navigate('/plugins')}>
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
