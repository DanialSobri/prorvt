import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock } from 'lucide-react'

export function RecentFamilies() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center border-b pb-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/images/categories/furniture.png' alt='Furniture Icon' />
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1 flex-1'>
          <p className='text-sm font-medium leading-none'>Modern Office Chair</p>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Calendar className="h-3 w-3 mr-1" /> Used on May 28, 2024
          </p>
        </div>
        <div className='ml-auto text-xs text-muted-foreground flex items-center'>
          <Clock className="h-3 w-3 mr-1" /> 2h ago
        </div>
      </div>
      
      <div className='flex items-center border-b pb-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/images/categories/lighting.png' alt='Lighting Icon' />
          <AvatarFallback>LT</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1 flex-1'>
          <p className='text-sm font-medium leading-none'>Pendant Light Fixture</p>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Calendar className="h-3 w-3 mr-1" /> Used on May 27, 2024
          </p>
        </div>
        <div className='ml-auto text-xs text-muted-foreground flex items-center'>
          <Clock className="h-3 w-3 mr-1" /> Yesterday
        </div>
      </div>
      
      <div className='flex items-center border-b pb-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/images/categories/doors.png' alt='Doors Icon' />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1 flex-1'>
          <p className='text-sm font-medium leading-none'>Sliding Glass Door</p>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Calendar className="h-3 w-3 mr-1" /> Used on May 25, 2024
          </p>
        </div>
        <div className='ml-auto text-xs text-muted-foreground flex items-center'>
          <Clock className="h-3 w-3 mr-1" /> 3d ago
        </div>
      </div>
      
      <div className='flex items-center border-b pb-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/images/categories/kitchen.png' alt='Kitchen Icon' />
          <AvatarFallback>KT</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1 flex-1'>
          <p className='text-sm font-medium leading-none'>Kitchen Island Cabinet</p>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Calendar className="h-3 w-3 mr-1" /> Used on May 22, 2024
          </p>
        </div>
        <div className='ml-auto text-xs text-muted-foreground flex items-center'>
          <Clock className="h-3 w-3 mr-1" /> 6d ago
        </div>
      </div>
      
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/images/categories/bathroom.png' alt='Bathroom Icon' />
          <AvatarFallback>BT</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1 flex-1'>
          <p className='text-sm font-medium leading-none'>Wall-mounted Sink</p>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Calendar className="h-3 w-3 mr-1" /> Used on May 20, 2024
          </p>
        </div>
        <div className='ml-auto text-xs text-muted-foreground flex items-center'>
          <Clock className="h-3 w-3 mr-1" /> 8d ago
        </div>
      </div>
    </div>
  )
}

// Keep existing export as alias for backward compatibility
export const RecentSales = RecentFamilies
