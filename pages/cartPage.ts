import { expect, Page } from "@playwright/test";

export class CartPage {
    private page : Page;
    private proceedToCheckOut : string;
    private cartTotal: string;

    constructor (page:Page) {
        this.page = page;
        this.cartTotal = 'div[id="cart-totals"]';
        this.proceedToCheckOut = 'div[class="cart-summary"] button[title="Proceed to Checkout"]';
    }

    public async checkOutCart () {
        await expect (this.page.locator (this.cartTotal)).toBeVisible();
        await expect (this.page.locator (this.proceedToCheckOut)).toBeVisible();
        await this.page.locator (this.proceedToCheckOut).click ();
    }
}