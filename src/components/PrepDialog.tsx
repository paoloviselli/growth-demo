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
        <div className="prose mt-4 max-h-[80vh] max-w-none overflow-y-auto">
          {error ? (
            <div className="text-destructive">{error}</div>
          ) : prepMd ? (
            <ReactMarkdown>{prepMd}</ReactMarkdown>
          ) : (
            <div className="text-muted-foreground">No prep generated.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
