/**
 * For usage in Storybook stories to set the default value of a boolean prop.
 */
export const argsBooleanType: any = (defaultValue: string = "false") => ({
  control: { type: "boolean" },
  table: { defaultValue: { summary: defaultValue } },
});
