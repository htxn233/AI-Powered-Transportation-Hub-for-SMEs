import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Package, TrendingUp, Users, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    title: 'Orders Today',
    value: '248',
    change: '+12.5%',
    trend: 'up',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-950',
  },
  {
    title: 'Success Rate',
    value: '98.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-950',
  },
  {
    title: 'Active Shippers',
    value: '42',
    change: '-3',
    trend: 'down',
    icon: Users,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-950',
  },
  {
    title: 'Total Cost',
    value: '$8,240',
    change: '-15.3%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-950',
  },
];

const deliveryTrendData = [
  { date: 'Mon', successful: 45, failed: 2 },
  { date: 'Tue', successful: 52, failed: 3 },
  { date: 'Wed', successful: 48, failed: 1 },
  { date: 'Thu', successful: 61, failed: 2 },
  { date: 'Fri', successful: 55, failed: 4 },
  { date: 'Sat', successful: 38, failed: 1 },
  { date: 'Sun', successful: 42, failed: 2 },
];

const recentOrders = [
  { code: 'ORD-2451', from: 'Warehouse A', to: 'District 1', status: 'delivered', shipper: 'John Doe', fee: '$45' },
  { code: 'ORD-2452', from: 'Warehouse B', to: 'District 5', status: 'in-transit', shipper: 'Jane Smith', fee: '$38' },
  { code: 'ORD-2453', from: 'Warehouse A', to: 'District 3', status: 'pickup', shipper: 'Mike Johnson', fee: '$42' },
  { code: 'ORD-2454', from: 'Warehouse C', to: 'District 7', status: 'delivered', shipper: 'Sarah Chen', fee: '$51' },
  { code: 'ORD-2455', from: 'Warehouse B', to: 'District 2', status: 'in-transit', shipper: 'Tom Wilson', fee: '$35' },
];

const statusColors = {
  delivered: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400',
  'in-transit': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400',
  pickup: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400',
  created: 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-400',
  failed: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400',
};

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-foreground mb-1">Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`w-8 h-8 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-foreground mb-1">{kpi.value}</div>
              <div className="flex items-center gap-1 text-sm">
                {kpi.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Delivery Success Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Success Trend</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deliveryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="successful" 
                    stackId="1"
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="failed" 
                    stackId="1"
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '5 mins ago', text: 'Order ORD-2455 picked up by Tom Wilson', type: 'pickup' },
                { time: '12 mins ago', text: 'Route optimization completed for 15 orders', type: 'success' },
                { time: '23 mins ago', text: 'Order ORD-2451 delivered successfully', type: 'success' },
                { time: '45 mins ago', text: 'New shipper Sarah Chen joined Area 7', type: 'info' },
                { time: '1 hour ago', text: 'Warehouse B capacity at 85%', type: 'warning' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-amber-500' :
                    activity.type === 'pickup' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent delivery orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground">Order Code</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">From</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">To</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Shipper</th>
                  <th className="text-right py-3 px-2 text-muted-foreground">Fee</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.code} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2 text-foreground">{order.code}</td>
                    <td className="py-3 px-2 text-foreground">{order.from}</td>
                    <td className="py-3 px-2 text-foreground">{order.to}</td>
                    <td className="py-3 px-2">
                      <Badge variant="secondary" className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-foreground">{order.shipper}</td>
                    <td className="py-3 px-2 text-right text-foreground">{order.fee}</td>
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
