import { Button } from "@/app/components/button";

interface PreferenceFeedbackProps {
  onSelect: (liked: boolean) => void;
  liked?: boolean;
  prompt?: string;
  centered?: boolean;
}

export const PreferenceFeedback = ({
  onSelect,
  liked,
  prompt = "Did it match your preference?",
  centered = false,
}: PreferenceFeedbackProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted text-center">{prompt}</p>
      <div
        className={`flex gap-2 ${centered ? "w-full justify-center" : "justify-start"}`}
      >
        <Button
          type="button"
          onClick={() => onSelect(true)}
          variant={liked === true ? "primary" : "secondary"}
        >
          Yes
        </Button>
        <Button
          type="button"
          onClick={() => onSelect(false)}
          variant={liked === false ? "primary" : "secondary"}
        >
          No
        </Button>
      </div>
    </div>
  );
};
