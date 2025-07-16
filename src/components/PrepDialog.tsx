import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';

interface PrepDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  prepMd: string | null;
  error: string | null;
}

function stripCodeBlock(md: string | null): string {
  if (!md) return '';
  const trimmed = md.trim();
  // If it's a code block, extract the content inside
  const match = trimmed.match(/^```(?:markdown)?\n?([\s\S]*?)\n?```$/i);
  if (match) return match[1].trim();
  return trimmed;
}

export default function PrepDialog({
  open,
  setOpen,
  prepMd,
  error,
}: PrepDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Meeting Prep</DialogTitle>
        </DialogHeader>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="prose mt-4 max-h-[80vh] max-w-none space-y-4 overflow-y-auto p-6 pr-[4px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            {error ? (
              <div className="text-destructive">{error}</div>
            ) : prepMd ? (
              <ReactMarkdown>{stripCodeBlock(prepMd)}</ReactMarkdown>
            ) : (
              <div className="text-muted-foreground">No prep generated.</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
