import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, Search, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";

interface Product {
  id: string;
  name: string;
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
    revenue: 29938.72,
    sales: 1572,
    reviews: 1829,
    views: 3420,
  },
  {
    id: "2",
    name: "Men's Minimalist Watch",
    revenue: 19281.9,
    sales: 1208,
    reviews: 1227,
    views: 2983,
  },
  {
    id: "3",
    name: "Maxim Premium T-Shirt",
    revenue: 16430.63,
    sales: 1985,
    reviews: 1072,
    views: 2572,
  },
];

export function SalesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedData = useMemo(() => {
    let filtered = SAMPLE_DATA.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  return (
    <Card className="col-span-full border-gray-200 bg-white">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-gray-900">Product Sales</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
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
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
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
