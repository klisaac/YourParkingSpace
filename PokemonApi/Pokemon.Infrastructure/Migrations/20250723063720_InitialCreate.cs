using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pokemon.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NamedApiResource",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "varchar(200)", nullable: true),
                    Url = table.Column<string>(type: "varchar(500)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NamedApiResource", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sprite",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BackDefault = table.Column<string>(type: "varchar(200)", nullable: true),
                    BackFemale = table.Column<string>(type: "varchar(200)", nullable: true),
                    BackShiny = table.Column<string>(type: "varchar(200)", nullable: true),
                    BackShinyFemale = table.Column<string>(type: "varchar(200)", nullable: true),
                    FrontDefault = table.Column<string>(type: "varchar(200)", nullable: true),
                    FrontFemale = table.Column<string>(type: "varchar(200)", nullable: true),
                    FrontShiny = table.Column<string>(type: "varchar(200)", nullable: true),
                    FrontShinyFemale = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprite", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(type: "varchar(100)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pokemon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PokemonNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    Height = table.Column<int>(type: "INTEGER", nullable: true),
                    Name = table.Column<string>(type: "varchar(200)", nullable: true),
                    SpriteId = table.Column<int>(type: "int", nullable: true),
                    Weight = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pokemon", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pokemon_Sprite_SpriteId",
                        column: x => x.SpriteId,
                        principalTable: "Sprite",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AbilityInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsHidden = table.Column<bool>(type: "INTEGER", nullable: true),
                    Slot = table.Column<int>(type: "INTEGER", nullable: true),
                    NamedApiResourceId = table.Column<int>(type: "INTEGER", nullable: true),
                    PokemonId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbilityInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AbilityInfo_NamedApiResource_NamedApiResourceId",
                        column: x => x.NamedApiResourceId,
                        principalTable: "NamedApiResource",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AbilityInfo_Pokemon_PokemonId",
                        column: x => x.PokemonId,
                        principalTable: "Pokemon",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TypeInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Slot = table.Column<int>(type: "INTEGER", nullable: true),
                    NamedApiResourceId = table.Column<int>(type: "INTEGER", nullable: true),
                    PokemonId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeInfo_NamedApiResource_NamedApiResourceId",
                        column: x => x.NamedApiResourceId,
                        principalTable: "NamedApiResource",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TypeInfo_Pokemon_PokemonId",
                        column: x => x.PokemonId,
                        principalTable: "Pokemon",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbilityInfo_NamedApiResourceId",
                table: "AbilityInfo",
                column: "NamedApiResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_AbilityInfo_PokemonId",
                table: "AbilityInfo",
                column: "PokemonId");

            migrationBuilder.CreateIndex(
                name: "IX_Pokemon_SpriteId",
                table: "Pokemon",
                column: "SpriteId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeInfo_NamedApiResourceId",
                table: "TypeInfo",
                column: "NamedApiResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_TypeInfo_PokemonId",
                table: "TypeInfo",
                column: "PokemonId");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserName",
                table: "User",
                column: "UserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AbilityInfo");

            migrationBuilder.DropTable(
                name: "TypeInfo");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "NamedApiResource");

            migrationBuilder.DropTable(
                name: "Pokemon");

            migrationBuilder.DropTable(
                name: "Sprite");
        }
    }
}
