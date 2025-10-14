import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin, Zap, Users, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const unassignedOrders = [
  { id: 1, code: 'ORD-2460', from: 'Warehouse A', to: 'District 1, 123 Main St', priority: 'high', distance: '5.2 km' },
  { id: 2, code: 'ORD-2461', from: 'Warehouse B', to: 'District 3, 456 Oak Ave', priority: 'medium', distance: '8.1 km' },
  { id: 3, code: 'ORD-2462', from: 'Warehouse A', to: 'District 2, 789 Pine Rd', priority: 'low', distance: '3.5 km' },
  { id: 4, code: 'ORD-2463', from: 'Warehouse C', to: 'District 7, 321 Elm St', priority: 'high', distance: '12.3 km' },
  { id: 5, code: 'ORD-2464', from: 'Warehouse B', to: 'District 5, 654 Maple Dr', priority: 'medium', distance: '6.8 km' },
  { id: 6, code: 'ORD-2465', from: 'Warehouse A', to: 'District 1, 987 Cedar Ln', priority: 'high', distance: '4.7 km' },
];

const aiSuggestions = [
  {
    route: 'Route A',
    orders: ['ORD-2460', 'ORD-2462', 'ORD-2465'],
    shipper: 'John Doe (Area 1)',
    totalDistance: '13.4 km',
    estimatedTime: '45 min',
    costSaving: '28%',
  },
  {
    route: 'Route B',
    orders: ['ORD-2461', 'ORD-2464'],
    shipper: 'Jane Smith (Area 3)',
    totalDistance: '14.9 km',
    estimatedTime: '52 min',
    costSaving: '22%',
  },
  {
    route: 'Route C',
    orders: ['ORD-2463'],
    shipper: 'Mike Johnson (Area 7)',
    totalDistance: '12.3 km',
    estimatedTime: '38 min',
    costSaving: '15%',
  },
];

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400',
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400',
};

export function DispatchPage() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleAutoAssign = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success('Successfully assigned 6 orders using AI optimization');
    }, 2000);
  };

  const handleApplySuggestion = (route: string) => {
    toast.success(`Applied ${route} suggestions`);
  };

  const toggleOrderSelection = (id: number) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-1">Dispatch & Route Optimization</h1>
          <p className="text-muted-foreground">AI-powered route planning and order assignment</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            disabled={selectedOrders.length === 0}
          >
            <Users className="w-4 h-4 mr-2" />
            Manual Assign
          </Button>
          <Button 
            size="sm"
            onClick={handleAutoAssign}
            disabled={isOptimizing}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isOptimizing ? 'Optimizing...' : 'Auto Assign Orders'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{unassignedOrders.length}</div>
            <p className="text-sm text-muted-foreground">Waiting for assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Available Shippers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">18</div>
            <p className="text-sm text-muted-foreground">Ready for dispatch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Suggested Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">{aiSuggestions.length}</div>
            <p className="text-sm text-muted-foreground">AI-optimized paths</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Cost Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-foreground">22%</div>
            <p className="text-sm text-muted-foreground">With AI optimization</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Route Map View</CardTitle>
            <CardDescription>Visual representation of delivery routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Mock map with pins */}
              <div className="absolute inset-0 p-8">
                <div className="relative w-full h-full">
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-10">
                    {[...Array(36)].map((_, i) => (
                      <div key={i} className="border border-foreground" />
                    ))}
                  </div>
                  
                  {/* Mock location pins */}
                  {[
                    { x: '20%', y: '30%', color: 'bg-blue-500' },
                    { x: '45%', y: '60%', color: 'bg-green-500' },
                    { x: '70%', y: '40%', color: 'bg-purple-500' },
                    { x: '35%', y: '75%', color: 'bg-red-500' },
                    { x: '80%', y: '70%', color: 'bg-amber-500' },
                  ].map((pin, i) => (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 ${pin.color} rounded-full animate-pulse`}
                      style={{ left: pin.x, top: pin.y }}
                    />
                  ))}

                  {/* Route lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="20%" y1="30%" x2="35%" y2="75%" className="stroke-blue-500" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
                    <line x1="35%" y1="75%" x2="45%" y2="60%" className="stroke-blue-500" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
                    <line x1="70%" y1="40%" x2="80%" y2="70%" className="stroke-green-500" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10 text-muted-foreground flex flex-col items-center gap-2">
                <MapPin className="w-12 h-12" />
                <p className="text-sm">Interactive map view</p>
                <p className="text-xs">Showing delivery routes and locations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  AI Suggested Routes
                </CardTitle>
                <CardDescription>Optimized routes for maximum efficiency</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, i) => (
              <Card key={i} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-foreground">{suggestion.route}</h4>
                      <Badge className="bg-accent">
                        Save {suggestion.costSaving}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Orders:</span>
                        <div className="text-foreground">{suggestion.orders.length} orders</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Distance:</span>
                        <div className="text-foreground">{suggestion.totalDistance}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shipper:</span>
                        <div className="text-foreground text-xs">{suggestion.shipper}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Est. Time:</span>
                        <div className="text-foreground">{suggestion.estimatedTime}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {suggestion.orders.map(order => (
                        <Badge key={order} variant="outline" className="text-xs">
                          {order}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleApplySuggestion(suggestion.route)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Apply This Route
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Unassigned Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Orders Waiting for Assignment</CardTitle>
              <CardDescription>
                {selectedOrders.length > 0 ? `${selectedOrders.length} selected` : 'Select orders to assign'}
              </CardDescription>
            </div>
            {selectedOrders.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setSelectedOrders([])}>
                Clear Selection
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedOrders.length === unassignedOrders.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(unassignedOrders.map(o => o.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Order Code</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">From</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">To</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Distance</th>
                </tr>
              </thead>
              <tbody>
                {unassignedOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                      selectedOrders.includes(order.id) ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => toggleOrderSelection(order.id)}
                  >
                    <td className="py-3 px-2">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                      />
                    </td>
                    <td className="py-3 px-2 text-foreground">{order.code}</td>
                    <td className="py-3 px-2 text-foreground">{order.from}</td>
                    <td className="py-3 px-2 text-foreground text-sm">{order.to}</td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant="secondary" 
                        className={priorityColors[order.priority as keyof typeof priorityColors]}
                      >
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-foreground">{order.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
