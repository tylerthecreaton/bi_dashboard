import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, Download, Search, ArrowUpDown, X } from "lucide-react";
import { useState, useMemo } from "react";

interface Product {
  id: string;
  name: string;
  category: "Electronics" | "Clothing" | "Accessories" | "Home";
  status: "In Stock" | "Low Stock" | "Out of Stock";
  revenue: number;
  sales: number;
  reviews: number;
  views: number;
}

type SortField = "name" | "revenue" | "sales" | "reviews" | "views";
type SortDirection = "asc" | "desc";

const SAMPLE_DATA: Product[] = [
  {
    id: "1",
    name: "NB Men's Running Shoes",
    category: "Clothing",
    status: "In Stock",
    revenue: 29938.72,
    sales: 1572,
    reviews: 1829,
    views: 3420,
  },
  {
    id: "2",
    name: "Men's Minimalist Watch",
    category: "Accessories",
    status: "Low Stock",
    revenue: 19281.9,
    sales: 1208,
    reviews: 1227,
    views: 2983,
  },
  {
    id: "3",
    name: "Maxim Premium T-Shirt",
    category: "Clothing",
    status: "In Stock",
    revenue: 16430.63,
    sales: 1985,
    reviews: 1072,
    views: 2572,
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    category: "Electronics",
    status: "In Stock",
    revenue: 14200.5,
    sales: 850,
    reviews: 450,
    views: 1200,
  },
  {
    id: "5",
    name: "Leather Wallet",
    category: "Accessories",
    status: "Out of Stock",
    revenue: 5400.0,
    sales: 120,
    reviews: 85,
    views: 400,
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug",
    category: "Home",
    status: "In Stock",
    revenue: 2300.25,
    sales: 450,
    reviews: 120,
    views: 800,
  },
];

export function SalesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const categories = Array.from(new Set(SAMPLE_DATA.map((p) => p.category)));
  const statuses = Array.from(new Set(SAMPLE_DATA.map((p) => p.status)));

  const filteredAndSortedData = useMemo(() => {
    let filtered = SAMPLE_DATA.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(product.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [
    searchTerm,
    sortField,
    sortDirection,
    selectedCategories,
    selectedStatuses,
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  const activeFilterCount = selectedCategories.length + selectedStatuses.length;

  return (
    <Card className="col-span-full border-gray-200 bg-white">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-gray-900">Product Sales</CardTitle>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    activeFilterCount > 0
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : ""
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-700"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium leading-none">Filters</h4>
                    {activeFilterCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-gray-500 hover:text-gray-900"
                        onClick={clearFilters}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900">
                      Category
                    </h5>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900">
                      Status
                    </h5>
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => toggleStatus(status)}
                        />
                        <Label
                          htmlFor={`status-${status}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {status}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500"
          />
        </div>
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 gap-1 pl-2 pr-1 py-1"
              >
                {cat}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {selectedStatuses.map((status) => (
              <Badge
                key={status}
                variant="secondary"
                className="bg-green-50 text-green-700 hover:bg-green-100 gap-1 pl-2 pr-1 py-1"
              >
                {status}
                <button
                  onClick={() => toggleStatus(status)}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    Product
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort("revenue")}
                    className="flex items-center gap-1 justify-end hover:text-blue-600 transition-colors"
                  >
                    Revenue
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort("sales")}
                    className="flex items-center gap-1 justify-end hover:text-blue-600 transition-colors"
                  >
                    Sales
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort("reviews")}
                    className="flex items-center gap-1 justify-end hover:text-blue-600 transition-colors"
                  >
                    Reviews
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort("views")}
                    className="flex items-center gap-1 justify-end hover:text-blue-600 transition-colors"
                  >
                    Views
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 block">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          product.status === "In Stock"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : ""
                        }
                        ${
                          product.status === "Low Stock"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : ""
                        }
                        ${
                          product.status === "Out of Stock"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : ""
                        }
                      `}
                    >
                      {product.status}
                    </Badge>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="font-semibold text-green-600">
                      $
                      {product.revenue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${(product.revenue / product.sales).toFixed(2)} avg
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {product.sales.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">units</div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {product.reviews.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((product.reviews / product.views) * 100).toFixed(1)}%
                      rate
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {product.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">total views</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
