import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface Product {
  id: string;
  name: string;
  revenue: number;
  sales: number;
  reviews: number;
  views: number;
}

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
  return (
    <Card className="col-span-full border-gray-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-900">Overall Sales</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Product
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Sales
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Reviews
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DATA.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 font-semibold text-gray-900">
                    $
                    {product.revenue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700">
                    {product.sales.toLocaleString()}
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700">
                    {product.reviews.toLocaleString()}
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700">
                    {product.views.toLocaleString()}
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
