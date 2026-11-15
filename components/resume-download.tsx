"use client";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-sdk/react/alert-dialog";
import { Download, FileText } from "lucide-react";
import { resume, site } from "@/content/site";

// Runs inside the "Download" press, so the browser treats it as a user-started download.
function downloadResume() {
  const link = document.createElement("a");
  link.href = resume.href;
  link.download = resume.fileName;
  document.body.append(link);
  link.click();
  link.remove();
}

const triggerStyles = {
  // Matches the bordered social buttons in the navbar.
  icon: "flex size-8 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
  // Matches the plain social icons in the mobile Menu drawer.
  menu: "flex size-8 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
};

export function ResumeDownload({ variant, className = "" }: { variant: "icon" | "menu"; className?: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger aria-label="Download resume" className={`${triggerStyles[variant]} ${className}`}>
        <Download aria-hidden="true" strokeWidth={1.75} className={variant === "icon" ? "size-3.5" : "size-4"} />
      </AlertDialogTrigger>
      <AlertDialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <AlertDialogContent className="fixed inset-0 m-auto h-fit w-[min(calc(100vw-2rem),24rem)] border border-border bg-popover p-6 text-popover-foreground shadow-xl transition-[opacity,translate,scale] duration-200 ease-out data-ending-style:translate-y-2 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center border border-border bg-muted text-link">
            <FileText aria-hidden="true" strokeWidth={1.75} className="size-5" />
          </span>
          <div className="min-w-0">
            <AlertDialogTitle className="text-[1rem] leading-snug font-semibold">
              Download {site.name}’s resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
              A PDF with my experience, skills and projects.
            </AlertDialogDescription>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <AlertDialogClose className="h-9 cursor-pointer rounded-lg border border-border px-4 text-[0.85rem] font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            No, thanks
          </AlertDialogClose>
          <AlertDialogClose
            value="confirm"
            action={downloadResume}
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 text-[0.85rem] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
            Yes, download
          </AlertDialogClose>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
