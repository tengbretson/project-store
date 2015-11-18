--
-- File generated with SQLiteStudio v3.0.6 on Sun Aug 2 22:08:36 2015
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Simulations
DROP TABLE IF EXISTS Simulations;

CREATE TABLE Simulations (
    id           INTEGER  PRIMARY KEY AUTOINCREMENT
                          UNIQUE
                          NOT NULL,
    project      INTEGER  REFERENCES Projects (id) 
                          NOT NULL,
    source       TEXT     NOT NULL
                          DEFAULT (''),
    simulated_on DATETIME DEFAULT (CURRENT_TIMESTAMP) 
                          NOT NULL,
    annotation   TEXT     DEFAULT ('') 
                          NOT NULL
);


-- Table: Projects
DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects (
    id     INTEGER PRIMARY KEY AUTOINCREMENT
                   NOT NULL
                   UNIQUE,
    source TEXT    NOT NULL
                   DEFAULT (''),
    name   STRING  NOT NULL
                   DEFAULT ('new project') 
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
