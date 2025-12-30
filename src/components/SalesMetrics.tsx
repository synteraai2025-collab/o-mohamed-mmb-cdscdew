'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, MapPin, Package } from 'lucide-react';

interface SalesData {
  totalSales: number;
  salesByRegion: {
    region: string;
    sales: number;
    percentage: number;
  }[];
  salesByProduct: {
    product: string;
    sales: number;
    percentage: number;
  }[];
}

const mockSalesData: SalesData = {
  totalSales: 1250000,
  salesByRegion: [
    { region: 'North America', sales: 450000, percentage: 36 },
    { region: 'Europe', sales: 375000, percentage: 30 },
    { region: 'Asia Pacific', sales: 275000, percentage: 22 },
    { region: 'Latin America', sales: 100000, percentage: 8 },
    { region: 'Middle East & Africa', sales: 50000, percentage: 4 }
  ],
  salesByProduct: [
    { product: 'Product A', sales: 500000, percentage: 40 },
    { product: 'Product B', sales: 375000, percentage: 30 },
    { product: 'Product C', sales: 250000, percentage: 20 },
    { product: 'Product D', sales: 125000, percentage: 10 }
  ]
};

export default function SalesMetrics() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sales Metrics</h2>
          <p className="text-muted-foreground">Key performance indicators and sales breakdown</p>
        </div>

        {/* Total Sales Card */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Total Sales</CardTitle>
              <TrendingUp className="h-8 w-8 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(mockSalesData.totalSales)}
              </div>
              <CardDescription className="text-primary-foreground/80">
                Total revenue across all regions and products
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Sales by Region and Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales by Region */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Sales by Region</CardTitle>
              <MapPin className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSalesData.salesByRegion.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{region.region}</span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(region.sales)}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {region.percentage}% of total sales
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales by Product */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Sales by Product</CardTitle>
              <Package className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSalesData.salesByProduct.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{product.product}</span>
                      <span className="font-semibold text-primary">
                        {formatCurrency(product.sales)}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${product.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.percentage}% of total sales
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
