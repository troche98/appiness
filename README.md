To launch the API follow these instructions:

- npm install
- npm start

The API is listenning on port 8080: http://localhost:8080/api/

#STORE

Create a store:
- METHOD: POST
- URL: http://localhost:8080/api/store
- BODY: {
    name: String,
    address: String
}
- name and address required

Update a Store information:
- METHOD: PUT
- URL: http://localhost:8080/api/store/:id_store
- BODY: {
    name: String,
    address: String
}
- name or address required

Retrieve a Store by parameters:
- METHOD: GET
- URL: http://localhost:8080/api/store/parameters?name=...address=...

Retrieve all stores:
- METHOD: GET
- URL: http://localhost:8080/api/all/stores

Retrieve store by id:
- METHOD: GET
- URL: http://localhost:8080/api/store/:id_store

#ORDER

Create an order with items:
- METHOD: POST
- URL: http://localhost:8080/api/order
- BODY: {
    address: String,
    status: String
    items: [{
        description: desc,
        unit_price: price,
        quantity: nb_item
    }]
}
- address, status and items are required

Retrieve all orders:
- METHOD: GET
- URL: http://localhost:8080/api/order

Retrieve order by parameters:
- METHOD: GET
- URL: http://localhost:8080/api/order/parameters?address=...confirmation_date=...status=...items=...

Refund Order or any Order Item:
- METHOD: POST
- URL: http://localhost:8080/api/order/refund/:id_order
- BODY: {
    items: [id_item] ([optionnal] to refund items from the order, if not specified refund all order)
}
- id_order is required
(order or order item can be refund if it is within 10days after confirmation_date)

#PAYMENT

Create a payment for an order:
- METHOD: POST
- URL: http://localhost:8080/api/payment
- BODY: {
    id_order: String,
    status: String,
    credit_car_number: Number
}
- id_order, status and credit_card_number are required

Retrieve all payments:
- METHOD: GET
- URL: http://localhost:8080/api/payment

Delete all payments:
- METHOD: DELETE
- URL: http://localhost:8080/api/payment