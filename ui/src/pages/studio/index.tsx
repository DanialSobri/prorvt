import { useState, useCallback, useEffect } from "react"
import {
  File,
  Download,
  ExternalLink,
  Search,
  Filter,
  Trash2,
  Check,
  X,
  Edit,
  Upload,
  Tag,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { BulkUploadDialog } from '@/components/bulk-upload-dialog'
import { BulkActionsDialog } from '@/components/bulk-actions-dialog'
import { EditFamilyDialog } from '@/components/edit-family-dialog'

function getThumbnailUrl(item: any) {
  if (!item.thumbnail || !item.id || !item.collectionId) return "/placeholder.svg";
  return `https://brezelbits.xyz/api/files/${item.collectionId}/${item.id}/${item.thumbnail}`;
}

export default function StudioPage() {
  const [viewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [items, setItems] = useState<any[]>([])
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  // Details modal state
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<any | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Bulk upload state
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false)

  // Bulk actions state
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false)

  const [page, setPage] = useState(1);
  const [perPage] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    console.log("Fetching families...");
    const familiesToken = localStorage.getItem('token');
    fetch(`https://brezelbits.xyz/api/collections/families/records?expand=category&page=${page}&perPage=${perPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(familiesToken ? { "Authorization": familiesToken } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data);
        if (data && data.items) setItems(data.items)
        if (data && data.totalPages) setTotalPages(data.totalPages)
        if (data && data.totalItems) setTotalItems(data.totalItems)
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, [page, perPage]);

  // Fetch categories count
  useEffect(() => {
    console.log("Fetching categories...");
    const categoriesToken = localStorage.getItem('token');
    fetch(`https://brezelbits.xyz/api/collections/view_category/records`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(categoriesToken ? { "Authorization": categoriesToken } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Categories API response:", data);
        if (data && data.totalItems) setTotalCategories(data.totalItems)
        if (data && data.items) setCategoriesData(data.items)
      })
      .catch((err) => {
        console.error("Categories API error:", err);
      });
  }, []);

  // Fetch categories from /api/collections/category/records
  useEffect(() => {
    console.log("Fetching categories (category/records)...");
    const token = localStorage.getItem('token');
    fetch(`https://brezelbits.xyz/api/collections/category/records`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": token } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("/category/records API response:", data);
        if (data && data.items) setCategoriesList(data.items)
      })
      .catch((err) => {
        console.error("/category/records API error:", err);
      });
  }, []);

  // Add missing handlers from reference.tsx
  const handleSelectItem = useCallback((itemId: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(itemId)
      } else {
        newSet.delete(itemId)
      }
      return newSet
    })
  }, [])

  const handleItemClick = useCallback(
    (item: any) => {
      if (isSelectionMode) return
      setSelectedItemForDetails(item)
      setIsDetailsModalOpen(true)
    },
    [isSelectionMode],
  )

  // filteredItems logic (migrated from reference.tsx)
  const filteredItems = items.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.categories || []).some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter =
      filterType === "all" ||
      (filterType === "parametric" && item.parametric) ||
      (filterType === "free" && item.freemium === "free")
    return matchesSearch && matchesFilter
  })

  const handleUpdateItem = useCallback(async (updateData: any) => {
    if (!selectedItemForDetails) return;
    
    try {
      // Make the PATCH request
      const updateToken = localStorage.getItem('token');
      const response = await fetch(`https://brezelbits.xyz/api/collections/families/records/${selectedItemForDetails.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(updateToken ? { "Authorization": updateToken } : {})
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Update successful:', result);

      // Update local state with the response data
      setItems((prev: any[]) => prev.map((item) => 
        item.id === selectedItemForDetails.id ? { ...item, ...result } : item
      ));
      
      setSelectedItemForDetails(null);
      
    } catch (error) {
      console.error('Error updating item:', error);
      // You might want to show an error message to the user here
      alert('Failed to update item. Please try again.');
    }
  }, [selectedItemForDetails]);

  // Bulk actions handler
  const handleBulkAction = useCallback(async (actionType: string, value: any) => {
    if (selectedItems.size === 0) return;

    // Prepare update data for each action type
    let updateData: any = {};
    switch (actionType) {
      case "freemium":
        updateData = { freemium: value };
        break;
      case "parametric":
        updateData = { parametric: value };
        break;
      case "categories":
        updateData = { category: value };
        break;
    }

    const updateToken = localStorage.getItem('token');
    const promises = Array.from(selectedItems).map(async (id) => {
      try {
        const response = await fetch(`https://brezelbits.xyz/api/collections/families/records/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(updateToken ? { "Authorization": updateToken } : {})
          },
          body: JSON.stringify(updateData)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      } catch (error) {
        return { error, id };
      }
    });

    const results = await Promise.all(promises);
    const failed = results.filter((r: any) => r.error);
    if (failed.length > 0) {
      alert(`Failed to update ${failed.length} items. Please try again.`);
    }

    // Update local state for successful updates
    setItems((prev: any[]) => prev.map((item) => {
      if (selectedItems.has(item.id)) {
        const result = results.find((r: any) => r.id === item.id && !r.error);
        if (result) {
          return { ...item, ...result };
        }
      }
      return item;
    }));

    // Reset bulk action state
    setSelectedItems(new Set());
    setIsSelectionMode(false);
  }, [selectedItems]);

  return (
    <Layout fadedBelow fixedHeight>
      <LayoutHeader>
        <div className='flex w-full items-center justify-end'>
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </LayoutHeader>
      <LayoutBody className='flex flex-col' fixedHeight>
        <div className="mb-6">
          <h1 className='text-2xl font-bold tracking-tight'>
            Families Studio
          </h1>
          <p className='text-muted-foreground'>
            Discover, manage, and organize your Revit families with powerful tools and bulk operations
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 flex flex-wrap gap-4">
          {/* Total Families Card */}
          <div className="relative rounded-xl bg-muted px-6 py-4 flex flex-col items-center justify-center min-w-[160px] shadow group overflow-hidden text-center">
            <FileText className="absolute top-3 right-3 w-10 h-10 text-blue-200 opacity-30 group-hover:opacity-50 transition" />
            <span className="text-xs text-muted-foreground">Total Families</span>
            <span className="text-2xl font-bold">{totalItems || items.length}</span>
            <span className="text-xs text-green-600 mt-1 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +5 this week
            </span>
            <span className="text-[10px] text-muted-foreground mt-2">Last updated: 2 min ago</span>
          </div>
          {/* Total Categories Card */}
          <div className="relative rounded-xl bg-muted px-6 py-4 flex flex-col items-center justify-center min-w-[160px] shadow group overflow-hidden text-center">
            <Tag className="absolute top-3 right-3 w-10 h-10 text-green-200 opacity-30 group-hover:opacity-50 transition" />
            <span className="text-xs text-muted-foreground">Total Categories</span>
            <span className="text-2xl font-bold">{totalCategories}</span>
            <span className="text-xs text-blue-600 mt-1 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              +1 new
            </span>
            <span className="text-[10px] text-muted-foreground mt-2">Last updated: 2 min ago</span>
          </div>
          {/* Total in Staging Card */}
          <div className="relative rounded-xl bg-muted px-6 py-4 flex flex-col items-center justify-center min-w-[160px] shadow group overflow-hidden text-center">
            <Upload className="absolute top-3 right-3 w-10 h-10 text-indigo-200 opacity-30 group-hover:opacity-50 transition" />
            <span className="text-xs text-muted-foreground">Total in Staging</span>
            <span className="text-2xl font-bold">{selectedItems.size}</span>
            <span className="text-xs text-indigo-600 mt-1 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" /></svg>
              Ready to import
            </span>
            <span className="text-[10px] text-muted-foreground mt-2">Last updated: 2 min ago</span>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 px-6 py-4 min-w-[300px] flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-blue-900">Top Categories</span>
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-3">
              {categoriesData
                .sort((a, b) => b.family_count - a.family_count)
                .slice(0, 3)
                .map((category, index) => (
                  <div key={category.id} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        {category.icon ? (
                          <img 
                            src={`https://brezelbits.xyz/api/files/${category.collectionId}/${category.id}/${category.icon}`}
                            alt={category.name}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <span className="text-blue-600 font-bold text-sm">
                            {category.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-blue-900 truncate">{category.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-blue-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${Math.max(10, (category.family_count / Math.max(...categoriesData.map(c => c.family_count))) * 100)}%` 
                              }}
                            />
                          </div>
                          <span className="text-xs text-blue-700 font-medium">{category.family_count}</span>
                        </div>
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-600 text-xs font-bold">1</span>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-bold">2</span>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 text-xs font-bold">3</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search files and categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 w-40 lg:w-[250px]"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-36'>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="parametric">Parametric Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {/* Selection Mode Toggle */}
            <Button
              variant={isSelectionMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsSelectionMode(!isSelectionMode)
                if (isSelectionMode) {
                  setSelectedItems(new Set())
                }
              }}
              className="gap-2"
            >
              {isSelectionMode ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              {isSelectionMode ? "Cancel" : "Select"}
            </Button>
            
            {/* Bulk Actions Button - only show when items are selected */}
            {selectedItems.size > 0 && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setIsBulkActionsOpen(true)} 
                className="gap-2 bg-orange-600 hover:bg-orange-700"
              >
                <Edit className="w-4 h-4" />
                Bulk Actions ({selectedItems.size})
              </Button>
            )}
            
            {/* Add more toolbar actions as needed */}
            <Button variant="outline" size="sm" onClick={() => setIsBulkUploadOpen(true)} className="gap-2">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </Button>
          </div>
        </div>

        <Separator className='shadow' />

        {/* File Grid/List */}
        <div className="mb-2 text-sm text-muted-foreground">
          Total available families: {totalItems || items.length}
        </div>
        <div className='no-scrollbar overflow-y-scroll pb-16 pt-4'>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredItems.map((item: any) => (
                <FileCard
                  key={item.id}
                  item={item}
                  isSelectionMode={isSelectionMode}
                  selectedItems={selectedItems}
                  handleSelectItem={handleSelectItem}
                  handleItemClick={handleItemClick}
                  setItemToDelete={setItemToDelete}
                  setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item: any) => (
                <FileListItem
                  key={item.id}
                  item={item}
                  isSelectionMode={isSelectionMode}
                  selectedItems={selectedItems}
                  handleSelectItem={handleSelectItem}
                  handleItemClick={handleItemClick}
                  setItemToDelete={setItemToDelete}
                  setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="mx-2"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="mx-2"
            >
              Next
            </Button>
          </div>
        </div>
      </LayoutBody>

      {/* Details/Edit Modal */}
      <EditFamilyDialog
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        item={selectedItemForDetails}
        onUpdate={handleUpdateItem}
        categoriesList={categoriesList}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the family from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Handle delete logic here
                console.log("Deleting item:", itemToDelete);
                setIsDeleteDialogOpen(false);
                setItemToDelete(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Actions Dialog */}
      <BulkActionsDialog
        open={isBulkActionsOpen}
        onOpenChange={setIsBulkActionsOpen}
        selectedItems={selectedItems}
        items={items}
        onBulkAction={handleBulkAction}
        categoriesList={categoriesList}
      />

      {/* Bulk Upload Dialog */}
      <BulkUploadDialog
        open={isBulkUploadOpen}
        onOpenChange={setIsBulkUploadOpen}
      />
    </Layout>
  )
}

const FileCard = ({ item, isSelectionMode, selectedItems, handleSelectItem, handleItemClick, setItemToDelete, setIsDeleteDialogOpen }: any) => (
  <Card
    className={`group hover:shadow-md transition-all duration-200 cursor-pointer border-2 ${
      selectedItems.has(item.id) ? "border-primary bg-primary/5" : "hover:border-primary/20"
    }`}
    onClick={() => handleItemClick(item)}
  >
    <CardContent className="p-4 relative">
      <div className="flex flex-col items-center space-y-3">
        {/* Selection Checkbox */}
        {isSelectionMode && (
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              checked={selectedItems.has(item.id)}
              onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
              className="bg-background"
            />
          </div>
        )}

        {/* File Icon/Thumbnail */}
        <div className="relative w-16 h-16 flex items-center justify-center bg-muted rounded-lg group-hover:bg-muted/80 transition-colors">
          <Avatar className="w-16 h-16">
            <AvatarImage src={getThumbnailUrl(item)} alt={item.name} />
            <AvatarFallback>{item.name?.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background border-2 border-background rounded-full flex items-center justify-center">
            <File className="w-3 h-3 text-orange-600" />
          </div>
        </div>

        {/* File Name */}
        <div className="text-center space-y-1 w-full">
          <h3 className="text-sm font-medium line-clamp-2 leading-tight">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.rfa.split(".").pop()?.toUpperCase()} File</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 justify-center max-w-full">
          {(item.expand?.category || []).map((cat: any) => (
            <Badge key={cat.name} variant="secondary" className="text-xs px-2 py-0">
              {cat.name}
            </Badge>
          ))}
        </div>

        {/* Additional Badges */}
        <div className="flex flex-wrap gap-1 justify-center">
          {item.freemium === "free" && (
            <Badge variant="secondary" className="text-xs px-2 py-0">
              Free
            </Badge>
          )}
          {item.parametric && (
            <Badge variant="outline" className="text-xs px-2 py-0">
              Parametric
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
            <Download className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 bg-transparent text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              setItemToDelete(item.id)
              setIsDeleteDialogOpen(true)
            }}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

const FileListItem = ({ item, isSelectionMode, selectedItems, handleSelectItem, handleItemClick, setItemToDelete, setIsDeleteDialogOpen }: any) => (
  <div
    className={`flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg group cursor-pointer ${
      selectedItems.has(item.id) ? "bg-primary/5 border border-primary/20" : ""
    }`}
    onClick={() => handleItemClick(item)}
  >
    {isSelectionMode && (
      <Checkbox
        checked={selectedItems.has(item.id)}
        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
        onClick={(e) => e.stopPropagation()}
      />
    )}

    <div className="relative flex-shrink-0">
      <Avatar className="w-10 h-10">
        <AvatarImage src={getThumbnailUrl(item)} alt={item.name} />
        <AvatarFallback>{item.name?.substring(0,2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium truncate">{item.name}</h3>
      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
      <div className="flex gap-1 mt-1 flex-wrap">
        {(item.expand?.category || []).map((cat: any) => (
          <Badge key={cat.name} variant="secondary" className="text-xs px-1 py-0">
            {cat.name}
          </Badge>
        ))}
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="text-xs">
        {item.rfa.split(".").pop()?.toUpperCase()}
      </Badge>
      {item.freemium === "free" && (
        <Badge variant="outline" className="text-xs">
          Free
        </Badge>
      )}
      {item.parametric && (
        <Badge variant="outline" className="text-xs">
          Parametric
        </Badge>
      )}
    </div>

    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
        <Download className="w-3 h-3" />
      </Button>
      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
        <ExternalLink className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation()
          setItemToDelete(item.id)
          setIsDeleteDialogOpen(true)
        }}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  </div>
)
