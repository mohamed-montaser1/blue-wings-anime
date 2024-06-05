import { useEffect } from "react";

export default function useAsk(condition: boolean, message?: string) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (condition) {
        event.preventDefault();
        const msg = message ?? "اذا غادرت لن يتم حفظ التغييرات التي قمت بها";
        event.returnValue = msg;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [condition]);
}
