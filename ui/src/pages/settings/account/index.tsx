import { Separator } from '@/components/ui/separator'
import { SubscriptionCard } from './subscription-card'
import { useState } from 'react'

export default function SettingsAccount() {
  // This would typically come from your user's data in a real app
  const [userPlan, setUserPlan] = useState({
    name: "Free",
    status: "Active",
    renewalDate: "N/A",
    features: ["Basic access", "Limited storage", "Community support"]
  });

  // For demonstration - this would typically be a real API call
  const handlePlanChange = (plan: string) => {
    if (plan === "premium") {
      setUserPlan({
        name: "Premium",
        status: "Active",
        renewalDate: "Oct 15, 2024",
        features: ["Advanced access", "Unlimited storage", "Priority support", "Custom integrations", "Advanced analytics"]
      });
    } else {
      setUserPlan({
        name: "Free",
        status: "Active",
        renewalDate: "N/A",
        features: ["Basic access", "Limited storage", "Community support"]
      });
    }
  };

  // Handle unsubscribe action by downgrading to free plan
  const handleUnsubscribe = () => {
    handlePlanChange("free");
  };

  // Handle payment completion and upgrade to premium
  const handlePaymentSuccess = () => {
    // In a real app, this would be called after payment processing
    handlePlanChange("premium");
    return true;
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan
        </p>
      </div>

      <Separator />
      
      <SubscriptionCard 
        planName={userPlan.name}
        status={userPlan.status}
        renewalDate={userPlan.renewalDate}
        features={userPlan.features}
        onUnsubscribe={handleUnsubscribe}
        onPaymentSuccess={handlePaymentSuccess}
      />
      
    </div>
  )
}
