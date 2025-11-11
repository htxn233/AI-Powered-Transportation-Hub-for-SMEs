import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Plus, Download, Upload, Search, MoreVertical, Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

const ordersData = [
  { id: 1, code: 'ORD-2451', from: 'Warehouse A, District 1', to: '123 Main St, District 5', status: 'delivered', shipper: 'John Doe', fee: '$45', date: '2025-10-13 14:30' },
  { id: 2, code: 'ORD-2452', from: 'Warehouse B, District 3', to: '456 Oak Ave, District 7', status: 'in-transit', shipper: 'Jane Smith', fee: '$38', date: '2025-10-13 13:15' },
  { id: 3, code: 'ORD-2453', from: 'Warehouse A, District 1', to: '789 Pine Rd, District 2', status: 'pickup', shipper: 'Mike Johnson', fee: '$42', date: '2025-10-13 12:00' },
  { id: 4, code: 'ORD-2454', from: 'Warehouse C, District 8', to: '321 Elm St, District 4', status: 'delivered', shipper: 'Sarah Chen', fee: '$51', date: '2025-10-13 11:45' },
  { id: 5, code: 'ORD-2455', from: 'Warehouse B, District 3', to: '654 Maple Dr, District 6', status: 'in-transit', shipper: 'Tom Wilson', fee: '$35', date: '2025-10-13 10:30' },
  { id: 6, code: 'ORD-2456', from: 'Warehouse A, District 1', to: '987 Cedar Ln, District 9', status: 'created', shipper: 'Unassigned', fee: '$47', date: '2025-10-13 09:20' },
  { id: 7, code: 'ORD-2457', from: 'Warehouse C, District 8', to: '147 Birch Way, District 3', status: 'pickup', shipper: 'Emily Brown', fee: '$39', date: '2025-10-13 08:15' },
  { id: 8, code: 'ORD-2458', from: 'Warehouse B, District 3', to: '258 Willow Ct, District 1', status: 'failed', shipper: 'David Lee', fee: '$44', date: '2025-10-12 16:45' },
];

const statusConfig = {
  created: { label: 'Created', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400', icon: Package },
  pickup: { label: 'Pickup', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400', icon: Clock },
  'in-transit': { label: 'In Transit', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400', icon: CheckCircle },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400', icon: XCircle },
};

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null);

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-1">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your delivery orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>Enter the order details below</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pickup Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                        <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                        <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Address</Label>
                    <Input placeholder="Enter full address" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Recipient Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Recipient Phone</Label>
                    <Input placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Package Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="parcel">Parcel</SelectItem>
                        <SelectItem value="fragile">Fragile</SelectItem>
                        <SelectItem value="bulk">Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input type="number" placeholder="0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Special Instructions</Label>
                  <Input placeholder="Handle with care, call before delivery, etc." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by order code, location..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>Track and manage delivery orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">From</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">To</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Shipper</th>
                  <th className="text-right py-3 px-2 text-muted-foreground">Fee</th>
                  <th className="text-right py-3 px-2 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                  return (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50 cursor-pointer">
                      <td className="py-3 px-2 text-foreground" onClick={() => setSelectedOrder(order)}>
                        {order.code}
                      </td>
                      <td className="py-3 px-2 text-foreground text-sm">{order.from}</td>
                      <td className="py-3 px-2 text-foreground text-sm">{order.to}</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary" className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-foreground">{order.shipper}</td>
                      <td className="py-3 px-2 text-right text-foreground">{order.fee}</td>
                      <td className="py-3 px-2 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Order</DropdownMenuItem>
                            <DropdownMenuItem>Reassign Shipper</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.code}</DialogTitle>
              <DialogDescription>Complete order information and timeline</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Status Timeline */}
              <div>
                <h3 className="text-foreground mb-4">Status Timeline</h3>
                <div className="space-y-4">
                  {[
                    { status: 'Created', time: '09:20 AM', active: true },
                    { status: 'Pickup', time: '10:15 AM', active: selectedOrder.status !== 'created' },
                    { status: 'In Transit', time: '11:30 AM', active: ['in-transit', 'delivered'].includes(selectedOrder.status) },
                    { status: 'Delivered', time: selectedOrder.status === 'delivered' ? '14:30 PM' : '--:--', active: selectedOrder.status === 'delivered' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-primary' : 'bg-muted'}`} />
                        {i < 3 && <div className={`w-0.5 h-8 ${step.active ? 'bg-primary' : 'bg-muted'}`} />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className={`${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.status}
                        </div>
                        <div className="text-sm text-muted-foreground">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">From</label>
                  <div className="text-foreground">{selectedOrder.from}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">To</label>
                  <div className="text-foreground">{selectedOrder.to}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shipper</label>
                  <div className="text-foreground">{selectedOrder.shipper}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Delivery Fee</label>
                  <div className="text-foreground">{selectedOrder.fee}</div>
                </div>
              </div>

              {/* Barcode */}
              <div className="flex justify-center p-6 bg-muted rounded-lg">
                <div className="space-y-2 text-center">
                  <div className="flex gap-1 justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1 h-16 bg-foreground" style={{ opacity: Math.random() > 0.3 ? 1 : 0.3 }} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedOrder.code}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
              <Button>Print Label</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
