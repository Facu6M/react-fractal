import "../toasts.css";
import { Toaster } from "sonner";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        richColors
        position="bottom-center"
        theme="light"
        duration={3000}
      />
    </>
  );
}
