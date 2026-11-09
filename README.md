## Patil Krushi Seva Kendra

### Razorpay webhook setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Configure Razorpay Test Mode credentials and a separate webhook secret:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
3. Set the Razorpay webhook URL to:
   - Production: `https://your-domain/api/webhooks/razorpay`
   - Events: `payment.captured`, `payment.failed`, and `order.paid`
4. Review and then apply the Prisma migration:
   - `cd backend`
   - `npx prisma migrate deploy`

The webhook secret must be configured in Razorpay and must match
`RAZORPAY_WEBHOOK_SECRET` on the backend. Do not use `NEXT_PUBLIC_*` for either
secret.

### Local testing

The backend serves the raw-body webhook endpoint before JSON middleware:

- `POST http://localhost:5000/api/webhooks/razorpay`
- Razorpay CLI: `razorpay-cli webhook-forward --url http://localhost:5000/api/webhooks/razorpay`
- Do not sign webhook bodies yourself for production testing; use Razorpay dashboard/CLI delivery.

Test payment verification in the Razorpay Test Mode Checkout. Never use live keys.

### Deployment

1. Set `DATABASE_URL`, `PORT`, and all three Razorpay variables on the backend host.
2. Deploy the generated Prisma migration with `npx prisma migrate deploy`.
3. Register the HTTPS webhook URL and copy its secret into `RAZORPAY_WEBHOOK_SECRET`.
4. Verify the backend public health route and perform a Test Mode payment/webhook delivery.