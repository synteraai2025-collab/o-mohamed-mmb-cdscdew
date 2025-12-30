'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Palette } from 'lucide-react';

interface MonthlySalesData {
  month: string;
  sales: number;
  target: number;
}

interface RegionSalesData {
  region: string;
  sales: number;
  color: string;
}

interface ProductTrendData {
  month: string;
  productA: number;
  productB: number;
  productC: number;
  productD: number;
}

const monthlySalesData: MonthlySalesData[] = [
  { month: 'Jan', sales: 95000, target: 100000 },
  { month: 'Feb', sales: 108000, target: 105000 },
  { month: 'Mar', sales: 125000, target: 110000 },
  { month: 'Apr', sales: 118000, target: 115000 },
  { month: 'May', sales: 142000, target: 120000 },
  { month: 'Jun', sales: 135000, target: 125000 },
  { month: 'Jul', sales: 148000, target: 130000 },
  { month: 'Aug', sales: 152000, target: 135000 },
  { month: 'Sep', sales: 138000, target: 140000 },
  { month: 'Oct', sales: 165000, target: 145000 },
  { month: 'Nov', sales: 158000, target: 150000 },
  { month: 'Dec', sales: 172000, target: 155000 }
];

const regionSalesData: RegionSalesData[] = [
  { region: 'North America', sales: 450000, color: '#0ea5e9' },
  { region: 'Europe', sales: 375000, color: '#8b5cf6' },
  { region: 'Asia Pacific', sales: 275000, color: '#10b981' },
  { region: 'Latin America', sales: 100000, color: '#f59e0b' },
  { region: 'Middle East & Africa', sales: 50000, color: '#ef4444' }
];

const productTrendData: ProductTrendData[] = [
  { month: 'Jan', productA: 35000, productB: 28000, productC: 22000, productD: 10000 },
  { month: 'Feb', productA: 38000, productB: 30000, productC: 25000, productD: 15000 },
  { month: 'Mar', productA: 42000, productB: 32000, productC: 28000, productD: 23000 },
  { month: 'Apr', productA: 40000, productB: 31000, productC: 27000, productD: 20000 },
  { month: 'May', productA: 45000, productB: 35000, productC: 32000, productD: 30000 },
  { month: 'Jun', productA: 43000, productB: 33000, productC: 30000, productD: 29000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.region}</p>
        <p className="text-sm text-muted-foreground">
          Sales: {formatCurrency(data.sales)}
        </p>
        <p className="text-sm text-muted-foreground">
          Percentage: {((data.sales / regionSalesData.reduce((sum, item) => sum + item.sales, 0)) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export default function SalesVisualizations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sales Visualizations</h2>
          <p className="text-muted-foreground">Interactive charts and graphs for sales analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Sales vs Target Bar Chart */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Monthly Sales vs Target</CardTitle>
              <BarChart3 className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="sales" 
                    fill="#0ea5e9" 
                    name="Actual Sales"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="target" 
                    fill="#f59e0b" 
                    name="Target"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Sales Pie Chart */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Sales by Region</CardTitle>
              <PieChartIcon className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionSalesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="sales"
                    label={({ region, percentage }) => `${region}: ${percentage}%`}
                  >
                    {regionSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Product Trends Line Chart */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Product Sales Trends</CardTitle>
            <TrendingUp className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={productTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="productA" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  name="Product A"
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productB" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Product B"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productC" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Product C"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="productD" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="Product D"
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Color Legend */}
        <Card className="shadow-lg mt-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Chart Legend</CardTitle>
            <Palette className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-foreground">Primary Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm text-foreground">Secondary Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-foreground">Success Metrics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-foreground">Target/Goals</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
