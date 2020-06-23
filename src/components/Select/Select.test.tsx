import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";

import * as Mocha from "mocha";

import Select from "./Select";

describe("Select", () => {
    let wrapper: Enzyme.ReactWrapper<{}, {}>;
    let blurCallback;
    let changeCallback;

    beforeEach(() => {
        changeCallback = stub();
        blurCallback = stub();
    });

    it("Renders a Select", () => {
        wrapper = Enzyme.mount(
            <Select
                isRequired={false}
                options={["test1", "test2"]}
                onSelectChange={changeCallback}
                onSelectBlur={blurCallback}
            />
        );
        expect(wrapper.find("Select")).to.have.lengthOf(1);
    });

    // it("requires either label or aria-label", () => {
    //     expect(() =>
    //         Enzyme.mount(
    //             <Select
    //                 isRequired={false}
    //                 id="hi"
    //                 options={["test1", "test2"]}
    //                 onSelectChange={changeCallback}
    //                 onSelectBlur={blurCallback}
    //             />
    //         )
    //     ).to.throw("Must either have labelId or aria-label");
    // });

    // it("if both labelId and ariaLabel are defined, select has aria-labeledBy", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             labelId="label"
    //             ariaLabel="aria-label"
    //             isRequired={false}
    //             id="hi"
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     expect(wrapper.find("select").props()["aria-labelledby"]).to.equal(
    //         "label"
    //     );
    // });

    // it("if only aria-label is defined, select has aria-label", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             ariaLabel="aria-label"
    //             isRequired={false}
    //             id="hi"
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     expect(wrapper.find("select").props()["aria-label"]).to.equal(
    //         "aria-label"
    //     );
    // });

    // it("Form Dropdown should render an icon", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             labelId="label"
    //             isRequired={false}
    //             id="hi"
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     expect(wrapper.find("Icon")).to.have.lengthOf(1);
    // });

    // it("sends callback with value on change", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             labelId="label"
    //             isRequired={false}
    //             id="hi"
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );

    //     wrapper.find("select").simulate("change", "", { value: ["val"] });

    //     expect(changeCallback.callCount).to.equal(1);
    // });

    // it("sends callback with no value on blur", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             id="hi"
    //             labelId="label"
    //             isRequired={false}
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     wrapper.find("select").simulate("blur", "");

    //     expect(blurCallback.callCount).to.equal(1);
    // });

    // it("displays selected when passed selectedOption", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             labelId="label"
    //             isRequired={false}
    //             id="hi"
    //             selectedOption={"test2"}
    //             options={["test1", "test2"]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     expect(wrapper.find("select").props().value).to.equal("test2");
    // });

    // it("renders nothing when passed no options", () => {
    //     wrapper = Enzyme.mount(
    //         <Select
    //             id="hi"
    //             labelId="label"
    //             isRequired={false}
    //             options={[]}
    //             onSelectChange={changeCallback}
    //             onSelectBlur={blurCallback}
    //         />
    //     );
    //     expect(wrapper.getElement()).to.equal(null);
    // });
});
