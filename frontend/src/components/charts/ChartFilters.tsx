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
  operations: string[];
}

const BUSINESS_TYPES = [
  { id: "project", label: "โปรเจค" },
  { id: "services", label: "บริการ" },
  { id: "distribute", label: "จัดจำหน่าย" }
];

const VERTICALS = [
  { id: "banking", label: "ธนาคาร" },
  { id: "manufacturing", label: "การผลิต" },
  { id: "retail", label: "ค้าปลีก" },
  { id: "healthcare", label: "การแพทย์และสุขภาพ" },
  { id: "finance", label: "การเงิน" },
  { id: "technology", label: "เทคโนโลยี" }
];

const QUARTERS = [
  { id: "Q1", label: "ไตรมาส 1 (ม.ค.-มี.ค.)" },
  { id: "Q2", label: "ไตรมาส 2 (เม.ย.-มิ.ย.)" },
  { id: "Q3", label: "ไตรมาส 3 (ก.ค.-ก.ย.)" },
  { id: "Q4", label: "ไตรมาส 4 (ต.ค.-ธ.ค.)" }
];

const YEARS = [
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "2021", label: "2021" },
  { id: "2020", label: "2020" }
];

const OPERATIONS = [
  { id: "infrastructure", label: "โครงสร้างพื้นฐาน" },
  { id: "software", label: "ซอฟต์แวร์" },
  { id: "qa", label: "คุณภาพ (QA)" },
  { id: "devops", label: "DevOps" },
  { id: "security", label: "ความปลอดภัย" },
  { id: "analytics", label: "วิเคราะห์ข้อมูล" }
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
    },
    operations: []
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

  const handleOperationChange = (operation: string, checked: boolean) => {
    const newOperations = checked
      ? [...filters.operations, operation]
      : filters.operations.filter(op => op !== operation);
    
    const newFilters = { ...filters, operations: newOperations };
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
      },
      operations: []
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.verticals.length > 0) count++;
    if (filters.quarters.length > 0) count++;
    if (filters.operations.length > 0) count++;
    if (filters.dateRange.start !== "2024-01-01" || filters.dateRange.end !== "2024-12-31") count++;
    return count;
  };

  return (
    <Card className={`${className} border-gray-200 bg-white`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-lg">ตัวกรองกราฟ</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" />
              รีเซ็ต
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              ตัวกรอง
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Business Types */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">ประเภทธุรกิจ</h4>
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
              <h4 className="font-medium text-gray-900 mb-3">กลุ่มอุตสาหกรรม</h4>
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

            {/* Operations */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">ฝ่ายปฏิบัติการ</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {OPERATIONS.map((operation) => (
                  <div key={operation.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`operation-${operation.id}`}
                      checked={filters.operations.includes(operation.id)}
                      onCheckedChange={(checked) =>
                        handleOperationChange(operation.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`operation-${operation.id}`}
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {operation.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Period */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">ช่วงเวลา</h4>
              
              {/* Year Selection */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  ปี
                </label>
                <Select value={filters.years[0]} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกปี" />
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
                  ไตรมาส
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
                  ช่วงวันที่กำหนดเอง
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-600">วันที่เริ่มต้น</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleDateRangeChange('start', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">วันที่สิ้นสุด</label>
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