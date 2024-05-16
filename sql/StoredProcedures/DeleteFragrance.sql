CREATE PROCEDURE DeleteFragrance
@id NVARCHAR(50)
AS
BEGIN
    DELETE FROM Fragrances
    WHERE id = @id;
END;
