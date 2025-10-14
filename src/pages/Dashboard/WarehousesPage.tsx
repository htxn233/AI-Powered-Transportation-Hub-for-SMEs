import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Progress } from '../../components/ui/progress';
import { Plus, Package, MapPin, BarChart3, QrCode, Download, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const warehousesData = [
  { 
    id: 1, 
    name: 'Warehouse A', 
    location: 'District 1, Main Street 123', 
    capacity: 10000, 
    currentLoad: 7500, 
    status: 'active',
    coordinates: '10.7769° N, 106.7009° E',
    manager: 'John Smith',
    phone: '+1 (555) 123-4567'
  },
  { 
    id: 2, 
    name: 'Warehouse B', 
    location: 'District 3, Oak Avenue 456', 
    capacity: 8000, 
    currentLoad: 6200, 
    status: 'active',
    coordinates: '10.7861° N, 106.6956° E',
    manager: 'Sarah Johnson',
    phone: '+1 (555) 234-5678'
  },
  { 
    id: 3, 
    name: 'Warehouse C', 
    location: 'District 8, Pine Road 789', 
    capacity: 12000, 
    currentLoad: 4800, 
    status: 'active',
    coordinates: '10.7492° N, 106.6905° E',
    manager: 'Mike Chen',
    phone: '+1 (555) 345-6789'
  },
  { 
    id: 4, 
    name: 'Warehouse D', 
    location: 'District 5, Elm Street 321', 
    capacity: 6000, 
    currentLoad: 2400, 
    status: 'maintenance',
    coordinates: '10.7625° N, 106.6824° E',
    manager: 'Emily Brown',
    phone: '+1 (555) 456-7890'
  },
];

const capacityData = warehousesData.map(w => ({
  name: w.name,
  usage: Math.round((w.currentLoad / w.capacity) * 100),
  remaining: Math.round(((w.capacity - w.currentLoad) / w.capacity) * 100)
}));

export function WarehousesPage() {
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [scanType, setScanType] = useState<'inbound' | 'outbound'>('inbound');
  const [selectedWarehouse, setSelectedWarehouse] = useState<typeof warehousesData[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-1">Warehouses</h1>
          <p className="text-muted-foreground">Manage warehouse locations and inventory</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <QrCode className="w-4 h-4 mr-2" />
                Scan Goods
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scan Goods</DialogTitle>
                <DialogDescription>Scan barcode for inbound or outbound goods</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Operation Type</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={scanType === 'inbound' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setScanType('inbound')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Inbound
                    </Button>
                    <Button 
                      variant={scanType === 'outbound' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setScanType('outbound')}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Outbound
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Warehouse</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-lg bg-background">
                    {warehousesData.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Barcode / QR Code</Label>
                  <Input placeholder="Scan or enter code..." autoFocus />
                </div>
                <div className="p-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2">
                  <QrCode className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Position barcode in scanner range</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setScanDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setScanDialogOpen(false)}>Confirm Scan</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Warehouse
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Warehouse</DialogTitle>
                <DialogDescription>Enter warehouse details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Warehouse Name</Label>
                  <Input placeholder="Warehouse E" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="123 Street, District, City" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Capacity (units)</Label>
                    <Input type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Manager Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Warehouse</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Warehouses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{warehousesData.length}</div>
            <p className="text-sm text-muted-foreground">3 active, 1 maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">36,000</div>
            <p className="text-sm text-muted-foreground">units across all warehouses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Current Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">20,900</div>
            <p className="text-sm text-muted-foreground">58% capacity utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Available Space</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">15,100</div>
            <p className="text-sm text-muted-foreground">units remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Capacity Usage by Warehouse</CardTitle>
          <CardDescription>Current utilization across all locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="usage" name="Used %" stackId="a">
                  {capacityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.usage > 80 ? 'hsl(var(--destructive))' : entry.usage > 60 ? 'hsl(var(--chart-3))' : 'hsl(var(--chart-1))'} 
                    />
                  ))}
                </Bar>
                <Bar dataKey="remaining" name="Available %" stackId="a" fill="hsl(var(--muted))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {warehousesData.map((warehouse) => {
          const usagePercent = Math.round((warehouse.currentLoad / warehouse.capacity) * 100);
          return (
            <Card key={warehouse.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedWarehouse(warehouse)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      {warehouse.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {warehouse.location}
                    </CardDescription>
                  </div>
                  <Badge variant={warehouse.status === 'active' ? 'default' : 'secondary'}>
                    {warehouse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Capacity Usage</span>
                    <span className="text-foreground">{usagePercent}%</span>
                  </div>
                  <Progress value={usagePercent} className="h-2" />
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span>{warehouse.currentLoad.toLocaleString()} used</span>
                    <span>{warehouse.capacity.toLocaleString()} total</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Manager</div>
                    <div className="text-sm text-foreground">{warehouse.manager}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Contact</div>
                    <div className="text-sm text-foreground">{warehouse.phone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Warehouse Detail Dialog */}
      {selectedWarehouse && (
        <Dialog open={!!selectedWarehouse} onOpenChange={() => setSelectedWarehouse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedWarehouse.name} Details</DialogTitle>
              <DialogDescription>Complete warehouse information and statistics</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Location</label>
                  <div className="text-foreground">{selectedWarehouse.location}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Coordinates</label>
                  <div className="text-foreground">{selectedWarehouse.coordinates}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Manager</label>
                  <div className="text-foreground">{selectedWarehouse.manager}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Contact</label>
                  <div className="text-foreground">{selectedWarehouse.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div>
                    <Badge variant={selectedWarehouse.status === 'active' ? 'default' : 'secondary'}>
                      {selectedWarehouse.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Capacity Overview</label>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Current Load</span>
                        <span className="text-foreground">{selectedWarehouse.currentLoad.toLocaleString()} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Capacity</span>
                        <span className="text-foreground">{selectedWarehouse.capacity.toLocaleString()} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available Space</span>
                        <span className="text-foreground">{(selectedWarehouse.capacity - selectedWarehouse.currentLoad).toLocaleString()} units</span>
                      </div>
                      <Progress value={Math.round((selectedWarehouse.currentLoad / selectedWarehouse.capacity) * 100)} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedWarehouse(null)}>Close</Button>
              <Button>View Inventory</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
