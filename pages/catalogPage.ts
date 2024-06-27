import { expect } from "@playwright/test";
import { Locator, Page } from "playwright-core";

export class CatalogPage{
    private page: Page;
    private list: string;
    private items: string;

    constructor(page: Page){
        this.page = page;
        this.list = '//ol[contains(@class,"product-items")]';
        this.items = '//ol[contains(@class,"product-items")]/child::li/descendant::a[@class="product-item-link"]';
    }

    private async countOfElements (locator) {
        return await this.page.locator(locator).count ();
    }

    public elementsList (locator) {}

    public async selectARandomItem () {
        let targetUrl = await this.page.getAttribute(`(${this.items})[1]`,'href');
        console.log (`Item URL ${targetUrl}`)
        await this.page.click (`(${this.items})[1]`);
        expect (this.page.url()).toBe (targetUrl);
    }
}