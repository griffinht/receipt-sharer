import { Hono } from 'hono'

const app = new Hono()


app.get('/receiptify', (c) => {
  const groceryItems = [
    { name: 'Apples', quantity: 3, price: 1.50 },
    { name: 'Bread', quantity: 1, price: 2.00 },
    { name: 'Milk', quantity: 2, price: 4.00 },
    { name: 'Eggs', quantity: 1, price: 3.50 },
    { name: 'Cheese', quantity: 1, price: 5.00 },
  ]

  const totalItems = groceryItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = groceryItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return c.html(`
    <style>
      body {
        font-family: monospace;
        text-align: center;
        background-image: url('https://receiptify.herokuapp.com/wrinkled-paper-texture-7.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
      h1 { text-transform: uppercase; }
      table { margin: 0 auto; }
      th, td { padding: 5px 10px; text-align: left; }
    </style>
    <h1>Grocerify</h1>
    <h2>Weekly Grocery Receipt</h2>
    <p>ORDER #${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} FOR CUSTOMER</p>
    <p>${currentDate}</p>
    <table>
      <tr><th>QTY</th><th>ITEM</th><th>AMT</th></tr>
      ${groceryItems.map(item => `
        <tr>
          <td>${item.quantity}</td>
          <td>${item.name.toUpperCase()}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('')}
    </table>
    <p>ITEM COUNT: ${totalItems}</p>
    <p>TOTAL: $${totalAmount}</p>
    <p>CARD #: **** **** **** ${Math.floor(Math.random() * 10000)}</p>
    <p>AUTH CODE: ${Math.floor(Math.random() * 1000000)}</p>
    <p>CARDHOLDER: CUSTOMER</p>
    <p>THANK YOU FOR SHOPPING WITH US!</p>
    <p><small>grocerify.example.com</small></p>
  `)
})

export default app
