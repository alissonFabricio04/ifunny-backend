-- This is an empty migration.

-- Verify if has exists methods payments, else create
INSERT INTO "PaymentType" (id, name)
  SELECT '104e686e-ad2c-49f7-8790-adbbc8dda74b', 'FUNDS' WHERE NOT EXISTS (SELECT * FROM "PaymentType" WHERE name = 'FUNDS');

INSERT INTO "PaymentType" (id, name)
  SELECT '07b7a7e1-b4e8-4a45-9efb-dee1be287c4b', 'PIX' WHERE NOT EXISTS (SELECT name FROM "PaymentType" WHERE name = 'PIX');

INSERT INTO "PaymentType" (id, name)
  SELECT '8a189a93-2cf9-46fd-9173-52b4bcdd0584', 'CREDIT_CARD' WHERE NOT EXISTS (SELECT name FROM "PaymentType" WHERE name = 'CREDIT_CARD');

-- Verify if has exists status payments, else create
INSERT INTO "PaymentStatus" (id, name)
  SELECT '94890aa8-4bd3-4140-9c78-56ee1c0bb92c', 'WAITING_PAYMENT' WHERE NOT EXISTS (SELECT name FROM "PaymentType" WHERE name = 'WAITING_PAYMENT');

INSERT INTO "PaymentStatus" (id, name)
  SELECT 'e18cad20-49ba-4f52-b0ef-99211a229a0d', 'PAID' WHERE NOT EXISTS (SELECT name FROM "PaymentType" WHERE name = 'PAID');

INSERT INTO "PaymentStatus" (id, name)
  SELECT '766a7ae4-b945-4645-8458-6f2f9c4aac1a', 'CANCELLED' WHERE NOT EXISTS (SELECT name FROM "PaymentType" WHERE name = 'CANCELLED');

-- Verify if has exists status order, else create
INSERT INTO "OrderStatus" (id, status)
  SELECT '51eb5726-5e56-4ddd-8314-6f754aee890f', 'WAITING_PAYMENT' WHERE NOT EXISTS (SELECT status FROM "OrderStatus" WHERE status = 'WAITING_PAYMENT');

INSERT INTO "OrderStatus" (id, status)
  SELECT '7c2200cb-8fed-4f3a-8c3d-92d70e8cd1a1', 'PENDING' WHERE NOT EXISTS (SELECT status FROM "OrderStatus" WHERE status = 'PENDING');

INSERT INTO "OrderStatus" (id, status)
  SELECT '195a1c00-337f-471e-8b8f-b26dfa87e423', 'IN_USE' WHERE NOT EXISTS (SELECT status FROM "OrderStatus" WHERE status = 'IN_USE');

INSERT INTO "OrderStatus" (id, status)
  SELECT '7869bef3-844c-48dc-9ab4-f4cb395f23dc', 'COMPLETED' WHERE NOT EXISTS (SELECT status FROM "OrderStatus" WHERE status = 'COMPLETED');

INSERT INTO "OrderStatus" (id, status)
  SELECT '4a2bca45-12a2-4f92-95d1-8eadeb697866', 'CANCELLED' WHERE NOT EXISTS (SELECT status FROM "OrderStatus" WHERE status = 'CANCELLED');