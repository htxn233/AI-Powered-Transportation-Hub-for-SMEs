import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Search, MoreVertical, TrendingUp, MapPin, Package, Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { Progress } from '../../components/ui/progress';

const shippersData = [
  { 
    id: 1, 
    name: 'John Doe', 
    avatar: '', 
    area: 'District 1, 2', 
    status: 'active', 
    efficiency: 96, 
    totalDeliveries: 248,
    successRate: 98.4,
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    vehicle: 'Motorcycle',
    shift: 'Morning (8AM - 4PM)'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    avatar: '', 
    area: 'District 3, 5', 
    status: 'active', 
    efficiency: 94, 
    totalDeliveries: 312,
    successRate: 97.8,
    rating: 4.9,
    phone: '+1 (555) 234-5678',
    vehicle: 'Van',
    shift: 'Full Day (8AM - 8PM)'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    avatar: '', 
    area: 'District 7, 8', 
    status: 'active', 
    efficiency: 92, 
    totalDeliveries: 189,
    successRate: 96.2,
    rating: 4.7,
    phone: '+1 (555) 345-6789',
    vehicle: 'Motorcycle',
    shift: 'Evening (4PM - 12AM)'
  },
  { 
    id: 4, 
    name: 'Sarah Chen', 
    avatar: '', 
    area: 'District 4, 6', 
    status: 'inactive', 
    efficiency: 88, 
    totalDeliveries: 156,
    successRate: 94.5,
    rating: 4.6,
    phone: '+1 (555) 456-7890',
    vehicle: 'Motorcycle',
    shift: 'Morning (8AM - 4PM)'
  },
  { 
    id: 5, 
    name: 'Tom Wilson', 
    avatar: '', 
    area: 'District 2, 9', 
    status: 'active', 
    efficiency: 97, 
    totalDeliveries: 278,
    successRate: 99.1,
    rating: 4.9,
    phone: '+1 (555) 567-8901',
    vehicle: 'Van',
    shift: 'Morning (8AM - 4PM)'
  },
  { 
    id: 6, 
    name: 'Emily Brown', 
    avatar: '', 
    area: 'District 1, 3', 
    status: 'active', 
    efficiency: 91, 
    totalDeliveries: 203,
    successRate: 95.8,
    rating: 4.7,
    phone: '+1 (555) 678-9012',
    vehicle: 'Motorcycle',
    shift: 'Evening (4PM - 12AM)'
  },
];

export function ShippersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipper, setSelectedShipper] = useState<typeof shippersData[0] | null>(null);

  const filteredShippers = shippersData.filter(shipper => {
    const matchesSearch = shipper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipper.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipper.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeShippers = shippersData.filter(s => s.status === 'active').length;
  const avgEfficiency = Math.round(shippersData.reduce((acc, s) => acc + s.efficiency, 0) / shippersData.length);
  const avgRating = (shippersData.reduce((acc, s) => acc + s.rating, 0) / shippersData.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-1">Shippers</h1>
          <p className="text-muted-foreground">Manage delivery personnel and their assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Shipper
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shipper</DialogTitle>
              <DialogDescription>Enter shipper information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assigned Area</Label>
                <Input placeholder="District 1, 2" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 4PM)</SelectItem>
                      <SelectItem value="evening">Evening (4PM - 12AM)</SelectItem>
                      <SelectItem value="fullday">Full Day (8AM - 8PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Shipper</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Shippers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{shippersData.length}</div>
            <p className="text-sm text-muted-foreground">{activeShippers} currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{avgEfficiency}%</div>
            <p className="text-sm text-muted-foreground">Across all shippers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground flex items-center gap-1">
              {avgRating}
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground">Customer satisfaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">
              {shippersData.reduce((acc, s) => acc + s.totalDeliveries, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or area..." 
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shippers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShippers.map((shipper) => (
          <Card key={shipper.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedShipper(shipper)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={shipper.avatar} />
                    <AvatarFallback>{shipper.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{shipper.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" />
                      {shipper.area}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedShipper(shipper); }}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Info</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Reassign Area</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View History</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={shipper.status === 'active' ? 'default' : 'secondary'}>
                  {shipper.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm text-foreground">{shipper.rating}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="text-foreground">{shipper.efficiency}%</span>
                </div>
                <Progress value={shipper.efficiency} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Deliveries</div>
                  <div className="text-foreground flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {shipper.totalDeliveries}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                  <div className="text-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {shipper.successRate}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shipper Detail Dialog */}
      {selectedShipper && (
        <Dialog open={!!selectedShipper} onOpenChange={() => setSelectedShipper(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedShipper.avatar} />
                  <AvatarFallback>{selectedShipper.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {selectedShipper.name}
              </DialogTitle>
              <DialogDescription>Complete shipper profile and performance</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div>
                    <Badge variant={selectedShipper.status === 'active' ? 'default' : 'secondary'}>
                      {selectedShipper.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Rating</label>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-foreground">{selectedShipper.rating} / 5.0</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <div className="text-foreground">{selectedShipper.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Vehicle</label>
                  <div className="text-foreground">{selectedShipper.vehicle}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Assigned Area</label>
                  <div className="text-foreground">{selectedShipper.area}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Shift</label>
                  <div className="text-foreground">{selectedShipper.shift}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Performance Metrics</label>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Efficiency Score</span>
                        <span className="text-foreground">{selectedShipper.efficiency}%</span>
                      </div>
                      <Progress value={selectedShipper.efficiency} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Deliveries</div>
                        <div className="text-xl text-foreground">{selectedShipper.totalDeliveries}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="text-xl text-foreground">{selectedShipper.successRate}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedShipper(null)}>Close</Button>
              <Button>Assign Orders</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
