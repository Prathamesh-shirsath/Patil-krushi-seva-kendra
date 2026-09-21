CREATE TABLE "DeliveryPincode" (
    "id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryPincode_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DeliveryPincode_pincode_key"
    ON "DeliveryPincode"("pincode");

CREATE INDEX "DeliveryPincode_pincode_idx"
    ON "DeliveryPincode"("pincode");

CREATE INDEX "DeliveryPincode_isActive_idx"
    ON "DeliveryPincode"("isActive");
