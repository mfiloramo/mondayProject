CREATE PROCEDURE GetOrdersByFragrance
@fragrance_id NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Orders
    WHERE fragrance1_id = @fragrance_id
       OR fragrance2_id = @fragrance_id
       OR fragrance3_id = @fragrance_id;
END;
