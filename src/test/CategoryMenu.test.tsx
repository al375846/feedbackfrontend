import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import jsdom from "jsdom";

import CategoryMenu from "../modules/publications/publicationlist/CategoryMenu";

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p></p>`);
dom.window.document
let container: Element | DocumentFragment | null = null;
beforeEach(() => {
    container = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    dom.window.document.body.removeChild(container!)
    container = null;
});

it("Categories div is loading", () => {

    const setSelected = jest.fn(x => x);

    const menu = <CategoryMenu setSelected={setSelected} selected={1}/>

    act(() => {
      render(menu, container);
    });

    const scrollRight = dom.window.document.getElementById('scroll-right') as HTMLDivElement;
    expect(scrollRight).toBeDefined();

    const categoriesScroll = dom.window.document.getElementById('categories-scroll') as HTMLDivElement;
    expect(categoriesScroll).toBeDefined();

    const catAll = dom.window.document.getElementById('cat-2')!;
    expect(catAll).toBeDefined();

    const scrollLeft = dom.window.document.getElementById('scroll-left') as HTMLDivElement;
    expect(scrollLeft).toBeDefined();
});

it("Categories setLoading works", () => {

    const setSelected = jest.fn(x => x);

    const menu = <CategoryMenu setSelected={setSelected} selected={1}/>

    act(() => {
        render(menu, container);
    });

    const catAll = dom.window.document.getElementById('cat-2')!;
    act(() => {
        catAll.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

    expect(setSelected.mock.calls.length).toEqual(1);
});