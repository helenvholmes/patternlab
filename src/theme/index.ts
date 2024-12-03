/** Global theme styles */
import global from "./foundations/global";
import breakpoints from "./foundations/breakpoints";
import colors from "./foundations/colors";
import radii from "./foundations/radii";
import shadows from "./foundations/shadows";
import { spacing } from "./foundations/spacing";
import typography from "./foundations/typography";
/** Component styles */
import Accordion from "./components/accordion";
import AlphabetFilter from "./components/alphabetFilter";
import AudioPlayer from "./components/audioPlayer";
import Banner from "./components/banner";
import Breadcrumb from "./components/breadcrumb";
import Button from "./components/button";
import ButtonGroup from "./components/buttonGroup";
import Checkbox from "./components/checkbox";
import ComponentWrapper from "./components/componentWrapper";
import CheckboxGroup from "./components/checkboxGroup";
import CustomSelect from "./components/select";
import CustomSlider from "./components/slider";
import CustomTable from "./components/customTable";
import DatePicker from "./components/datePicker";
import FeedbackBox from "./components/feedbackBox";
import FeaturedContent from "./components/featuredContent";
import Fieldset from "./components/fieldset";
import FilterBar from "./components/filterBar";
import FilterBarPopup from "./components/filterBarPopup";
import Heading from "./components/heading";
import Header from "./components/header";
import HeaderLogin from "./components/headerLogin";
import HeaderLoginButton from "./components/headerLoginButton";
import HeaderLowerNav from "./components/headerLowerNav";
import HeaderMobileIconNav from "./components/headerMobileIconNav";
import HeaderMobileNav from "./components/headerMobileNav";
import HeaderMobileNavButton from "./components/headerMobileNavButton";
import HeaderSearchButton from "./components/headerSearchButton";
import HeaderSearchForm from "./components/headerSearchForm";
import HeaderSitewideAlerts from "./components/headerSitewideAlerts";
import HeaderUpperNav from "./components/headerUpperNav";
import HelperErrorText from "./components/helperErrorText";
import Hero from "./components/hero";
import HorizontalRule from "./components/horizontalRule";
import Icon from "./components/icon";
import Label from "./components/label";
import Link from "./components/link";
import List from "./components/list";
import Logo from "./components/logo";
import Menu from "./components/menu";
import Modal from "./components/modal";
import MultiSelect from "./components/multiSelect";
import MultiSelectItemsCountButton from "./components/multiSelectItemsCountButton";
import NewsletterSignup from "./components/newsletterSignup";
import Notification from "./components/notification";
import NotificationContent from "./components/notificationContent";
import NotificationHeading from "./components/notificationHeading";
import Pagination from "./components/pagination";
import ProgressIndicator from "./components/progressIndicator";
import Radio, { RadioWrapper } from "./components/radio";
import RadioGroup from "./components/radioGroup";
import ReservoirCard from "./components/card";
import { ReservoirImage, ReservoirImageWrapper } from "./components/image";
import SearchBar from "./components/searchBar";
import SkeletonLoader from "./components/skeletonLoader";
import SkipNavigation from "./components/skipNavigation";
import StatusBadge from "./components/statusBadge";
import StructuredContent from "./components/structuredContent";
import StyledList from "./components/styledList";
import SocialMediaLinks from "./components/socialmedialinks";
import { SubNav, SubNavChildren } from "./components/subnav";
import Tabs from "./components/tabs";
import TagSetStyles from "./components/tagSet";
import TemplateStyles from "./components/template";
import TemplateNewStyles from "./components/templatenew";
import Text from "./components/text";
import TextInput from "./components/textInput";
import Toggle from "./components/toggle";
import Tooltip from "./components/tooltip";
import VideoPlayer from "./components/videoPlayer";

/**
 * See Chakra default theme for shape of theme object:
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme
 *
 * The following are using the default configuration from Chakra:
 *   - z-indices
 *   - radii
 *   - blur
 *   - shadows
 *   - borders
 *   - transitions
 *
 * Theme extensions exist for:
 *   - breakpoints
 *   - colors
 *   - typography (font, font size, font weight)
 *   - spacing
 */
const theme: any = {
  styles: { global },
  breakpoints,
  colors,
  radii,
  shadows,
  space: spacing,
  ...typography,
  /**
   * Chakra documentation on component styles:
   * https://chakra-ui.com/docs/theming/component-style
   */
  components: {
    Accordion,
    AlphabetFilter,
    AudioPlayer,
    Banner,
    CustomBreadcrumb: Breadcrumb,
    CustomButton: Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    ComponentWrapper,
    CustomSelect,
    DatePicker,
    FeedbackBox,
    FeaturedContent,
    Fieldset,
    FilterBar,
    FilterBarPopup,
    Heading,
    Header,
    HeaderLogin,
    HeaderLoginButton,
    HeaderLowerNav,
    HeaderMobileIconNav,
    HeaderMobileNav,
    HeaderMobileNavButton,
    HeaderSearchButton,
    HeaderSearchForm,
    HeaderSitewideAlerts,
    HeaderUpperNav,
    HelperErrorText,
    Hero,
    HorizontalRule,
    Label,
    Link,
    ReservoirList: List,
    Logo,
    Menu,
    Modal,
    MultiSelect,
    MultiSelectItemsCountButton,
    Notification,
    NotificationContent,
    NotificationHeading,
    NewsletterSignup,
    Pagination,
    ProgressIndicator,
    Radio,
    RadioGroup,
    RadioWrapper,
    ...ReservoirCard,
    ReservoirIcon: Icon,
    ReservoirImage,
    ReservoirImageWrapper,
    SearchBar,
    SkeletonLoader,
    SkipNavigation,
    CustomSlider,
    StatusBadge,
    StructuredContent,
    StyledList,
    SocialMediaLinks,
    SubNav,
    SubNavChildren,
    Tabs,
    CustomTable,
    ...TagSetStyles,
    ...TemplateStyles,
    ...TemplateNewStyles,
    Text,
    TextInput,
    ...Toggle,
    Tooltip,
    VideoPlayer,
  },
  config: {
    // Use `cssVarPrefix` to set the prefix used on the CSS vars produced by
    // Chakra. By default, Chakra prefixes its own CSS variables with `--chakra`.
    cssVarPrefix: "nypl",
    // Start off in the "light" mode.
    initialColorMode: "light",
    // Don't use the user's system preference. Once the Reservoir
    // has better dark mode variants for its components, this
    // value can be set to true.
    useSystemColorMode: false,
  },
};

export default theme;
