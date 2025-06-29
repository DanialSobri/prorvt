import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock } from 'lucide-react'

interface Family {
  name: string
  date: Date
}

interface RecentFamiliesProps {
  families?: Family[]
}

export function RecentFamilies({ families = [] }: RecentFamiliesProps) {
  if (families.length === 0) {
    return (
      <div className='space-y-6'>
        <div className="text-center py-8 text-muted-foreground">
          <Calendar size={48} className="mx-auto mb-2 opacity-50" />
          <p>No recent families used</p>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {families.map((family, index) => (
        <div key={index} className='flex items-center border-b pb-4 last:border-0 last:pb-0'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/images/categories/furniture.png' alt='Furniture Icon' />
            <AvatarFallback>{family.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1 flex-1'>
            <p className='text-sm font-medium leading-none'>{family.name}</p>
            <p className='text-xs text-muted-foreground flex items-center'>
              <Calendar className="h-3 w-3 mr-1" /> Used on {family.date.toLocaleDateString()}
            </p>
          </div>
          <div className='ml-auto text-xs text-muted-foreground flex items-center'>
            <Clock className="h-3 w-3 mr-1" /> {getTimeAgo(family.date)}
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper function to get time ago
function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `${diffInDays}d ago`
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`
  } else {
    return 'Just now'
  }
}

// Keep existing export as alias for backward compatibility
export const RecentSales = RecentFamilies
