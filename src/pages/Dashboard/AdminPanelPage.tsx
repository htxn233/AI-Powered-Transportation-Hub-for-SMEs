import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, CheckCircle, XCircle, Edit, Trash2, Plus, Building2, Users } from 'lucide-react';
import { toast } from 'sonner';

const pendingCompanies = [
  { 
    id: 1, 
    name: 'FastTech Logistics', 
    taxId: 'TAX-2024-001', 
    email: 'admin@fasttech.com', 
    address: '123 Tech Park, District 4',
    businessType: 'Logistics Provider',
    registeredDate: '2025-10-10',
    status: 'pending'
  },
  { 
    id: 2, 
    name: 'GreenGoods Co.', 
    taxId: 'TAX-2024-002', 
    email: 'contact@greengoods.com', 
    address: '456 Eco Street, District 7',
    businessType: 'Retail / E-commerce',
    registeredDate: '2025-10-11',
    status: 'pending'
  },
  { 
    id: 3, 
    name: 'Metro Distribution', 
    taxId: 'TAX-2024-003', 
    email: 'info@metrodist.com', 
    address: '789 Industrial Road, District 9',
    businessType: 'Wholesale Distribution',
    registeredDate: '2025-10-12',
    status: 'pending'
  },
];

const personnelData = [
  { 
    id: 1, 
    name: 'John Smith', 
    role: 'Warehouse Manager', 
    area: 'Warehouse A', 
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    role: 'Dispatch Coordinator', 
    area: 'District 1-3', 
    email: 'sarah.j@company.com',
    phone: '+1 (555) 234-5678',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Mike Chen', 
    role: 'Operations Manager', 
    area: 'All Districts', 
    email: 'mike.chen@company.com',
    phone: '+1 (555) 345-6789',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    role: 'Warehouse Manager', 
    area: 'Warehouse B', 
    email: 'emily.b@company.com',
    phone: '+1 (555) 456-7890',
    status: 'inactive'
  },
];

export function AdminPanelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<typeof pendingCompanies[0] | null>(null);

  const handleApprove = (company: typeof pendingCompanies[0]) => {
    toast.success(`${company.name} has been approved`);
  };

  const handleReject = (company: typeof pendingCompanies[0]) => {
    toast.error(`${company.name} registration has been rejected`);
  };

  const filteredPersonnel = personnelData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-foreground mb-1">Admin Panel</h1>
        <p className="text-muted-foreground">Manage business approvals and key personnel</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{pendingCompanies.length}</div>
            <p className="text-sm text-muted-foreground">Businesses awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">47</div>
            <p className="text-sm text-muted-foreground">Currently operating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Personnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{personnelData.length}</div>
            <p className="text-sm text-muted-foreground">Key staff members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">
              {personnelData.filter(p => p.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="businesses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="businesses" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Approve Businesses
          </TabsTrigger>
          <TabsTrigger value="personnel" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Manage Personnel
          </TabsTrigger>
        </TabsList>

        {/* Approve Businesses Tab */}
        <TabsContent value="businesses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Business Registrations</CardTitle>
              <CardDescription>Review and approve new business applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCompanies.map((company) => (
                  <Card key={company.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-foreground">{company.name}</h3>
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                                {company.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{company.businessType}</p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Tax ID:</span>{' '}
                              <span className="text-foreground">{company.taxId}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Email:</span>{' '}
                              <span className="text-foreground">{company.email}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-muted-foreground">Address:</span>{' '}
                              <span className="text-foreground">{company.address}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Registered:</span>{' '}
                              <span className="text-foreground">{company.registeredDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex lg:flex-col gap-2">
                          <Button 
                            className="flex-1 lg:flex-none" 
                            size="sm"
                            onClick={() => handleApprove(company)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 lg:flex-none" 
                            size="sm"
                            onClick={() => handleReject(company)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="flex-1 lg:flex-none" 
                            size="sm"
                            onClick={() => setSelectedCompany(company)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Personnel Tab */}
        <TabsContent value="personnel" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Key Personnel</CardTitle>
                  <CardDescription>Manage warehouse managers, coordinators, and staff</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Personnel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Personnel</DialogTitle>
                      <DialogDescription>Enter staff member information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="john@company.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="warehouse">Warehouse Manager</SelectItem>
                              <SelectItem value="dispatch">Dispatch Coordinator</SelectItem>
                              <SelectItem value="operations">Operations Manager</SelectItem>
                              <SelectItem value="supervisor">Supervisor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Assigned Area</Label>
                          <Input placeholder="Warehouse A or District 1-3" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Personnel</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, role, or area..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-2 text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-2 text-muted-foreground">Area</th>
                      <th className="text-left py-3 px-2 text-muted-foreground">Contact</th>
                      <th className="text-left py-3 px-2 text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-2 text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPersonnel.map((person) => (
                      <tr key={person.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-2 text-foreground">{person.name}</td>
                        <td className="py-3 px-2 text-foreground">{person.role}</td>
                        <td className="py-3 px-2 text-foreground">{person.area}</td>
                        <td className="py-3 px-2 text-foreground text-sm">
                          <div>{person.email}</div>
                          <div className="text-muted-foreground">{person.phone}</div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={person.status === 'active' ? 'default' : 'secondary'}>
                            {person.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Company Detail Dialog */}
      {selectedCompany && (
        <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCompany.name}</DialogTitle>
              <DialogDescription>Complete business registration details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Business Name</label>
                  <div className="text-foreground">{selectedCompany.name}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Tax ID</label>
                  <div className="text-foreground">{selectedCompany.taxId}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="text-foreground">{selectedCompany.email}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Business Type</label>
                  <div className="text-foreground">{selectedCompany.businessType}</div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-muted-foreground">Address</label>
                  <div className="text-foreground">{selectedCompany.address}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Registration Date</label>
                  <div className="text-foreground">{selectedCompany.registeredDate}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                      {selectedCompany.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCompany(null)}>Close</Button>
              <Button variant="outline" onClick={() => { handleReject(selectedCompany); setSelectedCompany(null); }}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => { handleApprove(selectedCompany); setSelectedCompany(null); }}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
