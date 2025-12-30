import SalesMetrics from '@/components/SalesMetrics';
import SalesVisualizations from '@/components/SalesVisualizations';
import DateRangeFilter from '@/components/DateRangeFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sales Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Monitor your sales performance with real-time metrics, interactive visualizations, and advanced filtering capabilities.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Metrics Section */}
          <div className="lg:col-span-2">
            <SalesMetrics />
          </div>
          
          {/* Date Range Filter Section */}
          <div className="lg:col-span-1">
            <DateRangeFilter />
          </div>
        </div>

        {/* Sales Visualizations Section - Full Width */}
        <div className="mt-8">
          <SalesVisualizations />
        </div>
      </div>
    </div>
  );
}
