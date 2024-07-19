import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/custom/button'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FamilyDetailProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export function FamilyDetail({ isOpen, onClose, item }: FamilyDetailProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <div className="grid gap-2 ">
                    <div className="grid grid-cols-2 items-center gap-2">
                        <div className='flex items-center justify-start'>
                            <Card className='p-4'>
                                <img
                                    src={item.cover}
                                    alt={item.name}
                                    width={250}
                                    height={330}
                                />
                                <div className='flex items-center justify-start gap-2'>
                                    {item.freemium == "free" ? <Badge >Free</Badge>: <Badge variant={"secondary"}>Premium</Badge>}
                                    <Badge variant={"outline"}>Parametric</Badge>
                                    <Badge variant={"outline"}>Nested Family</Badge>
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
                                <p className=' text-gray-500 text-md md:text-md'>Dimension: 100x50</p>
                                <p className=' text-gray-500 text-md md:text-md'>Weight: 50kg</p>
                                <p className=' text-gray-500 text-md md:text-md'>Category: Skibidi Toilet</p>
                            </Card>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Download</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
