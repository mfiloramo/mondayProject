CREATE PROCEDURE UpdateFragrance
    @id NVARCHAR(50),
    @name NVARCHAR(255),
    @description NVARCHAR(MAX),
    @category NVARCHAR(100),
    @updated_at DATETIME,
    @image_url NVARCHAR(255)
AS
BEGIN
    UPDATE Fragrances
    SET name = @name,
        description = @description,
        category = @category,
        updated_at = @updated_at,
        image_url = @image_url
    WHERE id = @id;
END;
