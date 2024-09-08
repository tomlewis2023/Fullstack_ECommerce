const backendDomain = "https://fullstack-e-commerce-two.vercel.app/";
//backend route link
const SummaryApi = {
  signup: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signin: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/userdetails`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userlogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/allusers`,
    method: "get",
  },
  updateuser: {
    url: `${backendDomain}/api/updateuser`,
    method: "post",
  },

  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },

  addtoCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addtoCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },

  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
  payment : {
    url: `${backendDomain}/api/checkout`,
    method: "post",
  },
   getOrder : {

    url : `${backendDomain}/api/order-list`,
    method: "get",

  },
  allOrder : {

    url: `${backendDomain}/api/all-orders`,
    method: "get",


  }

};

export default SummaryApi;
