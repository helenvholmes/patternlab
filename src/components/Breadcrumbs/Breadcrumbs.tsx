import * as React from "react";
import bem from "../../utils/bem";
import Icon from "../Icons/Icon";

type breadcrumb = { url: string; text: string };

function isTextBreadcrumb(obj: breadcrumb | JSX.Element): obj is breadcrumb {
    return typeof (obj as breadcrumb).url === "string";
}

export interface BreadcrumbProps {
    breadcrumbs: breadcrumb[] | JSX.Element[];
}

export default class Breadcrumbs extends React.Component<BreadcrumbProps, {}> {
    static defaultProps = {};

    render(): JSX.Element {
        const { breadcrumbs } = this.props;

        const breadcrumbs__base_class = "breadcrumbs";

        const breadcrumbItems = [];

        if (!breadcrumbs || breadcrumbs.length === 0) {
            throw new Error(
                "Breadcrumbs must contain a set of links. Breadcrumbs currently empty"
            );
        }
        breadcrumbs.forEach((item: breadcrumb | JSX.Element, index: number) => {
            const last = index === breadcrumbs.length - 1;
            let linkComponent: string | JSX.Element;

            if (isTextBreadcrumb(item)) {
                linkComponent = item.url ? (
                    <a
                        href={item.url}
                        className={bem("link", [], breadcrumbs__base_class)}
                    >
                        {item.text}
                    </a>
                ) : (
                    item.text
                );
            } else {
                const props = {
                    className: bem("link", [], breadcrumbs__base_class),
                };
                linkComponent = React.createElement(
                    item.type,
                    { ...props, ...item.props },
                    item.props.children
                );
            }
            breadcrumbItems.push(
                <li
                    key={`${breadcrumbs__base_class}-${index}`}
                    className={bem("item", [], breadcrumbs__base_class)}
                >
                    {last && (
                        <Icon
                            name="arrow_xsmall"
                            blockName={breadcrumbs__base_class}
                            modifiers={["small"]}
                            decorative={true}
                        />
                    )}
                    {linkComponent}
                </li>
            );
        });

        return (
            <nav
                className={bem(breadcrumbs__base_class)}
                role="navigation"
                aria-label="Breadcrumbs"
            >
                <ul className={bem("list", [], breadcrumbs__base_class)}>
                    {breadcrumbItems}
                </ul>
            </nav>
        );
    }
}
