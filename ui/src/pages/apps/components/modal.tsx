import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/custom/button'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Families } from "@/data/interfaces";

interface FamilyDetailProps {
    isOpen: boolean;
    onClose: () => void;
    item: Families;
}



export function FamilyDetail({ isOpen, onClose, item }: FamilyDetailProps) {


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogTitle className="sr-only">Family Details</DialogTitle>
                <div className="grid gap-2 ">
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className='flex items-center justify-start'>
                            <Card className='p-4'>
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={250}
                                    height={330}
                                />
                                <div className='flex items-center justify-start gap-2'>
                                    {item.freemium == "free" ? <Badge >Free</Badge>: <Badge variant={"secondary"}>Premium</Badge>}
                                    {item.parametric == true? <Badge variant={"outline"}>Parametric</Badge>:""}
                                    {item.nested_family == true? <Badge variant={"outline"}>Nested Family</Badge>:""}
                                </div>
                            </Card>
                        </div>
                        <div className="flex-row">
                            <Card className='p-4 mb-2'>
                                <h2 className='mb-1 font-semibold text-md md:text-md'>{item.name}</h2>
                                <p className=' text-gray-500 text-md md:text-md'>{item.desc}</p>
                            </Card>
                            <Card className='p-4'>
                                <h2 className='mb-1 font-semibold text-md md:text-md'>Details</h2>
                                <p className=' text-gray-500 text-md md:text-md'>Vendor: {item.vendor.name.charAt(0).toUpperCase()+item.vendor.name.slice(1).toLowerCase()}</p>
                                <p className=' text-gray-500 text-md md:text-md'>Category: {Array.isArray(item.category) && item.category.length > 0 ? item.category[0]?.name?.charAt(0).toUpperCase()+item.category[0]?.name?.slice(1).toLowerCase() : (item.category as any)?.name?.charAt(0).toUpperCase()+(item.category as any)?.name?.slice(1).toLowerCase()}</p>
                            </Card>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <a href={item.rfa} target="_blank" rel="noopener noreferrer">
                        <Button >Download</Button>
                    </a>                
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
