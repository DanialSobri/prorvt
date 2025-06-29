import React, { useState } from "react"
import {
  Edit,
  Save,
  X,
  ExternalLink,
  File,
  Info,
  Settings,
  Tag,
  Link,
  FileText,
  CheckCircle,
  Star,
  Download,
  Eye,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EditFamilyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any | null
  onUpdate: (item: any) => void
}

function getThumbnailUrl(item: any) {
  if (!item.thumbnail || !item.id || !item.collectionId) return "/placeholder.svg";
  return `https://brezelbits.xyz/api/files/${item.collectionId}/${item.id}/${item.thumbnail}`;
}

export function EditFamilyDialog({ open, onOpenChange, item, onUpdate }: EditFamilyDialogProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingItem, setEditingItem] = useState<Partial<any>>({})

  // Initialize editing item when modal opens
  React.useEffect(() => {
    if (item && open) {
      setEditingItem(item)
    }
  }, [item, open])

  const handleSave = () => {
    if (!item) return
    
    // Prepare the update data according to the API structure
    const updateData = {
      SKU: editingItem.SKU || item.SKU || "",
      name: editingItem.name || item.name || "",
      desc: editingItem.desc || item.desc || "",
      freemium: editingItem.freemium || item.freemium || "free",
      vendor: editingItem.vendor || item.vendor || "pr", // Default vendor ID
      category: editingItem.category || item.category || "fn", // Default category ID
      parametric: editingItem.parametric !== undefined ? editingItem.parametric : item.parametric || true,
      nested_family: editingItem.nested_family !== undefined ? editingItem.nested_family : item.nested_family || true,
      specification: editingItem.specification || item.specification || "",
      link_vendor: editingItem.link_vendor || item.link_vendor || ""
    };

    onUpdate(updateData)
    setIsEditMode(false)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setEditingItem(item || {})
    onOpenChange(false)
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={getThumbnailUrl(item)} alt={item.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {item.name?.substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border-2 border-background rounded-full flex items-center justify-center">
                  <File className="w-2.5 h-2.5 text-orange-600" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">{isEditMode ? "Edit Family" : item.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">Family ID: {item.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEditMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditMode(true)}
                  className="gap-2 mt-3 mr-3"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              )}
              {isEditMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-2 mt-3"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    className="gap-2 mt-3 mr-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <Info className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="properties" className="gap-2">
              <Settings className="w-4 h-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Tag className="w-4 h-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="files" className="gap-2">
              <FileText className="w-4 h-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            <TabsContent value="overview" className="space-y-6">
              {/* Basic Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Family Name</Label>
                      {isEditMode ? (
                        <Input
                          id="name"
                          value={editingItem.name || item.name || ""}
                          onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                          placeholder="Enter family name"
                          className="h-10"
                        />
                      ) : (
                        <p className="text-sm font-medium p-2 bg-muted rounded-md">{item.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku" className="text-sm font-medium">SKU</Label>
                      {isEditMode ? (
                        <Input
                          id="sku"
                          value={editingItem.SKU || item.SKU || ""}
                          onChange={(e) => setEditingItem({...editingItem, SKU: e.target.value})}
                          placeholder="Enter SKU"
                          className="h-10"
                        />
                      ) : (
                        <p className="text-sm p-2 bg-muted rounded-md">{item.SKU || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desc" className="text-sm font-medium">Description</Label>
                    {isEditMode ? (
                      <Textarea
                        id="desc"
                        value={editingItem.desc || item.desc || ""}
                        onChange={(e) => setEditingItem({...editingItem, desc: e.target.value})}
                        placeholder="Enter description"
                        rows={3}
                        className="resize-none"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md min-h-[60px]">
                        {item.desc || "No description provided"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status & Properties Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Status & Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      {isEditMode ? (
                        <Select
                          value={editingItem.freemium || item.freemium || "free"}
                          onValueChange={(value) => setEditingItem({...editingItem, freemium: value})}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge 
                          variant={item.freemium === "free" ? "secondary" : "default"}
                          className="w-full justify-center h-10 text-sm"
                        >
                          {item.freemium === "free" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Free
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Premium
                            </span>
                          )}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Parametric</Label>
                      {isEditMode ? (
                        <Select
                          value={editingItem.parametric !== undefined ? editingItem.parametric.toString() : item.parametric?.toString() || "true"}
                          onValueChange={(value) => setEditingItem({...editingItem, parametric: value === "true"})}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge 
                          variant={item.parametric ? "outline" : "secondary"}
                          className="w-full justify-center h-10 text-sm"
                        >
                          {item.parametric ? "Parametric" : "Non-Parametric"}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Nested Family</Label>
                      {isEditMode ? (
                        <Select
                          value={editingItem.nested_family !== undefined ? editingItem.nested_family.toString() : item.nested_family?.toString() || "true"}
                          onValueChange={(value) => setEditingItem({...editingItem, nested_family: value === "true"})}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge 
                          variant={item.nested_family ? "outline" : "secondary"}
                          className="w-full justify-center h-10 text-sm"
                        >
                          {item.nested_family ? "Nested" : "Non-Nested"}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">File Type</Label>
                      <Badge variant="outline" className="w-full justify-center h-10 text-sm">
                        {item.rfa?.split(".").pop()?.toUpperCase() || "RFA"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              {/* Specification Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Specification Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="specification" className="text-sm font-medium">Technical Specification</Label>
                    {isEditMode ? (
                      <Textarea
                        id="specification"
                        value={editingItem.specification || item.specification || ""}
                        onChange={(e) => setEditingItem({...editingItem, specification: e.target.value})}
                        placeholder="Enter technical specification details..."
                        rows={4}
                        className="resize-none"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md min-h-[80px]">
                        {item.specification || "No specification provided"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vendor Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="w-5 h-5" />
                    Vendor Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="vendor-link" className="text-sm font-medium">Vendor Link</Label>
                    {isEditMode ? (
                      <Input
                        id="vendor-link"
                        value={editingItem.link_vendor || item.link_vendor || ""}
                        onChange={(e) => setEditingItem({...editingItem, link_vendor: e.target.value})}
                        placeholder="Enter vendor link (https://...)"
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.link_vendor ? (
                          <a
                            href={item.link_vendor}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-2 p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Vendor Page
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">No vendor link provided</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Assigned Categories</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(item.expand?.category || []).map((cat: any) => (
                          <Badge key={cat.name} variant="secondary" className="gap-1">
                            <Tag className="w-3 h-3" />
                            {cat.name}
                          </Badge>
                        ))}
                        {(item.expand?.category || []).length === 0 && (
                          <p className="text-sm text-muted-foreground">No categories assigned</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    File Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Thumbnail File */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Thumbnail Image</Label>
                      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <div className="flex-shrink-0">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={getThumbnailUrl(item)} alt={item.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {item.name?.substring(0,2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.thumbnail || "No thumbnail"}</p>
                          <p className="text-xs text-muted-foreground">Preview Image</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {item.thumbnail ? "Available" : "Not uploaded"}
                            </Badge>
                            {item.thumbnail && (
                              <Badge variant="secondary" className="text-xs">
                                Image
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.thumbnail ? (
                            <>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="gap-1">
                                <Download className="w-3 h-3" />
                                Download
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline" className="gap-1">
                              <Upload className="w-3 h-3" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RFA File */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">RFA File</Label>
                      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <File className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.rfa}</p>
                          <p className="text-xs text-muted-foreground">Revit Family File</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Available
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {item.rfa?.split(".").pop()?.toUpperCase() || "RFA"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-3 h-3" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* File Metadata */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">File Metadata</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Created Date</Label>
                          <p className="text-sm p-2 bg-background border rounded-md">
                            {new Date(item.created).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">Last Modified</Label>
                          <p className="text-sm p-2 bg-background border rounded-md">
                            {new Date(item.updated || item.created).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 