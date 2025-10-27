import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, RotateCcw } from "lucide-react";

interface ChartFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  businessTypes: string[];
  verticals: string[];
  quarters: string[];
  years: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

const BUSINESS_TYPES = [
  { id: "project", label: "Project" },
  { id: "services", label: "Services" },
  { id: "distribute", label: "Distribute" }
];

const VERTICALS = [
  { id: "banking", label: "Banking" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "retail", label: "Retail" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "technology", label: "Technology" }
];

const QUARTERS = [
  { id: "Q1", label: "Q1 (Jan-Mar)" },
  { id: "Q2", label: "Q2 (Apr-Jun)" },
  { id: "Q3", label: "Q3 (Jul-Sep)" },
  { id: "Q4", label: "Q4 (Oct-Dec)" }
];

const YEARS = [
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "2021", label: "2021" },
  { id: "2020", label: "2020" }
];

export function ChartFilters({ onFiltersChange, className }: ChartFiltersProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    businessTypes: ["project", "services", "distribute"],
    verticals: [],
    quarters: [],
    years: ["2024"],
    dateRange: {
      start: "2024-01-01",
      end: "2024-12-31"
    }
  });

  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleBusinessTypeChange = (businessType: string, checked: boolean) => {
    const newBusinessTypes = checked
      ? [...filters.businessTypes, businessType]
      : filters.businessTypes.filter(bt => bt !== businessType);
    
    const newFilters = { ...filters, businessTypes: newBusinessTypes };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleVerticalChange = (vertical: string, checked: boolean) => {
    const newVerticals = checked
      ? [...filters.verticals, vertical]
      : filters.verticals.filter(v => v !== vertical);
    
    const newFilters = { ...filters, verticals: newVerticals };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleQuarterChange = (quarter: string, checked: boolean) => {
    const newQuarters = checked
      ? [...filters.quarters, quarter]
      : filters.quarters.filter(q => q !== quarter);
    
    const newFilters = { ...filters, quarters: newQuarters };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleYearChange = (year: string) => {
    const newFilters = { ...filters, years: [year] };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      businessTypes: ["project", "services", "distribute"],
      verticals: [],
      quarters: [],
      years: ["2024"],
      dateRange: {
        start: "2024-01-01",
        end: "2024-12-31"
      }
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.verticals.length > 0) count++;
    if (filters.quarters.length > 0) count++;
    if (filters.dateRange.start !== "2024-01-01" || filters.dateRange.end !== "2024-12-31") count++;
    return count;
  };

  return (
    <Card className={`${className} border-gray-200 bg-white`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-lg">Chart Filters</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              {getActiveFiltersCount() > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Business Types */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Business Type</h4>
              <div className="space-y-2">
                {BUSINESS_TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`business-${type.id}`}
                      checked={filters.businessTypes.includes(type.id)}
                      onCheckedChange={(checked) => 
                        handleBusinessTypeChange(type.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`business-${type.id}`}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Verticals */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Industry Vertical</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {VERTICALS.map((vertical) => (
                  <div key={vertical.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`vertical-${vertical.id}`}
                      checked={filters.verticals.includes(vertical.id)}
                      onCheckedChange={(checked) => 
                        handleVerticalChange(vertical.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`vertical-${vertical.id}`}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {vertical.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Period */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Time Period</h4>
              
              {/* Year Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Year
                </label>
                <Select value={filters.years[0]} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year.id} value={year.id}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quarter Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Quarters
                </label>
                <div className="space-y-2">
                  {QUARTERS.map((quarter) => (
                    <div key={quarter.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`quarter-${quarter.id}`}
                        checked={filters.quarters.includes(quarter.id)}
                        onCheckedChange={(checked) => 
                          handleQuarterChange(quarter.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`quarter-${quarter.id}`}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        {quarter.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Custom Date Range
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">Start Date</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">End Date</label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleDateRangeChange('end', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}