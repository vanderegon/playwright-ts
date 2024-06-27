import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { CatalogPage } from "../pages/catalogPage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";

test('add product to cart', async ({page})=> {
    
    const homePage = new HomePage (page);
    await homePage.navigateToHomePage();
    await homePage.selectMenu ('Women');

    const productListingPage = new CatalogPage (page);
    await productListingPage.selectARandomItem ();

    const productPage = new ProductPage (page);
    await productPage.verifyProductDescriptionPage ();
    await productPage.selectAnySize ();
    await productPage.selectAnyColor ();
    await productPage.addProductToCart ();

    const cartPage = new CartPage (page);
    await cartPage.checkOutCart ();

    const checkOutPage = new CheckoutPage (page);
    await checkOutPage.completeCheckoutForm ();
    await checkOutPage.placeOrderAndRetreiveOrderNumber (); 
  
  }
);