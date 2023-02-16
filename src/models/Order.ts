

// based on this example of my database: ProductItemType{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e621"),
//   "name": "Wine"
// }

// ProductItem{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e622"),
//   "name": "Merlot",
//   "typeId": ObjectId("5f8b4d6c9cc95926f1e5e621"),
//   "description": "A smooth and medium-bodied red wine with notes of dark fruit and a hint of oak."
// }

// Products{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e623"),
//   "name": "Fruit and Wine Basket",
//   "description": "A delightful basket containing a variety of fresh fruit and a bottle of red wine.",
//   "price": 59.99,
//   "imageUrls": ["https://example.com/fruit-basket-1.jpg", "https://example.com/fruit-basket-2.jpg"],
//   "categoryId": ObjectId("5f8b4d6c9cc95926f1e5e624")
// }

// Categories{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e624"),
//   "name": "Gift Baskets",
//   "description": "A collection of beautifully crafted gift baskets for all occasions."
// }

// Orders{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e625"),
//   "customerId": ObjectId("5f8b4d6c9cc95926f1e5e626"),
//   "orderDate": ISODate("2022-12-01T08:00:00.000Z"),
//   "orderTotal": 59.99,
//   "orderStatus": "Processed",
//   "shippingAddress": "123 Main St, Anytown USA 12345"
// }
// Customers{
//   "_id": ObjectId("5f8b4d6c9cc95926f1e5e626"),
//   "name": "Jane Doe",
//   "email": "jane.doe@example.com",
//   "shippingAddress": "456 Main St, Anytown USA 12345"
// } can you generate me ProductItemType mongodb table in typescript using interfaces