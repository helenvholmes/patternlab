import * as React from "react";
import bem from "../../../utils/bem";

import UnorderedList from "./UnorderedList";
import IconLink from "../../01-atoms/Links/IconLink";
import EditionCard, { EditionDetails, EditionCardProps } from "../../02-molecules/Cards/EditionCard";
import SearchResultItem from "../../02-molecules/Cards/SearchResultItem";
import UnderlineLink from "../../01-atoms/Links/UnderlineLink";
import Checkbox from "../../01-atoms/Forms/Checkbox";
import { action } from "@storybook/addon-actions";
import BasicLink from "../../01-atoms/Links/BasicLink";

export default {
  title: "UnorderedList",
  component: UnorderedList,
};

const links = [<IconLink url="#url1">Link1</IconLink>, <IconLink url="#url2">link2</IconLink>, <IconLink url="#url3">link3</IconLink>];
export const iconLinkList = () => <UnorderedList id="link-list" blockName="list-iconLink">
  {links}
</UnorderedList>;

let editionData: EditionDetails = {
  editionYearHeading: <a href="edition-link" className={bem("link", [], "heading")} >2004 Edition</a>,
  coverUrl: "https://placeimg.com/57/81/arch",
  editionInfo: [<>Published in New York by Random House</>, <>Written in English</>, <>Under Creative Commons License</>],
  readOnlineLink: <BasicLink className={bem("card-button-link", [], "edition-card")} url="blah">Read Online</BasicLink>,
  downloadLink: <IconLink iconName="download" iconPosition="left" iconModifiers={["icon-left"]} url="blah">Download</IconLink>
};

const checkboxes = [
  <Checkbox key="checkbox-1" onChange={action("changed")} checkboxId="checkbox-1" labelOptions={{ id: "checkbox-1-label", labelContent: <>Checkbox 1</> }}></Checkbox>,
  <Checkbox key="checkbox-2" onChange={action("changed")} checkboxId="checkbox-2" labelOptions={{ id: "checkbox-2-label", labelContent: <>Checkbox 2</> }}></Checkbox>,
  <Checkbox key="checkbox-3" onChange={action("changed")} checkboxId="checkbox-3" labelOptions={{ id: "checkbox-3-label", labelContent: <>Checkbox 3</> }}></Checkbox>
];
export const checkboxList = () => <UnorderedList id="checkbox-list">{checkboxes}</UnorderedList>;

const editions = [
  <EditionCard id="edition-1"
   key="edition-1"
    coverUrl={editionData.coverUrl}
    editionHeadingElement={editionData.editionYearHeading}
    editionInfo={editionData.editionInfo}
    readOnlineLink={editionData.readOnlineLink}
    downloadLink={editionData.downloadLink}
  />,
  <EditionCard id="edition-2"
    key="edition-2"
    coverUrl={editionData.coverUrl}
    editionHeadingElement={editionData.editionYearHeading}
    editionInfo={editionData.editionInfo}
    readOnlineLink={editionData.readOnlineLink}
    downloadLink={editionData.downloadLink}
  />,
  <EditionCard id="edition-3"
    key="edition-3"
    coverUrl={editionData.coverUrl}
    editionHeadingElement={editionData.editionYearHeading}
    editionInfo={editionData.editionInfo}
    readOnlineLink={editionData.readOnlineLink}
    downloadLink={editionData.downloadLink}
  />];

export const editionsList = () => <UnorderedList id="editions-list">{editions}</UnorderedList>;

let searchItemData = {
  titleElement: <a href="title-link-url" className={bem("link", ["no-underline"])}>Investigation of un-American propaganda activities in the United States. Hear...</a>,
  subtitle: <>"Subtitle need max character count Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</>,
  editionInfo: {
    editionYearHeading: <a href="edition-link" className={bem("link", [], "heading")} >2004 Edition</a>,
    publisherAndLocation: "Published in New York by Random House",
    coverUrl: "https://placeimg.com/57/81/arch",
    editionInfo: [<>Published in New York by Random House</>, <>Written in English</>, <>Under Creative Commons License</>],
    readOnlineLink: <BasicLink className={bem("card-button-link", [], "edition-card")} url="blah">Read Online</BasicLink>,
    downloadLink: <IconLink iconName="download" iconPosition="left" iconModifiers={["icon-left"]} url="blah">Download</IconLink>
  },
  authorElement: <UnderlineLink url={"author-url"}>First Last</UnderlineLink>,
  editionsLinkElement: <UnderlineLink url={"#allEditionsUrl"}>{`View All 7 editions`}</UnderlineLink>
};

const searchResults =
  [
    <SearchResultItem
      key="search-result-item-1"
      id="search-result-item-1"
      resultIndex={1}
      headingContent={searchItemData.titleElement}
      subtitleContent={searchItemData.subtitle}
      authorLinkElement={searchItemData.authorElement}
      editionInfo={searchItemData.editionInfo}
      editionsLinkElement={searchItemData.editionsLinkElement} />,
    <SearchResultItem
      key="search-result-item-2"
      id="search-result-item-2"
      resultIndex={2}
      headingContent={searchItemData.titleElement}
      subtitleContent={searchItemData.subtitle}
      authorLinkElement={searchItemData.authorElement}
      editionInfo={searchItemData.editionInfo}
      editionsLinkElement={searchItemData.editionsLinkElement} />
  ];

export const searchResultsList = () => <UnorderedList id="search-results-list">{searchResults}</UnorderedList>;

let textList: JSX.Element[] = [];

for (let i = 0; i < 100; i++) {
  textList.push(<span key={i}>Hello</span>);
}
export const textListWithScroll = () => <UnorderedList id="text-list-scroll" modifiers={["scroll"]}>{textList}</UnorderedList>;
