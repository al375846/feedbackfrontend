import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RankingCard from "../components/cards/RankingCard";

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

it("Renders a top ranking", () => {

    const ranking = {
        id: 1,
        rate: '4',
        name: 'Test'
    }

    act(() => {
      render(<RankingCard 
        top= {true}
        type={'rated/experts'}
        index={1}
        rank={ranking}/>, container);
    });

    const card = document.getElementById('rank1')!
    expect(card.className.search('top-ranking')).toBeGreaterThanOrEqual(0)
    
    const img = document.getElementById('img1') as HTMLImageElement
    expect(img.src.search('gold-medal.png')).toBeGreaterThanOrEqual(0)
    
});

it("Renders a non top ranking", () => {

    const ranking = {
        id: 1,
        rate: '4',
        name: 'Test'
    }

    act(() => {
      render(<RankingCard 
        top= {false}
        type={'rated/experts'}
        index={4}
        rank={ranking}/>, container);
    });

    const card = document.getElementById('rank1')!
    expect(card.className.search('top-ranking')).toBe(-1)
    
    const img = document.getElementById('img1')
    expect(img).toBeNull()
    
});