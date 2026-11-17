using CuetFitHub.Api.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CuetFitHub.Api.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261117020000_BookingTrainer")]
public class BookingTrainer : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder) => migrationBuilder.Sql("""
        ALTER TABLE "Bookings" ADD COLUMN "TrainerUserId" text REFERENCES "AspNetUsers" ("Id") ON DELETE SET NULL;
        UPDATE "Bookings" b SET "TrainerUserId" = u.id FROM (
            SELECT "FullName", min("Id") AS id FROM "AspNetUsers"
            WHERE "Role" = 'Trainer' GROUP BY "FullName" HAVING count(*) = 1
        ) u WHERE b."TrainerName" = u."FullName";
        """);
    protected override void Down(MigrationBuilder migrationBuilder) =>
        migrationBuilder.Sql("""ALTER TABLE "Bookings" DROP COLUMN "TrainerUserId" """);
}
