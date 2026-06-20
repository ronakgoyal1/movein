import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useBuilderStore } from "@/store/useBuilderStore";
import { ChevronLeft } from "lucide-react";
import { FloatingCart } from "@/components/builder/FloatingCart";

const STEPS = [
  { path: "/setup", title: "College" },
  { path: "/setup/browse", title: "Build Setup" },
  { path: "/setup/review", title: "Review" },
  { path: "/setup/delivery", title: "Confirm" },
];

export function ConfiguratorLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { collegeId, cart, meetsMinimum } = useBuilderStore();

  const stepIndex = STEPS.findIndex(s => s.path === pathname) === -1 ? 0 : STEPS.findIndex(s => s.path === pathname);

  // Route Guards
  useEffect(() => {
    if (pathname === "/setup/browse" && !collegeId) {
      navigate("/setup", { replace: true });
    }
    if (pathname === "/setup/review" && (!collegeId || cart.length === 0)) {
      navigate("/setup/browse", { replace: true });
    }
    if (pathname === "/setup/delivery" && (!collegeId || cart.length === 0 || !meetsMinimum())) {
      navigate("/setup/review", { replace: true });
    }
  }, [pathname, collegeId, cart.length, meetsMinimum, navigate]);

  return (
    <div className="flex flex-col h-[100svh] overflow-hidden bg-bg">
      {/* Header */}
      <div className="px-4 pt-4 pb-4 md:pt-8 md:pb-6 md:px-8 border-b border-border shrink-0 bg-surface z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {stepIndex > 0 && (
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <div>
              <p className="text-[0.6875rem] text-secondary uppercase tracking-widest">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
              <p className="text-[0.9375rem] font-semibold text-primary">
                {STEPS[stepIndex].title}
              </p>
            </div>
          </div>
          
          <Link
            to="/"
            className="text-[0.8125rem] text-secondary font-medium hover:text-primary transition-colors"
          >
            Exit
          </Link>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div key={s.path} className="flex items-center gap-1.5 flex-1">
              <div
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < stepIndex
                    ? "bg-accent"
                    : i === stepIndex
                    ? "bg-primary"
                    : "bg-border"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <Outlet />
      </div>

      {/* Floating Cart (Only on Browse Page) */}
      {pathname === "/setup/browse" && <FloatingCart />}
    </div>
  );
}
