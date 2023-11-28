--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_user (
    id integer NOT NULL,
    username character varying(10) NOT NULL,
    password_hash character varying(255) NOT NULL,
    selected_currency_id integer DEFAULT 1 NOT NULL,
    monthly_totals jsonb DEFAULT '{}'::jsonb
);


ALTER TABLE public.app_user OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: currency; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.currency (
    id integer NOT NULL,
    code character varying(3) NOT NULL,
    name character varying(50) NOT NULL,
    symbol "char" NOT NULL
);


ALTER TABLE public.currency OWNER TO postgres;

--
-- Name: currency_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.currency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.currency_id_seq OWNER TO postgres;

--
-- Name: currency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.currency_id_seq OWNED BY public.currency.id;


--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    id integer NOT NULL,
    expense_date date NOT NULL,
    description character varying(255) NOT NULL,
    amount numeric NOT NULL,
    user_id integer NOT NULL,
    selected_currency_id integer NOT NULL,
    payment_method_id integer,
    category_id integer
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expense_id_seq OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expense_id_seq OWNED BY public.expense.id;


--
-- Name: income; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.income (
    id integer NOT NULL,
    income_date date NOT NULL,
    amount numeric NOT NULL,
    description character varying(255) NOT NULL,
    user_id integer NOT NULL,
    selected_currency_id integer NOT NULL
);


ALTER TABLE public.income OWNER TO postgres;

--
-- Name: income_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.income_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.income_id_seq OWNER TO postgres;

--
-- Name: income_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.income_id_seq OWNED BY public.income.id;


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_methods (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.payment_methods OWNER TO postgres;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_methods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_methods_id_seq OWNER TO postgres;

--
-- Name: payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_methods_id_seq OWNED BY public.payment_methods.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.app_user.id;


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: currency id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currency ALTER COLUMN id SET DEFAULT nextval('public.currency_id_seq'::regclass);


--
-- Name: expense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense ALTER COLUMN id SET DEFAULT nextval('public.expense_id_seq'::regclass);


--
-- Name: income id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income ALTER COLUMN id SET DEFAULT nextval('public.income_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods ALTER COLUMN id SET DEFAULT nextval('public.payment_methods_id_seq'::regclass);

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	Housing
2	Groceries
3	Transportation
4	Health
5	Education
6	Travel
7	Pets
8	Personal
9	Entertainment/Hobbies
10	Other
\.

--
-- Data for Name: payment_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_methods (id, name) FROM stdin;
1	Cash
2	Credit Card
3	Debit Card
4	MB WAY
5	PayPal
6	Bank Transfer
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 10, true);


--
-- Name: currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.currency_id_seq', 17, true);


--
-- Name: expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_id_seq', 8, true);


--
-- Name: income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.income_id_seq', 2, true);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_methods_id_seq', 6, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: currency currency_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (id);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: app_user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: expense expense_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: expense expense_payment_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_payment_method_id_fkey FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id);


--
-- Name: expense expense_selected_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_selected_currency_id_fkey FOREIGN KEY (selected_currency_id) REFERENCES public.currency(id);


--
-- Name: expense expense_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_user(id);


--
-- Name: income income_selected_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_selected_currency_id_fkey FOREIGN KEY (selected_currency_id) REFERENCES public.currency(id);


--
-- Name: income income_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_user(id);


--
-- Name: app_user user_selected_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_selected_currency_id_fkey FOREIGN KEY (selected_currency_id) REFERENCES public.currency(id);


--
-- PostgreSQL database dump complete
--


