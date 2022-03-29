require('dotenv').config()
require('express-async-errors')

// EXTRA SECURITY PACKAGES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// APP
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const { authUser } = require('./middleware/authentication')

// ADMIN ROUTES
const admin_auth_router = require('./routes/admin/auth.route')
const admin_posts_router = require('./routes/admin/posts.route')
const admin_messages_router = require('./routes/admin/message.route')
const admin_status_router = require('./routes/admin/status.route')

// PUBLIC ROUTES
const public_message_router = require('./routes/public/message.route')

// ERROR HANDLERS
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// INITIAL APP
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
  }),
)

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())

// ROUTES
app.use('/api/v1/admin/authentication', admin_auth_router)
app.use('/api/v1/admin/posts', authUser, admin_posts_router)
app.use('/api/v1/admin/messages', authUser, admin_messages_router)
app.use('/api/v1/admin/status', authUser, admin_status_router)

app.use('/api/v1/public/message', public_message_router)

// ERROR HANDLER
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
