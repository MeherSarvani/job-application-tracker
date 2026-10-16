"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import createJobApplication from "@/lib/actions/createJobApplication";
import { JobApplication as JobApplicationType } from "@/lib/models/model.types";
import updateJobApplication from "@/lib/actions/updateJobApplication";

export default function JobApplicationModal({
  boardId = "",
  columnId = "",
  job,
  isEditingJobApplication,
  setEditing,
  mode,
}: {
  boardId: string;
  columnId: string;
  job?: JobApplicationType;
  isEditingJobApplication?: boolean;
  setEditing?: (isEditing: boolean) => void;
  mode?: "edit" | "add";
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(
    mode === "edit"
      ? {
          jobTitle: job?.position || "",
          company: job?.company || "",
          location: job?.location || "",
          salary: job?.salary || "",
          jobUrl: job?.jobUrl || "",
          tags: job?.tags?.join(",") || "",
          description: job?.jobDescription || "",
          notes: job?.notes || "",
        }
      : {
          jobTitle: "",
          company: "",
          location: "",
          salary: "",
          jobUrl: "",
          tags: "",
          description: "",
          notes: "",
        },
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //call server action which will handle the job creation call to db
      const result = await createJobApplication({
        ...formData,
        boardId,
        columnId,
        salary: formData.salary,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .map((tag) => [...tag[0].toUpperCase(), ...tag.slice(1)].join("")),
      });
      if (!result?.error) {
        setOpen(false);
      } else {
        console.error("Failed to create job application");
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (mode === "edit" && isEditingJobApplication) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [mode, isEditingJobApplication]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting edit form with data:", formData);
    e.preventDefault();
    try {
      const updatedJobApplication = await updateJobApplication(job?._id || "", {
        ...formData,
        boardId,
        columnId,
        salary: formData.salary,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .map((tag) => [...tag[0].toUpperCase(), ...tag.slice(1)].join("")),
      });
      if (!updatedJobApplication) {
        console.error("Failed to update job application");
      } else {
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === "add" && (
        <DialogTrigger>
          <Button variant="outline">
            <Plus></Plus> Add Job
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Job Application</DialogTitle>
          <DialogDescription>Track a new application</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={
            mode === "edit" && isEditingJobApplication
              ? handleEditSubmit
              : handleSubmit
          }
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="Location">Location</Label>
            <Input
              type="text"
              id="Location"
              name="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="Salary">Salary</Label>
            <Input
              type="text"
              id="Salary"
              name="Salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              placeholder="Enter salary"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="jobUrl">Job Url</Label>
            <Input
              type="text"
              id="jobUrl"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={(e) =>
                setFormData({ ...formData, jobUrl: e.target.value })
              }
              placeholder="Enter job URL"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="tags">Tags(comma separated)</Label>
            <Input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="Enter tags separated by commas"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="resize-none border border-gray-300 rounded-md p-2"
              placeholder="Enter job description..."
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              className="resize-none border border-gray-300 rounded-md p-2"
              placeholder="Enter any additional notes..."
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditing?.(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditingJobApplication ? "Save Changes" : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
