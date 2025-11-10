import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Progress } from '../../components/ui/progress';
import { Separator } from '../../components/ui/separator';
import { 
  Building2, 
  Edit, 
  Upload, 
  Copy, 
  RefreshCw, 
  CreditCard, 
  Key, 
  Users, 
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Bell,
  Crown,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Admin', email: 'john.doe@company.com', status: 'active', avatar: '' },
  { id: 2, name: 'Sarah Johnson', role: 'Manager', email: 'sarah.j@company.com', status: 'active', avatar: '' },
  { id: 3, name: 'Mike Chen', role: 'Dispatcher', email: 'mike.chen@company.com', status: 'active', avatar: '' },
  { id: 4, name: 'Emily Brown', role: 'Manager', email: 'emily.b@company.com', status: 'inactive', avatar: '' },
];

const integrations = [
  { id: 1, name: 'SAP ERP', description: 'Enterprise resource planning', enabled: true, icon: '📊' },
  { id: 2, name: 'Salesforce CRM', description: 'Customer relationship management', enabled: true, icon: '☁️' },
  { id: 3, name: 'QuickBooks', description: 'Accounting software', enabled: false, icon: '💰' },
  { id: 4, name: 'Slack', description: 'Team communication', enabled: true, icon: '💬' },
  { id: 5, name: 'Zapier', description: 'Workflow automation', enabled: false, icon: '⚡' },
];

export function CompanyProfilePage() {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Acme Corporation',
    taxId: 'TAX-2024-12345',
    address: '123 Business Park, District 1, City',
    email: 'admin@acmecorp.com',
    phone: '+1 (555) 123-4567',
    website: 'https://acmecorp.com',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••••••1234');
  const [webhookUrl, setWebhookUrl] = useState('https://api.acmecorp.com/webhooks');

  const handleCopyApiKey = () => {
    toast.success('API key copied to clipboard');
  };

  const handleGenerateApiKey = () => {
    setApiKey(`sk_live_${Math.random().toString(36).substring(2, 15)}`);
    toast.success('New API key generated');
  };

  const handleToggleIntegration = (id: number) => {
    toast.success('Integration status updated');
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-1">Company Profile</h1>
          <p className="text-muted-foreground">Manage your company details and settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Company Information</DialogTitle>
              <DialogDescription>Update your company details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input 
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <Input 
                    value={companyInfo.taxId}
                    onChange={(e) => setCompanyInfo({...companyInfo, taxId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input 
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input 
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input 
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => toast.success('Company information updated')}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle>Company Information</CardTitle>
            </div>
            <CardDescription>Your business details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-3">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or SVG. Max 2MB.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Company Details */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Company Name</Label>
                <div className="text-foreground mt-1">{companyInfo.name}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Tax ID</Label>
                  <div className="text-foreground mt-1">{companyInfo.taxId}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Website</Label>
                  <div className="text-foreground mt-1">
                    <a href={companyInfo.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {companyInfo.website}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <div className="text-foreground mt-1">{companyInfo.address}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Contact Email</Label>
                  <div className="text-foreground mt-1">{companyInfo.email}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone Number</Label>
                  <div className="text-foreground mt-1">{companyInfo.phone}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <CardTitle>Subscription & Billing</CardTitle>
            </div>
            <CardDescription>Your current plan and usage statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Plan */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Current Plan</Label>
                  <div className="text-2xl text-foreground mt-1">Pro Plan</div>
                </div>
                <Badge className="bg-accent">Active</Badge>
              </div>
              <Button className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>

            <Separator />

            {/* Usage Stats */}
            <div className="space-y-4">
              <Label>Usage This Month</Label>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Orders</span>
                    <span className="text-foreground">784 / 1,000</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="text-foreground">12,450 / 50,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="text-foreground">4.2 GB / 10 GB</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Billing Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm text-muted-foreground">Renewal Date</Label>
                  <div className="text-foreground mt-1">Nov 14, 2025</div>
                </div>
                <div className="text-right">
                  <Label className="text-sm text-muted-foreground">Amount</Label>
                  <div className="text-foreground mt-1">$99/month</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-foreground">•••• •••• •••• 4242</div>
                    <div className="text-xs text-muted-foreground">Expires 12/2027</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              <CardTitle>API & Integrations</CardTitle>
            </div>
            <CardDescription>Connect your tools and manage API access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* API Key */}
            <div className="space-y-3">
              <Label>API Key</Label>
              <div className="flex gap-2">
                <Input value={apiKey} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleGenerateApiKey}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Keep your API key secure. Don't share it publicly.
              </p>
            </div>

            <Separator />

            {/* Webhook URL */}
            <div className="space-y-3">
              <Label>Webhook URL</Label>
              <Input 
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://api.yourcompany.com/webhooks"
              />
              <p className="text-xs text-muted-foreground">
                Receive real-time updates for order events
              </p>
            </div>

            <Separator />

            {/* Integrations */}
            <div className="space-y-3">
              <Label>Supported Integrations</Label>
              <div className="space-y-2">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-background rounded flex items-center justify-center text-lg">
                        {integration.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-foreground">{integration.name}</div>
                        <div className="text-xs text-muted-foreground">{integration.description}</div>
                      </div>
                    </div>
                    <Switch 
                      checked={integration.enabled}
                      onCheckedChange={() => handleToggleIntegration(integration.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Verification */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-foreground">Email Verification</div>
                  <div className="text-xs text-muted-foreground">admin@acmecorp.com</div>
                </div>
              </div>
              <Badge className="bg-accent">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>

            <Separator />

            {/* Two-Factor Authentication */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch 
                  checked={twoFactorEnabled}
                  onCheckedChange={(checked: boolean | ((prevState: boolean) => boolean)) => {
                    setTwoFactorEnabled(checked);
                    toast.success(checked ? '2FA enabled' : '2FA disabled');
                  }}
                />
              </div>
            </div>

            <Separator />

            {/* Login Notifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get notified of new sign-ins to your account
                  </p>
                </div>
                <Switch 
                  checked={loginNotifications}
                  onCheckedChange={setLoginNotifications}
                />
              </div>
            </div>

            <Separator />

            {/* Password Reset */}
            <div className="space-y-3">
              <Label>Password</Label>
              <Button variant="outline" className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              <p className="text-xs text-muted-foreground">
                Last changed 30 days ago
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members - Full Width */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle>Team Members</CardTitle>
              </div>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>Send an invitation to join your team</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="john.doe@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="dispatcher">Dispatcher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    An invitation email will be sent to the provided address.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => toast.success('Invitation sent successfully')}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground">Member</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-2 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary">{member.role}</Badge>
                    </td>
                    <td className="py-3 px-2 text-foreground">{member.email}</td>
                    <td className="py-3 px-2">
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {member.status}
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-foreground">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{member.role}</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
