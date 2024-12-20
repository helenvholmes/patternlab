import { VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import DatePicker, { datePickerTypesArray } from "./DatePicker";
import Heading from "../Heading/Heading";

const currentYear = new Date().getFullYear();

const meta: Meta<typeof DatePicker> = {
  title: "Components/Form Elements/DatePicker",
  component: DatePicker,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/qShodlfNCJHb8n03IFyApM/Main?node-id=11689%3A0",
    },
    jest: ["DatePicker.test.tsx"],
  },
  argTypes: {
    className: { control: false },
    dateFormat: {
      table: { defaultValue: { summary: "yyyy-MM-dd" } },
    },
    dateType: {
      control: { type: "select" },
      options: datePickerTypesArray,
      table: { defaultValue: { summary: "full" } },
    },
    id: { control: false },
    isDateRange: {
      table: { defaultValue: { summary: "false" } },
    },
    isDisabled: {
      table: { defaultValue: { summary: "false" } },
    },
    isInvalid: {
      table: { defaultValue: { summary: "false" } },
    },
    isRequired: {
      table: { defaultValue: { summary: "false" } },
    },
    key: { table: { disable: true } },
    labelText: {
      table: { defaultValue: { summary: "From" } },
    },
    nameFrom: { control: false },
    nameTo: { control: false },
    onChange: { control: false, action: "onChange" },
    ref: { table: { disable: true } },
    refTo: { control: false },
    showHelperInvalidText: {
      table: { defaultValue: { summary: "true" } },
    },
    showLabel: {
      table: { defaultValue: { summary: "true" } },
    },
    showRequiredLabel: {
      table: { defaultValue: { summary: "true" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/**
 * Main Story for the DatePicker component. This must contains the `args`
 * and `parameters` properties in this object.
 */
export const WithControls: Story = {
  args: {
    className: undefined,
    dateFormat: "yyyy-MM-dd",
    dateType: "full",
    helperText: "Note that the Library may be closed on Sundays.",
    helperTextFrom: "Select start date.",
    helperTextTo: "Select end date.",
    id: "datePicker-id",
    initialDate: `1/1/${currentYear}`,
    initialDateTo: `12/31/${currentYear}`,
    invalidText: "Please select a valid date.",
    isDateRange: false,
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    labelText: "Select the date you want to visit NYPL",
    maxDate: "1/1/2025",
    minDate: "1/1/2022",
    nameFrom: "visit-dates-from",
    nameTo: "visit-dates-to",
    refTo: undefined,
    showHelperInvalidText: true,
    showLabel: true,
    showRequiredLabel: true,
  },
  render: (args) => <DatePicker {...args} />,
  play: async ({ canvasElement }) => {
    const textInput = within(canvasElement).getByRole("textbox");

    expect(textInput).toHaveValue("2024-01-01");

    await userEvent.clear(textInput);
    await userEvent.type(textInput, "2024-05-20");
    // A short wait for the calendar popup to "catch up".
    await setTimeout(() => {}, 500);
    expect(textInput).toHaveValue("2024-05-20");
    expect(
      within(canvasElement).queryAllByText("May 2024")[0]
    ).toBeInTheDocument();

    const previousMonth = within(canvasElement).getByRole("button", {
      name: "Previous Month",
    });
    const nextMonth = within(canvasElement).getByRole("button", {
      name: "Next Month",
    });

    await userEvent.click(previousMonth);
    expect(
      within(canvasElement).queryByText("May 2024")
    ).not.toBeInTheDocument();
    expect(
      within(canvasElement).queryAllByText("April 2024")[0]
    ).toBeInTheDocument();

    await userEvent.click(nextMonth);
    await userEvent.click(nextMonth);
    expect(
      within(canvasElement).queryByText("April 2024")
    ).not.toBeInTheDocument();
    expect(
      within(canvasElement).queryAllByText("June 2024")[0]
    ).toBeInTheDocument();

    await userEvent.click(within(canvasElement).getByText("15"));
    expect(textInput).toHaveValue("2024-06-15");

    await userEvent.click(textInput);
    // June does not have 31 days, so the date should be set to
    // May 31st.
    await userEvent.click(within(canvasElement).getByText("31"));
    expect(textInput).toHaveValue("2024-05-31");
    await userEvent.click(textInput);
    // A short wait for the calendar popup to "catch up".
    await setTimeout(() => {}, 500);
    expect(
      within(canvasElement).queryAllByText("May 2024")[0]
    ).toBeInTheDocument();

    // Now try keyboard navigation
    await userEvent.keyboard("{tab}");
    expect(within(canvasElement).getByText("31")).toHaveFocus();

    await userEvent.keyboard("{arrowleft}");
    await userEvent.keyboard("{arrowleft}");
    await userEvent.keyboard("{arrowleft}");

    expect(
      within(canvasElement).getByLabelText("Choose Tuesday, May 28th, 2024")
    ).toHaveFocus();
    await userEvent.keyboard("{enter}");

    expect(textInput).toHaveValue("2024-05-28");
    expect(textInput).toHaveFocus();
  },
};

// The following are additional DatePicker example Stories.
export const DateRange: Story = {
  render: () => (
    <DatePicker
      id="date-range"
      dateFormat="yyyy-MM-dd"
      dateType="full"
      minDate="9/1/2022"
      maxDate="12/31/2023"
      labelText="Select the date range you want to visit NYPL"
      nameFrom="visit-dates-from"
      nameTo="visit-dates-to"
      helperTextFrom="From this date."
      helperTextTo="To this date."
      helperText="Select a valid date range."
      invalidText="There was an error with the date range :("
      isDateRange
    />
  ),
};

export const MonthDateInput: Story = {
  render: () => (
    <DatePicker
      id="month-date"
      dateType="month"
      labelText="Select the month you want to visit NYPL"
      helperText="Note that the Library may be closed on Sundays."
      invalidText="Please select a valid month."
    />
  ),
};

export const YearDateInput: Story = {
  render: () => (
    <DatePicker
      id="year-date"
      dateType="year"
      labelText="Select the year you want to visit NYPL"
      helperText="Note that the Library may be closed on Sundays."
    />
  ),
};

export const OtherStates: Story = {
  render: () => (
    <VStack align="stretch" spacing="s">
      <Heading level="h3" size="heading6">
        Errored State
      </Heading>
      <DatePicker
        id="invalid-date"
        dateType="full"
        labelText="Select the year you want to visit NYPL"
        helperText="Note that the Library may be closed on Sundays."
        invalidText="Please select a valid date."
        isInvalid
        isDateRange
      />
      <Heading level="h3" size="heading6">
        Disabled State
      </Heading>
      <DatePicker
        id="disabled-date"
        dateType="full"
        labelText="Select the year you want to visit NYPL"
        isDateRange
        isDisabled
      />
      <Heading level="h3" size="heading6">
        Required State
      </Heading>
      <p>
        The "required" text in the legend in the date range, or the label in a
        normaldate input, can be hidden when `showRequiredLabel` is set to
        `false`.
      </p>
      <DatePicker
        id="required-date"
        dateType="full"
        labelText="Select the year you want to visit NYPL"
        isDateRange
        isRequired
      />
    </VStack>
  ),
};

// Examples that use the `initialDate` and `initialDateTo` props and
// also the `onChange` prop to show an empty input returns null.
function InitialDateExample() {
  const onChange = (data) => {
    console.log({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  return (
    <VStack align="stretch" spacing="s">
      <DatePicker
        id="init-dates"
        dateType="full"
        labelText="Select the date you want to visit NYPL"
        initialDate="12/1/21"
        initialDateTo="12/10/21"
        isDateRange
      />
      <Heading level="h3" size="heading6">
        Passing initialDate an empty string renders an empty input
      </Heading>
      <DatePicker
        id="init-dates"
        dateType="full"
        labelText="Select the date you want to visit NYPL"
        initialDate=""
        initialDateTo=""
        isDateRange
        onChange={onChange}
      />
      <Heading level="h3" size="heading6">
        Passing no initialDate renders today's date
      </Heading>
      <DatePicker
        id="init-dates"
        dateType="full"
        labelText="Select the date you want to visit NYPL"
        isDateRange
      />
    </VStack>
  );
}

export const InitialDate: Story = {
  render: () => InitialDateExample(),
};

export const Placeholder: Story = {
  render: () => (
    <DatePicker
      id="format-date"
      dateFormat="MM-dd-yyyy"
      dateType="full"
      labelText="Select the date you want to visit NYPL"
      initialDate=""
      initialDateTo=""
      placeholder="This is placeholder text"
      placeholderTo="This is placeholderTo text"
      isDateRange
    />
  ),
};

export const DateFormat: Story = {
  render: () => (
    <DatePicker
      id="format-date"
      dateFormat="MM-dd-yyyy"
      dateType="full"
      labelText="Select the date you want to visit NYPL"
      initialDate="12/1/21"
      initialDateTo="12/10/21"
      isDateRange
    />
  ),
};

export const MaxMinDateValues: Story = {
  render: () => (
    <DatePicker
      id="max-min-dates"
      dateFormat="MM-dd-yyyy"
      dateType="full"
      labelText="Select the date you want to visit NYPL"
      minDate="1/1/2022"
      maxDate="3/1/2022"
      isDateRange
    />
  ),
};
