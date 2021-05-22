import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FavouriteCategoryCard from "../modules/favcategories/components/FavouriteCategoryCard";
import { CategoryRaw } from "../entities/Category";

let container: Element | DocumentFragment | null = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    document.body.removeChild(container!)
    container = null;
});

it("Renders an outline star if category is not favourite", () => {

    const category: CategoryRaw = {
    id: 1,
    name: 'TEST',
    description: 'TEST',
    parent: null
    }

    const favcategories: number[] = []
    act(() => {
      render(<FavouriteCategoryCard category={category} favIds={favcategories} handleFav={() => {}}/>, container);
    });
    expect(container!.textContent).toContain("TEST");
    expect(document.getElementById('star1')?.className).toBe('star outline icon')
  
});

it("Renders a star if category is favourite", () => {

    const category: CategoryRaw = {
    id: 1,
    name: 'TEST',
    description: 'TEST',
    parent: null
    }

    const favcategories: number[] = [1]
    act(() => {
      render(<FavouriteCategoryCard category={category} favIds={favcategories} handleFav={() => {}}/>, container);
    });
    expect(container!.textContent).toContain("TEST");
    expect(document.getElementById('star1')?.className).toBe('star icon')
  
});

it("HandleFav is called when icon click", () => {

    const category: CategoryRaw = {
    id: 1,
    name: 'TEST',
    description: 'TEST',
    parent: null
    }

    const favcategories: number[] = []

    const handleFav = jest.fn();

    const card = <FavouriteCategoryCard category={category} favIds={favcategories} handleFav={handleFav}/>

    act(() => {
      render(card, container);
    });

    const icon = document.getElementById('star1') as HTMLElement

    act(() => {
      icon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(handleFav).toHaveBeenCalledTimes(1);
});

it("Fav category is added", () => {

    const category: CategoryRaw = {
    id: 1,
    name: 'TEST',
    description: 'TEST',
    parent: null
    }

    const favcategories: number[] = []

    const handleFav = (id: number) => {
      favcategories.push(id)
    }

    const card = <FavouriteCategoryCard category={category} favIds={favcategories} handleFav={handleFav}/>

    act(() => {
      render(card, container);
    });

    const icon = document.getElementById('star1')!

    expect(favcategories.length).toBe(0)

    act(() => {
      icon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(favcategories.length).toBe(1)
});