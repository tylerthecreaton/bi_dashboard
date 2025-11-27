import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, Eye } from "lucide-react";
import { useState } from "react";
import { ProjectDetailModal } from "./ProjectDetailModal";

interface Project {
  id: string;
  name: string;
  client: string;
  status: "on-track" | "at-risk" | "delayed" | "completed";
  progress: number;
  startDate: string;
  endDate: string;
  value: number;
  vertical: string;
  businessType: "project" | "services" | "distribute";
}

const SAMPLE_DATA: Project[] = [
  {
    id: "1",
    name: "Digital Transformation Platform",
    client: "ABC Corporation",
    status: "on-track",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    value: 2500000,
    vertical: "Banking",
    businessType: "project"
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    client: "XYZ Industries",
    status: "at-risk",
    progress: 45,
    startDate: "2024-03-01",
    endDate: "2024-11-30",
    value: 1800000,
    vertical: "Manufacturing",
    businessType: "services"
  },
  {
    id: "3",
    name: "ERP Implementation",
    client: "DEF Holdings",
    status: "delayed",
    progress: 30,
    startDate: "2024-02-01",
    endDate: "2024-09-30",
    value: 3200000,
    vertical: "Retail",
    businessType: "project"
  },
  {
    id: "4",
    name: "Security Audit Services",
    client: "GHI Tech",
    status: "completed",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    value: 850000,
    vertical: "Healthcare",
    businessType: "services"
  },
  {
    id: "5",
    name: "Data Analytics Platform",
    client: "JKL Solutions",
    status: "on-track",
    progress: 60,
    startDate: "2024-04-01",
    endDate: "2025-01-31",
    value: 1500000,
    vertical: "Finance",
    businessType: "project"
  }
];

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "on-track":
      return "bg-green-100 text-green-800 border-green-200";
    case "at-risk":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "delayed":
      return "bg-red-100 text-red-800 border-red-200";
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: Project["status"]) => {
  switch (status) {
    case "on-track":
      return "ตามแผน";
    case "at-risk":
      return "เสี่ยง";
    case "delayed":
      return "ล่าช้า";
    case "completed":
      return "เสร็จสิ้น";
    default:
      return "ไม่ทราบ";
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 75) return "bg-green-500";
  if (progress >= 50) return "bg-yellow-500";
  if (progress >= 25) return "bg-orange-500";
  return "bg-red-500";
};

export function ProjectStatusTable() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="col-span-full border-gray-200 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-900">ภาพรวมสถานะโปรเจค</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            กรอง
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            ส่งออก
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  ชื่อโปรเจค
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  ลูกค้า
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  สถานะ
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  ความคืบหน้า
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  ระยะเวลา
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  มูลค่า
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DATA.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {project.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {project.vertical} • {project.businessType}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {project.client}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge className={`border ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              project.progress
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 min-w-[40px] text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="text-gray-900">
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      <div className="text-gray-500">
                        to {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 font-semibold text-gray-900">
                    $
                    {project.value.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-gray-600 hover:text-gray-900"
                      onClick={() => handleViewProject(project)}
                    >
                      <Eye className="w-4 h-4" />
                      ดู
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* สรุปสถานะ */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">ตามแผน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">เสี่ยง</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">ล่าช้า</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">เสร็จสิ้น</div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  );
}