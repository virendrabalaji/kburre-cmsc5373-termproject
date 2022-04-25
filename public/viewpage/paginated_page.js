import { btnpage, formSearch, MENU, modalallreview, root } from './elements.js';
import { ROUTE_PATHNAMES } from '../controller/route.js';
import * as Util from './util.js';
import { addproductwishlist, getProductComment, getProductList, paginatedProduct } from '../controller/firestore_controller.js';
import { DEV } from '../model/constants.js';
import { currentUser } from '../controller/firebase_auth.js';
import { cart } from './cart_page.js';
import { product_wishlist } from '../model/product_wishlist.js';
import { buildHomeScreen } from './home_page.js';
export async function addEventListeners() {
    
    
    btnpage.addEventListener('click', async e => {
        let products2 = []
        e.preventDefault();
        const buttonVal = e.target.id;
        console.log(buttonVal);

        let products = []; 
    try {
        products = await paginatedProduct(buttonVal);
        if (cart && cart.getTotalQty() != 0) { 
            cart.items.forEach(item => {
                const p = products.find(e => e.docId == item.docId)
                if (p) p.qty = item.qty; 
            });
        }
    } catch (e) { 
        if (DEV) console.log(e);
        Util.info('Failed to get the product list', JSON.stringify(e));
    }


        
        console.log(products);
        buildHomeScreen(products);
    })
}