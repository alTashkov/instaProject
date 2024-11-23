import { toaster } from "@/components/ui/toaster";
import { useCallback } from "react";
const useShowToast = () => {
  const showToast = useCallback((title, description, type) => {
    toaster.create({
      title: title,
      description: description,
      type: type,
      duration: 3000,
    });
  });
  return showToast;
};

export default useShowToast;
