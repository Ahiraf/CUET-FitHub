using CuetFitHub.Api.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CuetFitHub.Api.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261117000000_TrainerApplicationPasswords")]
public class TrainerApplicationPasswords : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder) => migrationBuilder.Sql("""
        ALTER TABLE trainer_applications ADD COLUMN password_hash text;
        CREATE UNIQUE INDEX trainer_pending_email ON trainer_applications (lower(email))
        WHERE status = 'Pending' AND password_hash IS NOT NULL;
        """);

    protected override void Down(MigrationBuilder migrationBuilder) =>
        migrationBuilder.Sql("DROP INDEX trainer_pending_email; ALTER TABLE trainer_applications DROP COLUMN password_hash");
}
