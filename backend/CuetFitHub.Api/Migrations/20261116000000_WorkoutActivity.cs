using CuetFitHub.Api.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CuetFitHub.Api.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("20261116000000_WorkoutActivity")]
public class WorkoutActivity : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder) => migrationBuilder.Sql("""
        CREATE TABLE workout_activity (
            user_id text NOT NULL REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE,
            exercise_key text NOT NULL,
            day date NOT NULL,
            PRIMARY KEY (user_id, exercise_key)
        );
        CREATE INDEX workout_activity_days ON workout_activity (user_id, day);
        """);

    protected override void Down(MigrationBuilder migrationBuilder) =>
        migrationBuilder.Sql("DROP TABLE workout_activity");
}
