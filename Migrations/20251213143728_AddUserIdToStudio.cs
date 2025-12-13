using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TapeDex.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToStudio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tapeGenres_genres_GenreId",
                table: "tapeGenres");

            migrationBuilder.DropForeignKey(
                name: "FK_tapeGenres_tapes_TapeId",
                table: "tapeGenres");

            migrationBuilder.DropForeignKey(
                name: "FK_tapes_UserProfiles_UserId",
                table: "tapes");

            migrationBuilder.DropForeignKey(
                name: "FK_tapes_studios_StudioId",
                table: "tapes");

            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "tapes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "tapes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tapes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "StudioId",
                table: "tapes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "tapes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "tapes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tapes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "TapeId",
                table: "tapeGenres",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "GenreId",
                table: "tapeGenres",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "studios",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "53aed71e-7e2b-4a78-8502-70d231f686d4", "AQAAAAIAAYagAAAAEG+lZeeeRxeaHDV/A7xfHPketpAEDaC9BKMJVY6+1PuW82iFWkLx0oZR29H8BQKA1w==", "e6d931c3-e590-481a-bdb8-8fcdced75b34" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9417c888-d843-4bce-8865-b7527380b94b", "AQAAAAIAAYagAAAAEC77H5OpP0HtsyBrLgEZPj9hoRtFKa8wAjY9SSL/S9eD1rWD6gxJq9j+05hsyDw4uQ==", "fbf19e51-f2c5-4f6c-8101-01017f874a02" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "16e6f397-6ab0-465d-be0b-df530699e5c2", "AQAAAAIAAYagAAAAEK87CGN6vcH2IMZJKJfHwW1WjfKnSvqoWfK5MI9mB6PAdS6+OBVobeURSfbVykl3uQ==", "82b155f0-47c4-49b0-9bc4-4e5d69f686ba" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "35902d42-aff4-4998-9b3a-077c32ce67d5", "AQAAAAIAAYagAAAAEGmO5oHw2bSsWcPLw1csKOpQI2e3FXtB6WoffajuIPznuRKXEX+Gc+xebbMIJGJmDA==", "3f80de08-24c6-4682-a86f-980db4e4c31a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "700ec52e-13e9-44f4-9247-151e37a8fb43", "AQAAAAIAAYagAAAAENvij+yQzvgXxJjFa+IN0TscPV8UWuk8lAcS8NRSp0gnAuffJCHMUBnInsnisytE6g==", "85c45c83-a447-4d7a-bf6a-ec4ee0f79288" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3c00faa7-fb8f-439d-8763-58a519a749eb", "AQAAAAIAAYagAAAAEJ5WYf479ikbALusX54MwY/XrDodE71aLqK4FdfUXJAXPIWgiWVLolWPBkNrVCnD6w==", "c1fd7d95-c399-4c6e-958c-fbd58ac54f2b" });

            migrationBuilder.UpdateData(
                table: "studios",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "studios",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: 2);

            migrationBuilder.CreateIndex(
                name: "IX_studios_UserId",
                table: "studios",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_studios_UserProfiles_UserId",
                table: "studios",
                column: "UserId",
                principalTable: "UserProfiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tapeGenres_genres_GenreId",
                table: "tapeGenres",
                column: "GenreId",
                principalTable: "genres",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tapeGenres_tapes_TapeId",
                table: "tapeGenres",
                column: "TapeId",
                principalTable: "tapes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tapes_UserProfiles_UserId",
                table: "tapes",
                column: "UserId",
                principalTable: "UserProfiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tapes_studios_StudioId",
                table: "tapes",
                column: "StudioId",
                principalTable: "studios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_studios_UserProfiles_UserId",
                table: "studios");

            migrationBuilder.DropForeignKey(
                name: "FK_tapeGenres_genres_GenreId",
                table: "tapeGenres");

            migrationBuilder.DropForeignKey(
                name: "FK_tapeGenres_tapes_TapeId",
                table: "tapeGenres");

            migrationBuilder.DropForeignKey(
                name: "FK_tapes_UserProfiles_UserId",
                table: "tapes");

            migrationBuilder.DropForeignKey(
                name: "FK_tapes_studios_StudioId",
                table: "tapes");

            migrationBuilder.DropIndex(
                name: "IX_studios_UserId",
                table: "studios");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "studios");

            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "tapes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "tapes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "tapes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StudioId",
                table: "tapes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "tapes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "tapes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tapes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TapeId",
                table: "tapeGenres",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GenreId",
                table: "tapeGenres",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "79dcbe18-69b9-44f4-8ba5-cdf334aa5282", "AQAAAAIAAYagAAAAEBb96rHdmp/1iydaMyyxMoiZLB7eAhH6Zwg1Nw0l6klVYdCNO2YPLVjqttXo4s1NAQ==", "50e6c6bd-7be2-4f49-8b27-a3ffb92975c7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c62e4c03-b716-4d9e-b60a-ba62dee46edc", "AQAAAAIAAYagAAAAEJlIY9XAG+7E6qs1PNG4LRThjj9vEEmN1Sgppd4PbOhNDIWSHS/neoIceLYI7csyqg==", "029ebb15-b2a9-4ac3-b8a3-b2f572c512b2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "981f1c72-755b-4bd1-b781-3582236c999b", "AQAAAAIAAYagAAAAECRHxQYcaF4r/YnRo0TJuxLne7mCGWo4YLw2TS2oM15H0LqiyPshmJrjhsNxoLM9fg==", "7a0fcd91-8d8d-4fd9-a0a4-df645da1ed36" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fe6241d6-2f50-48b6-8f03-5665638198a2", "AQAAAAIAAYagAAAAEPDSQNPvW4GFxKShLWJK0Yf0GMZhCgqcwLwiUMdOqPc49kD2j63G645DRN6ABnJmug==", "71772666-86ca-4dab-b826-95fc258cf98d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "51b4e563-9690-4cf8-aa04-a2f24b2a08c8", "AQAAAAIAAYagAAAAEMSSNxNa+4RyAMI2ff+AAhnGMM5gEJHB7tYnq0m+wH3TRjdm7Uz26zKzI7ZMXAkQZg==", "3d14e5e6-ed62-4f4f-9cf9-3954f4ef91f7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b074bb4b-6456-4d76-a582-d4f608270ac3", "AQAAAAIAAYagAAAAEKI7FMKUVjEuufxlQlNIyc+hoMONVbDRKfxdCZq0y8oVlc2QfHarHXy3G++DFAatDw==", "eb1b7d6c-a1d3-4ef5-b2a5-21de516c8110" });

            migrationBuilder.AddForeignKey(
                name: "FK_tapeGenres_genres_GenreId",
                table: "tapeGenres",
                column: "GenreId",
                principalTable: "genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tapeGenres_tapes_TapeId",
                table: "tapeGenres",
                column: "TapeId",
                principalTable: "tapes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tapes_UserProfiles_UserId",
                table: "tapes",
                column: "UserId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tapes_studios_StudioId",
                table: "tapes",
                column: "StudioId",
                principalTable: "studios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
