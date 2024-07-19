import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

export default function FamilyDetails() {
    return (
        <Layout fadedBelow fixedHeight>
            {/* ===== Top Heading ===== */}
            <LayoutHeader>
                <div className='flex w-full items-center justify-end'>
                    <div className='flex items-center space-x-4'>
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </div>
            </LayoutHeader>

            {/* ===== Content ===== */}
            <LayoutBody className='flex flex-col' fixedHeight>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight'>
                        Discover
                    </h1>
                    <p className='text-muted-foreground'>
                        Parametric families for revit!
                    </p>
                </div>
                <div>
                    <h1>Item</h1>
                    {/* Your item component code here */}
                </div>
            </LayoutBody>
        </Layout>
    );
}

