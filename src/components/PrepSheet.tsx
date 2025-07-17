import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import ReactMarkdown from 'react-markdown';
import posthog from 'posthog-js';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface PrepSheetProps {
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

export default function PrepSheet({
  open,
  setOpen,
  prepMd,
  error,
}: PrepSheetProps) {
  const showChatButton = posthog.isFeatureEnabled('meeting-brief-to-chat');

  useEffect(() => {
    if (showChatButton && open) {
      posthog.capture('chat_button_shown', {
        ui_variant: 'sheet',
        feature_flag: 'meeting-brief-to-chat',
      });
    }
  }, [showChatButton, open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full max-w-lg flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Meeting Prep</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <div className="prose mt-4 h-full max-w-none space-y-4 overflow-y-auto border-t border-zinc-200 p-6 pr-[4px] pb-24 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent">
            {error ? (
              <div className="text-destructive">{error}</div>
            ) : prepMd ? (
              <ReactMarkdown>{stripCodeBlock(prepMd)}</ReactMarkdown>
            ) : (
              <div className="text-muted-foreground">No prep generated.</div>
            )}
          </div>
        </div>
        {showChatButton && (
          <div className="sticky bottom-0 left-0 z-10 flex w-full justify-end border-t border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Button
              onClick={() => {
                posthog.capture('chat_with_ai_clicked', {
                  ui_variant: 'sheet',
                  feature_flag: 'meeting-brief-to-chat',
                });
                /* your handler here */
              }}
            >
              Chat with AI
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
