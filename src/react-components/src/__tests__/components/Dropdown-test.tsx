import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";

import * as Mocha from "mocha";

import Dropdown from "../../components/02-molecules/Dropdown/Dropdown";

describe("Dropdown", () => {
  let wrapper: Enzyme.ShallowWrapper<{}, {}>;
  let blurCallback;
  let changeCallback;

  beforeEach(() => {
    changeCallback = stub();
    blurCallback = stub();
  });

  it("renders Select with Label", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={false}
        labelPosition="left"
        labelText="Sort By"
        labelId="nav-sort-by"
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find("FormDropdown").dive().find("select")).to.have.lengthOf(1);
    expect(wrapper.find("Label").dive().find("label")).to.have.lengthOf(1);
  });

  it("requires ariaLabel if labelPosition is none", () => {
    expect(() => Enzyme.mount(<Dropdown
      dropdownId="dropdown"
      isRequired={false}
      labelPosition="none"
      dropdownOptions={["one", "two", "three"]}
      onSelectChange={changeCallback}
      onSelectBlur={blurCallback} />))
      .to.throw("prop ariaLabel must be passed into Dropdown when labelPosition is \"none\"");
  });

  it("does not render Label if labelPosition is none", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={false}
        labelPosition="none"
        ariaLabel="aria-label"
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find("FormDropdown").dive().find("select")).to.have.lengthOf(1);
    expect(wrapper.find("Label")).to.have.lengthOf(0);
  });

  it("rejects invalid labelPosition", () => {
    expect(() => Enzyme.mount(<Dropdown
      dropdownId="dropdown"
      isRequired={false}
      labelPosition="invalid"
      dropdownOptions={["one", "two", "three"]}
      onSelectChange={changeCallback}
      onSelectBlur={blurCallback} />))
      .to.throw("prop labelPosition must be one of \"left\", \"top\", \"none\", but Dropdown was passed invalid");
  });

  it("adds appropriate modifier if labelPosition is 'top' or 'left'", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={false}
        labelPosition="left"
        labelText="Sort By"
        labelId="nav-sort-by"
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find(".dropdown--left")).to.have.lengthOf(1);
  });

  it("renders 'required' component if Required", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={true}
        labelPosition="left"
        labelText="Sort By"
        labelId="nav-sort-by"
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find(".dropdown__required-message")).to.have.lengthOf(1);
  });

  it("renders HelperErrorText if helper passed", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={false}
        labelPosition="none"
        ariaLabel="label"
        helperContentId="helper"
        helperContent={<span>If you're unsure of your size, please see the <a href="#sizing-chart">sizing chart</a></span>}
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find("HelperErrorText")).to.have.lengthOf(1);
  });

  it("throws error if HelperContent is passed without an id", () => {
    expect(() => Enzyme.mount(<Dropdown
      dropdownId="dropdown"
      isRequired={false}
      labelPosition="none"
      ariaLabel="label"
      dropdownOptions={["one", "two", "three"]}
      helperContent={<span>If you're unsure of your size, please see the <a href="#sizing-chart">sizing chart</a></span>}
      onSelectChange={changeCallback}
      onSelectBlur={blurCallback} />))
      .to.throw("prop helperText [object Object] is passed, but it is missing prop helperTextId");
  });

  it("renders HelperErrorText if error passed", () => {
    wrapper = Enzyme.shallow(
      <Dropdown
        dropdownId="dropdown"
        isRequired={false}
        labelPosition="none"
        ariaLabel="label"
        hasError={true}
        errorContentId="error"
        errorContent={<span>Error Message Lorem Ipsum</span>}
        dropdownOptions={["one", "two", "three"]}
        onSelectChange={changeCallback}
        onSelectBlur={blurCallback} />
    );
    expect(wrapper.find("HelperErrorText")).to.have.lengthOf(1);
  });

  it("throws error if passed error with no content", () => {
    expect(() => Enzyme.mount(<Dropdown
      dropdownId="dropdown"
      isRequired={false}
      labelPosition="none"
      ariaLabel="label"
      dropdownOptions={["one", "two", "three"]}
      hasError={true}
      onSelectChange={changeCallback}
      onSelectBlur={blurCallback} />))
      .to.throw("prop hasError is true, but is missing props errorMessage (got undefined) and/or errorTextId (got undefined)");
  });
});
