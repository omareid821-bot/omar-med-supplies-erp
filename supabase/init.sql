-- Supabase / PostgreSQL initial schema (basic tables for demo)

CREATE TABLE companies (
  id bigint PRIMARY KEY,
  name_ar text NOT NULL,
  tax_no text,
  bank_name text,
  iban text,
  default_currency text,
  vat_percent integer
);

CREATE TABLE users (
  id bigint PRIMARY KEY,
  email text UNIQUE,
  name text,
  role text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE clients (
  id bigint PRIMARY KEY,
  name_ar text,
  contact_person_ar text,
  phone text,
  city_ar text,
  address_ar text,
  tax_no text,
  opening_balance numeric DEFAULT 0
);

CREATE TABLE products (
  id bigint PRIMARY KEY,
  name_ar text,
  sku text,
  category text,
  unit text,
  purchase_price numeric,
  default_selling_price numeric,
  expiry_date date,
  batch_no text
);

CREATE TABLE invoices (
  id bigint PRIMARY KEY,
  client_id bigint REFERENCES clients(id),
  date date,
  total numeric,
  vat_flag boolean,
  status text
);

CREATE TABLE payments (
  id bigint PRIMARY KEY,
  client_id bigint REFERENCES clients(id),
  date date,
  amount numeric,
  method text,
  ref_no text,
  received_by text
);

CREATE TABLE client_price_memory (
  client_id bigint,
  product_id bigint,
  last_price numeric,
  last_date date,
  PRIMARY KEY (client_id, product_id)
);
