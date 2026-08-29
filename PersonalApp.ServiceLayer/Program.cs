using Microsoft.EntityFrameworkCore;

namespace PersonalApp.ServiceLayer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            // Allow both localhost and live Vercel frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddSwaggerGen();
            builder.Services.AddOpenApi();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            // Smart Database Provider: uses PostgreSQL for Neon/Cloud, SQL Server for Localhost
            builder.Services.AddDbContext<PersonalApp.DataAccessLayer.Data.PersonalDashboardDbContext>(options =>
            {
                if (!string.IsNullOrEmpty(connectionString) &&
                   (connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://") || connectionString.Contains("neon.tech")))
                {
                    options.UseNpgsql(connectionString);
                }
                else
                {
                    options.UseSqlServer(connectionString);
                }
            });

            builder.Services.AddScoped<PersonalApp.DataAccessLayer.Repository>();
            builder.Services.AddScoped<PersonalApp.DataAccessLayer.JobRepository>();

            var app = builder.Build();

            // Enable Swagger in both Dev and Production so you can test the live API
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();
            app.UseCors("AllowAngular");
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}