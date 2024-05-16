CREATE PROCEDURE AddFragrance
    @id INT,
    @name NVARCHAR(255),
    @description NVARCHAR(MAX) = NULL,
    @category NVARCHAR(100) = NULL,
    @created_at DATETIME = NULL,
    @updated_at DATETIME = NULL,
    @image_url NVARCHAR(255) = NULL
AS
BEGIN
INSERT INTO Fragrances (id, name, description, category, created_at, updated_at, image_url)
VALUES (
           @id,
           @name,
           @description,
           @category,
           COALESCE(@created_at, GETDATE()),
           COALESCE(@updated_at, GETDATE()),
           @image_url
       );
END;
GO