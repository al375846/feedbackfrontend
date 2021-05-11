import React, { useState } from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CategoryMenu from "../modules/publications/publicationlist/CategoryMenu";

let container: Element | DocumentFragment | null = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container!);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    document.body.removeChild(container!)
    container = null;
});

it("Categories div is loading", () => {

    const menu = <CategoryMenu onSelectedChange={() => {}} selected={1}/>

    act(() => {
      render(menu, container);
    });

    const scrollRight = document.getElementById('scroll-right') as HTMLDivElement;
    expect(scrollRight).toBeDefined();

    const categoriesScroll = document.getElementById('categories-scroll') as HTMLDivElement;
    expect(categoriesScroll).toBeDefined();

    const catAll = document.getElementById('cat-2') as HTMLElement;
    expect(catAll).toBeDefined();

    const scrollLeft = document.getElementById('scroll-left') as HTMLDivElement;
    expect(scrollLeft).toBeDefined();
});

it("Change the category of category menu", () => {

    const onSelectedChange = jest.fn();

    const menu = <CategoryMenu onSelectedChange={onSelectedChange} selected={1}/>

    act(() => {
      render(menu, container);
    });

    const catAll = document.getElementById('cat-2') as HTMLElement

    act(() => {
        catAll.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onSelectedChange).toHaveBeenCalledTimes(1);
});