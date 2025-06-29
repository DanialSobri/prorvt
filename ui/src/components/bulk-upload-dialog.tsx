import React, { useState } from "react"
import {
  File,
  Upload,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
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

const DEFAULT_BULK_VALUES = {
  parametric: true,
  freemium: "free" as "free" | "premium",
  nested_family: true,
}

interface BulkUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BulkUploadDialog({ open, onOpenChange }: BulkUploadDialogProps) {
  const [bulkUploadStep, setBulkUploadStep] = useState(1)
  const [rfaFiles, setRfaFiles] = useState<File[]>([])
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([])
  const [matchedItems, setMatchedItems] = useState<any[]>([])
  const [selectedBulkItems, setSelectedBulkItems] = useState<Set<string>>(new Set())
  const [bulkCategories, setBulkCategories] = useState<string[]>([])
  const [newBulkCategory, setNewBulkCategory] = useState("")
  const [bulkDefaultValues, setBulkDefaultValues] = useState(DEFAULT_BULK_VALUES)

  // Function to match thumbnails to RFA files by filename
  function matchThumbnailsToRfa(rfaFiles: File[], thumbnailFiles: File[]) {
    return rfaFiles.map(rfa => {
      const rfaName = rfa.name.replace(/\.rfa$/i, "");
      
      // Extract base name by removing the suffix after the last underscore
      const rfaBaseName = rfaName.includes('_') ? rfaName.substring(0, rfaName.lastIndexOf('_')) : rfaName;
      
      const thumbnail = thumbnailFiles.find(img => {
        const imgName = img.name.replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
        
        // Extract base name for thumbnail as well
        const imgBaseName = imgName.includes('_') ? imgName.substring(0, imgName.lastIndexOf('_')) : imgName;
        
        return imgBaseName.toLowerCase() === rfaBaseName.toLowerCase();
      });
      
      return {
        rfa,
        thumbnail,
        matched: !!thumbnail,
        name: rfaName,
        id: rfa.name + (thumbnail ? thumbnail.name : ""),
        SKU: "",
        desc: "",
        freemium: bulkDefaultValues.freemium,
        parametric: bulkDefaultValues.parametric,
        nested_family: bulkDefaultValues.nested_family,
        categories: [],
        newCategory: ""
      };
    });
  }

  const handleClose = () => {
    onOpenChange(false);
    // Reset all state
    setBulkUploadStep(1);
    setRfaFiles([]);
    setThumbnailFiles([]);
    setMatchedItems([]);
    setSelectedBulkItems(new Set());
    setBulkCategories([]);
    setNewBulkCategory("");
    setBulkDefaultValues(DEFAULT_BULK_VALUES);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Upload Families</DialogTitle>
        </DialogHeader>
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-6 px-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= bulkUploadStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              <div className="ml-2 text-sm">
                {step === 1 && "Upload RFA Files"}
                {step === 2 && "Upload Thumbnails"}
                {step === 3 && "Review & Edit"}
                {step === 4 && "Add Categories"}
              </div>
              {step < 4 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-4" />}
            </div>
          ))}
        </div>
        <Separator className="mb-6" />

        {/* Step 1: Upload RFA Files */}
        {bulkUploadStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Step 1: Upload RFA Files</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop your Revit family (.rfa) files here, or click to browse
              </p>
            </div>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onDrop={e => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(f => f.name.toLowerCase().endsWith('.rfa'));
                setRfaFiles(files);
              }}
              onDragOver={e => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = '.rfa';
                input.onchange = e => {
                  const files = Array.from((e.target as HTMLInputElement).files || []).filter(f => f.name.toLowerCase().endsWith('.rfa'));
                  setRfaFiles(files);
                };
                input.click();
              }}
            >
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop RFA files here</p>
              <p className="text-muted-foreground">or click to browse</p>
            </div>
            {rfaFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Files ({rfaFiles.length})</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {rfaFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={() => setBulkUploadStep(2)} disabled={rfaFiles.length === 0} className="gap-2">
                Next: Upload Thumbnails
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Upload Thumbnails */}
        {bulkUploadStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Step 2: Upload Thumbnails</h3>
              <p className="text-muted-foreground mb-6">
                Upload thumbnail images with matching names to your RFA files
              </p>
            </div>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onDrop={e => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                setThumbnailFiles(files);
                setMatchedItems(matchThumbnailsToRfa(rfaFiles, files));
              }}
              onDragOver={e => e.preventDefault()}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*';
                input.onchange = e => {
                  const files = Array.from((e.target as HTMLInputElement).files || []).filter(f => f.type.startsWith('image/'));
                  setThumbnailFiles(files);
                  setMatchedItems(matchThumbnailsToRfa(rfaFiles, files));
                };
                input.click();
              }}
            >
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop thumbnail images here</p>
              <p className="text-muted-foreground">Images should have the same name as RFA files</p>
            </div>
            {matchedItems.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">File Matching Status</h4>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {matchedItems.filter(item => item.matched).length} Matched
                    </span>
                    <span className="flex items-center gap-1 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      {matchedItems.filter(item => !item.matched).length} Unmatched
                    </span>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {matchedItems.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        item.matched ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.matched ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            RFA: {item.rfa.name}
                            {item.thumbnail && (
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-12 h-12 rounded overflow-hidden">
                                  <img
                                    src={URL.createObjectURL(item.thumbnail)}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{item.thumbnail.name}</span>
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setBulkUploadStep(1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={() => setBulkUploadStep(3)} disabled={matchedItems.length === 0} className="gap-2">
                Next: Review Items
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review & Edit */}
        {bulkUploadStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Step 3: Review & Edit Items</h3>
              <p className="text-muted-foreground mb-6">
                Review and edit the details for each item before importing
              </p>
            </div>
            
            {/* Bulk Actions */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedBulkItems.size === matchedItems.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBulkItems(new Set(matchedItems.map(item => item.id)));
                    } else {
                      setSelectedBulkItems(new Set());
                    }
                  }}
                />
                <span className="text-sm">
                  {selectedBulkItems.size} of {matchedItems.length} items selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBulkDefaultValues({
                      ...bulkDefaultValues,
                      freemium: bulkDefaultValues.freemium === "free" ? "premium" : "free"
                    });
                  }}
                >
                  Toggle {bulkDefaultValues.freemium === "free" ? "Premium" : "Free"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setBulkDefaultValues({
                      ...bulkDefaultValues,
                      parametric: !bulkDefaultValues.parametric
                    });
                  }}
                >
                  Toggle Parametric
                </Button>
              </div>
            </div>
            
            {/* Items List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {matchedItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedBulkItems.has(item.id)}
                      onCheckedChange={(checked) => {
                        setSelectedBulkItems(prev => {
                          const newSet = new Set(prev);
                          if (checked) {
                            newSet.add(item.id);
                          } else {
                            newSet.delete(item.id);
                          }
                          return newSet;
                        });
                      }}
                    />
                    
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      {item.thumbnail ? (
                        <div className="w-16 h-16 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(item.thumbnail)}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={item.name || ""}
                            onChange={(e) => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], name: e.target.value };
                              setMatchedItems(newItems);
                            }}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">SKU</Label>
                          <Input
                            value={item.SKU || ""}
                            onChange={(e) => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], SKU: e.target.value };
                              setMatchedItems(newItems);
                            }}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={item.desc || ""}
                          onChange={(e) => {
                            const newItems = [...matchedItems];
                            newItems[index] = { ...newItems[index], desc: e.target.value };
                            setMatchedItems(newItems);
                          }}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-xs">Type</Label>
                          <Select
                            value={item.freemium || bulkDefaultValues.freemium}
                            onValueChange={(value) => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], freemium: value };
                              setMatchedItems(newItems);
                            }}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.parametric !== undefined ? item.parametric : bulkDefaultValues.parametric}
                            onCheckedChange={(checked) => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], parametric: checked };
                              setMatchedItems(newItems);
                            }}
                          />
                          <Label className="text-xs">Parametric</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.nested_family !== undefined ? item.nested_family : bulkDefaultValues.nested_family}
                            onCheckedChange={(checked) => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], nested_family: checked };
                              setMatchedItems(newItems);
                            }}
                          />
                          <Label className="text-xs">Nested Family</Label>
                        </div>
                      </div>
                      
                      {/* Categories */}
                      <div>
                        <Label className="text-xs">Categories</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(item.categories || []).map((category: string) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                              <button
                                onClick={() => {
                                  const newItems = [...matchedItems];
                                  newItems[index] = {
                                    ...newItems[index],
                                    categories: (newItems[index].categories || []).filter((cat: string) => cat !== category)
                                  };
                                  setMatchedItems(newItems);
                                }}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Add category"
                            value={item.newCategory || ""}
                            onChange={e => {
                              const newItems = [...matchedItems];
                              newItems[index] = { ...newItems[index], newCategory: e.target.value };
                              setMatchedItems(newItems);
                            }}
                            onKeyDown={e => {
                              if (e.key === "Enter" && item.newCategory?.trim()) {
                                const newItems = [...matchedItems];
                                newItems[index] = {
                                  ...newItems[index],
                                  categories: [...(newItems[index].categories || []), item.newCategory.trim().toUpperCase()],
                                  newCategory: ""
                                };
                                setMatchedItems(newItems);
                              }
                            }}
                            className="text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              if (item.newCategory?.trim()) {
                                const newItems = [...matchedItems];
                                newItems[index] = {
                                  ...newItems[index],
                                  categories: [...(newItems[index].categories || []), item.newCategory.trim().toUpperCase()],
                                  newCategory: ""
                                };
                                setMatchedItems(newItems);
                              }
                            }}
                            disabled={!item.newCategory?.trim()}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setBulkUploadStep(2)} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={() => setBulkUploadStep(4)} 
                disabled={selectedBulkItems.size === 0} 
                className="gap-2"
              >
                Next: Add Categories
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Add Categories */}
        {bulkUploadStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Step 4: Add Categories</h3>
              <p className="text-muted-foreground mb-6">
                Add categories that will be applied to all selected items
              </p>
            </div>
            
            {/* Global Categories */}
            <div className="space-y-4">
              <div>
                <Label>Global Categories</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  These categories will be added to all {selectedBulkItems.size} selected items
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {bulkCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="gap-2">
                      {category}
                      <button
                        onClick={() => {
                          setBulkCategories(prev => prev.filter(cat => cat !== category));
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add global category"
                    value={newBulkCategory}
                    onChange={(e) => setNewBulkCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newBulkCategory.trim()) {
                        setBulkCategories(prev => [...prev, newBulkCategory.trim().toUpperCase()]);
                        setNewBulkCategory("");
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (newBulkCategory.trim()) {
                        setBulkCategories(prev => [...prev, newBulkCategory.trim().toUpperCase()]);
                        setNewBulkCategory("");
                      }
                    }}
                    disabled={!newBulkCategory.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {/* Predefined Categories */}
              <div>
                <Label>Quick Add Categories</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PREDEFINED_CATEGORIES.filter(cat => !bulkCategories.includes(cat)).map((category) => (
                    <Button
                      key={category}
                      size="sm"
                      variant="outline"
                      onClick={() => setBulkCategories(prev => [...prev, category])}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Preview Selected Items */}
            <div>
              <Label>Selected Items ({selectedBulkItems.size})</Label>
              <div className="max-h-40 overflow-y-auto space-y-2 mt-2">
                {matchedItems
                  .filter(item => selectedBulkItems.has(item.id))
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                      {item.thumbnail ? (
                        <div className="w-8 h-8 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(item.thumbnail)}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(item.categories || []).length} categories
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setBulkUploadStep(3)} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button 
                onClick={() => {
                  // Apply global categories to selected items
                  const updatedItems = matchedItems.map(item => {
                    if (selectedBulkItems.has(item.id)) {
                      return {
                        ...item,
                        categories: [...(item.categories || []), ...bulkCategories]
                      };
                    }
                    return item;
                  });
                  setMatchedItems(updatedItems);
                  
                  // TODO: Here you would implement the actual upload logic
                  console.log("Final items to upload:", updatedItems.filter(item => selectedBulkItems.has(item.id)));
                  
                  // Close the dialog and reset
                  handleClose();
                }} 
                className="gap-2"
              >
                Import {selectedBulkItems.size} Items
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 