using CuetFitHub.Api.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CuetFitHub.Api.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261116010000_TrainerApplications")]
public class TrainerApplications : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder) => migrationBuilder.Sql("""
        CREATE TABLE trainer_applications (
            id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name text NOT NULL,
            email text NOT NULL,
            specialty text NOT NULL,
            experience text NOT NULL,
            motivation text NOT NULL,
            status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected'))
        )
        """);

    protected override void Down(MigrationBuilder migrationBuilder) =>
        migrationBuilder.Sql("DROP TABLE trainer_applications");
}
