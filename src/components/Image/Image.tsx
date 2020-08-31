// Images
import * as React from "react";
import bem from "../../utils/bem";

export interface ImageProps {
    /** Text description of the image */
    alt: string;
    /** Additional attributes passed to the image */
    attributes?: {};
    /** BlockName for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
    blockName?: string;
    /** ClassName you can add in addition to 'image' */
    className?: string;
    /** Adding will wrap the image in a <figure> */
    imageCaption?: string;
    /** Adding will wrap the image in a <figure> */
    imageCredit?: string;
    /** Decorative images are skipped by screenreaders */
    isDecorative: boolean;
    /** Modifiers array for use with BEM. See how to work with modifiers and BEM here: http://getbem.com/introduction/ */
    modifiers?: string[];
    /** Note */
    onError?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    /** The src attribute is required, and contains the path to the image you want to embed. */
    src: string;
}

export default function Image(props: ImageProps) {
    const image_base_class = "image";
    const {
        alt,
        attributes,
        blockName,
        className,
        imageCaption,
        imageCredit,
        isDecorative,
        modifiers,
        src,
    } = props;

    if (!isDecorative && !alt) {
        throw new Error("If image is decorative, alt text is required");
    }

    if (alt && alt.length > 300) {
        throw new Error("Alt Text must be less than 300 characters");
    }

    let figureBlockName = imageCaption || imageCredit ? "figure" : blockName;

    let imageProps = {
        className: bem(image_base_class, modifiers, figureBlockName, [
            className,
        ]),
        src: src,
        alt: isDecorative ? "" : alt,
    };

    return (
        <>
            {imageCaption || imageCredit ? (
                <figure className={bem("figure")}>
                    <img {...imageProps} />
                    <figcaption
                        className={bem("figcaption", [], "figure", ["image"])}
                    >
                        {imageCaption && (
                            <div className={bem("caption", [], "figcaption")}>
                                {imageCaption}
                            </div>
                        )}
                        {imageCredit && (
                            <div className={bem("credit", [], "figcaption")}>
                                {imageCredit}
                            </div>
                        )}
                    </figcaption>
                </figure>
            ) : (
                <img {...imageProps} {...attributes} />
            )}
        </>
    );
}
