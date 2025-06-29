import React, { useState } from "react"
import {
  Edit,
  Save,
  Plus,
  X,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Predefined categories for suggestions
const PREDEFINED_CATEGORIES = [
  "FURNITURE",
  "CHAIRS",
  "TABLES",
  "STORAGE",
  "CABINETS",
  "DRAWERS",
  "SHELVING",
  "OFFICE",
  "CONFERENCE",
  "WORKSTATIONS",
  "SEATING",
  "DESKS",
  "LIGHTING",
  "DECORATIVE",
  "OUTDOOR",
]

interface BulkActionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItems: Set<string>
  items: any[]
  onBulkAction: (actionType: string, value: any) => void
}

export function BulkActionsDialog({ 
  open, 
  onOpenChange, 
  selectedItems, 
  items, 
  onBulkAction 
}: BulkActionsDialogProps) {
  const [bulkActionType, setBulkActionType] = useState<"freemium" | "parametric" | "categories">("freemium")
  const [bulkActionValue, setBulkActionValue] = useState<string>("")
  const [bulkActionCategories, setBulkActionCategories] = useState<string[]>([])
  const [newBulkActionCategory, setNewBulkActionCategory] = useState("")

  const handleApply = () => {
    let value: any;
    
    switch (bulkActionType) {
      case "freemium":
        value = bulkActionValue;
        break;
      case "parametric":
        value = bulkActionValue === "true";
        break;
      case "categories":
        value = bulkActionCategories;
        break;
    }
    
    onBulkAction(bulkActionType, value);
    onOpenChange(false);
    
    // Reset state
    setBulkActionValue("");
    setBulkActionCategories([]);
    setNewBulkActionCategory("");
  }

  const handleClose = () => {
    onOpenChange(false);
    // Reset state
    setBulkActionValue("");
    setBulkActionCategories([]);
    setNewBulkActionCategory("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Bulk Actions - {selectedItems.size} Items Selected
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Action Type Selection */}
          <div>
            <Label>Action Type</Label>
            <Select value={bulkActionType} onValueChange={(value: "freemium" | "parametric" | "categories") => setBulkActionType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freemium">Change Freemium Status</SelectItem>
                <SelectItem value="parametric">Toggle Parametric</SelectItem>
                <SelectItem value="categories">Add Categories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Freemium Action */}
          {bulkActionType === "freemium" && (
            <div>
              <Label>Set Freemium Status</Label>
              <Select value={bulkActionValue} onValueChange={setBulkActionValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select freemium status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Parametric Action */}
          {bulkActionType === "parametric" && (
            <div>
              <Label>Set Parametric Status</Label>
              <Select value={bulkActionValue} onValueChange={setBulkActionValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parametric status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Enable Parametric</SelectItem>
                  <SelectItem value="false">Disable Parametric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Categories Action */}
          {bulkActionType === "categories" && (
            <div className="space-y-4">
              <div>
                <Label>Add Categories</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  These categories will be added to all {selectedItems.size} selected items
                </p>
                
                {/* Selected Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {bulkActionCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="gap-2">
                      {category}
                      <button
                        onClick={() => {
                          setBulkActionCategories(prev => prev.filter(cat => cat !== category));
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                {/* Add Category Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add category"
                    value={newBulkActionCategory}
                    onChange={(e) => setNewBulkActionCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newBulkActionCategory.trim()) {
                        setBulkActionCategories(prev => [...prev, newBulkActionCategory.trim().toUpperCase()]);
                        setNewBulkActionCategory("");
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (newBulkActionCategory.trim()) {
                        setBulkActionCategories(prev => [...prev, newBulkActionCategory.trim().toUpperCase()]);
                        setNewBulkActionCategory("");
                      }
                    }}
                    disabled={!newBulkActionCategory.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {/* Predefined Categories */}
              <div>
                <Label>Quick Add Categories</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PREDEFINED_CATEGORIES.filter(cat => !bulkActionCategories.includes(cat)).map((category) => (
                    <Button
                      key={category}
                      size="sm"
                      variant="outline"
                      onClick={() => setBulkActionCategories(prev => [...prev, category])}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preview Selected Items */}
          <div>
            <Label>Selected Items Preview</Label>
            <div className="max-h-40 overflow-y-auto space-y-2 mt-2">
              {items
                .filter(item => selectedItems.has(item.id))
                .slice(0, 5) // Show only first 5 items
                .map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.thumbnail ? `https://brezelbits.xyz/api/files/${item.collectionId}/${item.id}/${item.thumbnail}` : "/placeholder.svg"} alt={item.name} />
                      <AvatarFallback>{item.name?.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.freemium} • {item.parametric ? "Parametric" : "Non-parametric"} • {(item.expand?.category || []).length} categories
                      </p>
                    </div>
                  </div>
                ))}
              {selectedItems.size > 5 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  ... and {selectedItems.size - 5} more items
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={
              (bulkActionType === "freemium" && !bulkActionValue) ||
              (bulkActionType === "parametric" && !bulkActionValue) ||
              (bulkActionType === "categories" && bulkActionCategories.length === 0)
            }
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Apply to {selectedItems.size} Items
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 