import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { FormTable } from "@/app/forms/components/form-table"; // Adjust the import path as necessary

// const forms = [
//   {
//     id: 1,
//     title: "Customer Feedback Survey",
//     description: "Collect customer satisfaction ratings and feedback",
//     responses: 127,
//     status: "active",
//     lastModified: "2 days ago",
//   },
//   {
//     id: 2,
//     title: "Employee Onboarding Form",
//     description: "New hire information and documentation",
//     responses: 23,
//     status: "active",
//     lastModified: "1 week ago",
//   },
//   {
//     id: 3,
//     title: "Event Registration",
//     description: "Annual company retreat registration",
//     responses: 89,
//     status: "draft",
//     lastModified: "3 days ago",
//   },
//   {
//     id: 4,
//     title: "Product Feature Request",
//     description: "Collect user suggestions for new features",
//     responses: 45,
//     status: "active",
//     lastModified: "5 days ago",
//   },
// ];

export default function FormsPage() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
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
        <div>
          <Card className="p-4">
            <FormTable />
          </Card>
        </div>
      </div>
    </div>
  );
}
