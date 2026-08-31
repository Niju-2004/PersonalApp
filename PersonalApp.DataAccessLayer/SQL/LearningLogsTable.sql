

-- ==========================================================
-- SQL Server (Localhost):
-- ==========================================================

USE PersonalDashboardDB;
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LearningLogs' and xtype='U')
BEGIN
    CREATE TABLE LearningLogs (
        LogId INT IDENTITY(1,1) PRIMARY KEY,
        LearningItemId INT NOT NULL,
        UserId INT NOT NULL,
        LearnedDate DATE NOT NULL,
        TopicCovered NVARCHAR(255) NOT NULL,
        Notes NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_LearningLogs_LearningItems FOREIGN KEY (LearningItemId) REFERENCES LearningItems (LearningItemId) ON DELETE CASCADE,
        CONSTRAINT FK_LearningLogs_Users FOREIGN KEY (UserId) REFERENCES Users (UserId) ON DELETE CASCADE
    );
END
GO


