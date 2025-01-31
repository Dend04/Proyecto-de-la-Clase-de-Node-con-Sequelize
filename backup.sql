--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15
-- Dumped by pg_dump version 14.15

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

--
-- Name: enum_Respuesta_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Respuesta_tipo" AS ENUM (
    'multiple',
    'unica',
    'texto',
    'numero'
);


ALTER TYPE public."enum_Respuesta_tipo" OWNER TO postgres;

--
-- Name: enum_Test_dificultad; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Test_dificultad" AS ENUM (
    'facil',
    'medio',
    'dificil'
);


ALTER TYPE public."enum_Test_dificultad" OWNER TO postgres;

--
-- Name: enum_Usuario_rol; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Usuario_rol" AS ENUM (
    'usuario',
    'administrador'
);


ALTER TYPE public."enum_Usuario_rol" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Pregunta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pregunta" (
    id integer NOT NULL,
    texto character varying(255) NOT NULL,
    "testId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Pregunta" OWNER TO postgres;

--
-- Name: Pregunta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pregunta_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Pregunta_id_seq" OWNER TO postgres;

--
-- Name: Pregunta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pregunta_id_seq" OWNED BY public."Pregunta".id;


--
-- Name: Respuesta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Respuesta" (
    id integer NOT NULL,
    tipo public."enum_Respuesta_tipo" NOT NULL,
    respuesta json NOT NULL,
    "preguntaId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Respuesta" OWNER TO postgres;

--
-- Name: Respuesta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Respuesta_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Respuesta_id_seq" OWNER TO postgres;

--
-- Name: Respuesta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Respuesta_id_seq" OWNED BY public."Respuesta".id;


--
-- Name: Resultado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Resultado" (
    id integer NOT NULL,
    "usuarioId" integer,
    "testId" integer,
    resultado json NOT NULL,
    estado character varying(255),
    deficiencias character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Resultado" OWNER TO postgres;

--
-- Name: Resultado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Resultado_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Resultado_id_seq" OWNER TO postgres;

--
-- Name: Resultado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Resultado_id_seq" OWNED BY public."Resultado".id;


--
-- Name: Rutina; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rutina" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255),
    "resultadoId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Rutina" OWNER TO postgres;

--
-- Name: Rutina_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Rutina_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Rutina_id_seq" OWNER TO postgres;

