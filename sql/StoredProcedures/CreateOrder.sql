CREATE PROCEDURE CreateOrder
    @created_at DATETIME = NULL,
    @updated_at DATETIME = NULL,
    @number_of_kits INT,
    @fragrance1_id INT,
    @fragrance2_id INT,
    @fragrance3_id INT
AS
BEGIN
    -- Set default values for created_at and updated_at if they are not provided
    SET @created_at = ISNULL(@created_at, GETDATE());
    SET @updated_at = ISNULL(@updated_at, GETDATE());

INSERT INTO Orders (created_at, updated_at, number_of_kits, fragrance1_id, fragrance2_id, fragrance3_id)
VALUES (@created_at, @updated_at, @number_of_kits, @fragrance1_id, @fragrance2_id, @fragrance3_id);
END;
GO
