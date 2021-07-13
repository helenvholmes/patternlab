import * as React from "react";
import bem from "../../utils/bem";
import { ListTypes } from "./ListTypes";
import Heading from "../Heading/Heading";

interface DefinitionProps {
  term: string;
  definition: string;
}
export interface ListProps {
  /** BlockName for use with BEM. See how to work with blockNames and
   * BEM here: http://getbem.com/introduction/ */
  blockName?: string;
  /** ClassName you can add in addition to 'list' */
  className?: string;
  /** ID that other components can cross reference for accessibility purposes */
  id?: string;
  /** Modifiers array for use with BEM. See how to work with modifiers and
   * BEM here: http://getbem.com/introduction/ */
  modifiers?: any[];
  /** An optional title that will appear over the list. This prop only applies
   * to Definition Lists. */
  title?: string;
  /** Ordered, Unordered, or Definition */
  type: ListTypes;
  /** Data to render if children are not passed. For `ListTypes.Ordered` and
   * `ListTypes.Unordered` `List` types, the data structure is an array of
   * strings to renders as `li` items. For `ListTypes.Definition` `List` types,
   * the data structure is an array of objects with `term` and `definition`
   * properties to render `dt` and `dd` elements, respectively.
   */
  listItems?: (string | DefinitionProps)[];
}

/** A component that renders list item `li` elements or definition item `dt`
 * and `dd` elements based on the `listType` prop. */
export default function List(props: React.PropsWithChildren<ListProps>) {
  const {
    blockName,
    children,
    className,
    id,
    modifiers = [],
    type,
    title,
    listItems,
  } = props;

  const baseClass = "list";
  let listTag;
  let errorText = "";
  let childrenToRender;

  switch (type) {
    case ListTypes.Ordered:
      errorText = "Direct children of `List` (ordered) should be `<li>`s";
      React.Children.map(children, function (child: React.ReactElement) {
        if (child.type !== "li" && child.props.mdxType !== "li") {
          throw new Error(errorText);
        }
      });
      if (!children) {
        childrenToRender = listItems.map((item, i) => <li key={i}>{item}</li>);
      }
      listTag = (
        <ol
          id={id}
          className={bem(baseClass, modifiers, blockName, [className])}
        >
          {childrenToRender || children}
        </ol>
      );
      break;
    case ListTypes.Unordered:
      errorText = "Direct children of `List` (unordered) should be `<li>`s";
      React.Children.map(children, function (child: React.ReactElement) {
        if (child.type !== "li" && child.props.mdxType !== "li") {
          throw new Error(errorText);
        }
      });
      if (!children) {
        childrenToRender = listItems.map((item, i) => <li key={i}>{item}</li>);
      }
      listTag = (
        <ul
          id={id}
          className={bem(baseClass, modifiers, blockName, [className])}
        >
          {childrenToRender || children}
        </ul>
      );
      break;
    case ListTypes.Definition:
      errorText =
        "Direct children of `List` (definition) should be `<dt>`s or `<dd>`s";
      React.Children.map(children, function (child: React.ReactElement) {
        if (
          child.type !== "dt" &&
          child.type !== "dd" &&
          child.type !== React.Fragment &&
          child.props.mdxType !== "dt" &&
          child.props.mdxType !== "dd" &&
          child.props.mdxType !== React.Fragment
        ) {
          throw new Error(errorText);
        }
      });
      if (!children) {
        childrenToRender = (listItems as DefinitionProps[]).map((item, i) => [
          <dt key={`${i}-term`}>{item.term}</dt>,
          <dd key={`${i}-def`}>{item.definition}</dd>,
        ]);
      }
      listTag = (
        <section
          id={id}
          className={bem("definition-list", modifiers, baseClass)}
        >
          {title && (
            <Heading id={`${id}-heading`} level={2}>
              {title}
            </Heading>
          )}
          <dl>{childrenToRender || children}</dl>
        </section>
      );
      break;
  }

  return listTag;
}