--
-- Name: Rutina_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Rutina_id_seq" OWNED BY public."Rutina".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Test" (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion character varying(255),
    duracion integer,
    dificultad public."enum_Test_dificultad",
    etiqueta character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Test" OWNER TO postgres;

--
-- Name: Test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Test_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Test_id_seq" OWNER TO postgres;

--
-- Name: Test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Test_id_seq" OWNED BY public."Test".id;


--
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    "segundoNombre" character varying(255),
    "nombreUsuario" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    rol public."enum_Usuario_rol" DEFAULT 'usuario'::public."enum_Usuario_rol" NOT NULL,
    peso double precision NOT NULL,
    altura double precision NOT NULL,
    "enfermedadCronica" character varying(255),
    "estadoFisicoActual" character varying(255),
    "secret2FA" character varying(255),
    "estaVerificado2FA" boolean DEFAULT false,
    password character varying(255) NOT NULL,
    "fotoPerfil" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Usuario_id_seq" OWNER TO postgres;

--
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
-- Name: Pregunta id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pregunta" ALTER COLUMN id SET DEFAULT nextval('public."Pregunta_id_seq"'::regclass);


--
-- Name: Respuesta id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Respuesta" ALTER COLUMN id SET DEFAULT nextval('public."Respuesta_id_seq"'::regclass);


--
-- Name: Resultado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resultado" ALTER COLUMN id SET DEFAULT nextval('public."Resultado_id_seq"'::regclass);


--
-- Name: Rutina id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rutina" ALTER COLUMN id SET DEFAULT nextval('public."Rutina_id_seq"'::regclass);


--
-- Name: Test id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test" ALTER COLUMN id SET DEFAULT nextval('public."Test_id_seq"'::regclass);


--
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- Data for Name: Pregunta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pregunta" (id, texto, "testId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Respuesta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Respuesta" (id, tipo, respuesta, "preguntaId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Resultado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Resultado" (id, "usuarioId", "testId", resultado, estado, deficiencias, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Rutina; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rutina" (id, nombre, descripcion, "resultadoId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20241215213459-create-usuario.cjs
20241215213503-create-resultado.cjs
20241215213508-create-rutina.cjs
20241215225233-create-test-table.cjs
\.


--
-- Data for Name: Test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Test" (id, titulo, descripcion, duracion, dificultad, etiqueta, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (id, nombre, apellidos, "segundoNombre", "nombreUsuario", email, rol, peso, altura, "enfermedadCronica", "estadoFisicoActual", "secret2FA", "estaVerificado2FA", password, "fotoPerfil", "createdAt", "updatedAt") FROM stdin;
1	Juan	Pérez García	Antonio	jpérez	perez@ejemplo.com	administrador	75.5	175.5	Ninguna	Activo	\N	f	$2b$10$1gmCPS5oFiqvGfjv3Qd/reQIzW/mGiQBgBHvWT0ZQx5skMIY1iXBe	\N	2025-01-31 07:54:00.416+00	2025-01-31 07:54:00.416+00
2	Alfredo	Guzman Al		Alfredito	alfredoMGuerra@gmail.com	usuario	70	170	Ninguna	Normal	\N	f	$2b$10$lV5UjM/D1RA4yINLv3BzEO4hL.MyBLaTf35J880AEcc.8KpPnqnwO	\N	2025-01-31 07:55:44.844+00	2025-01-31 07:55:44.844+00
3	Juan	Alonso Cal		Elmo	lachi@gmail.com	usuario	75	170	Ninguna	Activo	OZGX2O3YMEYVAP3VLV5GWPC2KQRX2OBILMUU6NJKFA3T6TDRKBGQ	t	$2b$10$F9j6zNVge31xwZFtf7tzbuVKkN.iOMVh3JFNv427BvpReJ0QyfQom	\N	2025-01-31 14:57:57.023+00	2025-01-31 15:16:45.257+00
\.


--
-- Name: Pregunta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pregunta_id_seq"', 1, false);


--
-- Name: Respuesta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Respuesta_id_seq"', 1, false);


--
-- Name: Resultado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Resultado_id_seq"', 1, false);


--
-- Name: Rutina_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rutina_id_seq"', 1, false);


--
-- Name: Test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Test_id_seq"', 1, false);


--
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 3, true);


--
-- Name: Pregunta Pregunta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pregunta"
    ADD CONSTRAINT "Pregunta_pkey" PRIMARY KEY (id);


--
-- Name: Respuesta Respuesta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Respuesta"
    ADD CONSTRAINT "Respuesta_pkey" PRIMARY KEY (id);


--
-- Name: Resultado Resultado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resultado"
    ADD CONSTRAINT "Resultado_pkey" PRIMARY KEY (id);


--
-- Name: Rutina Rutina_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rutina"
    ADD CONSTRAINT "Rutina_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Test Test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);


--
-- Name: Usuario Usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_email_key" UNIQUE (email);


--
-- Name: Usuario Usuario_nombreUsuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_nombreUsuario_key" UNIQUE ("nombreUsuario");


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: Pregunta Pregunta_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pregunta"
    ADD CONSTRAINT "Pregunta_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Respuesta Respuesta_preguntaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Respuesta"
    ADD CONSTRAINT "Respuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES public."Pregunta"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Resultado Resultado_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resultado"
    ADD CONSTRAINT "Resultado_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE;


--
-- Name: Resultado Resultado_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resultado"
    ADD CONSTRAINT "Resultado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE;


--
-- Name: Rutina Rutina_resultadoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rutina"
    ADD CONSTRAINT "Rutina_resultadoId_fkey" FOREIGN KEY ("resultadoId") REFERENCES public."Resultado"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

