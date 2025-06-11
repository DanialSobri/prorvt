import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/custom/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SubscriptionCardProps {
  planName: string;
  status: string;
  renewalDate: string;
  features: string[];
  onUnsubscribe?: () => void;
  onPaymentSuccess?: () => boolean;
}

export function SubscriptionCard({ planName, status, renewalDate, features, onUnsubscribe, onPaymentSuccess }: SubscriptionCardProps) {
  const isFreeUser = planName.toLowerCase() === "free";
  const isPremiumUser = planName.toLowerCase() === "premium";
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUnsubscribe = () => {
    if (onUnsubscribe) {
      onUnsubscribe();
      toast({
        title: "Subscription cancelled",
        description: "Your account will be downgraded to the Free plan at the end of your billing period.",
      });
    }
  };

  const openPaymentDialog = () => {
    setPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDialogOpen(false);
      
      if (onPaymentSuccess && onPaymentSuccess()) {
        toast({
          title: "Payment successful",
          description: "Your account has been upgraded to Premium. Enjoy your new features!",
        });
      } else {
        toast({
          title: "Payment failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Plan: {planName}</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </div>
          <Badge variant={status.toLowerCase() === "active" ? "default" : "outline"}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Renewal Date:</span> {renewalDate}
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Plan Features:</p>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {isFreeUser && (
            <div className="mt-6 p-4 bg-muted rounded-md border">
              <h4 className="font-medium text-sm mb-1">Upgrade to Premium</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get access to advanced features, priority support, and unlimited storage.
              </p>
              <Button size="sm" onClick={openPaymentDialog}>Upgrade Now</Button>
            </div>
          )}

          {isPremiumUser && (
            <div className="mt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">Unsubscribe</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Unsubscribing will downgrade your account to the Free plan at the end of your current billing period. You'll lose access to premium features.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-destructive hover:bg-destructive/90" 
                      onClick={handleUnsubscribe}
                    >
                      Unsubscribe
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Need help? Contact support</span>
      </CardFooter>
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade to Premium Plan</DialogTitle>
            <DialogDescription>
              Complete payment to upgrade to the Premium plan for $9.99/month.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardName" className="text-right">
                Name
              </Label>
              <Input id="cardName" placeholder="Name on card" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardNumber" className="text-right">
                Card Number
              </Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry
              </Label>
              <Input id="expiry" placeholder="MM/YY" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cvc" className="text-right">
                CVC
              </Label>
              <Input id="cvc" placeholder="123" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Complete Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
