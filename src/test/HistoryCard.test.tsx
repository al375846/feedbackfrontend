import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HistoryCard from "../modules/profiles/user/components/HistoryCard";

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

it("Renders a feedback history and it remove the asterisk", () => {

    const history = {
        id: 1,
        type: 'Feedback',
        content: 'Has realizado un feedback en *Test*',
        date: new Date()
    }

    act(() => {
      render(<HistoryCard history={history}/>, container);
    });
    expect(container!.textContent).toContain("Feedback");
    expect(container!.textContent).toContain("Has realizado un feedback en Test");
    
});

it("Renders a rating history and it remove the asterisk", () => {

    const history = {
        id: 1,
        type: 'Valoracion',
        content: '*Test* te ha valorado',
        date: new Date()
    }

    act(() => {
      render(<HistoryCard history={history}/>, container);
    });
    expect(container!.textContent).toContain("Valoracion");
    expect(container!.textContent).toContain("Test te ha valorado");
    
});

it("Renders a publication history and it remove the asterisk", () => {

    const history = {
        id: 1,
        type: 'Publicacion',
        content: 'Has realizado la publicación *Test*',
        date: new Date()
    }

    act(() => {
      render(<HistoryCard history={history}/>, container);
    });
    expect(container!.textContent).toContain("Publicacion");
    expect(container!.textContent).toContain("Has realizado la publicación Test");
    
});