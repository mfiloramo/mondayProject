CREATE PROCEDURE CreateOrder
    @id NVARCHAR(50),
    @created_at DATETIME,
    @updated_at DATETIME,
    @number_of_kits INT,
    @fragrance1_id NVARCHAR(50),
    @fragrance2_id NVARCHAR(50),
    @fragrance3_id NVARCHAR(50)
AS
BEGIN
    INSERT INTO Orders (id, created_at, updated_at, number_of_kits, fragrance1_id, fragrance2_id, fragrance3_id)
    VALUES (@id, @created_at, @updated_at, @number_of_kits, @fragrance1_id, @fragrance2_id, @fragrance3_id);
END;
