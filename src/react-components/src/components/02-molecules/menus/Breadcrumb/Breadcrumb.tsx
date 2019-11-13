import * as React from "react";
import bem from "../../../../utils/bem";

export type breadcrumb = { url: string, text: string };
export interface BreadcrumbProps {
  breadcrumbs: breadcrumb[];
  className?: string;
}


export default class Breadcrumb extends React.Component<BreadcrumbProps, {}> {
  static defaultProps = {};

  constructor(props: BreadcrumbProps) {
    super(props);
  }

  render(): JSX.Element {

    const { breadcrumbs, className } = this.props;

    let breadcrumbs__base_class = "breadcrumbs";

    let bcrumbClassName = `breadcrumb${className ? `${className}` : ""}`;
    let bcrumbItems = [];

    breadcrumbs.forEach((item: breadcrumb, index: number) => {
      let linkContent: string | JSX.Element = item.url ? <a href={item.url} className={bem("link", [], breadcrumbs__base_class)}>{item.text}</a> : item.text;

      bcrumbItems.push(<li key={`breadcrumb-${index}`} className={bem("item", [], breadcrumbs__base_class)} >
        {linkContent}
      </ li >);
    });

    return (
      <nav
        role="navigation"
        aria-label="Breadcrumbs"
      >
        <ul className={bem(breadcrumbs__base_class)}>
          {bcrumbItems}
        </ul>
      </nav>);
  }
}
