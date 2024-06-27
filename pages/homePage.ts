import { Page } from "@playwright/test";

export class HomePage {
    page: Page;
    menu: string;
    url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://magento.softwaretestingboard.com/';
        this.menu = 'div[id="store.menu"]';
    
    }

    public async selectMenu(item){
        const element = `(//span[text()="${item}"]/parent::a)[1]`;
        await this.page.locator (element).click ();
        console.log (`Clicked ${element}`);
    }

    public async navigateToHomePage() {
        await this.page.goto(this.url);
    }
}