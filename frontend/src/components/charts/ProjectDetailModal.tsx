import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, DollarSign, Building, TrendingUp } from "lucide-react";

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

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {project.name}
          </DialogTitle>
          <DialogDescription>
            รายละเอียดโปรเจคสำหรับลูกค้า {project.client}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building className="w-4 h-4" />
                ลูกค้า
              </div>
              <p className="text-sm text-gray-900">{project.client}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TrendingUp className="w-4 h-4" />
                สถานะ
              </div>
              <Badge className={`border ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4" />
                ระยะเวลาโปรเจค
              </div>
              <p className="text-sm text-gray-900">
                {new Date(project.startDate).toLocaleDateString('th-TH')} - {new Date(project.endDate).toLocaleDateString('th-TH')}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4" />
                มูลค่าโปรเจค
              </div>
              <p className="text-sm font-semibold text-gray-900">
                ${project.value.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TrendingUp className="w-4 h-4" />
              ความคืบหน้า
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">ประเภทธุรกิจ</div>
              <p className="text-sm text-gray-900">
                {project.vertical} • {project.businessType === 'project' ? 'โปรเจค' : project.businessType === 'services' ? 'บริการ' : 'จำหน่าย'}
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            ปิด
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}