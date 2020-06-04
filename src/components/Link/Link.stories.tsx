import * as React from "react";

import Link from "./Link";
import { LinkTypes } from "./LinkTypes";
import Icon from "../Icons/Icon";
import { IconRotationTypes } from "../Icons/IconTypes";

export default {
    title: "Link",
    component: Link,
};

export const passedInLink = () => (
    <Link linkType={LinkTypes.Default}>
        <a href="#passed-in-link">I&apos;m cold</a>
    </Link>
);

export const generatedLink = () => (
    <Link href="#passed-in-link" linkType={LinkTypes.Default}>
        I am very cold
    </Link>
);

export const buttonLink = () => (
    <Link linkType={LinkTypes.Button} href="#passed-in-link">
        I am very cold
    </Link>
);

export const forwardsLink = () => (
    <Link linkType={LinkTypes.Forwards}>
        <a href="#passedinlink">content</a>
    </Link>
);

export const backwardsLink = () => (
    <Link href="#passed-in-link" linkType={LinkTypes.Backwards}>
        content
    </Link>
);

export const actionLinkWithDownloadIcon = () => (
    <Link href="#passed-in-link" linkType={LinkTypes.Action}>
        <Icon
            name="download"
            blockName="more-link"
            modifiers={["left"]}
            decorative={true}
            iconRotation={IconRotationTypes.rotate0}
        ></Icon>
        Download
    </Link>
);
