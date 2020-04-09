
import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import * as Mocha from "mocha";

import HelperErrorText from "../../components/01-atoms/Forms/HelperErrorText";

describe("HelperErrorText Test", () => {
  it("Renders HelperErrorText", () => {
    const container = Enzyme.mount(<HelperErrorText id="helperTextWithLink"
    isError={false}>Text</HelperErrorText>);
    expect(container.exists("#helperTextWithLink")).to.equal(true);
  });
});
