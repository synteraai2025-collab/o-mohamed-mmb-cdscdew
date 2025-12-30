'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Filter, RefreshCw, Download, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeFilterProps {
  onDateRangeChange?: (range: DateRange) => void;
  onQuickSelect?: (period: string) => void;
  onReset?: () => void;
  onExport?: () => void;
}

const quickSelectOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'lastQuarter', label: 'Last Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'lastYear', label: 'Last Year' }
];

export default function DateRangeFilter({ 
  onDateRangeChange, 
  onQuickSelect, 
  onReset, 
  onExport 
}: DateRangeFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });
  const [open, setOpen] = useState(false);
  const [quickSelect, setQuickSelect] = useState('');

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
      onDateRangeChange?.(range);
    }
  };

  const handleQuickSelect = (value: string) => {
    setQuickSelect(value);
    
    const now = new Date();
    let from: Date;
    let to: Date = now;

    switch (value) {
      case 'today':
        from = new Date(now);
        break;
      case 'yesterday':
        from = new Date(now.setDate(now.getDate() - 1));
        to = new Date(from);
        break;
      case 'thisWeek':
        from = new Date(now.setDate(now.getDate() - now.getDay()));
        break;
      case 'lastWeek':
        from = new Date(now.setDate(now.getDate() - now.getDay() - 7));
        to = new Date(now.setDate(now.getDate() + 6));
        break;
      case 'thisMonth':
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        to = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisQuarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        from = new Date(now.getFullYear(), currentQuarter * 3, 1);
        break;
      case 'lastQuarter':
        const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
        from = new Date(now.getFullYear(), lastQuarter * 3, 1);
        to = new Date(now.getFullYear(), (lastQuarter + 1) * 3, 0);
        break;
      case 'thisYear':
        from = new Date(now.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        from = new Date(now.getFullYear() - 1, 0, 1);
        to = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        from = new Date(now.setMonth(now.getMonth() - 1));
    }

    const newRange = { from, to };
    setDateRange(newRange);
    onQuickSelect?.(value);
    onDateRangeChange?.(newRange);
  };

  const handleReset = () => {
    const defaultRange = {
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date()
    };
    setDateRange(defaultRange);
    setQuickSelect('');
    onReset?.();
    onDateRangeChange?.(defaultRange);
  };

  const handleExport = () => {
    onExport?.();
  };

  const formatDateRange = () => {
    if (!dateRange.from) return 'Select date range';
    if (!dateRange.to) return format(dateRange.from, 'MMM dd, yyyy');
    if (dateRange.from.getTime() === dateRange.to.getTime()) {
      return format(dateRange.from, 'MMM dd, yyyy');
    }
    return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Date Range Filter</h2>
          <p className="text-muted-foreground">Filter sales data by custom date ranges or quick selections</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter Options
            </CardTitle>
            <CardDescription>
              Select a date range to filter your sales data and analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Select Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Quick Select</label>
              <Select value={quickSelect} onValueChange={handleQuickSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a predefined period" />
                </SelectTrigger>
                <SelectContent>
                  {quickSelectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Date Range Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Custom Date Range</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[300px] justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDateRange()}
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Selected Range Display */}
            {(dateRange.from || dateRange.to) && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Selected Range:</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatDateRange()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Days selected:</p>
                    <p className="text-lg font-semibold text-primary">
                      {dateRange.from && dateRange.to 
                        ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
                        : 1
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Filter
              </Button>
              <Button 
                onClick={handleExport} 
                variant="secondary" 
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button 
                className="flex items-center gap-2 flex-1"
                onClick={() => {
                  // Apply filter logic here
                  console.log('Applying filter:', dateRange);
                }}
              >
                <Filter className="h-4 w-4" />
                Apply Filter
              </Button>
            </div>

            {/* Filter Summary */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Filter Status:</span>
                <span className={`font-medium ${
                  dateRange.from || dateRange.to 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-muted-foreground'
                }`}>
                  {dateRange.from || dateRange.to ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Custom Date Range
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click the calendar button to open the date picker</li>
                  <li>• Select start and end dates for your range</li>
                  <li>• Choose dates up to today's date</li>
                  <li>• View selected range summary instantly</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  Quick Selection
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use predefined periods for common ranges</li>
                  <li>• Options include today, this week, this month, etc.</li>
                  <li>• Automatically calculates date ranges</li>
                  <li>• Saves time for frequent filtering needs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
