import { Separator } from '@/components/ui/separator'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          Update your profile settings.
        </p>
      </div>
      <Separator className='my-4' />
      <ProfileForm />
    </div>
  )
}
