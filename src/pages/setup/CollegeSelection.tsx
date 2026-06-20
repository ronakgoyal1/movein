import { useNavigate } from "react-router-dom";
import { useBuilderStore } from "@/store/useBuilderStore";
import { colleges } from "@/data";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CollegeSelection() {
  const navigate = useNavigate();
  const { collegeId, setCollege } = useBuilderStore();

  const handleSelect = (id: string) => {
    setCollege(id);
  };

  const goNext = () => {
    if (collegeId) {
      navigate("/setup/browse");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full pt-6 md:pt-12 px-4 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Which college are you joining?
        </h1>
        <p className="text-[0.9375rem] text-secondary">
          We'll tailor product recommendations to your hostel's specific setup.
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {colleges.map((col) => {
          const isSel = collegeId === col.id;
          return (
            <button
              key={col.id}
              onClick={() => handleSelect(col.id)}
              onDoubleClick={() => {
                handleSelect(col.id);
                navigate("/setup/browse");
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

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border z-10 md:static md:bg-transparent md:border-none md:p-0 md:mt-8">
        <Button 
          size="lg" 
          className="w-full md:w-auto md:px-12" 
          disabled={!collegeId} 
          onClick={goNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
