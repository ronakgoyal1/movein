import { useBuilderStore } from "@/store/useBuilderStore";
import { colleges } from "@/data";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface CollegeStepProps {
  onNext: () => void;
}

export function CollegeStep({ onNext }: CollegeStepProps) {
  const { collegeId, setCollege } = useBuilderStore();

  const handleSelect = (id: string) => {
    setCollege(id);
  };

  return (
    <div>
      <p className="text-[0.9375rem] text-secondary mb-7">
        We'll tailor product recommendations to your hostel's specific setup.
      </p>

      <div className="flex flex-col gap-3">
        {colleges.map((col) => {
          const isSel = collegeId === col.id;
          return (
            <button
              key={col.id}
              onClick={() => handleSelect(col.id)}
              onDoubleClick={() => {
                handleSelect(col.id);
                onNext();
              }}
              className={cn(
                "flex items-center gap-4 p-5 border-[1.5px] bg-surface rounded-lg transition-all text-left group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none",
                isSel
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "border-border hover:border-accent/40 hover:shadow-sm"
              )}
            >
              <div className={cn(
                "w-11 h-11 flex items-center justify-center shrink-0 rounded-lg transition-colors",
                isSel ? "bg-accent/10 text-accent" : "bg-bg text-secondary group-hover:text-primary"
              )}>
                <Building2 strokeWidth={1.5} size={22} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[0.9375rem] mb-0.5">{col.name}</div>
                <div className="text-[0.8125rem] text-secondary truncate">{col.description}</div>
              </div>

              <div className={cn(
                "w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors",
                isSel ? "border-accent bg-accent text-white" : "border-border"
              )}>
                {isSel && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
