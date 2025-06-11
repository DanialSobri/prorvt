import { z } from 'zod'
// import { Link } from 'react-router-dom'
// import { useFieldArray, useForm } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import PocketBase from 'pocketbase'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please provide an email address.',
    })
    .email('Please enter a valid email address.'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.

export default function ProfileForm() {

  const pb = new PocketBase('https://brezelbits.xyz');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  console.log(pb.authStore.record);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: pb.authStore.record?.name || '',
      email: pb.authStore.record?.email || '',
    },
    mode: 'onChange',
  })


  function onSubmit(data: ProfileFormValues) {
    const emailChanged = data.email !== pb.authStore.record?.email;
    
    if (emailChanged) {
      // Send verification email before updating
      setEmailVerificationSent(true);
      
      // Example verification email logic
      // pb.collection('users').requestEmailChange(data.email)
      
      toast({
        title: 'Email verification required',
        description: 'A verification link has been sent to your new email address. Please verify to complete the change.',
      });
    } else {
      // Just update the name
      // pb.collection('users').update(pb.authStore.record.id, { name: data.name })
      //   .then(() => {
      //     toast({
      //       title: 'Profile updated',
      //       description: 'Your profile has been successfully updated.',
      //     });
      //   });
      
      toast({
        title: 'Profile updated',
        description: 'Your name has been successfully updated.',
      });
    }
  }

  function handleDeleteAccount() {
    setIsDeleting(true);
    // Add your delete account logic here
    // pb.collection('users').delete(pb.authStore.record.id)
    //   .then(() => {
    //     toast({
    //       title: 'Account deleted',
    //       description: 'Your account has been successfully deleted.',
    //     });
    //     // Redirect or logout logic here
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting account:', error);
    //     toast({
    //       title: 'Error',
    //       description: 'There was an error deleting your account. Please try again.',
    //       variant: 'destructive',
    //     });
    //   })
    //   .finally(() => {
    //     setIsDeleting(false);
    //   });
    
    // For now, just show a toast
    toast({
      title: 'Disable account',
      description: 'Account disabled. All service will be suspended. Reactivate account to use again.',
      variant: 'destructive',
    });
    setIsDeleting(false);
    setIsDialogOpen(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Username</h4>
              <p className="text-sm text-muted-foreground mt-1">{pb.authStore.record?.username}</p>
              <p className="text-xs text-muted-foreground mt-2">Usernames cannot be changed to maintain account uniqueness.</p>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  Your full name will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address" {...field} />
                </FormControl>
                <FormDescription>
                  Changing your email will require verification of the new address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {emailVerificationSent && (
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-md text-sm">
              A verification email has been sent. Please check your inbox to confirm your new email address.
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Button type='submit' className="w-full sm:w-auto">Update profile</Button>
            
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  type='button' 
                  variant='destructive' 
                  className="w-full sm:w-auto"
                >
                  Disable Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Disable Account'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </>
  )
}
