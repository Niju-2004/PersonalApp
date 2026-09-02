-- ==========================================================
-- PostgreSQL (Neon.tech Cloud) & SQL Server (Localhost):
-- Insert Master Admin Account if it does not already exist
-- ==========================================================

-- PostgreSQL:
INSERT INTO "Users" ("Name", "Email", "Password", "CreatedAt") 
VALUES ('Master Admin', 'admin', 'admin@123', CURRENT_TIMESTAMP)
ON CONFLICT ("Email") DO NOTHING;

/*
-- SQL Server:
IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'admin')
BEGIN
    INSERT INTO Users (Name, Email, Password, CreatedAt)
    VALUES ('Master Admin', 'admin', 'admin@123', GETDATE());
END
*/

