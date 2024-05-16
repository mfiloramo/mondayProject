CREATE TABLE [dbo].[Orders] (
    id NVARCHAR(50) PRIMARY KEY,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    number_of_kits INT NOT NULL,
    fragrance1_id INT NOT NULL,
    fragrance2_id INT NOT NULL,
    fragrance3_id INT NOT NULL,
    FOREIGN KEY (fragrance1_id) REFERENCES Fragrances(id),
    FOREIGN KEY (fragrance2_id) REFERENCES Fragrances(id),
    FOREIGN KEY (fragrance3_id) REFERENCES Fragrances(id)
);
