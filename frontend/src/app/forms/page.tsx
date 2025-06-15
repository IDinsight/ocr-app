import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Plus, FileText, Users, Calendar, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const forms = [
  {
    id: 1,
    title: "Customer Feedback Survey",
    description: "Collect customer satisfaction ratings and feedback",
    responses: 127,
    status: "active",
    lastModified: "2 days ago",
  },
  {
    id: 2,
    title: "Employee Onboarding Form",
    description: "New hire information and documentation",
    responses: 23,
    status: "active",
    lastModified: "1 week ago",
  },
  {
    id: 3,
    title: "Event Registration",
    description: "Annual company retreat registration",
    responses: 89,
    status: "draft",
    lastModified: "3 days ago",
  },
  {
    id: 4,
    title: "Product Feature Request",
    description: "Collect user suggestions for new features",
    responses: 45,
    status: "active",
    lastModified: "5 days ago",
  },
];

export default function FormsPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset
        style={{
          backgroundImage: `linear-gradient(135deg, #eefcf6 0%, #fdf6e3 100%)`,
        }}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Forms</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Your Forms</h2>
              <p className="text-muted-foreground">
                Create and manage your forms to collect data from users.
              </p>
            </div>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white transition-colors duration-200">
              <Plus className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Badge
                      variant={
                        form.status === "active" ? "default" : "secondary"
                      }
                    >
                      {form.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>View Responses</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">{form.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {form.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{form.responses} responses</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{form.lastModified}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>
                  Overview of your form performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-sm text-muted-foreground">Total Forms</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">284</div>
                    <p className="text-sm text-muted-foreground">
                      Total Responses
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-sm text-muted-foreground">
                      Active Forms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
