import { useEffect } from "react";

/**
 * Close dropdowns when clicking outside of them or by pressing
 * the escape key. It expects an action callback that will set
 * the dropdown state to false (close).
 */
const useCloseDropDown = (
  actionCb: (val: boolean) => void,
  ref: React.RefObject<HTMLDivElement>
) => {
  // Listen for keydown events on the document for the escape key.
  useEffect(() => {
    const close = (e) => {
      const key = e.key || e.keyCode;
      if (key === "Escape" || key === "Esc" || key === 27) {
        actionCb(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for click events on the document outside of the
  // element that the `ref` prop points to.
  useOutsideClick({
    ref,
    handler: () => actionCb(false),
  });
};

export default useCloseDropDown;
