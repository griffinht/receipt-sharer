import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

interface ReceiptItem {
  name: string
  genericName: string
  price: number
  department: string
}

interface Receipt {
  id: string
  store: string
  date: string
  items: ReceiptItem[]
  total: number
}

app.get('/receipts/:id', async (c) => {
  const id = c.req.param('id')
  
  try {
    const response = await fetch(`http://localhost:3000/receipts/${id}/json`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const receipt: Receipt = await response.json()

    const totalItems = receipt.items.length

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
      <h1>${receipt.store}</h1>
      <h2>Receipt</h2>
      <p>ORDER #${receipt.id} FOR CUSTOMER</p>
      <p>${new Date(receipt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <table>
        <tr><th>QTY</th><th>ITEM</th><th>AMT</th></tr>
        ${receipt.items.map(item => `
          <tr>
            <td>1</td>
            <td>${item.name.toUpperCase()}</td>
            <td>$${item.price.toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
      <p>ITEM COUNT: ${totalItems}</p>
      <p>TOTAL: $${receipt.total.toFixed(2)}</p>
      <p>CARD #: **** **** **** ${Math.floor(Math.random() * 10000)}</p>
      <p>AUTH CODE: ${Math.floor(Math.random() * 1000000)}</p>
      <p>CARDHOLDER: CUSTOMER</p>
      <p>THANK YOU FOR SHOPPING WITH US!</p>
      <p><small>${receipt.store.toLowerCase().replace(/\s+/g, '')}.example.com</small></p>
    `)
  } catch (error) {
    console.error('Error fetching receipt:', error)
    return c.text('Error fetching receipt', 500)
  }
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
