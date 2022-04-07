import * as React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

import { StatusBadgeTypes } from "./StatusBadgeTypes";
export interface StatusBadgeProps {
  /** Additional class for the component */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Level of the status badge through StatusBadgeTypes. Defaults to
   * `StatusBadgeTypes.Low`. */
  level?: StatusBadgeTypes;
}

function StatusBadge(props: React.PropsWithChildren<StatusBadgeProps>) {
  const { children, className, id, level = StatusBadgeTypes.Low } = props;
  const styles = useStyleConfig("StatusBadge", { variant: level });

  if (!children) {
    console.warn("NYPL Reservoir StatusBadge: No children were passed.");
  }

  return (
    <Box id={id} className={className} __css={styles}>
      {children}
    </Box>
  );
}

export default StatusBadge;
