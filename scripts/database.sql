CREATE TABLE "Usuarios" (
    "Id" SERIAL PRIMARY KEY,
    "Email" VARCHAR(100) UNIQUE NOT NULL,
    "Password" VARCHAR(100) NOT NULL,
    "Nombre" VARCHAR(100) NOT NULL,
    "Rol" VARCHAR(20) NOT NULL
);

INSERT INTO "Usuarios" ("Email", "Password", "Nombre", "Rol")
VALUES ('user@email.com', '123456', 'Usuario Senior', 'Admin');

CREATE TABLE IF NOT EXISTS "Pedidos" (
    "Id" SERIAL PRIMARY KEY,
    "NumeroPedido" VARCHAR(50) NOT NULL UNIQUE,
    "Cliente" VARCHAR(150) NOT NULL,
    "Fecha" TIMESTAMP WITH TIME ZONE NOT NULL,
    "Total" DECIMAL(18,2) NOT NULL,
    "Estado" VARCHAR(50) NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS "IX_Pedidos_NumeroPedido" ON "Pedidos" ("NumeroPedido");
